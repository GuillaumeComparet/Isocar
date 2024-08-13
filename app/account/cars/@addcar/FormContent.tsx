"use client"
import React from 'react'
import ModelBrandFields from './_inputs/ModelBrandFields'
import PlateField from './_inputs/PlateField'

const FormContent = () => {

  return (
    <div className='grid gap-4'>
      <ModelBrandFields
      inputName="brand" 
      displayName="Marque"
      placeholder="Peugeot"
      />

      <ModelBrandFields 
      inputName="model" 
      displayName="Modèle"
      placeholder="208"
      />

      <PlateField />
    </div>
  )
}

export default FormContent