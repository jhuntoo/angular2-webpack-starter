import {Component} from 'angular2/core';
import {Validators, FormBuilder,Control, ControlGroup} from 'angular2/common';
import {Alert, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AbstractControl} from "angular2/common";

@Component({

  selector: 'register',
  directives: [

      Alert, DATEPICKER_DIRECTIVES
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./register.css').toString()],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./register.html')
})
export class RegisterForm {
  form: ControlGroup;
  email: AbstractControl = new Control("", Validators.required);
  password: AbstractControl = new Control("", Validators.required);
  confirmPassword: AbstractControl = new Control("", Validators.required);
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      "email": ["", Validators.required],
      "password":["", Validators.required],
      "confirmPassword":["", Validators.required]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.confirmPassword = this.form.controls['confirmPassword'];


    this.email.valueChanges.subscribe(
      (value: string) => {
        console.log('email changed to: ', value);
      }
    );
    this.password.valueChanges.subscribe(
      (value: string) => {
        console.log('password changed to: ', value);
      }
    );

    this.confirmPassword.valueChanges.subscribe(
      (value: string) => {
        console.log('confirmPassword changed to: ', value);
      }
    );

    this.form.valueChanges.subscribe(
      (value: string) => {
        console.log('form changed to: ', value);
      }
    );



  }
  ngOnInit() {
    console.log('hello `register` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  onSubmit() {
    console.log("model-based form submitted");
    console.log(this.form);
  }

}
