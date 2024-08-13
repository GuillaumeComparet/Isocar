import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDay, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { registerLocale } from "react-datepicker";
import handleDisableDay from "./_actions/handleDisableDay";
import handleEnableDay from "./_actions/handleEnableDay";
import UpdateButton from "./(modal)/UpdateButton";
import extractDate from "@/utils/extractDate"
import { toast } from "sonner";
import OnClickButton from "@/components/OnClickButton";
import getShiftLabel from "@/utils/label/getShiftLabel";

type Props = {
  appointmentsReserved: any[];
  planningData: any[];
  limitShift: number;
};

registerLocale("fr", fr);

const Calendar = ({ appointmentsReserved, planningData, limitShift }: Props) => {
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fullDay, setFullDay] = useState<string[]>([]);
  const [reservedDay, setReservedDay] = useState<string[]>([]);
  const [appointmentData, setAppointmentData] = useState<any[]>([]);
  const [maxShift, setMaxShift] = useState(limitShift);

  const localDateString = extractDate(selectedDate);
  const date = new Date(localDateString);
  const dateFr = date.toLocaleDateString('fr-FR');

  useEffect(() => {
    // Extract full day and reserved day from planningData
    const fullDayDates = planningData
      .filter(day => day.afternoon >= day.maxShift && day.morning >= day.maxShift)
      .map(day => {
        const date = new Date(day.daydate);
        return extractDate(date);
      });

    setFullDay(fullDayDates);

    const reservedDates = planningData
    .filter(day => (day.afternoon > 0 && day.afternoon < day.maxShift) || (day.morning > 0 && day.morning < day.maxShift))
    .map(day => {
      const date = new Date(day.daydate);
      return extractDate(date);
    });

    setReservedDay(reservedDates);

  }, [planningData]);

  useEffect(() => {
    // Extract appointment data from selected date and set maxShift of the selectedDay
    const selectedDay = planningData.find((day) => {
      const date = new Date(day.daydate);
      return date.toISOString().split("T")[0] === selectedDate.toISOString().split("T")[0];
    });
    
    if (selectedDay) {
      setMaxShift(selectedDay.maxShift);
    } else {
      setMaxShift(limitShift);
    }
  }, [selectedDate, planningData, limitShift]);

  const isWeekday = (date:Date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  const disableDay = async () => {
    const response = await handleDisableDay(selectedDate);
    if (response.status === "error") {
      toast.error(response.message);
    } else if (response.status === "success") {
      toast.success(response.message);
    }
  };

  const enableDay = async () => {
    const response = await handleEnableDay(selectedDate, limitShift);
    if (response.status === "error") {
      toast.error(response.message);
    } else if (response.status === "success") {
      toast.success(response.message);
    }
  };

  const handleChangeOnDate = (date:Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(date)
    setAppointmentData(appointmentsReserved.filter((appointment) => {
      return appointment.planning.daydate.toISOString().split("T")[0] === formattedDate
    }));
  }

  return (
    <div  className='flex flex-col items-center justify-center text-lg'>
      <DatePicker
        selected={selectedDate}
        onChange={handleChangeOnDate}
        shouldCloseOnSelect={false}
        minDate={subDays(new Date(), 8)}
        maxDate={subDays(new Date(), -120)}
        filterDate={isWeekday}
        locale="fr"
        dayClassName={(date: Date) => {
          const formattedDate = extractDate(date);
          if (fullDay.includes(formattedDate)) {
            return "fullDay";
          } else if (reservedDay.includes(formattedDate)) {
            return "reserved";
          } else {
            return "";
          }
        }}
        inline
        dateFormat="MMMM d, yyyy"
      />
      {appointmentData.length > 0 ? (
          <div>
            <h2 className="title">Rendez-vous du {localDateString} :</h2>
            <table>
              <thead>
                <tr>
                  <th>Créneau</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Téléphone</th>
                  <th>Marque</th>
                  <th>Modèle</th>
                  <th>Plaque</th>
                  <th>Services</th>
                </tr>
              </thead>
              <tbody>
                {appointmentData.map((appointment: any) => (
                  <tr key={appointment.id_appointment}>
                    <td>{getShiftLabel(appointment.shift)}</td>
                    <td>{appointment.profile.first_name}</td>
                    <td>{appointment.profile.last_name}</td>
                    <td>{appointment.profile.phone_number}</td>
                    <td>{appointment.car.brand}</td>
                    <td>{appointment.car.model}</td>
                    <td>{appointment.car.plate}</td>
                    <td>
                      <ul>
                      {appointment.services.map((service: any) => (
                        <li key={service.service.id_service}>{service.service.name}</li>
                      ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
       : (
          <h2 className="title my-4">Aucun rendez-vous pour le {dateFr}</h2>
      )}
        <h3 className="text-xl font-bold mb-4">Rendre la journée :</h3>
      <div className="flex gap-4">
        <OnClickButton handleSubmit={disableDay} buttonText="Indisponible" className="btn w-full" />
       
        <OnClickButton handleSubmit={enableDay} buttonText="Disponible" className="btn w-full" />
      </div>
      <p className="my-4">Nombre de créneau par demi-journée : {maxShift}</p>
      <UpdateButton date={localDateString} maxShift={maxShift} />
    </div>
  );
};

export default Calendar;
