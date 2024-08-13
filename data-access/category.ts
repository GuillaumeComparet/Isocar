import prisma from "@/utils/prisma";

export async function getCategories() {
  return await prisma.category.findMany({
    where: {
      status: 'Enable'
    },
    orderBy: {
      name: 'asc'
    }
  });
}

export async function getServicesByCategory() {
  const categories = await prisma.category.findMany({
    where: {
      status: 'Enable',
    },
    include: {
      services: {
        where: {
          status: 'Enable',
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  categories.sort((a, b) => {
    if (a.name === 'Entretien') return -1;
    if (b.name === 'Entretien') return 1;
    return a.name.localeCompare(b.name);
  });

  categories.forEach(category => {
    category.services.sort((a, b) => a.name.localeCompare(b.name));
  });

  return categories;
}
  
  export async function postCategory(name:string) {
    return await prisma.category.create(
      {
        data:
        { name }
      }
    )
  }

  export async function patchCategory(id:number, name: string) {
    return await prisma.category.update({
      where: { id_category: id},
      data: { name }
    })
  }

  export async function disableServicesAndCategory(id: number) {
    return await prisma.$transaction(async (prisma) => {

      await prisma.service.updateMany({
        where: { id_category: id },
        data: { status: 'Disable' },
      });
  
      await prisma.category.update({
        where: { id_category: id },
        data : { status : 'Disable' },
      });
    });
  }