<?php
	$url = 'https://accounts.spotify.com/api/token';
	$data = array('grant_type' => 'refresh_token',
	'refresh_token' => 'YOUR_REFRESH_TOKEN');

	// request auth code
	// NOTE: you have to prepare the base64 encode yourself.
	$options = array(
		'http' => array(
			'header'  => ("Authorization: Basic BASE64ENCODE(CLIENT_ID:CLIENT_SECRET)\r\n"),
			'method'  => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context  = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
	if ($result === FALSE) { /* Handle error */ }
	header('Content-Type: application/json');
	echo($result);
?>