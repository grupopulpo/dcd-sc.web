'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';

import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import BasesComponent from './bases/bases.component';
import GaleriaComponent from './galeria/galeria.component';
import PremiosComponent from './premios/premios.component';

import './app.scss';

angular
  .module('dcd20App', [
  ngCookies,
  ngResource,
  ngSanitize,
  'btford.socket-io',
  uiRouter,
  uiBootstrap,
  _Auth,
  account,
  admin,
  'validation.match',
  navbar,
  footer,
  main,
  BasesComponent,
  PremiosComponent,
  GaleriaComponent,
  constants,
  socket,
  util
])
  .config(routeConfig)
  .run(function ($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth
        .isLoggedIn(function (loggedIn) {
          if (next.authenticate && !loggedIn) {
            $location.path('/');
          }
        });
    });
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['dcd20App'], {strictDi: true});
  });
