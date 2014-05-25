//PlayGround home controller
BookMeAGame.controller('PlaygroundHomePage_Ctrl', function ($scope , $routeParams, simplefactory)
{					
	init();
		
	function init() {
        //Grab customerID off of the route        
        var playgroundURL = ($routeParams.playgroundURL) ;
        
        $scope.playground = 'value after doing an ajax call to : '+playgroundURL;
		
		console.log($scope.playground);
    }
}
);