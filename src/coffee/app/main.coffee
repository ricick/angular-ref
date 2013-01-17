console.log "load main file"
requirejs.config
	waitSeconds:30,
	paths:
		"jquery": "../lib/jquery/dist/jquery"
		"angular": "../lib/angularjs/angular"
	shim:
        'angular':
            deps: ['jquery']
            exports: 'angular'
        'angular_resource':
            deps: ['angular']
            exports: 'angular_resource'
define ['angular', 'appmodule', 'control/mainctrl'], ->
	console.log "define main file"
	appModule = angular.module 'app'
	#appModule.config ($locationProvider, $routeProvider) ->
	#	$locationProvider.html5Mode true
	angular.element(document).ready ->
		console.log "bootstrap angular app"
		angular.bootstrap document, ['app']
