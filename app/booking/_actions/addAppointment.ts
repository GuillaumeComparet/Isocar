"use server"
import { AppointmentShift } from "@prisma/client";
import prisma from "@/utils/prisma";
import { Service, Car, AppointmentServiceData, Planning } from "@/utils/types/globals";
import { getPlanningByDayDate, createPlanning, updateUniqueShiftById, updateBothShiftById } from "@/data-access/planning";
import { createAppointment } from "@/data-access/appointment";
import { createAppointments } from "@/data-access/appointmentHasService"
import isAuth from "@/utils/auth/isAuth";
import { sendEmail } from "@/utils/sendGrid";
import getShiftLabel from "@/utils/label/getShiftLabel";
import testSchemaServer from "@/utils/zodSchema/testSchemaServer";
import { CarSchema, commentSchema, ServiceSchema, ShiftSchema } from "@/utils/zodSchema/globals";

import extractDate from "@/utils/extractDate";
import { parseISO, format } from 'date-fns';
import getDefaultShift from "@/data-access/settings";
import { getGarageMail } from "@/data-access/settings";

export default async function addAppointment(selectedCar: Car, services: Service[], appointmentDate: Date, shift: AppointmentShift, comment: string | null ) {
    "use server";

    const servicesList = services.map(service => `<li>${service.name}</li>`).join('');
  
    const user = await isAuth();
    const selectedDateString = extractDate(appointmentDate);

    function formatToFrenchDate(isoDateString: string) {
      const date = parseISO(isoDateString);
      return format(date, 'dd/MM/yyyy');
    }

    const frenchDateString = formatToFrenchDate(selectedDateString);
    

    const mailDate = appointmentDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  });

    testSchemaServer(CarSchema, selectedCar)
    testSchemaServer(ServiceSchema, services)
    testSchemaServer(ShiftSchema, shift)
    if(comment){
    testSchemaServer(commentSchema, comment)
    }

    try {
      await prisma.$transaction(async () => {
      let planning: Planning | null = await getPlanningByDayDate(new Date(selectedDateString));
      if (!planning) {
        const defaultMaxShift = await getDefaultShift();
        if(!defaultMaxShift){
          throw new Error("Error with maxShift")
        }
          planning = await createPlanning(new Date(selectedDateString), defaultMaxShift.limitShift);
        
      }

      if (shift === AppointmentShift.Morning || shift === AppointmentShift.Afternoon) {
        await updateUniqueShiftById(shift.toLowerCase(), planning!.id_planning);
      } else {
        await updateBothShiftById(planning!.id_planning);
      }
      
        
        const createdAppointment = await createAppointment(user.id, selectedCar.id_car, planning!.id_planning, shift, comment);

        const appointmentServiceData: AppointmentServiceData[] = services.map((service: { id_service: number }) => ({
          id_appointment: createdAppointment.id_appointment,
          id_service: service.id_service,
        }));

        await createAppointments(appointmentServiceData);
      });


      try {
        const garageMail = await getGarageMail();
        await sendEmail({
          to: garageMail,
          subject: 'Nouveau rendez vous client',
          text: `Nouveau rendez-vous client enregistré en ligne`,
          html: `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Nouveau rendez-vous client</title>
          </head>
          <body style="margin: 0; padding: 100px; height:1000px; background-color: #dad8d8; font-family: Arial, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #dad8d8;">
                  <tr>
                      <td align="center" style="padding: 20px 0;">
                          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                              <tr>
                                  <td align="center" style="font-family: Arial, sans-serif; color: #333;">
                                      <h1 style="color: #007bff;">Nouveau rendez-vous en ligne</h1>
                                      <br />
                                      <h2 style="color: #007bff;">Contact client :</h2>
                                      <ul style="list-style-type: none; padding-left: 0;">
                                          <li>${user.user_metadata.first_name} ${user.user_metadata.last_name}</li>
                                          <li>Email : ${user.email}</li>
                                          <li>Numéro de téléphone : ${user.user_metadata.phone_number}</li>
                                      </ul>
                                      <br />
                                      <h2 style="color: #007bff;">Véhicule du client :</h2>
                                      <ul style="list-style-type: none; padding-left: 0;">
                                          <li>Marque : ${selectedCar.brand}</li>
                                          <li>Modèle : ${selectedCar.model}</li>
                                          <li>Immatriculation : ${selectedCar.plate}</li>
                                      </ul>
                                      <br />
                                      <h2 style="color: #007bff;">Informations du rendez-vous</h2>
                                      <p>Date : ${frenchDateString}</p>
                                      <p>Créneau sélectionné : ${getShiftLabel(shift)}</p>
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

      return { success: true };
    } catch (error) {
      console.error("Error creating appointment and adding services:", error);
      throw new Error("Error creating appointment and adding services");
    }
  };