// Generated by CoffeeScript 1.4.0
(function() {

  console.log("load reverse directive file");

  define(['angular', 'appmodule'], function() {
    var appModule;
    console.log("define reverse directive");
    appModule = angular.module('app');
    return appModule.directive('appReverse', function() {
      return function(scope, element, attrs) {
        return element.text(element.text().split("").reverse().join(""));
      };
    });
  });

}).call(this);
