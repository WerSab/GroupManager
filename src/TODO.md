T*++*ournament -> [TicketType]

TicketType:
name: string
slots: number;
slotsTaken: number;
'prices: Map<string, number> przyklad: {"ulgowy" => 80, "normalny" => 100}'

Tickets:
name: string przyklad: "Na płycie", "Sektor A"
ticketType: ticketTypeReference
amount: number
type: string przyklad: "ulgowy"

Orders:
user: userRef
tournament: tournamentRef
tickets: [Array of ticket references]
status: string
createdAt

transakcje:
start
cos robimy na transakcji (create, update, delete)
commit transakcji

Przechwytywanie wyjątków:
-// function jakasFunkcja() {
// throw new Error('niezdef parameter');
// }

// try {
// jakasFunkcja();
// }catch(error) {
// reject(error);
// }

//MyTicketDetailsScreen

const [basket, setBasket] = useState([]);

po rezerwacji biletu - basket + bliet ktory wpisal uzytkownik - setBasket(prevBasket => [...prevBasek, {dane biletu}]);

1. koszyk jako stan
2. dodawanie biletu przez uzytkownika do koszyka po wcisnieciu jakiegos przycisku na Modalu - funkcja aktualizujaca stan (dodajaca do koszyka nowy bilet)

{
amount: x,
type: y,
ticketTypeRef: referencjaZEkranuMyTournamentDetails (gdzies?),
name: jw.
}

przykład mapy (struktura danych):
const pricesMap = new Map();
const pricesObj = {};

// dodaje ulgowy bilet na plyte
pricesMap.set('ulgowy', 35.50);
pricesObj['ulgowy'] = 35.50;

// dodaje normalny bilet na plyte
pricesMap.set('normalny', 50);
pricesObj['normalny'] = 50;

console.log(pricesMap);
console.log(pricesObj);

25.08.2022
tournamentScreen - zamiast modal doadwania turnieju, zrobić kolejny ekran na którym bedzie dodawanie nowego turnieju

export default function App() {

const [prices, setPrices] = useState(new Map());

useEffect(() => {
const mapCopy = new Map(prices);
mapCopy.set('ulgowy', 100);
setPrices(mapCopy);

    // const element = ['ulgowy', 50];
    // const copy = new Map([...prices, element])
    // setPrices(copy);

}, []);

29.08.2022
Wyświetlanie komponentu na innym komponencie:

  <!-- <View style={styles.ticketStyle}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { setIsCreatorVisible(true) }}
                    >
                        <Text style={styles.textDark}>Dodaj bilet  </Text>
                    </TouchableOpacity>
                    {isCreatorVisible && (
                        <TicketTypeCreator onTicketTypeAdd={handleTicketTypeAdd} />
                    )}
                </View> -->

                //navigacja hooki https://reactnavigation.org/docs/use-route/
                przekazywanie własności do komponentu:
                1. propsy (przekazywanie własności bezpośrednio do komponentu)
                2. navigation(przesyłanie parametrów przez stack screen)

01.09.2022
TournamentOrderingScreen:
TypeError: undefined is not an object (evaluating 'data.tournament')
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

TournamentScreen - metoda on save press:

- przekierowuje do nowego ekranu z podsumowaniem założonego turnieju
- dezaktytuje przycisk save ticket

OrdersScreen error: [TypeError: undefined is not an object (evaluating 'element.ticketTypeRef.get')]

Dodawanie nowych własności do zagnieżdżonych obiektów:
let ref = {
plyta: {
ulgowy: 10
},
sektorB: {
normalny: 5,
}
}

let obj = {
x: {
y: {
z: {
}
}
}
}

obj = {
...obj,
x: {
...obj[x],
y : {
...obj[x][y],
z: {
...obj[x][y][z],
asdasd: 'asdasd',
}
}
}
}
