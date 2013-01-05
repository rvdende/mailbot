mailbot
=======

Dead simple smtp server that can receive email.

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