import React from 'react'
import { Metadata } from 'next';
import PneuSvg from '@/components/svg/PneuSvg';
import PareBriseSvg from '@/components/svg/PareBriseSvg';
import DiagSvg from '@/components/svg/DiagSvg';
import SnowSvg from '@/components/svg/SnowSvg';
import ToolSvg from '@/components/svg/ToolSvg';


export const metadata: Metadata = {
  title: 'Prestations',
  description: 'Découvrez les services proposés par notre garage',
};

const Index = () => {

  const svgClass = "fill-foreground h-24 w-24"

  return (
    <div className='w-full flex flex-col items-center gap-8 pt-8 pb-16 text-start text-lg'>
      <section className='text-center px-8'>
        <h2 className='text-2xl font-bold'>Découvrez les services proposés par notre garage</h2>
      </section>
      <section className='bg-text-content-background flex w-11/12 md:w-2/3 rounded-lg'>
        <div className='bg-hover grid place-items-center w-2/5 md:w-1/4 p-4 rounded-l-lg'>
        <ToolSvg className={`${svgClass} self-end`} />
        <h3 className="self-start text-center">Entretien de votre véhicule</h3>
        </div>
        <ul className='p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center w-3/5 md:w-3/4 text-left bg-background-opacity rounded-r-lg'>
          <li className="flex items-center justify-start w-full">◈ Révision</li>
          <li className="flex items-center justify-start w-full">◈ Vidange</li>
          <li className="flex items-center justify-start w-full">◈ Courroie de distribution</li>
          <li className="flex items-center justify-start w-full">◈ Freinage</li>
          <li className="flex items-center justify-start w-full">◈ Suspension</li>
          <li className="flex items-center justify-start w-full">◈ Embrayage</li>
          <li className="flex items-center justify-start w-full">◈ Direction</li>
          <li className="flex items-center justify-start w-full">◈ Echappement</li>
          <li className="flex items-center justify-start w-full">◈ Démarrage et charge</li>
        </ul>
      </section>
      <section className='bg-text-content-background flex w-11/12 md:w-2/3 rounded-lg'>
        <div className='bg-hover grid place-items-center w-2/5 md:w-1/4 p-4 rounded-l-lg'>
          <DiagSvg className={`${svgClass} self-end`} />
        <h3 className="self-start">Diagnostic</h3>
        </div>
        <ul className='p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center w-3/5 md:w-3/4 text-left bg-background-opacity rounded-r-lg'>
          <li className="flex items-center justify-start w-full">◈ Diagnostic électronique</li>
          <li className="flex items-center justify-start w-full">◈ Recherche de panne</li>
        </ul>
      </section>
      <section className='bg-text-content-background flex w-11/12 md:w-2/3 rounded-lg'>
        <div className='bg-hover grid place-items-center w-2/5 md:w-1/4 p-4 rounded-l-lg'>
          <PneuSvg className={`${svgClass} self-end`} />
        <h3 className="self-start">Pneumatiques</h3>
        </div>
        <ul className='p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center w-3/5 md:w-3/4 text-left bg-background-opacity rounded-r-lg'>
          <li className="flex items-center justify-start w-full">◈ Vente de pneus</li>
          <li className="flex items-center justify-start w-full">◈ Remplacement de pneus</li>
          <li className="flex items-center justify-start w-full">◈ Parallélisme</li>
        </ul>
      </section>
      <section className='bg-text-content-background flex w-11/12 md:w-2/3 rounded-lg'>
        <div className='bg-hover grid place-items-center w-2/5 md:w-1/4 p-4 rounded-l-lg'>
        <SnowSvg className={`${svgClass} self-end`} />
        <h3 className="self-start">Climatisation</h3>
        </div>
        <ul className='p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center w-3/5 md:w-3/4 text-left bg-background-opacity rounded-r-lg'>
          <li className="flex items-center justify-start w-full">◈ Recharge de gaz</li>
          <li className="flex items-center justify-start w-full">◈ Recherche de panne</li>
          <li className="flex items-center justify-start w-full">◈ Recherche de fuite</li>
        </ul>
      </section>
      <section className='bg-text-content-background flex w-11/12 md:w-2/3 rounded-lg'>
        <div className='bg-hover grid place-items-center w-2/5 md:w-1/4 p-4 rounded-l-lg'>
          <PareBriseSvg className={`${svgClass} self-end`} />
        <h3 className="self-start">Pare-brise</h3>
        </div>
        <ul className='p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center w-3/5 md:w-3/4 text-left bg-background-opacity rounded-r-lg'>
          <li className="flex items-center justify-start w-full">◈ Remplacement de pare-brise</li>
          <li className="flex items-center justify-start w-full">◈ Réparation d'impact</li>
        </ul>
      </section>
    </div>
  )
}

export default Index