import {convertMilisToReadabletime} from '../../common/date-time-methods';
import {getDateFromTimestamp} from '../../firebase/firestore-helpers';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getEventDuration = (tournament, format) => {
  const start = dayjs(tournament.startDate);
  const end = dayjs(tournament.endDate);
  const duration = dayjs.duration(end.diff(start));
  return duration.format(format);
};

export const getFormattedDiff = (_start, _end, format) => {
  const start = dayjs(_start);
  const end = dayjs(_end);
  const duration = dayjs.duration(end.diff(start));
  return duration.format(format);
};
