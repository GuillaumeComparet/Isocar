import React from 'react';
import { getCategoriesData, getServicesData } from './_actions/data';
import DeleteServiceButton from './(modal)/DeleteServiceButton';
import AddServiceButton from './(modal)/AddServiceButton';
import UpdateServiceButton from './(modal)/UpdateServiceButton';
import { Metadata } from 'next';
import { getServicesByCategory } from '@/data-access/category';
import AddCategoryButton from './(modal)/AddCategoryButton';
import UpdateCategoryButton from './(modal)/UpdateCategoryButton';
import DeleteCategoryButton from './(modal)/DeleteCategoryButton';

export const metadata: Metadata = {
  title: 'Admin | Services',
  description: 'Page d\'administration des services',
};

export default async function Services() {
  const servicesList = await getServicesByCategory();
  const categories = await getCategoriesData();

  return (
    <div className='pb-16 pt-8 gap-8 grid place-items-center'>
      <div className='flex gap-8'>
      <AddServiceButton categories={categories} />
      <AddCategoryButton />
      </div>
      <table className='text-center'>
        <thead className='border bg-background-opacity'>
          <tr>
            <th>Nom</th>
            <th>Temps de travail (min)</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody  className='border'>
          {servicesList.map(category => (
            <React.Fragment key={category.id_category}>
              <tr className='bg-btn-background'>
                <td colSpan={4}>
                  <div className='flex items-center justify-center gap-4'>
                    <h3 className='title mb-0 w-2/3'>{category.name}</h3>
                    <div className='flex w-1/3 gap-4'>
                      <UpdateCategoryButton category={category}/>
                      <DeleteCategoryButton category={category} />
                    </div>
                  </div>
                </td>
              </tr>
              {category.services.map(service => (
                <tr key={service.id_service}>
                  <td>{service.name}</td>
                  <td>{service.worktime}</td>
                  <td><DeleteServiceButton service={service} /></td>
                  <td><UpdateServiceButton categories={categories} service={service} /></td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      
      
    </div>
  );
}
