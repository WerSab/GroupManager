import {useState} from 'react';
import {validateTournament} from '../../../firebase/firestore-model-validators';

export const useTournamentHandler = tournament => {
  const [nameInput, setNameInput] = useState(tournament?.name ?? '');
  const [placeInput, setPlaceInput] = useState(tournament?.place ?? '');
  const [linkInput, setLinkInput] = useState(tournament?.link ?? '');
  const [tournamentCategoryInput, setTournamentCategoryInput] = useState(
    tournament?.category ?? '',
  );
  const [startDateInput, setStartDateInput] = useState(
    tournament?.startDate ?? new Date(),
  );
  const [endDateInput, setEndDateInput] = useState(
    tournament?.endDate ?? new Date(),
  );
  const [validationError, setValidationError] = useState();
  const [error, setError] = useState();

  const inputs = {
    name: [nameInput, setNameInput],
    place: [placeInput, setPlaceInput],
    link: [linkInput, setLinkInput],
    category: [tournamentCategoryInput, setTournamentCategoryInput],
    startDate: [startDateInput, setStartDateInput],
    endDate: [endDateInput, setEndDateInput],
    validationError,
  };

  const onConfirm = () => {
    const tournament = {
      name: nameInput,
      place: placeInput,
      link: linkInput,
      category: tournamentCategoryInput,
      startDate: startDateInput,
      endDate: endDateInput,
    };
    try {
      validateTournament(tournament);
    } catch (error) {
      console.log('catch.validate:', error, typeof error);
      const {field, message} = error;
      setValidationError({field, message});
    }

    return tournament;
  };

  const clearInputs = () => {
    setNameInput('');
    setPlaceInput('');
    setLinkInput('');
    setTournamentCategoryInput('');
    setStartDate(new Date());
    setEndDate(new Date());
    // do zastanowienia sie
    setValidationError(undefined);
  };

  return {inputs, onConfirm, clearInputs};
};
