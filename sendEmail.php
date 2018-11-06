<?php
    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $enquiry = $_POST['enquiry'];
    $budget = $_POST['budget'];

    $emailTo = 'hello@conceptai.co.uk';
    $emailSubject = 'Conceptai Enquiry';

    $message = '
    <html>
        <head>
            <title>Conceptai Enquiry</title>
        </head>
        <body>
            <p>Hi Conceptai, you have had an enquiry from ' . $name . ' of ' . $company . '.</p>
            <p>' . $name . ' is interested in the following: ' . $subject . '.</p>
            <p>Their email is ' . $email . ' and their phone number is ' . $phone . '.</p>
            <p>They have a budget of ' . $budget . ' and here is their enquiry:</p> 
            <p>' . $enquiry . '</p>
        </body>
    </html>
    ';

    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // More headers
    $headers .= 'From: <conceptai.co.uk>' . "\r\n";

    mail($emailTo, $emailSubject, $message, $headers);

    echo '{"status": 1}';