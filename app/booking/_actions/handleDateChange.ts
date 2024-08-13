import { PlanningDate } from '@/utils/types/globals';
import { AppointmentShift } from '@prisma/client';
import extractDate from '@/utils/extractDate';

type Availability = {
    morning: number;
    afternoon: number;
    maxShift: number;
};

const handleDateChange = (
    date: Date,
    setSelectedDate: (date: Date | null) => void,
    setAvailability: (availability: Availability) => void,
    planningDates: PlanningDate[],
    setShift: (shift: AppointmentShift | null) => void
  ): void => {
    setSelectedDate(date);
    setShift(null);
    
    const selectedDateString = extractDate(date)

    // Find the planning date that matches the selected date
    const selectedPlanning = planningDates.find(planningDate => {
        const planningDateString = new Date(planningDate.daydate).toISOString().split('T')[0];
        return planningDateString === selectedDateString;
    });

    // Set the availability based on the selected planning date
    if (selectedPlanning) {
        setAvailability({
            morning: selectedPlanning.morning,
            afternoon: selectedPlanning.afternoon,
            maxShift: selectedPlanning.maxShift,
        });
    } else {
        setAvailability({ morning: 0, afternoon: 0, maxShift: 2 });
    }
};

export default handleDateChange;
