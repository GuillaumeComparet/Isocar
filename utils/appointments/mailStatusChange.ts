import { Car, Client, Planning, Service } from "@/utils/types/globals";
import getShiftLabel from "../label/getShiftLabel";
import { sendEmail } from "../sendGrid";
import { AppointmentShift } from "@prisma/client";
import mailHeader from "@/utils/mailHeader";
import { getGarageMail } from "@/data-access/settings";

type AppointMail ={
    planning: Planning;
    id_planning: number;
    car: Car;
    services: {
      service: Service;
    }[]
    id_appointment: number;
    shift: AppointmentShift;
    status: string;
    profile: Client;
}

export default async function mailStatusChange(updatedAppointment: AppointMail){
    try {
      const servicesList = updatedAppointment.services.map(service => `<li>${service.service.name}</li>`).join('');
      const garageMail = await getGarageMail();

    const formattedDate = updatedAppointment.planning.daydate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const header = await mailHeader();
    
    if(updatedAppointment.status === "Validated"){
        try {
            await sendEmail({
              to: updatedAppointment.profile.email,
              subject: 'Le garage a validé votre rendez-vous',
              text: `Le garage a validé votre rendez-vous`,
              html: `
              <!DOCTYPE html>
              <html lang="fr">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Validation de rendez-vous</title>
              </head>
              <body style="margin: 0; padding: 100px; height:1000px; background-color: #dad8d8; font-family: Arial, sans-serif;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #dad8d8;">
                      <tr>
                          <td align="center" style="padding: 20px 0;">
                              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                  <tr>
                                      <td align="center" style="font-family: Arial, sans-serif; color: #333;">
                                          ${header}
                                          <h1 style="color: #15803d;">Le garage a validé votre rendez-vous</h1>
                                          <br />
                                          <h2 style="color: #007bff;">Informations du rendez-vous</h2>
                                          <p>Date : ${formattedDate}</p>
                                          <p>Créneau sélectionné : ${getShiftLabel(updatedAppointment.shift)}</p>
                                          <p>Services sélectionnés :</p>
                                          <ul style="list-style-type: none; padding-left: 0;">
                                              ${servicesList}
                                          </ul>
                                          <br />
                                          <h2 style="color: #007bff;">Véhicule sélectionné :</h2>
                                          <ul style="list-style-type: none; padding-left: 0;">
                                              <li>Marque : ${updatedAppointment.car.brand}</li>
                                              <li>Modèle : ${updatedAppointment.car.model}</li>
                                              <li>Immatriculation : ${updatedAppointment.car.plate}</li>
                                          </ul>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </body>
              </html>
            `,
            });
          } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
          }
    }

    if(updatedAppointment.status === "Canceled" && garageMail){
        try {
            await sendEmail({
              to: garageMail,
              subject: 'Un client a annulé son rendez-vous',
              text: `Un client a annulé son rendez-vous`,
              html: `
              <!DOCTYPE html>
              <html lang="fr">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Annulation de rendez-vous</title>
              </head>
              <body style="margin: 0; padding: 100px; height:1000px; background-color: #dad8d8; font-family: Arial, sans-serif;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #dad8d8;">
                      <tr>
                          <td align="center" style="padding: 20px 0;">
                              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                  <tr>
                                      <td align="center" style="font-family: Arial, sans-serif; color: #333;">
                                          <h1 style="color: #007bff;">Le client a annulé son rendez-vous</h1>
                                          <br />
                                          <h2 style="color: #007bff;">Contact client :</h2>
                                          <ul style="list-style-type: none; padding-left: 0;">
                                              <li>${updatedAppointment.profile.first_name} ${updatedAppointment.profile.last_name}</li>
                                              <li>Email : ${updatedAppointment.profile.email}</li>
                                              <li>Numéro de téléphone : ${updatedAppointment.profile.phone_number}</li>
                                          </ul>
                                          <br />
                                          <h2 style="color: #007bff;">Véhicule du client :</h2>
                                          <ul style="list-style-type: none; padding-left: 0;">
                                              <li>Marque : ${updatedAppointment.car.brand}</li>
                                              <li>Modèle : ${updatedAppointment.car.model}</li>
                                              <li>Immatriculation : ${updatedAppointment.car.plate}</li>
                                          </ul>
                                          <br />
                                          <h2 style="color: #007bff;">Informations du rendez-vous</h2>
                                          <p>Date : ${formattedDate}</p>
                                          <p>Créneau sélectionné : ${getShiftLabel(updatedAppointment.shift)}</p>
                                          <p>Services sélectionnés :</p>
                                          <ul style="list-style-type: none; padding-left: 0;">
                                              ${servicesList}
                                          </ul>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </body>
              </html>
            `,
            });
          } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
          }
    }

    if(updatedAppointment.status === "Refused"){
        try {
            await sendEmail({
              to: updatedAppointment.profile.email,
              subject: 'Le garage a refusé votre rendez-vous',
              text: `Le garage a refusé votre rendez-vous`,
              html: `
              <!DOCTYPE html>
              <html lang="fr">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Refus de rendez-vous</title>
              </head>
              <body style="margin: 0; padding: 100px; height:1000px; background-color: #dad8d8; font-family: Arial, sans-serif;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #dad8d8;">
                      <tr>
                          <td align="center" style="padding: 20px 0;">
                              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                  <tr>
                                      <td align="center" style="font-family: Arial, sans-serif; color: #333;">
                                          ${header}
                                          <h1 style="color: #b91c1c;">Le garage a refusé votre rendez-vous</h1>
                                          <p>Le garage vous contactera prochainement pour vous fournir plus d'informations</p>
                                          <br />
                                          <h2 style="color: #007bff;">Informations du rendez-vous</h2>
                                          <p>Date : ${formattedDate}</p>
                                          <p>Créneau sélectionné : ${getShiftLabel(updatedAppointment.shift)}</p>
                                          <p>Services sélectionnés :</p>
                                          <ul style="list-style-type: none; padding-left: 0;">
                                              ${servicesList}
                                          </ul>
                                          <br />
                                          <h2 style="color: #007bff;">Véhicule sélectionné :</h2>
                                          <ul style="list-style-type: none; padding-left: 0;">
                                              <li>Marque : ${updatedAppointment.car.brand}</li>
                                              <li>Modèle : ${updatedAppointment.car.model}</li>
                                              <li>Immatriculation : ${updatedAppointment.car.plate}</li>
                                          </ul>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </body>
              </html>
            `,
            });
          } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
          }
    }
    } catch (error) {
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }
    
}