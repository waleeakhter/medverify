

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatamodalComponent } from '../datamodal/datamodal.component'


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
interface DialogData {
  class: string,
  dosage: string,
  documents: string[],
  source: string
}
@Component({
  selector: 'app-modalform',
  templateUrl: './modalform.component.html',
  styleUrls: ['./modalform.component.scss']
})

export class ModalformComponent {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { options: string[], country: { name: string } },
    private dialogRef: MatDialogRef<ModalformComponent>
  ) {

    if (data) {
      console.log(data)
      this.options = data.options
    }
  }

  medicineFormControl = new FormControl("", [Validators.required])

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  DialogData: DialogData = {
    class: "Narcotic Pain releif",
    dosage: "30 day supply",
    documents: ["Original prescription", "Doctor certificate"],
    source: "google.com"
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  openfinalDialog() {
    const dialogRef = this.dialog.open(DatamodalComponent, {
      data: { list: this.DialogData, country: this.data.country },
    });
  }
  onSubmit(): void {
    console.log(this.medicineFormControl)
    if (this.medicineFormControl.invalid) {
      return
    } else {

      const contactForm = new FormData()
      contactForm.append("medicine", this.medicineFormControl.value ?? "")
      this.dialogRef.close();
      this.openfinalDialog()
      this.http
        .post('http://localhost:4200/api/getmedicinelist', contactForm)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.options = response as string[]
          },
          error: (error) => console.log(error),
        });

    }
  }

}
