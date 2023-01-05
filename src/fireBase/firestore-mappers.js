import {getDateFromTimestamp} from './firestore-helpers';

export const mapFirestoreTournament = tournament => {
  return {
    startDate: getDateFromTimestamp(tournament.startDate),
    endDate: getDateFromTimestamp(tournament.endDate),
    link: tournament.link,
    name: tournament.name,
    place: tournament.place,
    tournamentCategory: tournament.tournamentCategory,
  };
};
