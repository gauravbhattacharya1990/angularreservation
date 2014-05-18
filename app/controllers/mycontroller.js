myapp.controller('myController', function ($scope , $routeParams, simplefactory)
{	
var venues = [
					{'name':'Playmania' , 'locality':'Bellandur' , 'address':'Outer Ring road bellandur' , 'game_type':'badminton' , 'price':'200'},
					{'name':'Playmania' , 'locality':'Bellandur' , 'address':'Outer Ring road bellandur' , 'game_type':'Football' , 'price':'750'},
					{'name':'Glow tennis' , 'locality':'Bellandur' , 'address':'Outer Ring road bellandur' , 'game_type':'badminton', 'price':'250'},
					{'name':'My Badminton' , 'locality':'Bellandur' , 'address':'Outer Ring road bellandur' , 'game_type':'badminton', 'price':'200'},
				];
				
	init();
		
	function init() {
        //Grab customerID off of the route        
        var playgroundURL = ($routeParams.playgroundURL) ;
        
        $scope.playground = 'value after doing an ajax call to : '+playgroundURL;
		
		console.log($scope.playground);
    }
				
	$scope.SearchPlayGrounds = function(){
		$scope.loading=true;
		
		var PlayGrounds = simplefactory.SearchPlayGrounds($scope.game_type, $scope.location);
		
		if( angular.isUndefined($scope.game_type) && angular.isUndefined($scope.game_location) )
		{
			$scope.loading=false;
			$scope.venues="";
			$scope.error = "You need to enter at least location to search!";
			return;
		}
		
		PlayGrounds.success(
		function(data) {
		$scope.venues = data;
		$scope.loading=false;
		}
		);
		
		//if($scope.game_type == "" && $scope.game_location == "")
		//{
		//	$scope.venues = "";
		//	return;
		//}
		//else
		//{
		//	$scope.error = "Please fill at least one criteria.";
		//	return false;
		//}

		//$scope.venues = simplefactory.SearchGamesByLocation($scope.game_type,$scope.game_location);
		//$scope.venues = simplefactory.getVenues($scope.game_type , $scope.game_location);
		//$scope.venues = venues;
	
	}
	
	$scope.login = function(){
		//$scope.user = {};
		//console.log($scope.user.email );
		var req = simplefactory.login($scope.user.email , $scope.user.password);
		
		req.success(
		function(data) {
		$scope.emailpassword = data;
		}
		);
	}
	
	//$scope.error ="No results obtained , please modify query";
	$scope.user = {};
	$scope.user.error = 'Authentication failed';
	
});
