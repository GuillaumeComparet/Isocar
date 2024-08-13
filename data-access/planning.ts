import prisma from "@/utils/prisma";

export async function getPlanning() {
  return await prisma.planning.findMany();
}

export async function getPlanningByDayDate(daydate: Date) {
  return await prisma.planning.findUnique({
    where: {
      daydate: daydate,
    },
    include: {
      appointments: true,
    },
  });
}

export async function getPlanningByDayDateGTE(daydate: Date) {
  const endDate = new Date(daydate);
  const pastDate = new Date(daydate);
  endDate.setDate(endDate.getDate() + 120);
  pastDate.setDate(pastDate.getDate() - 7);
  return await prisma.planning.findMany({
    where: {
      daydate: {
        gte:pastDate,
        lte:endDate
      }  
    },
  });
}

export async function createPlanning(daydate: Date, maxShift: number) {
  return await prisma.planning.create({
    data: {
      daydate,
      afternoon: 0,
      morning: 0,
      maxShift: maxShift,
    },
  });
}

export async function updateUniqueShiftById(shift:string, planningId: number) { 
  return await prisma.planning.update({
    data: {
      [shift]: {
        increment: 1,
      },
    },
    where: {
      id_planning: planningId,
    }
  })
}

export async function updateBothShiftById(planningId: number) { 
  return await prisma.planning.update({
    data: {
      morning: {
        increment: 1,
      },
      afternoon: {
        increment: 1,
      },
    },
    where: {
      id_planning: planningId,
    }
  })
}

export async function updateMaxShiftById(planningId: number, maxShift: number) { 
  return await prisma.planning.update({
    data: {
      maxShift: maxShift,
    },
    where: {
      id_planning: planningId,
    }
  })
}

export async function updateMaxShiftOnDate(maxShift: number, daydate: Date) {
  
  return await prisma.planning.update({
    data: {
      maxShift: maxShift,
    },
    where: {
      daydate: daydate,
    },
  });
}
