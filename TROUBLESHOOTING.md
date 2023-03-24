1. Render item - odwołanie się do obiektu, który był nullem

Jeżeli w komponencie używamy FlatListy, której elementy (data) są ładowane asynchronicznie, a asynchroniczność ta jest obsłużona jakimś stanem (loading)
to musimy uważać na odwołania do pól obiektu w metodzie przekazanej do props'a renderItem nawet wtedy gdy FlatList'a nie powinno zostać wyrenderowana ponieważ obsługujemy stan LOADING.
przykład: renderItem = ({item}) => {
item.xyz; // null, solution: item.xyz ?? {};
}

2.  Table to object:
    // 1. FOR LOOP
    const parseDiscountsToPrices = discounts => {

        const prices = {};
        for (let i = 0; i < discounts.length; i++) {
          const element = discounts[i];
          prices[element.type] = element.price;
        }

        return prices;

    };

// 2. FOR OF
const parseDiscountsToPricesOF = discounts => {
const prices = {};
for (const {type, price} of discounts) {
prices[type] = price;
}
return prices;
};

// 3. REDUCE
const parseDiscountToPricesREDUCE = discounts => {
// [1,3,8,10].reduce((acc, element) => acc + element, 3);

    return discounts.reduce((accumulator, discount) => {
      accumulator[discount.type] = discount.price;
      return accumulator;
    }, {});

};
//
