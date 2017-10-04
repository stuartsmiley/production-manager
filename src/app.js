import {inject} from 'aurelia-framework';
import {FetchConfig} from 'aurelia-auth';


@inject(FetchConfig)
export class App {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  activate() {
    this.fetchConfig.configure();
  }

  configureRouter(config, router){
    config.title = 'Samples';
    config.map([
      { route: '',              moduleId: 'no-selection',   title: 'Select'},
      { route: 'sample/:id?',  moduleId: 'sample', title:'Sample', name: 'sample' },
      { route: 'login', moduleId: 'login', nav: false, title: 'Login'},
      { route: 'logout', moduleId: 'logout', nav: false, title: 'Logout'}
    ]);

    this.router = router;
  }
}
