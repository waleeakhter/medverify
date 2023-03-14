import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.scss']
})

export class ContactformComponent {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl("", [Validators.required])
  messageFormControl = new FormControl("", [Validators.required])
  matcher = new MyErrorStateMatcher();




  onSubmit(): void {
    console.log(this.emailFormControl.invalid || this.nameFormControl.invalid || this.messageFormControl.invalid)
    if (this.emailFormControl.invalid || this.nameFormControl.invalid || this.messageFormControl.invalid) {
      return
    } else {

      const contactForm = new FormData()
      contactForm.append("email", this.emailFormControl.value ?? "")
      contactForm.append("name", this.nameFormControl.value ?? "")
      contactForm.append("message", this.messageFormControl.value ?? "")

      console.log(this.matcher, "messageFormControl")
      console.warn('Your message has been submitted', contactForm);

      this.http
        .post('http://localhost:4200/api/create-user', contactForm)
        .subscribe({
          next: (response) => console.log(response),
          error: (error) => console.log(error),
        });

    }
  }

}
