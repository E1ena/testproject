import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpComponent {
    public hide = true;
    public signupForm : FormGroup;

  constructor() {
      this.signupForm = new FormGroup({
            'name': new FormControl('', [Validators.required] ),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required]),
            'repeatPassword': new FormControl('', [Validators.required]),
        });
  }

  public signup() {
  }
}
