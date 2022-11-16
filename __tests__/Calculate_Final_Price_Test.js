// tdd - test driven development
const {calculateFinalPrice} = require('../src/common/price-methods');
const {expect, test} = require('@jest/globals');

test('Min price test', () => {
  // [sektorA]: ulgowy -> 3 (w cenie 10 zł/szt), normalny: 1(w cenie 20 zł/szt)
  // [sektorB]: uglowy -> 2(w cenie 15 zł/szt)
  const mockedBoughtTickets = {
    sektorA: {
      ticketTypeId: '1',
      discounts: {
        ulgowy: 3,
        normalny: 1,
      },
    },
    sektorB: {
      ticketTypeId: '2',
      discounts: {
        ulgowy: 2,
      },
    },
  };
  const mockedTicketTypes = [
    {
      id: '1',
      prices: {ulgowy: 10, normalny: 20},
    },
    {
      id: '2',
      prices: {ulgowy: 15},
    },
  ];
  const expected = 80;
  const result = calculateFinalPrice(mockedBoughtTickets, mockedTicketTypes);
  expect(result).toEqual(expected);
});

// - undefined / null
// - inny typ niz rzeczywiscie oczekujemy
// - wartosci ujemne
// - nieprawidłowa struktura parametrów (tj. obiektów)

test('Negative nuber amount test', () => {
  const mockedBoughtTickets = {
    sektorA: {
      ticketTypeId: '1',
      discounts: {
        ulgowy: -3,
        normalny: 1,
      },
    },
    sektorB: {
      ticketTypeId: '2',
      discounts: {
        ulgowy: 2,
      },
    },
  };
  const mockedTicketTypes = [
    {
      id: '1',
      prices: {ulgowy: 10, normalny: 20},
    },
    {
      id: '2',
      prices: {ulgowy: 15},
    },
  ];
  const expected = 20;
  expect(() => {
    calculateFinalPrice(mockedBoughtTickets, mockedTicketTypes);
  }).toThrow(new Error('Tickets amount must be greater than 0'));
});

test('Float nuber price test', () => {
  const mockedBoughtTickets = {
    sektorA: {
      ticketTypeId: '1',
      discounts: {
        ulgowy: 2.1,
        normalny: 1,
      },
    },
    sektorB: {
      ticketTypeId: '2',
      discounts: {
        ulgowy: 2,
      },
    },
  };
  const mockedTicketTypes = [
    {
      id: '1',
      prices: {ulgowy: 10, normalny: 20},
    },
    {
      id: '2',
      prices: {ulgowy: 15},
    },
  ];
  expect(() => {
    calculateFinalPrice(mockedBoughtTickets, mockedTicketTypes);
  }).toThrow(new Error('Amount value must be an integer'));
});
