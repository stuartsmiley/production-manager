import environment from './environment';

// todo: import evironment and use it instead of window.location.hostname
var configForDevelopment = {
  'loginUrl': environment.apiBaseUrl +'token/login',
  'useXDomain': true
}

var configForProduction = {
  'loginUrl': environment.apiBaseUrl +'token/login'
}

var config  = {
'loginUrl': 'https://finca-la-caprichosa.com/farm-production/token/login'
}
//if (window.location.hostname==='localhost') {
//    config = configForDevelopment;
//}
//else{
//    config = configForProduction;
//}

export default config;

