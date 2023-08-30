export function calculateFinalPrice(boughtTickets) {
  const handleAmountErrors = amount => {
    if (amount <= 0) {
      throw new Error('Tickets amount must be greater than 0');
    }
    if (!Number.isInteger(amount)) {
      throw new Error('Amount value must be an integer');
    }
  };
  console.log('calculateFinalPrice_boughtTickets', boughtTickets);

  const sumOrderPrices = Object.entries(boughtTickets).reduce(
    (acc, [, ticketMetaData]) => {
      console.log('ticketMetaData', ticketMetaData);
      const price = ticketMetaData.ticketPrice;
      const amount = ticketMetaData.amount;
      handleAmountErrors(amount);
      return acc + price * amount;
    },
    0,
  );
  console.log('sumOrderPrices', sumOrderPrices);
  return sumOrderPrices;
}
