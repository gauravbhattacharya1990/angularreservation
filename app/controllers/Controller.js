//Controller to implement the search functionality
BookMeAGame.controller('SearchController', function ($scope , $routeParams, SearchFactory , $location)
{				
	$scope.SearchPlayGrounds = function(){
		$scope.loading=true;
		$scope.IsError=false;
		
		var game_type = $routeParams.game_type;
		var location = $routeParams.location;
		
		if(angular.isUndefined(location) || location=="")
		{
			$scope.loading=false;
			$scope.IsError=true;
			$scope.venues="";
			$scope.error = "Location is required. Please enter the locality you want to search.";
			return;
		}
		
		var PlayGrounds = SearchFactory.SearchPlayGrounds(game_type,location );
		
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
	};	
	
	$scope.SetSearchUrl = function(){
		var playground_location = $scope.location;
		var game_type = $scope.game_type;
		
		var preparedUrl = '/search/';
		
		if(angular.isUndefined(playground_location))
		{
			//Do not add it to url
		} else
		{
			preparedUrl = preparedUrl + playground_location + '/';
		}
		
		if(angular.isUndefined(game_type) || game_type == "")
		{
			//Do not add it to url
		} else
		{
			preparedUrl = preparedUrl + game_type + '/';
		}
		
		$location.url(preparedUrl);
	};
	
	
	//call the search function only if locality is present in url 
	if( !angular.isUndefined($routeParams.location))
	{
		$scope.SearchPlayGrounds();
	}
});
