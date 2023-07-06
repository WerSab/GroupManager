a) branch per funkcjonalnosc
b) commit per fix
c) branch tworzymy lokalnie wychodzac z maina: git checkout -b feature/xyz
d) push na nowo stworzony lokalnie branch:
git push -u origin <branch>
https://stackoverflow.com/questions/2765421/how-do-i-push-a-new-local-branch-to-a-remote-git-repository-and-track-it-too

commity pushować na nowego brancha, tworzyć pull request i wysłać link do pull request na maila.

1. Funkcjonalność rejestracji:
   1.1. Do zmiany ekran rejestracji(style)
   1.2. Nieprawidłowe działanie po wciśnieciu rejestruj bez podania danych.r
   1.3. Po kliknięciu zarejestruj=> czyszczą się inputy i nadal można nacisnąć zarejestruj co powoduje crash
   1.4. Walidacja inputów (mail i haslo)+ ograniczenie ilości znaków
   1.5. Zbędne czyszczenie inputów po kliknieciu zarejestruj
   1.6. Weryfikacja zachowania aplikacji po wciśnięciu zarejestruj w trakcie trwania pierwszej rejestracj
   1.7. Usuwanie konta użytkownika
2. Ekran główny/inicjalizacja aplikacji dla zalogowanego usera(player)  
    2.1. Brakujący indeks dla metody getUserOrders
   FLOW poprawek:

3. tester testuje funkcjonalnosc
4. tester znajduje blad
5. tester zglasza blad (JIRA, TRELLO)
6. zgloszenia maja swoje numerki
