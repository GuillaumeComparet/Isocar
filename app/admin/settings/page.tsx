import UpdateButton from "./(modal)/UdpateButton"
import getSettingsData from "./_actions/getData"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Paramètres',
  description: 'Page de gestion des paramètres du garage',
};

export default async function SettingsPage() {

  const settings = await getSettingsData()

  return (
    <div className="pt-8 pb-16 text-lg grid gap-4">
      <h2 className="title">Paramétrage de votre garage</h2>
      <div>
        <h3 className="title">Horaires</h3>
        <p>Lundi : {settings?.monday}</p>
        <p>Mardi : {settings?.tuesday}</p>
        <p>Mercredi : {settings?.wednesday}</p>
        <p>Jeudi : {settings?.thursday}</p>
        <p>Vendredi : {settings?.friday}</p>
        <p>Samedi : {settings?.saturday}</p>
        <p>Dimanche : {settings?.sunday}</p>
      </div>
      <div>
        <h3 className="title">Adresse</h3>
        <p>Nom du garage : {settings?.garage_name}</p>
        <p>Addresse : {settings?.address}</p>
        <p>Code postal : {settings?.zip_code}</p>
        <p>Ville : {settings?.city}</p>
        <p>Coordonnées GPS sur X : {settings?.coordonate_x}</p>
        <p>Coordonnées GPS sur Y : {settings?.coordonate_y}</p>
      </div>
      <div>
        <h3 className="title">Numéro de téléphone</h3>
        <p>Fixe : {settings?.landline_phone}</p>
        <p>Portable : {settings?.cell_phone}</p>
      </div>
      <div>
        <h3 className="title">Paramètres de l'application :</h3>
        <p>Email : {settings?.email}</p>
        <p>Nombre de créneau par demi-journée par défaut : {settings?.limitShift}</p>
      </div>
      {settings && <UpdateButton settings={settings} />}
      
    </div>
  )
}
