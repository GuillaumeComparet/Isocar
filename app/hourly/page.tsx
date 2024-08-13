import Link from 'next/link';
import getSettingsData from "./_actions/getData";
import Map from "./Map";
import { Metadata } from 'next';
import Image from 'next/image';
import waze from '@/public/images/waze.png';
import FindSvg from '@/components/svg/FindSvg';
import TimeSvg from '@/components/svg/TimeSvg';
import PhoneSvg from '@/components/svg/PhoneSvg';
import LocationPinSvg from '@/components/svg/LocationPinSvg';



export const metadata: Metadata = {
  title: 'Horaires',
  description: 'Horaires et coordonnées de votre garage'
};

const page = async () => {

  const settingsData = await getSettingsData();

  if(!settingsData){
    return (
      <h1>Erreur lors du chargement de la page</h1>
    )
  }

  const wazeLink = settingsData.coordonate_x && settingsData.coordonate_y ? `https://www.waze.com/ul?ll=${Number(settingsData.coordonate_x)}%2C${Number(settingsData.coordonate_y)}&navigate=yes&zoom=17` : `https://www.waze.com/ul?ll=47.206455284692154%2C2.5100736377960455&navigate=yes&zoom=17`

  return (
    <>
    {settingsData &&(
      <div className='pt-8 pb-16 w-full gap-16 flex flex-col items-center justify-center'>
        <div className='w-4/5 md:w-full flex items-center justify-center'>
          <div className='flex flex-col md:flex-row gap-16 md:w-2/3 w-full items-center justify-center h-full'>
            <section className='md:w-1/2 h-full rounded-md p-6 bg-background-opacity w-full'>
              <h2 className='title flex gap-4 items-center justify-center'>
                <TimeSvg className='text-highlight w-8 h-8' />
              Horaires</h2>
              <ul className='flex flex-col gap-4' >
                <li className='flex justify-start w-full'>
                  <p className='font-bold text-highlight w-1/2 text-center'>Lundi : </p>
                  <p className='w-1/2 text-center'>{settingsData.monday}</p>
                </li>
                <li className='flex justify-start w-full'>
                  <p className='font-bold text-highlight w-1/2 text-center'>Mardi : </p>
                  <p className='w-1/2 text-center'>{settingsData.tuesday}</p>
                </li>
                <li className='flex justify-start w-full'>
                  <p className='font-bold text-highlight w-1/2 text-center'>Mercredi : </p>
                  <p className='w-1/2 text-center'>{settingsData.wednesday}</p>
                </li>
                <li className='flex justify-start w-full'>
                  <p className='font-bold text-highlight w-1/2 text-center'>Jeudi : </p>
                  <p className='w-1/2 text-center'>{settingsData.thursday}</p>
                </li>
                <li className='flex justify-start w-full'>
                  <p className='font-bold text-highlight w-1/2 text-center'>Vendredi : </p>
                  <p className='w-1/2 text-center'>{settingsData.friday}</p>
                </li>
                <li className='flex justify-start w-full'>
                  <p className='font-bold text-highlight w-1/2 text-center'>Samedi : </p>
                  <p className='w-1/2 text-center'>{settingsData.saturday}</p>
                </li>
                <li className='flex justify-start w-full'>
                  <p className='font-bold text-highlight w-1/2 text-center'>Dimanche : </p>
                  <p className='w-1/2 text-center'>{settingsData.sunday}</p>
                </li>
              </ul>
            </section>
            <section className='md:w-1/2 w-full h-full rounded-md p-6 bg-background-opacity text-center'>
              <h2 className='title flex gap-4 items-center justify-center'>
                <LocationPinSvg className='text-highlight w-8 h-8' />
                 Adresse</h2>
              <div className='flex flex-col gap-4'>
                <p>{settingsData.garage_name}</p>
                <p>{settingsData.address}</p>
                <p> {settingsData.zip_code} {settingsData.city}</p>
                <h2 className='title flex gap-4 items-center justify-center'>
                  <PhoneSvg className='text-highlight w-8 h-8' /> Téléphone</h2>
                <p>Fixe : {settingsData.landline_phone}</p>
                <p>Portable : {settingsData.cell_phone}</p>
              </div>
            </section>
          </div>
        </div>
        <div className='md:w-2/3 lg:w-1/2 w-4/5 p-8 flex flex-col items-center gap-8 rounded-md bg-background-opacity'>
          <div className='flex items-center justify-center w-full gap-4'>
            <FindSvg className='h-16 w-16 fill-hover'/>
            <h2 className='title mb-0'>Plan</h2>
          </div>
          <Map settings={settingsData}/>

          <h2 className='font-bold text-lg'>Itinéraire</h2>
          <Link href={wazeLink} target='_blank' className=' rounded-lg'>
            <Image
              src={waze}
              alt="Waze logo"
              className='w-[140px] hover:scale-105 transition-transform cursor-pointer'
              />
          </Link>
        </div>
      </div>
    )}
    </>
  )
}

export default page