<?php


	$user_email = ($_GET['user_email']);
	$user_password = ($_GET['user_password']);
	$user_remember = $_GET['user_remember'];
	
	echo $user_email . $user_password;
	
	//echo login($user_email, $user_password, $user_remember);



function login()
{
}
?>