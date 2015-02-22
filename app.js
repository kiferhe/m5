// Creación del módulo
var angularRoutingApp = angular.module('ejemplo', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl	: 'pages/home.html',
			controller 	: 'mainController'
		})
		.when('/acerca', {
			templateUrl : 'pages/acerca.html',
			controller 	: 'aboutController'
		})
		.when('/contacto', {
			templateUrl : 'pages/contacto.html',
			controller 	: 'contactController'
		})
		.when('/phones/:phoneId', {
			templateUrl : 'pages/phone-detail.html',
			controller 	: 'PhoneDetailController'
		})
		.otherwise({
			redirectTo: '/'
		});
});


angularRoutingApp.controller('mainController', function($scope,$http,$interval,$timeout) {

	 var c=0;
      $scope.message="This DIV is refreshed "+c+" time.";
      var timer=$interval(function(){
        $scope.message="This DIV is refreshed "+c+" time.";
        c++;
      },100);
	$http.get('phones/phones.json').success(function(data) {
		$scope.phones = data;
	});
	  $scope.orderProp = 'age';
	
	var timer=$interval(function(){
		$scope.date = new Date();
      	 $scope.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];
      },1000);
	  
	$scope.fecha = new Date();
	$scope.fecha.setDate($scope.fecha.getDate()-1);
	
	$scope.hoy = new Date();
		
	
	$scope.ultimasemana = new Date();
	$scope.ultimasemana.setDate($scope.ultimasemana.getDate()-7);

 
    $scope.addTodo = function() {
      $scope.todos.push({text:$scope.todoText, done:false});
      $scope.todoText = '';
    };
 
    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    $scope.archive = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };
	
	
	
		
});



angularRoutingApp.controller('PhoneDetailController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
      $scope.phone = data;
	  $scope.mainImageUrl = data.images[2];

    });
	
	$scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);

angularRoutingApp.controller('aboutController', function($scope) {
	$scope.message = 'Esta es la página "Acerca de"';
});

angularRoutingApp.controller('contactController', function($scope) {
	$scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});