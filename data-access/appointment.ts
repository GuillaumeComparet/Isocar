"use server"
import prisma from "@/utils/prisma";
import { AppointmentShift, AppointmentStatus } from "@prisma/client";

export async function getAppointments() {
  return await prisma.appointment.findMany({
    include: {
      profile: true,
      car: true, 
      planning: true,
      services: {
        include: {
          service: true, 
        },
      },
    },
    orderBy: {
      planning: {
        daydate: 'desc',
      },
    }
  });
}

export async function getAppointmentsByUser(userId:string) {
return await prisma.appointment.findMany({
  where: {
    id_profile: userId,
  },
  include: {
    car: true, 
    services: {
      include: {
        service: true, 
      },
    },
    planning: true,
  },
  orderBy: {
    planning:{
      daydate: 'desc',
    }
  }
});
}

export async function getAppointmentById(idAppointment:number) {
  return await prisma.appointment.findUnique({
    where: {
      id_appointment: idAppointment,
    },
    include: {
      car: true, 
      services: {
        include: {
          service: true, 
        },
      },
      planning: true,
    },
  });
};

export async function getAppointmentsDataOnDayDate(today: Date) {
  const endDate = new Date(today);
  const pastDate = new Date(today);
  endDate.setDate(endDate.getDate() + 120);
  pastDate.setDate(pastDate.getDate() - 7);

return await prisma.appointment.findMany({
  include: {
    profile: true,
    car: true, 
    planning: true,
    services: {
      include: {
        service: true, 
      },
    },
  },
  where: {
    status: {
      notIn: ['Refused', 'Canceled'],
    },
    planning: {
      daydate: {
        gte: pastDate,
        lte: endDate,
      },
    },
  },
  orderBy: {
    createdAt: 'desc',
  },
});
}

export async function createAppointment(userId: string, selectedCar: any, planning: any, shift: AppointmentShift, comment: string | null) {
  return await prisma.appointment.create({
    data: {
      id_profile: userId,
      id_car: selectedCar,
      id_planning: planning,
      shift,
      comment
    },
  });
}

export async function getWaitingAppointmentsCount(userId: string) {
  return await prisma.appointment.count({
    where: {
      id_profile: userId,
      status: 'Waiting',
    },
  });
}

export async function updateAppointment(id_appointment: number, status: AppointmentStatus) {
  return await prisma.appointment.update({
    where: {
      id_appointment: id_appointment,
    },
    data: {
      status: status,
    },
    include: {
      car: true, 
      services: { 
        include: {
          service: true, 
        },
      },
      profile: true, 
      planning: true, 
    },
  });
}