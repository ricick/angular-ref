console.log "load reverse directive file"
define ['angular', 'appmodule'], ->
	console.log "define reverse directive"
	appModule = angular.module 'app'
	appModule.directive 'appReverse', () ->
		(scope, element, attrs) ->
			element.text element.text().split("").reverse().join("")