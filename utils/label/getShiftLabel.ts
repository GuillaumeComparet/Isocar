import { AppointmentShift } from "@prisma/client";

export default function getShiftLabel(shift: AppointmentShift){
    switch (shift) {
      case 'Morning':
        return 'Matin';
      case 'Afternoon':
        return 'Après-midi';
      case 'Fullday':
        return 'Toute la journée';
      default:
        return '';
    }
  };