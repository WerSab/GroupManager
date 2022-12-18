import {convertMilisToReadabletime} from '../../common/date-time-methods';
import {getDateFromTimestamp} from '../../fireBase/firestore-Helper';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getEventDuration = (tournament, format) => {
  const start = dayjs(getDateFromTimestamp(tournament.startDate));
  const end = dayjs(getDateFromTimestamp(tournament.endDate));
  const duration = dayjs.duration(end.diff(start));
  return duration.format(format);
};
