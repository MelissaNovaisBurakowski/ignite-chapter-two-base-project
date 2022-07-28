import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

export const compareInHours = (startDate: Date, endDate: Date): number => {
  const startDateUTC = dayjs(startDate).utc().local().format();
  const endDateUTC = dayjs(endDate).utc().local().format();
  return dayjs(startDateUTC).diff(endDateUTC);
};

export const getDateNow = (): Date => {
  return dayjs().toDate();
};
