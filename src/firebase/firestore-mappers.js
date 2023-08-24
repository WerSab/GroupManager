import {getDateFromTimestamp} from './firestore-helpers';

export const mapFirestoreTournament = tournament => {
  return {
    startDate: getDateFromTimestamp(tournament.startDate),
    endDate: getDateFromTimestamp(tournament.endDate),
    link: tournament.link,
    url: tournament.url,
    name: tournament.name,
    place: tournament.place,
    slots: tournament.slots,
    category: tournament.category,
  };
};
