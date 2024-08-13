import React from 'react'
import { toast } from 'sonner';
import { CategorySchema, ServiceSchema } from '@/utils/zodSchema/globals';
import testSchemaClient from '@/utils/zodSchema/testSchemaClient';
import { Category } from '@/utils/types/globals';
import { disableCategoryData, disableServicesData } from '../_actions/data';
import OnClickButton from '@/components/OnClickButton';

type Props = {
    category: Category,
  closeModal: () => void
}

const DeleteCategoryModal = ({category, closeModal}: Props) => {

      const handleSubmit = async () => {

        try {
          const dataValid = testSchemaClient(CategorySchema, category)

          if(dataValid){
           await disableCategoryData(category.id_category);

            toast.success("Suppression effectuée");
            closeModal();  
          }          
        } catch (error) {
            toast.error("Erreur lors de la suppression de la catégorie");
        }
      }

  return (
  <>
    <div onClick={closeModal} className='fixed inset-0 bg-slate-800/75'></div>
    <div>
    
        <div className='show-modal'>
          <button className='close-modal-btn' onClick={closeModal}>X</button>
          <div className='flex flex-col justify-center items-center gap-4'> 
            <h2 className='title'>Êtes-vous certain de vouloir supprimer la catégorie ?</h2>
            <p>Les services associés à cette catégorie seront également supprimés</p>
            <OnClickButton handleSubmit={handleSubmit} buttonText='Confirmer la suppression' className="btn-submit" />
            <button  onClick={closeModal} className="btn-cancel">Annuler</button>
          </div>
        </div>
      </div>
      </>
  )
}

export default DeleteCategoryModal