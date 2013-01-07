mailbot
=======

Mailbot is a minimal email server for your domain. It sits and listens for smtp requests with incoming mail, and lets you send email without relying on sendmail or postfix. 

Mailbot uses [MailParser](https://github.com/andris9/mailparser) to parse and conform emails to utf8 objects.

Setup
```
npm install mailparser
```

Edit index.js
```
var domain = "yourdomain.com";
```

```
var webport = 1337; //this is a simple webserver to see contents of db
```



Reference
=========
```
http://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol#SMTP_transport_example 
```

```
netcat ALT1.ASPMX.L.GOOGLE.COM 25
```
