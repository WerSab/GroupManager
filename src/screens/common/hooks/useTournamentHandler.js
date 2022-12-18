export const useTournamentHandler = tournament => {
  const [nameInput, setNameInput] = useState(tournament?.name ?? '');
  const [placeInput, setPlaceInput] = useState(tournament?.place ?? '');
  const [linkInput, setLinkInput] = useState(tournament?.link ?? '');
  const [tournamentCategoryInput, setTournamentCategoryInput] = useState(
    tournament?.category ?? '',
  );
  const [startDateInput, setStartDate] = useState(
    tournament?.startDate ?? new Date(),
  );
  const [endDateInput, setEndDate] = useState(
    tournament?.endDate ?? new Date(),
  );
  const [error, setError] = useState();

  const inputs = {
    name: [nameInput, setNameInput],
    place: [placeInput],
    link: [linkInput],
    category: [tournamentCategoryInput],
  };

  const onConfirm = () => {
    const tournament = {
      name: nameInput, //itd.
    };
    //parsowanie wartości z tournament

    validateTournament();

    // walidowac inputy
    //
  };

  const clearInputs = () => {};

  return {inputs, onConfirm, clearInputs};
};
