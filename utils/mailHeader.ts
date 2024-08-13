"use server"

import { getSettings } from "@/data-access/settings";

export default async function mailHeader(){
  const settings = await getSettings();

   return `
  <div style="text-align: center;">
    <h1 style="color: #007bff;">${settings?.garage_name}</h1>
    <div style="display: table; margin: 0 auto; padding: 20px;">
      <div style="display: table-cell; text-align: left; padding-right: 20px;">
        <h3 style="color: #333;">Adresse</h3>
        <p style="color: #333;">${settings?.garage_name}</p>
        <p style="color: #333;">${settings?.address}</p>
        <p style="color: #333;">${settings?.zip_code} ${settings?.city}</p>
        <br/>
        <h3 style="color: #333;">Téléphone :</h3>
        <p style="color: #333;">Fixe : ${settings?.landline_phone || "Non défini"}</p>
        <p style="color: #333;">Portable : ${settings?.cell_phone || "Non défini"}</p>
      </div>
      <div style="display: table-cell; text-align: left; padding-left: 20px;">
        <h3 style="color: #333;">Horaires</h3>
        <ul style="list-style-type: none; padding-left: 0;">
          <li style="color: #333;">Lundi : ${settings?.monday}</li>
          <li style="color: #333;">Mardi : ${settings?.tuesday}</li>
          <li style="color: #333;">Mercredi : ${settings?.wednesday}</li>
          <li style="color: #333;">Jeudi : ${settings?.thursday}</li>
          <li style="color: #333;">Vendredi : ${settings?.friday}</li>
          <li style="color: #333;">Samedi : ${settings?.saturday}</li>
          <li style="color: #333;">Dimanche : ${settings?.sunday}</li>
        </ul>
      </div>
    </div>
  </div>
  `;
};
