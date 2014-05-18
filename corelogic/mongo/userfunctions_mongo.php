<?php
include_once('_includes.php');

$users = $db->Users;
$reservations = $db->Reservations;

// Configuration

function get_configuration($data)
{
	
}

// Get attribute function

function get_user_attribute($attribute , $_id)
{
	global $users;
	
	$user = $users->findOne( array('_id' => $_id) );
		
	return $user[$attribute];
}

function user_email_exists($user_email)
{
	$userQuery = array('User_email' => $user_email);
	
	global $users;

	return $users->count($userQuery);
}

// User Login

function get_login_data($data)
{
	if($data == 'user_email' && isset($_COOKIE[global_cookie_prefix . '_user_email']))
	{
		return($_COOKIE[global_cookie_prefix . '_user_email']);
	}
	elseif($data == 'user_password' && isset($_COOKIE[global_cookie_prefix . '_user_password']))
	{
		return($_COOKIE[global_cookie_prefix . '_user_password']);
	}
}

function login($user_email, $user_password, $user_remember)
{
	//logout();
	if(isset($_SESSION['logged_in']))
	{
		return 1;
	}
	
	global $users;
	
	$user_password_encrypted = encrypt_password($user_password);
	$user_password = add_salt($user_password);
	
	$userQuery = array('User_email' => $user_email , 'User_password' => $user_password_encrypted);
	
	$count = $users->count($userQuery);

	if($count == 1)
	{
			$user = $users->findOne(array('User_email' => $user_email));

			$_SESSION['user_id'] = $user['_id'];
			$_SESSION['user_is_admin'] = 1;
			$_SESSION['user_email'] = $user['User_email'];
			$_SESSION['user_name'] = $user['User_name'];
			$_SESSION['logged_in'] = '1';
			
			if($user_remember == '1')
			{
				$user_password = strip_salt($user['User_password']);

				setcookie(global_cookie_prefix . '_user_email', $user['User_email'], time() + 3600 * 24 * intval(global_remember_login_days));
				//setcookie(global_cookie_prefix . '_user_password', $user_password_encrypted, time() + 3600 * 24 * intval(global_remember_login_days));
			}

			return(1);
	}
}

function check_login()
{
	if(isset($_SESSION['logged_in']))
	{
		return true;
	}
	else
	{	
		logout();
		echo '<script type="text/javascript">window.location.replace(\'.\');</script>';
	}
}

function check_user_login()
{	
	if(isset($_SESSION['logged_in']) )
	{
		if(isset($_SESSION['logged_in_as_playground']) )
		{
			return false;
		}
		return true;
	}
	return false;
}

function logout()
{
	session_unset();
	setcookie(global_cookie_prefix . '_user_email', '', time() - 3600);
	setcookie(global_cookie_prefix . '_user_password', '', time() - 3600);
	setcookie(global_cookie_prefix . '_playground_email', '', time() - 3600);
	setcookie(global_cookie_prefix . '_playground_password', '', time() - 3600);
}

function create_user($user_name, $user_email, $user_password, $user_secret_code)
{
	global $users;
	
	if(validate_email($user_email) != true)
	{
		return('<span class="error_span">Email must be a valid email address and be no more than 50 characters long</span>');
	}
	elseif(validate_user_password($user_password) != true)
	{
		return('<span class="error_span">Password must be at least 4 characters</span>');
	}
	elseif(user_email_exists($user_email) == true)
	{
		return('<span class="error_span">Email is already registered. <a href="#forgot_password">Forgot your password?</a></span>');
	}
	else
	{
		$user = array(
			"User_name" => $user_name, 
			"User_email" => $user_email,
			"User_password" => encrypt_password($user_password)
			);

		$users->insert($user);

		$user_password = strip_salt($user_password);

		setcookie(global_cookie_prefix . '_user_email', $user_email, time() + 3600 * 24 * intval(global_remember_login_days));
		setcookie(global_cookie_prefix . '_user_password', $user_password, time() + 3600 * 24 * intval(global_remember_login_days));

		return(1);
	}
}

function list_admin_users()
{
	
}

// Admin control panel

function list_users()
{
	
}

function reset_user_password($user_id)
{
	$password = random_password();
	$password_encrypted = encrypt_password($password);

	//Email the password
}

function change_user_permissions($user_id)
{
}

function delete_user_data($user_id, $data)
{
	
}

function delete_all($data)
{
}

function save_system_configuration($price)
{
	
}

// User control panel

function get_usage()
{
}

function count_reservations($user_id)
{
}

function cost_reservations($user_id)
{
}

function get_reservation_reminders()
{
}

function toggle_reservation_reminder()
{
}

function change_user_details($user_name, $user_email, $user_password)
{
	$user_id = $_SESSION['user_id'];

	if(validate_email($user_email) != true)
	{
		return('<span class="error_span">Email must be a valid email address and be no more than 50 characters long</span>');
	}
	elseif(validate_user_password($user_password) != true && !empty($user_password))
	{
		return('<span class="error_span">Password must be at least 4 characters</span>');
	}
	elseif(user_name_exists($user_name) == true && $user_name != $_SESSION['user_name'])
	{
		return('<span class="error_span">Name is already in use. If you have the same name as someone else, use another spelling that identifies you</span>');
	}
	elseif(user_email_exists($user_email) == true && $user_email != $_SESSION['user_email'])
	{
		return('<span class="error_span">Email is already registered</span>');
	}
	else
	{
		if(empty($user_password))
		{
			mysql_query("UPDATE " . global_mysql_users_table . " SET user_name='$user_name', user_email='$user_email' WHERE user_id='$user_id'")or die('<span class="error_span"><u>MySQL error:</u> ' . htmlspecialchars(mysql_error()) . '</span>');
		}
		else
		{
			$user_password = encrypt_password($user_password);

			mysql_query("UPDATE " . global_mysql_users_table . " SET user_name='$user_name', user_email='$user_email', user_password='$user_password' WHERE user_id='$user_id'")or die('<span class="error_span"><u>MySQL error:</u> ' . htmlspecialchars(mysql_error()) . '</span>');
		}

		mysql_query("UPDATE " . global_mysql_reservations_table . " SET reservation_user_name='$user_name', reservation_user_email='$user_email' WHERE reservation_user_id='$user_id'")or die('<span class="error_span"><u>MySQL error:</u> ' . htmlspecialchars(mysql_error()) . '</span>');

		$_SESSION['user_name'] = $user_name;
		$_SESSION['user_email'] = $user_email;

		$user_password = strip_salt($user_password);

		setcookie(global_cookie_prefix . '_user_email', $user_email, time() + 3600 * 24 * intval(global_remember_login_days));
		setcookie(global_cookie_prefix . '_user_password', $user_password, time() + 3600 * 24 * intval(global_remember_login_days));

		return(1);
	}
}

?>
