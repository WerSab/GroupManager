import React from 'react';
import eventPhoto from '../assets/photos/events.png';
import usersPhoto from '../assets/photos/users.png';
import bookingsPhoto from '../assets/photos/bookings.png';
import messagesPhoto from '../assets/photos/messages.png';
import paidOrdersPhoto from '../assets/photos/paidOrders.png';

export const RENDER_ITEM_PHOTOS = item => {
  switch (item.name) {
    case 'Wydarzenia':
      return eventPhoto;
    case 'Moje wydarzenia':
      return eventPhoto;
    case 'Użytkownicy':
      return usersPhoto;
    case 'Mój profil':
      return usersPhoto;
    case 'Rezerwacje':
      return bookingsPhoto;
    case 'Moje zamówienia':
      return bookingsPhoto;
    case 'Wiadomości':
      return messagesPhoto;
    case 'Moje wiadomości':
      return messagesPhoto;
    case 'Moje bilety':
      return paidOrdersPhoto;
    case 'Zapłacone zamowienia':
      return paidOrdersPhoto;
  }
};
