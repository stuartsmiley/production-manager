import {inject} from 'aurelia-framework';
import {FetchConfig} from 'aurelia-auth';
import {WildflyAPI} from './wildfly-api';


@inject(FetchConfig, WildflyAPI)
export class App {
  constructor(fetchConfig, api) {
    this.fetchConfig = fetchConfig;
    this.api =  api;
  }

  activate() {
    this.fetchConfig.configure();
  }

  configureRouter(config, router){
    config.title = 'Samples';
    config.map([
      { route: '',              moduleId: 'no-selection',   title: 'Select'},
      { route: 'sample/:id?',  moduleId: 'sample', title:'Sample', name: 'sample' },
      { route: 'rain', name: 'rain', moduleId: 'rain', nav: true, title: "Rain"},
      { route: 'login', moduleId: 'login', nav: false, title: 'Login'},
      { route: 'logout', moduleId: 'logout', nav: false, title: 'Logout'}
    ]);

    this.router = router;
  }
}
