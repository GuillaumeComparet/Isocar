import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';
import getUserCars from '../_actions/getUserCars';

async function CarsList() {

 const {cars, error} = await getUserCars()

 if(error){
  return(
    <div>
      <h1>Une erreur s'est produite lors du chargement de vos véhicules</h1>
    </div>
  )
 }

  return (
    <div>
        <ul className='flex flex-col md:flex-row gap-8'>
            {cars && cars.length >= 1 && cars.map((car) => (
              <li className='rounded-md p-6 flex flex-col gap-2 bg-background-opacity' key={car.id_car}>
                <p><span className='font-bold text-highlight'>Marque : </span>{car.brand}</p>
                <p><span className='font-bold text-highlight'>Modèle : </span>{car.model}</p>
                <p><span className='font-bold text-highlight'>Immatriculation : </span>{car.plate}</p>
                <div className="py-4 grid gap-4">
                  <UpdateButton car={car}/>
                  <DeleteButton car={car}/>
                </div>     
              </li>
            ))}
          </ul>
          {cars && cars.length === 0 && (
            <h1 className='mb-4 text-xl font-bold text-center'>Vous n'avez pas encore ajouté de véhicules</h1>
          )}
    </div>
  )
}

export default CarsList