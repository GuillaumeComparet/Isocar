import React from 'react'
import { toast } from 'sonner';
import { ServiceSchema } from '@/utils/zodSchema/globals';
import testSchemaClient from '@/utils/zodSchema/testSchemaClient';
import { Service } from '@/utils/types/globals';
import { disableServicesData } from '../_actions/data';
import OnClickButton from '@/components/OnClickButton';

type Props = {
  service: Service,
  closeModal: () => void
}

const DeleteServiceModal = ({service, closeModal}: Props) => {

      const handleSubmit = async () => {

        try {
          // Validation avec Zod
          const dataValid = testSchemaClient(ServiceSchema, service)

          if(dataValid){
           await disableServicesData(service.id_service);

            toast.success("Suppression effectuée");
            closeModal();  
          }          
        } catch (error) {
            toast.error("Erreur lors de la suppression du service");
        }
      }

  return (
  <>
    <div onClick={closeModal} className='fixed inset-0 bg-slate-800/75'></div>
    <div>
    
        <div className='show-modal'>
          <button className='close-modal-btn' onClick={closeModal}>X</button>
          <div className='flex flex-col justify-center items-center gap-4'> 
            <h2 className='title'>Vous êtes sur le point de supprimer :</h2>
            <p><span className='font-bold text-highlight'>Service :</span> {service.name}</p>
            <p><span className='font-bold text-highlight'>Temps de travail :</span> {service.worktime}</p>
            <OnClickButton handleSubmit={handleSubmit} buttonText='Confirmer la suppression' className="btn-submit" />
            <button  onClick={closeModal} className="btn-cancel">Annuler</button>
          </div>
        </div>
      </div>
      </>
  )
}

export default DeleteServiceModal