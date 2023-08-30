// const object1 = {
//     a: 'somestring',
//     b: 42
//   };

//   for (const [key, value] of Object.entries(object1)) {
//     console.log(`${key}: ${value}`);
//   }
// tickets: [
//     {
//       name: 'Płyta',
//       ticketTypeRef: tournamentReference
//         .collection(FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES)
//         .doc('Gu9hHfCLliRndDRyTkp5'),
//       amount: 3,
//       type: 'normalny',
//     },
//     // {
//     //   name: 'Trybuny',
//     //   ticketTypeRef: tournamentReference.collection(FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES).doc('C67R7O1UNQXQjFXFTjN4'),
//     //   amount: 10,
//     //   type: 'ulgowy',
//     // }
//   ],
// {
//     ...boughtTickets.current[ticketName],
//     [discountName]: amount,
//   },
// boughtTickets.current = {
//   ...boughtTickets.current,
//   [ticketName]: {
//     ticketTypeId: ticketTypeId,
//     discounts: {
//       ...boughtTickets.current[ticketName]?.discounts,
//       [discountName]: amount,
//     },
//   },
// };

export const parseBoughtTicketsToArray = boughtTickets => {
  const boughtTicketEntries = Object.entries(boughtTickets);
  const result = [];
  console.log('ticket-order-methods_boughtTicketEntries', boughtTicketEntries);
  for (const boughtTicketEntry of boughtTicketEntries) {
    const [ticketTypeId, ticketMetaData] = boughtTicketEntry;
    const {amount, ticketName, ticketPrice} = ticketMetaData;
    result.push({
      ticketTypeId,
      amount,
      ticketName,
      ticketPrice,
    });
  }
  console.log('ticket-order-methods_result', result);
  return result;
};
