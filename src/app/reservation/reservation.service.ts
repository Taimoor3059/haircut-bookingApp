import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3001';
  private reservations: Reservation[] = [];

  /* Returns all the reservations in the DB. */
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + '/reservations');
  }

  /* Returns a individual reservation. */
  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + '/reservation/' + id);
  }

  /* Adds a reservation go the DB collection. */
  addReservation(reservation: Reservation): Observable<void> {
    // To create a unique ID until you are actually connected to a BE
    reservation.id = Date.now().toString();
    return this.http.post<void>(this.apiUrl + '/reservation', reservation);
  }

  /* Delete an individual reservation from the DB */
  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/reservation/' + id);
  }

  /* Updates the individual reservation within reservations collection in DB. */
  updateReservation(
    id: string,
    updatedReservation: Reservation
  ): Observable<void> {
    return this.http.put<void>(
      this.apiUrl + '/reservation/' + id,
      updatedReservation
    );
  }
}
