import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private reservationsService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkInTime: ['', Validators.required],
      checkOutTime: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      guestPhoneNumber: ['', Validators.required],
    });
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.reservationsService.getReservation(id).subscribe((reservation) => {
        if (reservation) {
          console.log('reservation Exists');
          this.reservationForm.patchValue(reservation);
        }
      });
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        // Update
        this.reservationsService.updateReservation(id, reservation);
      } else {
        // New
        this.reservationsService.addReservation(reservation);
      }

      this.router.navigate(['/reservation-list']);
    }
  }
}
