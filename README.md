mailbot
=======

Mailbot is a minimal email sender for your server.

Usage
=====

```javascript
var mailbot = require('./lib/email')

// set to true to enable debug logging
// this is useful to see if the remote server responds with some kind of error message
mailbot.debug = false;	

// construct the email
var email = {}
email.from = "noreply@yourdomain.com";		// Your email address
email.fromname = "Mailbot";					// Your name

email.rcpt = "santa@northpole.com";			// The target email
email.rcptname = "Santa Claus";				// The target person

email.subject = "Debug test four";			// Subject summary

// The main part of the email. 
email.body = "email message body content\r\nAnother line of content";					

// Send it.
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
