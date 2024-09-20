import { Employee } from "@prisma/client";

export type WithoutPasswordEmployee = Omit<Employee, 'password_hash'>
