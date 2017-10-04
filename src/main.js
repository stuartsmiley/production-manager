import environment from './environment';
import config from './authConfig';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-auth', (baseConfig)=>{
        baseConfig.configure(config);
    })
    .feature('resources');

    apiBaseUrl: 'http://localhost:3000'

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(a => a.setRoot());
}
