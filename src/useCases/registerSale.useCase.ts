import { Sale } from '@prisma/client'

import { SalesRepository } from '@/repositories/interfaces/sales.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { PatientsRepository } from '@/repositories/interfaces/patients.repository'
import { ProductsRepository } from '@/repositories/interfaces/products.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error' 

interface IRequest {
  user_id: string
  clinic_id: string
  patient_id: string
  products: string[]
}

interface IResponse {
  sale: Sale
}

export class RegisterSaleUseCase {
  constructor(
    private salesRepository: SalesRepository,
    private employeesRepository: EmployeesRepository,
    private clinicsRepository: ClinicsRepository, 
    private patientsRepository: PatientsRepository, 
    private productsRepository: ProductsRepository,
  ) {}

  async execute({ user_id, clinic_id, patient_id, products }: IRequest): Promise<IResponse> {
    let clinic

    clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      const employee = await this.employeesRepository.findById(user_id)

      clinic = await this.clinicsRepository.findById(employee!.clinic_id)
    }

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const patient = await this.patientsRepository.findByPatientIdAndClinicId(patient_id, clinic_id)

    if (!patient) {
      throw new ResourceNotFoundError()
    }

    let total_amount = 0
    let quantities_products = [] as { id: string, quantity: number }[]

    const productsIds = await Promise.all(products.map(async (product_id) => {
      const product = await this.productsRepository.findByProductIdAndClinicId(product_id, clinic_id)

      if (!product) {
        throw new ResourceNotFoundError()
      }

      total_amount += Number(product.amount)

      const qp_exist = quantities_products.find((qp) => qp.id === product.id)

      if (qp_exist) {
        qp_exist.quantity += 1
      } else {
        quantities_products.push({ id: product.id, quantity: 1 })
      }
      
      return { id: product.id }
    }))

    await Promise.all(quantities_products.map(async (qp) => {
      const product = await this.productsRepository.findById(qp.id)

      if (product) {
        product.quantity -= qp.quantity
        await this.productsRepository.save(product)
      }
    }))

    const sale = await this.salesRepository.create({
      clinic_id,
      patient_id,
      products: {
        connect: productsIds
      },
      amount: String(total_amount)
    })

    return { sale }
  }
}
