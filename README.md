# Data Exchange UI

This contains the Angular5 UI for the TR Data Exchange Fintech POC.

This project was originally generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2.

## Development

Clone this project. Run `npm install` to install all dependencies. Ensure you have NodeJS installed on your machine. This project uses the Angular CLI tool to build and serve development environments. Make sure it is installed globally. `npm install -g @angular/cli`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

This code can be packaged into a docker container. The following will run `ng build --prod` and package the dist files onto an NGINX server. To view the UI go to `http://<docker-host>:80`. Docker host will likely be `localhost` on Unix systems / Win10 and `192.168.99.100` if using docker toolbox.
```
eval $(docker-machine env) # docker toolbox only. Use git shell for eval support
docker build -t dataex-ui .
docker run -p 80:80 -d dataex-ui
```

## Code Structure and Style

Try to follow the [official Angular style guide](https://angular.io/guide/styleguide) as much as possible. Some Key points:

#### Core
The `core` module must only be imported once (by the app module). All components, services, or other classes located in core must be considered application wide **singletons**. For example:

- TopNav component which is as the top of every page and there is only ever one of them
- UserService which represents the _currently signed in user_
- PageService which contains routing logic for the application
- AuthenticationService that tracks user authentication / tokens.
- Application level guards and interceptors to protect routes from non-logged in users.

#### Shared
The `shared` module contains components, models and services that are used by multiple other components (but are not application singletons). All shared components should be `dummy components` meaning they should have all data and state injected into them and never alter the state of the application.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Running tests (only scaffolded tests exist for POC ...)

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
