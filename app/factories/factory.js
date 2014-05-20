myapp.factory('simplefactory' , function($http){
	
	var factory = {};
	
	factory.SearchPlayGrounds = function(game_type, location)
	{
		 return	$http({
				url: 'http://localhost/angularreservation/api/search', 
				method: "GET",
				params: {location : location, game_type : game_type}
			 }); 
			 
/*			return {
					var promise= $http({
					url: 'http://localhost/angularreservation/api/search', 
					method: "GET",
					params: {location : location}
					}).then(function(response) {
								return response;  

					});
					return promise;
				}*/
	}
	
	factory.login = function(email,password)
	{
		//console.log(email);
		return	$http({
				url: 'http://localhost/angularreservation/login.php', 
				method: "GET",
				params: {user_email : email, user_password : password ,user_remember :'1'}
			 });
	}
	return factory;
});


/*myapp.factory('simplefactory' , function($http){
	
	//var factory = {};
	return{
	'SearchPlayGrounds':function(game_type, location){
	//factory.SearchPlayGrounds = function(game_type, location){
		/* return	$http({
				url: 'http://localhost/angularreservation/api/search', 
				method: "GET",
				params: {location : location}
			 }); */
			 
/*			{  var promise=$http({
					url: 'http://localhost/angularreservation/api/search', 
					method: "GET",
					params: {location : location}
					}).then(function(response) {
								return response;  

					});
					return promise;
				
		}
		//return factory;
		}
	}
	}
	);*/