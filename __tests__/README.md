a) branch per funkcjonalnosc
b) commit per fix
c) branch tworzymy lokalnie wychodzac z maina: git checkout -b feature/xyz
d) push na nowo stworzony lokalnie branch:
git push -u origin <branch>
https://stackoverflow.com/questions/2765421/how-do-i-push-a-new-local-branch-to-a-remote-git-repository-and-track-it-too

commity pushować na nowego brancha, tworzyć pull request i wysłać link do pull request na maila.

1. Funkcjonalność rejestracji:
   1.1. Do zmiany ekran rejestracji(style)
   1.2. Nieprawidłowe działanie po wciśnięciu rejestruj bez podania danych
   1.3. Po kliknięciu zarejestruj=> czyszczą się inputy i nadal można nacisnąć zarejestruj co powoduje crash
   1.4. Walidacja inputów (mail i haslo)+ ograniczenie ilości znaków
   1.5. Zbędne czyszczenie inputów po kliknieciu zarejestruj
   1.6. Weryfikacja zachowania aplikacji po wciśnięciu zarejestruj w trakcie trwania pierwszej rejestracj
   1.7. Usuwanie konta użytkownika
2. Ekran główny/inicjalizacja aplikacji dla zalogowanego usera(player)  
    2.1. Brakujący indeks dla metody getUserOrders
   FLOW poprawek:
   2.3. tester testuje funkcjonalnosc
   2.4. tester znajduje blad
   2.5. tester zglasza blad (JIRA, TRELLO)
   2.6. zgloszenia maja swoje numerki

3. TournamentScreen
   3.1 Sortowanie wydarzeń:
   3.1.1 po dacie założenia,
   3.1.2 po dacie eventu
   3.1.3 alfabetycznie
   3.2. Stworzenie archiwum
   3.2.1 - Automatyczna archiwizacja 1 dzień po dacie zakończenia wydarzenia
4. MyTournamentScreen - funkcja sort javascript (uważać na mutowanie tablicy przez funkcję sort)
   4.1. Sortowanie wydarzeń:
   4.1.1. wg daty eventu
   4.1.2. alfabetycznie
   4.1.3. moje wydarzenia - zaznaczanie wydarzeń, które mnie interesują i zapamiętywanie ich - ustawienie przypominania o zbliżających się wydarzeniach

5. Ekran Tournament Creator -> po zapisaniu turnieju przekierowanie na inny ekran - żeby wyczyścił się tivcketbasket

//Zmienić nazwy commitów wg zasady: This commit will ..., przez interaktywny rebase
//Przeczytać jak zaaplikować pacha do VSC

1. obsluzyc userContext i stan initializing lub jakis inny (nowy) stan odpowiadajacy za logike zwiazana z tym czym reejstracja/logowanie dobieglo konca

2. "wyeksportowac" metody z userContext na "swiat" czyli zapakowac w UserContextProviderze we value dodatkowo akcje (metody) a obok akcji userState tak jak to bylo dotychczas (cos podobnego wykorzystywalismy w custom hookach)

3. pozniej uzyc odpowiednio tych metod -> useContext(UserC...) i wywolac te metody w register i login screenie
