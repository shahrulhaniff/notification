<?php
/*
function sendPushNotification($to = '', $data = array()){
	$apiKey = 'AIzaSyBUel9InvOxO1uJ58imSkQsDSxCqt4jcPQ';
	$fields = array( 'to' => $to, 'notification' => $data);
	
	$headers = array ('Authorization: key='.$apiKey, 'Content-Type: application/json');
	
	$url = 'https://fcm.googleapis.com/fcm/send';
	
	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_URL, $url );
	curl_setopt( $ch, CURLOPT_POST, true);
	curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	
	curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
	curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode($fields));
	$result = curl_exec($ch);
	curl_close($ch);
	return json_decode($result, true);
}

$to ="blablabla";
$data = array(
	'title'=> 'First testing melalui php',
	'body' => 'New Message'
);
print_r(sendPushNotification($to, $data)); */
$notification->setTitle($title);
$notification->setMessage($message);
$firebase_api = 'AIzaSyBUel9InvOxO1uJ58imSkQsDSxCqt4jcPQ';
$topic = 'group1';
$requestData = $notification->getNotification();
$fields = array(
	'to' => '/topics'.$topic,
	'data' => $requestData,
);

$url = 'https://fcm.googleapis.com/fcm/send';
$headers = array ('Authorization: key='.$apiKey, 'Content-Type: application/json');
	
?>