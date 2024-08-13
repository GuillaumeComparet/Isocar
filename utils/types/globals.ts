import { z } from "zod";
import { CarSchema, NewCarSchema, NewUserSchema, ServiceSchema, PlanningDateSchema, defaultSettingsSchema, CategorySchema, CategoryWithServicesSchema } from "@/utils/zodSchema/globals";
import { AppointmentShift, Status } from "@prisma/client";

export type Car = z.infer<typeof CarSchema>;

export type NewCar = z.infer<typeof NewCarSchema>;

export type Service = z.infer<typeof ServiceSchema>;

export type Category = z.infer<typeof CategorySchema>;

export type CategoryWithServices = z.infer<typeof CategoryWithServicesSchema>;

export type NewUser = z.infer<typeof NewUserSchema>;

export type PlanningDate =z.infer<typeof PlanningDateSchema>;

export type Settings = z.infer<typeof defaultSettingsSchema>;

export type Planning = {
  id_planning: number;
  daydate: Date;
  morning: number;
  afternoon: number;
  maxShift: number;
  createdAt: Date;
  updatedAt: Date | null;
}

export type Appointment = {
  planning: Planning;
  id_planning: number;
  car: Car;
  services: Service[];
  id_appointment: number;
  shift: AppointmentShift;
  status: string;
  profile: Client;
  comment: string;
}

export type Client = {
  id: string;
  last_name: string;
  first_name: string;
  phone_number: string;
  email: string;
  role: string;
  status: Status;
};

export type AppointmentServiceData = {
  id_appointment: number;
  id_service: number;
}

export type ExtendedService = {
  id_appointment_has_service: number;
  id_service: number;
  id_appointment: number;
  service: Service;
  createdAt: Date;
  updatedAt: Date | null;
};

export type ExtendedAppointment = {
  services: ExtendedService[];
  planning: Planning;
  profile: Client;
  car: Car;
};
