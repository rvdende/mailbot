mailbot
=======

Mailbot is a minimal email sender for your server.

Usage
=====

```
var mailbot = require('./lib/email')

// set to true to enable debug logging
// this is useful to see if the remote server responds with some kind of error message
mailbot.debug = false;	

// construct the email
var email = {}
email.from = "noreply@yourdomain.com";		// Your email address. ex. "you@yourdomain.com";
email.fromname = "Mailbot";					// Your name ex. "John Doe"

email.rcpt = "santa@northpole.com";			// The target email address ex. "santa@northpole.com"
email.rcptname = "Santa Claus";				// The target person's name ex. "Santa Claus"

email.subject = "Debug test four";			// The short subject line of the email. "Email Subject"
email.body = "last test";					// The main part of the email. "email message body content\r\nAnother line of content"

mailbot.sendemail(email, function (data) {
	console.log("EMAIL SENT")
})
```




Reference
=========
```
http://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol#SMTP_transport_example 
```

```
netcat ALT1.ASPMX.L.GOOGLE.COM 25
```
