import dayjs from 'dayjs';
import conversionDayOfWeek, {dayOfWeekNumber} from './conversionDayOfWeek';

const conversionDateTime = (datetime: string): string => {
  //argument datetime: 2022-02-19T00:00:00.000Z[Etc/UTC]
  const formattedDayJs = dayjs(datetime.substring(0, 10)).format("d") as dayOfWeekNumber;
  const dayOfWeek = conversionDayOfWeek(formattedDayJs);

  //returned datetime: 2022/02/19(土) 00:00:00.000
  return `${datetime.substring(0, 4)}/${datetime.substring(5, 7)}/${datetime.substring(8, 10)}(${dayOfWeek}) ${datetime.substring(11, 13)}:${datetime.substring(14, 16)}:${datetime.substring(17, 19)}.${datetime.substring(20, 23)}`.replace('Z', '0');
};

export default conversionDateTime;
