// Generated by CoffeeScript 1.4.0
(function() {

  console.log("load main file");

  requirejs.config({
    waitSeconds: 30,
    paths: {
      "jquery": "../lib/jquery/dist/jquery",
      "angular": "../lib/angularjs/angular"
    },
    shim: {
      'angular': {
        deps: ['jquery'],
        exports: 'angular'
      },
      'angular_resource': {
        deps: ['angular'],
        exports: 'angular_resource'
      }
    }
  });

  define(['angular', 'appmodule', 'control/mainctrl'], function() {
    var appModule;
    console.log("define main file");
    appModule = angular.module('app');
    return angular.element(document).ready(function() {
      console.log("bootstrap angular app");
      return angular.bootstrap(document, ['app']);
    });
  });

}).call(this);
