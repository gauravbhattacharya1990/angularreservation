<?php
require 'Slim/Slim.php';
require 'include.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$app->response->headers->set('Content-Type', 'application/json');

// GET route

$app->get('/',function(){
echo "Api home";
});

$app->get('/search',function() use ($app){

$query = $app->request()->get('q');
$game_type = trim($app->request()->get('game_type'));
$location = trim($app->request()->get('location'));

$result = list_playgrounds_by_sports_location($game_type,$location);

if($result == '')
{
	$app->response()->status(400);
	$result=array();
	$result['message'] = 'Your search returned no results. Please modify your query';
}

echo json_encode($result);
});

 

$app->get('/hello/:name', function ($name) {
    echo "Hello, $name";
});

// POST route
$app->post(
    '/post',
    function () {
        echo 'This is a POST route';
    }
);

// PUT route
$app->put(
    '/put',
    function () {
        echo 'This is a PUT route';
    }
);

// PATCH route
$app->patch('/patch', function () {
    echo 'This is a PATCH route';
});

// DELETE route
$app->delete(
    '/delete',
    function () {
        echo 'This is a DELETE route';
    }
);

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
