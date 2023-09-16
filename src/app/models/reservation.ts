import { Time } from '@angular/common';

export interface Reservation {
  id: string;
  checkInTime: Time;
  checkOutTime: Time;
  checkInDate: Date;
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: number;
}
