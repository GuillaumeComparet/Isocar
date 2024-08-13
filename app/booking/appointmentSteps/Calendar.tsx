import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import handleDateChange from '../_actions/handleDateChange';
import { getDay, subDays, addDays } from 'date-fns';
import { PlanningDate, Service } from '@/utils/types/globals';
import calculateBanDates from '../_actions/calculateBanDates';
import { AppointmentShift } from '@prisma/client';
import ShiftSelector from '../ShiftSelector';
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale'
import { registerLocale } from 'react-datepicker';
import "./style.css";


type Props = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  planningDates: PlanningDate[];
  serviceSelected: Service[];
  selectedShift: AppointmentShift | null;
  setSelectedShift: React.Dispatch<React.SetStateAction<AppointmentShift | null>>;
};
registerLocale('fr', fr);

const Calendar = ({selectedDate, setSelectedDate, planningDates, serviceSelected, selectedShift, setSelectedShift}: Props) => {

  const [availability, setAvailability] = useState({ morning: 0, afternoon: 0, maxShift: 2 });
  const [banDates, setBanDates] = useState<string[]>([]);
  const [workTime, setWorkTime] = useState(0);

  useEffect(() => {
    const totalWorktime = serviceSelected.reduce((total, service) => total + service.worktime, 0);
    calculateBanDates(setBanDates, planningDates, totalWorktime);

    setWorkTime(totalWorktime);  
  }, [serviceSelected]);

  

    const isWeekday = (date: Date): boolean => {
        const day: number = getDay(date);
        return day !== 0 && day !== 6;
        };
  
      const convertedBanDates = banDates.map((dateString) => new Date(dateString));

  return (
    <>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => handleDateChange(date as Date, setSelectedDate, setAvailability, planningDates, setSelectedShift)}
          shouldCloseOnSelect={false}
          minDate={subDays(new Date(), -2)}
          maxDate={subDays(new Date(), -120)}
          filterDate={isWeekday}
          locale="fr"
          excludeDates={convertedBanDates}
          inline
          dateFormat="MMMM d, yyyy"
        />
        {selectedDate && <ShiftSelector selectedShift={selectedShift} setSelectedShift={setSelectedShift} availability={availability} worktime={workTime}/>}

    </>
  )
}

export default Calendar