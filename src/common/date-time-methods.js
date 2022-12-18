import {getEventDuration} from '../screens/common/tournament-methods';
import dayjs from 'dayjs';

export const convertMilisToReadabletime = millis => {
  const hours = Math.floor(millis / 1000 / 60 / 60);
  const minutes = Math.floor((millis / 1000 / 60 / 60 - hours) * 60);
  return {hours, minutes};
};

export const EVENT_DURATION_FORMAT = 'HH:mm';

export const parseEventDurationTime = tournament => {
  const eventDuration = getEventDuration(tournament, EVENT_DURATION_FORMAT);
  const [hours, minutes] = eventDuration.split(':');
  return `${hours} godzin, ${minutes} minut`;
};

export const formatDate = (date, formatPattern) => {
  return dayjs(date).format(formatPattern);
};
