import {bindable } from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';
import {BindingEngine} from 'aurelia-framework';

@inject(AuthService, BindingEngine)
export class NavBar {
  _isAuthenticated = false;
  displayName = "";
  @bindable router = null;
  subscription = {};
      constructor(auth, bindingEngine) {
          this.auth = auth;
          this.bindingEngine = bindingEngine;
          this._isAuthenticated = this.auth.isAuthenticated();
          console.log("Authenticated? : " + this._isAuthenticated);
          this.subscription = bindingEngine.propertyObserver(this, 'isAuthenticated')
              .subscribe((newValue, oldValue) => {
                  if (this.isAuthenticated) {
                      this.auth.getMe().then(data => {
                          console.log("data: " + data.displayName);
                          return this.displayName = data.displayName;
                      });
                  }
              });
      }

      get isAuthenticated() {
        return this.auth.isAuthenticated();
      }

      deactivate() {
        this.subscription.dispose();
      }
}
