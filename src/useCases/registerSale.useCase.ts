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

    let amount = 0
    const productsIds: { id: string }[] = []
    products.forEach(async (product_id) => {
      const product = await this.productsRepository.findByProductIdAndClinicId(product_id, clinic_id)

      if (!product) {
        throw new ResourceNotFoundError()
      }

      amount += Number(product.amount)
      productsIds.push({ id: product.id })
    })

    const sale = await this.salesRepository.create({
      clinic_id,
      patient_id,
      products: {
        connect: productsIds
      },
      amount
    })

    return { sale }
  }
}
