import { PlanningDate } from '@/utils/types/globals';

type SetBanDates = (banned: string[]) => void;

const calculateBanDates = (setBanDates: SetBanDates, planningDates: PlanningDate[], totalWorkTime: number): void => {

  const banned: string[] = planningDates.reduce((acc: string[], { daydate, morning, afternoon, maxShift }: PlanningDate) => {
    if (!daydate) {
      console.warn("Missing daydate:", { daydate, morning, afternoon });
      return acc;
    }

    const formattedDate: string = new Date(daydate).toISOString().split('T')[0];

    if (morning >= maxShift && afternoon >= maxShift) {
      acc.push(formattedDate);
    } else {
      if (totalWorkTime > 180 && (morning >= maxShift || afternoon >= maxShift)) {
        acc.push(formattedDate);
      }
    }
    return acc;
  }, []);

  setBanDates(banned);
};

export default calculateBanDates;
