import React, { useState, ReactNode, FormEvent } from 'react';
import { toast } from 'sonner';
import { z, ZodSchema } from 'zod'; // Assurez-vous d'importer Zod
import { SubmitButton } from '@/components/SubmitButton';

type Props<T> = {
  initialData: T,
  schema: ZodSchema<T>,
  handleUpdate: (data: T) => Promise<void>,
  closeModal: () => void,
  children: (form: T, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => ReactNode
}

const UpdateModal = <T,>({ initialData, schema, handleUpdate, closeModal, children }: Props<T>) => {
  const [updateForm, setUpdateForm] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      schema.parse(updateForm); // Validation avec Zod
      await handleUpdate(updateForm);
      toast.success("Modification enregistrée");
      closeModal();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <div>
      <div onClick={closeModal} className='fixed inset-0 bg-slate-800/75'></div>
      <div className='fixed z-10 top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-indigo-500 p-32'>
        <h2>Modifier</h2>
        <form >
          {children(updateForm, handleChange)}
          <SubmitButton
            formAction={handleSubmit}
            className="bg-orange-700 rounded-md px-4 py-2 text-foreground mb-2">
            Valider les modifications
          </SubmitButton>
        </form>
        <button className='bg-red-500 p-1' onClick={closeModal}>X</button>
      </div>
    </div>
  );
};

export default UpdateModal;
