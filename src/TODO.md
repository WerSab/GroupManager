Instrukcja używania składni markdown:

https://www.markdownguide.org/extended-syntax/

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

23.03.2023
console.logi - usunąć,
przenieść wszystkie todo tutaj,
obsłużyć ekrany niedziałające

# Test

# TicektTypeCreator

Blur
//1. Jezeli użytkownik zatwierdzi cenę to tworzy sie nowa pusta ramka+ poprzednie ramki nie zmieniają się
//2. jeżeli użytkownik zmieni i zatwierdzi nową cenę, to chcemy zaktualizować właściwy element bez dodawania nowej ramki
//3. zmiana typu biletu, bez dodawania nowej ramki

# TicketOrderingScreen

Old version
//wrzucamy info o biletach (cena, ilość, rodzaj)
//inputy - ilość biletów
//koszyk z info o zakupionych biletach
//const tournament = getTournamentFromContext(tournamentContext, tournamentId);
// const status = useMemo(() => {
// return ticketType.prices > 0 ? TICKET*PAYMENT_STATUS.UNPAID : TICKET_PAYMENT_STATUS.PAID;
// }, [ticketType]);
// function getCalculatedOrderPrice(discountTicketPrice, discountAmount) {
// const price = parseInt(discountTicketPrice);
// const amount = parseInt(discountAmount);
// return Math.round(price * amount \_ 100) / 100; //zaokrąglenie
// }

// const handleFinalPriceBlur = () => {
// const total = getCalculatedOrderPrice() + finalPrice;
// console.log('totalPrice', total);
// setFinalPrice(total);
// };
// const mapCopy = new Map(prices);
// mapCopy.set('ulgowy', 100);
// setPrices(mapCopy);
// const bought = {
// // plyta: {
// // ticketTypeId: null,
// // discounts: {
// // ulgowy: amount,
// // normalny: 1,
// //}
// // },
// // sektorC: {
// // ulgowy: 1,
// // },
// }; //

//setTicketName(mapTicketName);

//setBoughtTicket(bought);
// tutaj aktualizuje tablice na stanie o ten obiekt wynikowy zapisany wyzej
//console.log('boughtTicket', boughtTicket);

// bought[ticketName][discountname] = amount;
// przy parsowaniu sprawdzić czy obiekt posiada jakieś własności - jeżeli nie to go skasować ()
// z obiektu bought, po naciśnięciu zamów wynikiem powinna byc nastepujaca tablica:
// [
// {
// name: 'plyta',
// amount: 1,
// type: 'normalny'
// },

// ]
//https://jsfiddle.net/nhwz853s/
// }
//stan z rodzajem biletu i zakupionymi ulgami
// function navigateWithParams(navigation, route, nextParams, screenName) {
// const prevParams = route.params;
// navigation.navigate(screenName, {
// ...prevParams,
// ...nextParams
// });
// }

// navigateWithParams(navigation, route, {
// ticketType: {

// }
// }, 'nazwaEkranu');
// const onSaveTicketOrders = () => {
// const parsedTakenSlots = parseInt(takenSlots)
// if (isNaN(parsedTakenSlots) || parsedTakenSlots <= 0) {
// Alert.alert('Wystąpił błąd', `Prosze wprowadzić liczbę`, [
// { text: 'Ok' },
// ])
// return;
// }
// const tournamentRef = getCollection(FIRESTORE_COLLECTION.TOURNAMENTS).doc(tournamentId);
// const ticketTypeReference = tournamentRef
// .collection(FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES)
// .doc(ticketType.id);
// const userReference = getCollection(FIRESTORE_COLLECTION.USERS)
// .doc(user.uid)

// const data = {
// user: userReference,
// tournament: tournamentRef,
// //tickets: ticketsState,
// tickets: [
// {
// name: ticketType.name,
// ticketTypeRef: ticketTypeReference,
// amount: takenSlots,
// type: ticketType.type,
// }
// ],
// status: status,

// };

