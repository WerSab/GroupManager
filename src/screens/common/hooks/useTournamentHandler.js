import {useState} from 'react';
import {validateTournament} from '../../../firebase/firestore-model-validators';

export const useTournamentHandler = tournament => {
  const [nameInput, setNameInput] = useState(tournament?.name ?? '');
  const [placeInput, setPlaceInput] = useState(tournament?.place ?? '');
  const [slotsInput, setSlotsInput] = useState(tournament?.slots ?? '');
  const [linkInput, setLinkInput] = useState(tournament?.link ?? '');
  const [urlInput, setUrlInput] = useState(tournament?.url ?? '');
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
    slots: [slotsInput, setSlotsInput],
    link: [linkInput, setLinkInput],
    url: [urlInput, setUrlInput],
    category: [tournamentCategoryInput, setTournamentCategoryInput],
    startDate: [startDateInput, setStartDateInput],
    endDate: [endDateInput, setEndDateInput],
    validationError,
  };

  const onConfirm = () => {
    const tournament = {
      name: nameInput,
      place: placeInput,
      slots: slotsInput,
      link: linkInput,
      url: urlInput,
      category: tournamentCategoryInput,
      startDate: startDateInput,
      endDate: endDateInput,
    };
    try {
      validateTournament(tournament);
    } catch (error) {
      console.log('catch.validate:', error, typeof error);
      const {field, message} = error;
      throw {
        field,
        message,
      };
      //setValidationError({field, message});
    }

    return tournament;
  };

  const clearInputs = () => {
    setNameInput('');
    setPlaceInput('');
    setSlotsInput('');
    setLinkInput('');
    setUrlInput('');
    setTournamentCategoryInput('');
    setStartDateInput(new Date());
    setEndDateInput(new Date());
    // do zastanowienia sie
    setValidationError(undefined);
  };

  return {inputs, onConfirm, clearInputs};
};
