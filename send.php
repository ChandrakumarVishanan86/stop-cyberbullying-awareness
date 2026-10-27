<?php
if (_SERVER["REQUEST_METHOD"] == "POST")to = "chandrakumarvishanan0@gmail.com"; // உங்கள் email
    name =_POST['name'];
    email =_POST['email'];
    message =_POST['message'];

    subject = "New Message fromname";
    body = "Name:name\nEmail: email:message";
	headers = "From:email";

    if (mail(to,subject, body,headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Message sending failed.";
    }
}
?>