// setIsButtonSafeDisabled(true);
// addNewTicketOrderToCollection(data)
// .then((ticketOrderDocumentReference) => {
// // navigation.navigate(SCREEN.TICKET*PAYMENT_SUMMARY,
// // {
// // ticketOrderDocumentReference,
// // }
// // )
// console.log('zapisano zamowienie');
// setIsButtonSafeDisabled(false);
// })
// .catch(function (err) {
// Alert.alert('Wystąpił błąd', `Przepraszamy mamy problem z serwerem, prosze spróbować później`, [
// { text: 'Ok' },
// ]);
// console.log("OrdersScreen error: ", err);
// });
// }
// {/* <FlatList
// data={ticketTypesData}
// renderItem={renderTicketType}
// /> _/}
// {/_ <Text style={styles.headline} > {tournament.name}</Text>
// <Text style={styles.buttonTextStyle} > Cena pojedyńczego biletu : {ticketType.price} zł. </Text> _/}
// {/_ <View style={styles.SectionStyle}>
// <Text style={styles.buttonTextStyle} > Ilość biletów : </Text>
// <TextInput
// onBlur={handleFinalPriceBlur}
// style={styles.inputStyle}
// onChangeText={(text) =>
// setTakenSlots(text)
// }
// value={takenSlots}
// underlineColorAndroid="#f000"
// placeholder="Wpisz ilość biletów..."
// placeholderTextColor="#8b9cb5"
// />
// </View> \_/}
24.04.2023 - wyświetlanie biletów zamówienia:
button - wyświetl szczegóły
rozpakowanie wszystkich referencji pod dane zamówienie
// 1. useEffecta ma w ogole nie byc
// 2. przenosimy logike, ktora znajduje sie w useEffect do oddzielnej, asynchornicznej funkcji
// 3. ta asynchroniczna funkcja ma zostac przekazana (referencja) do naszego nowego hooka useAsync(FN)
// 4. useAsync obsluguje odpowiednio stany reactowe
// 5. uzywamy zwroconych stanow (loading, data, error) w komponencie MyOrdersScreen
// 6. useCallback- zgooglować

27.04.2023

1. refactor myOrdersScreen -uzycie useAsync
2. to samo myConfirmed
3. Wyswietlenie szczegółów biletów na myConfirmed

   08.05.2023
   Zmienić kopiowanie do przelewu - kazdy element osobno po kliku
   MyConfirmedOrderScreen - zbadać dlaczego myOrder is undefined (use Effect - prawdopodobnie trzeba będzie tam zmieniać local Orders)

   15.05.2023
   Closures - domknięcia - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
   Generator - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators

   Zadanie - odwołac się przez ticketType do kolekcji Tournaments i pozyskac nazwę turnieju i wypisac ją w szczegółach.

tickets -> ticketType(string) -> getTournamentByTicketType(ticketTypeId) -> getTicketTypeDocRef(ticketTypeId) -> .getParent -> rozpakowac i odpowiednio zwrocic na ekran.
https://stackoverflow.com/questions/56219469/firestore-get-the-parent-document-of-a-subcollection

18.05.2023 Konkatenacja stringów (łączenie stringów ze zmiennymi)
const ex1 = FIRESTORE_COLLECTION.TOURNAMENTS + '/' + tournamentId;
const ex2 = `${FIRESTORE_COLLECTION.TOURNAMENTS}/${tournamentId}`;

Przykład wykorzystania:
return getDocumentReferenceById(
`${FIRESTORE_COLLECTION.TOURNAMENTS}/${tournamentId}`,
);
Zadanie
MyOrderDetailsScreen - przy ładowaniu list ordersów załadować też dane z turnieju.
Metody firestorowe:
get()
doc()
data()
29.05.2023
Uzyskać datę :
Z firestore timestamp na data JS, z daty JS przy uzyciu metody format (data-time-methods): data JS i string (metoda format)
Przedatowane ordersy/tickety - nie usuwamy tylko zmieniamy ich status na expired

cronjob - przeczytać- mechanizm który uruchamia się co jakiś czas (wykorzystanie np, przy zaciąganiu danych z bazy)

https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples

setInterval(() => {
// job ktory bierze wszystkie ordery z bazy i sprawdza
// ktore nalezy oznaczyc jako expired (zmienic status)
}, 24h \* 1000);

Vysor - aplikacja na komp i spartfphone do przechwytywaia ekranu

1. feature branche

   - jezeli tworzymy nowy featureowy branch to mergujemy nowo wprowadzone zmiany jak najszybciej mozemy

   (main): C1 -> C2 -> C3 -> C4 -> C5 -> C6 -> C7
   (feature/zyx): C3 -> merge master -> C1.5 -> C1.6 -> merged
   (feature/xyz): C4 -> C5 -> C2.6 -> merge master -> C7 -> merged (C7)
   GroupManager/android/app/build.gradle' line: 235
