<?php

$email = $_POST['email'];
$emailTo = 'hello@conceptai.co.uk';
$emailSubject = 'Conceptai Newsletter Signup';

$message = '
<html>
    <head>
        <title>Conceptai Enquiry</title>
    </head>
    <body>
        <p>Hi Conceptai, .</p>
        <p>Please sign up ' . $email . ' to your newsletter.</p>
    </body>
</html>
';

$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <conceptai.co.uk>' . "\r\n";

mail($emailTo, $emailSubject, $message, $headers);

echo '{"status": 1}';