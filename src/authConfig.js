import environment from './environment';

var config  = {
'loginUrl': environment.apiBaseUrl + 'token/login',
'useXDomain': environment.useXDomain
}

export default config;

