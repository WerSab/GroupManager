
export function getTournamentFromContext(context, tournamentId) {
    const [tournamentList] = context;
    return tournamentList.find(function (tournament) {
        return tournament.id === tournamentId;
    });
};
