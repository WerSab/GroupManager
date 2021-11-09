
import React, {useState} from 'react';
import { getTournaments } from '../tournaments-examples'; 

export function useTournaments(){
const [tournamentList, setTournamentList]=useState();
const [isLoaded, setisLoaded]=useState(false);
const [error, setError]=useState();

// Sprobowac uzyc useEffect hook'a w celu zaciagniecia turniejow 
// i zwrocic z funkcji tablice ze stanami  
};