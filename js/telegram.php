<?php

/* https://api.telegram.org/bot1904097098:AAE8bo-__FgDXwqgsMXFFnqMac4ydnjSCP8/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

header('Content-type: text/html; charset=utf-8');
$name = $_POST['user_name'];
$phone = $_POST['phone'];
$formatPhone = str_replace('+','',$phone);
$title = '%F0%9F%98%8D%F0%9F%98%8D%F0%9F%98%8D';
// $email = $_POST['user_email'];
// $message = $POST['message'];
$token = "1904097098:AAE8bo-__FgDXwqgsMXFFnqMac4ydnjSCP8";
$chat_id = "-572970716";
$arr = array(
  'Заявка на технику Truvox!!! ' => $title,
  'Имя клиента: ' => $name,
  // 'E-mail: ' => $user_email,
  'Номер телефона: %2B' => $formatPhone,
  // 'Текст сообщения: ' => $message
);
$err_message = '';

// if (empty($phone)) {
//   $err_message .= "Заполните поле!";    
// } 

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};



$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");



?>