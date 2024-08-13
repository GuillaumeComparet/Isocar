import prisma from "@/utils/prisma";

export async function getServices() {
  return await prisma.service.findMany({
    where: {
      status: 'Enable'
    },
    orderBy: {
      name: 'asc'
    }
  })  
}

export async function patchServices(id:number, name: string, worktime: number, id_category:number) {
  return await prisma.service.update({
    where: { id_service: id},
    data: { name, worktime, id_category }
  })
}

export async function disableServices(id: number) {
  return await prisma.service.update(
      {
          where: { id_service:id },
          data: { status: 'Disable' }
      }
  )
}

export async function postServices(name:string, worktime:number, id_category: number) {
  return await prisma.service.create(
    {
      data:
      { name, worktime, id_category }
    }
  )
}