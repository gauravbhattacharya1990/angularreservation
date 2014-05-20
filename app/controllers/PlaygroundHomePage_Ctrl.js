myapp.controller('PlaygroundHomePage_Ctrl', function ($scope , $routeParams, simplefactory)
{	
/*var venues = [/* 
					{'name':'Playmania' , 'locality':'Bellandur' , 'address':'Outer Ring road bellandur' , 'game_type':'badminton' , 'price':'200'},
					{'name':'Playmania' , 'locality':'Bellandur' , 'address':'Outer Ring road bellandur' , 'game_type':'Football' , 'price':'750'},
					{'name':'Glow tennis' , 'locality':'Bellandur' , 'address':'Outer Ring road bellandur' , 'game_type':'badminton', 'price':'250'},
					{'name':'My Badminton' , 'locality':'Bellandur' , 'address':'Outer Ring road bellandur' , 'game_type':'badminton', 'price':'200'}, 
				];*/
				
	init();
		
	function init() {
        //Grab customerID off of the route        
        var playgroundURL = ($routeParams.playgroundURL) ;
        
        $scope.playground = 'value after doing an ajax call to : '+playgroundURL;
		
		console.log($scope.playground);
    }
}
);