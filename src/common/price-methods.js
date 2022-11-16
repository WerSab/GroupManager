export function calculateFinalPrice(boughtTickets, ticketTypesData) {
  const handleAmountErrors = amount => {
    if (amount <= 0) {
      throw new Error('Tickets amount must be greater than 0');
    }
    if (!Number.isInteger(amount)) {
      throw new Error('Amount value must be an integer');
    }
  };

  const sumOrderPrices = Object.entries(boughtTickets).reduce(
    (acc, [, ticketMetaData]) => {
      const ticketTypeId = ticketMetaData.ticketTypeId;
      const {prices} = ticketTypesData.find(
        ticketType => ticketType.id === ticketTypeId,
      );
      return (
        acc +
        Object.entries(ticketMetaData.discounts).reduce(
          (acc, [discountName, amount]) => {
            handleAmountErrors(amount);
            return acc + prices[discountName] * amount;
          },
          0,
        )
      );
    },
    0,
  );
  return sumOrderPrices;
}
