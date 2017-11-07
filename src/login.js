import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';

@inject(AuthService)
export class Login{
	constructor(auth){
		this.auth = auth;
	};

	heading = 'Login';

	email='';
	password='';
	login(){

		return this.auth.login(this.email, this.password)
		  .then(response=>{
			  console.log("successfully authenticated " + + response);
		  })
		  .catch(err=>{
            err.json().then(function(e){
            console.log("login failure : " + e.message);
            });

		  });
	};

}
