myapp.factory('simplefactory' , function($http){
	
	var factory = {};
	
	factory.SearchPlayGrounds = function(game_type, location)
	{
		return	$http({
				url: 'http://localhost/angularreservation/api/search', 
				method: "GET",
				params: {location : location}
			 });
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