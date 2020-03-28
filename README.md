# production-manager
aurelia.io UI to drive farm-production backend code

## Preparation
Install NodeJS version 4.x or above.

Install the Aurelia CLI itself. From the command line, use npm to install the CLI globally. 
(you may need to use sudo when executing npm global installs)
```npm install aurelia-cli -g```

## Running production-manager
You will need to run farm-production locally to have something for production-manager to talk to. 
Then build the app and run it locally with:
```au run --env dev --watch```


## Unit testing
```au test --watch```

## Generators
see http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/the-aurelia-cli/6

## production deployment
```au build --env prod```
copy index.html to /opt/wildfly/welcome-content
copy scripts/vendor-bundle-*.js to   /opt/wildfly/welcome-content/scripts
copy scripts/app-bundle-*.js to /opt/wildfly/welcome-content/scripts and rename app-bundle.js


