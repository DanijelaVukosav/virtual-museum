import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from 'src/app/model/event.model';
import { EventService } from '../services/event.service';
import { EventCategory } from 'src/app/model/event.category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  public form: FormGroup = new FormGroup({}); //forma
  public event: Event = new Event();
  public categories: Array<EventCategory> = [];

  constructor(public formBuilder: FormBuilder, //formBuilder sluzi za kreiranje forme
    private service: EventService, //service koristimo za cuvanje podataka
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EventEditComponent>) {
  }

  ngOnInit() {
    //prilikom ucitavanja stranice pravimo formu
    this.form = this.formBuilder.group({
      name: [this.event.name, Validators.required],
      description: [this.event.description, Validators.required],
      image: [this.event.image],
      date: [this.event.date, Validators.required],
      time: [this.event.time, Validators.required],
      category: [this.event.category, Validators.required]
    });
  }

  save({ value, valid }: { value: Event, valid: boolean }) {
    if (valid) { //ako su OK

      this.service.add(value);//koristimo nas servis da ih sacuvamo
      this.form.reset(); //ponistimo prethodno unesene podatke
      this.snackBar.open("Podaci su sacuvani", undefined, { //i prikazemo poruku koja nestaje nakon 2s
        duration: 2000,
      });
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }


}
