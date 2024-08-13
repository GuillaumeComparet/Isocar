"use server"
import { revalidatePath } from 'next/cache'
import { getServices, patchServices, disableServices, postServices } from '@/data-access/service'
import { disableServicesAndCategory, getCategories, patchCategory, postCategory } from '@/data-access/category';

export async function getServicesData() {
  try {
    return await getServices()  
  } catch (error) {
    throw new Error("Erreur lors du chargement des services.");
  }
}

export async function patchServicesData (id:number, name: string, worktime: number, id_category: number) {
  await patchServices(id, name, worktime, id_category)
  revalidatePath('/admin/services') 
}

export async function disableServicesData (id: number) {
  await disableServices(id)
  revalidatePath('/admin/services') 
}

export async function postServicesData (name:string, worktime:number, id_category: number) {
  await postServices(name, worktime, id_category)
  revalidatePath('/admin/services') 
}

export async function getCategoriesData() {
  try {
    return await getCategories()  
  } catch (error) {
    throw new Error("Erreur lors du chargement des categories.");
  }
}

export async function postCategoryData (name:string) {
  await postCategory(name)
  revalidatePath('/admin/services') 
}

export async function patchCategoryData (id:number, name: string) {
  await patchCategory(id, name)
  revalidatePath('/admin/services') 
}

export async function disableCategoryData (id: number) {
  await disableServicesAndCategory(id)
  revalidatePath('/admin/services') 
}
