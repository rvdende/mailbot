mailbot
=======

Dead simple smtp server that can receive email. And now send mail as well.
index.js is for listening for incoming emails on port 25. You'll need to modify it for saving it somewhere.
sender.js can now send emails to smtp servers. make sure to set up your domains and everything before trying to send. Make sure you still have the smtp protocol \r\n.\r\n for end of message.

Setup
```
var domain = "yourdomain.com";
```

Web interface
```
var webport = 1337; //this is a simple webserver to see contents of db
```

Incoming emails are pushed into db = [] in this format:

```
[{	
	"rcpt":["you@yourdomain.com"],			// who is this mail for
	"message":"...",						// email data in all its raw glory
	"client":"mail-ie0-f171.google.com ", 	// where did the mail come from
	"from":"bill@google.com" 				// who sent it
},{..]
```

Run it. This listens on port 25.

```
sudo node index.js
```

So far working and tested with gmail.

Reference
=========
```
http://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol#SMTP_transport_example 
```

```
netcat ALT1.ASPMX.L.GOOGLE.COM 25
```