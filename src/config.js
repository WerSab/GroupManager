export const FIRESTORE_COLLECTION = {
  USERS: 'users',
  TOURNAMENTS: 'tournaments',
  TICKETS: 'tickets',
  MESSAGES: 'messages',
  ORDERS: 'orders',
  SUB_COLLECTION: {
    TICKET_TYPES: 'ticketTypes',
  },
};

export const FIRESTORE_ROLES = {
  PLAYER: 'player',
  MANAGER: 'manager',
};

export const TICKET_PAYMENT_STATUS = {
  PAID: 'paid',
  UNPAID: 'unpaid',
};
export const TOURNAMENT_CATEGORIES = {
  CULTURE: 'kultura',
  SPORT: 'sport',
};

/*
  type TicketTypeNames = "ulgowy" | "normalny";
  enum TicketTypeNames = {Ulgowy = "Ulgowy", Normalny = "normalny"}
*/

export const TICKET_TYPE_NAMES = {
  Reduced: 'ulgowy',
  Normal: 'normalny',
  Different: 'inny',
};

export const FIREBASE_STORAGE_DIRS = {
  USERS: 'users/profilePictures',
  TOURNAMENTS: 'tournamentPictures',
  MESSAGES: 'messagePictures',
};
