//ArrowMailBot v1
//very simple smtp server in nodejs
var domain = "yourdomain.com";
var webport = 1337; //this is a simple webserver to see contents of db

var db = []; //to store mails

var net = require('net');

var mailbot = net.createServer(function (socket) {
    //implements the hand shaking required to recieve emails
	socket.write('220 '+domain+' ESMTP ArrowMailbot\n')
	var incmail = {}
	var recievingdata = false;
	incmail.rcpt = [];
	incmail.message = "";
    socket.on("data", function(data) {
        var datastr = data.toString();
        if (datastr.indexOf("EHLO") == 0) {
        	incmail.client = datastr.slice(5,datastr.length)
        	incmail.client = incmail.client.replace(/(\r\n|\n|\r)/gm," "); //CLEAN
        	socket.write('250 Hello '+incmail.client+', whats up?\n')
        }

        if (datastr.indexOf("MAIL FROM:") == 0) {
        	incmail.from = datastr.slice(datastr.indexOf("<")+1, datastr.indexOf(">"))
        	incmail.from = incmail.from.replace(/(\r\n|\n|\r)/gm," ");
        	socket.write('250 Ok\n')
        }

        if(datastr.indexOf("RCPT TO:") == 0) {
        	var rcpt = datastr.slice(datastr.indexOf("<")+1, datastr.indexOf(">"))
        	incmail.rcpt.push(rcpt);
        	socket.write('250 Ok\n')	
        }

        if(datastr.indexOf("DATA") == 0) {
        	recievingdata = true;
        	socket.write('354 End data with <CR><LF>.<CR><LF>\n');
        }

        if (recievingdata == true) { incmail.message += datastr; }

        if (datastr.indexOf("\r\n.\r\n") >= 0) {
        	recievingdata = false;
        	socket.write('250 Ok: queued as 12345\n')	
        	db.push(incmail)
        	console.log('recieved an email!')
        }

		if (datastr.indexOf("QUIT") == 0) {
        	socket.write('221 Bye\n')	
        	socket.end();

        }

    });
});

mailbot.listen(25, domain);

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(JSON.stringify(db));
  res.end('\n');
}).listen(webport, domain);
console.log('Server running at http://'+domain+':1337/');




