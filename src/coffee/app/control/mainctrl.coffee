console.log "load main controller file"
define ['angular', 'appmodule'], ->
	console.log "define main controller"
	appModule = angular.module 'app'
	appModule.controller 'MainCtrl', ['$scope', ($scope) ->
		console.log "init main controller"
		$scope.foo = "bar"
	]