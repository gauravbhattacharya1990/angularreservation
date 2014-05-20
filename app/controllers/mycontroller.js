myapp.controller('myController', function ($scope , $routeParams, simplefactory)
{	
				
	$scope.SearchPlayGrounds = function(){
		$scope.loading=true;
		$scope.IsError=false;
		
		var PlayGrounds = simplefactory.SearchPlayGrounds($scope.game_type, $scope.location);
		
		if(angular.isUndefined($scope.location))
		{
			$scope.loading=false;
			$scope.IsError=true;
			$scope.venues="";
			$scope.error = "Location is required. Please enter the locality you want to search.";
			return;
		}
		
		PlayGrounds.success(
		function(data) {
		$scope.venues = data;
		$scope.loading=false;
		if(data.length<=0)
			{
				$scope.IsError=true;
				$scope.error="Your search returned no results. Please modify your query";
			}
		}
		);
		
		PlayGrounds.error(
		function(data) {
		$scope.loading=false;
		$scope.IsError=true;
		$scope.error=data.message;
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
