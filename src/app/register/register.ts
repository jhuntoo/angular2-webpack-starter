import {Component} from 'angular2/core';
import {Validators, FormBuilder,Control, ControlGroup} from 'angular2/common';
import {Alert, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ControlMessages} from '../control-messages/control-messages';
import {AbstractControl} from "angular2/common";
import {ValidationService} from "../validation/ValidationService";
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Response} from "angular2/http";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({

  selector: 'register',
  viewProviders: [HTTP_PROVIDERS],
  providers: [ToastsManager],
  directives: [

      Alert, DATEPICKER_DIRECTIVES, ControlMessages
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./register.css').toString()],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./register.html')
})
export class RegisterForm {
  form: ControlGroup;
  email: Control = new Control("", Validators.compose([Validators.required, ValidationService.emailValidator]));
  password: Control = new Control("", Validators.compose([Validators.required, ValidationService.passwordValidator]));
  confirmPassword = new Control("", Validators.required);

  constructor(fb: FormBuilder, private http: Http, public toastr: ToastsManager) {
    this.form = fb.group({
      email: this.email,
      matchingPassword: fb.group({
        password: this.password,
        confirmPassword: this.confirmPassword
      }, {validator: ValidationService.passwordsDoNotMatch})
    });


    //this.email.valueChanges.subscribe(
    //  (value: string) => {
    //    console.log('email changed to: ', value);
    //  }
    //);
    //this.password.valueChanges.subscribe(
    //  (value: string) => {
    //    console.log('password changed to: ', value);
    //  }
    //);
    //
    //this.confirmPassword.valueChanges.subscribe(
    //  (value: string) => {
    //    console.log('confirmPassword changed to: ', value);
    //  }
    //);
    //
    //this.form.valueChanges.subscribe(
    //  (value: string) => {
    //    console.log('form changed to: ', value);
    //  }
    //);



  }



  ngOnInit() {
    console.log('hello `register` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  onSubmit() {
     let request = { email : this.email.value, password: this.password.value};
     this.http.post('http://52.50.10.205/api/v1/auth/register', JSON.stringify(request))
       .map((res: Response) => res.json())
       .subscribe(
         data => console.log(`Response: ${data}`),
         err => this.toastr.error(JSON.stringify(err)),
         () => console.log('Random Quote Complete')
       );
  }

}
