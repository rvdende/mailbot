var mailbot = {}
mailbot.server = "mail.yourdomain.com" //this should be our server we are sending from (mx)

//EMAIL START
var email = {}
email.from = "test@yourdomain.com";
email.rcpt = "rouan@8bo.org";
email.data = 'From: "Test" <test@yourdomain.com>\n';
email.data += 'To: "Rouan van der Ende" <rouan@8bo.org>\n';
email.data += 'Date: Sun, 6 January 2013 23:25:23 +0200\n';
email.data += 'Subject: Test mail!\n';
email.data += '\nHello Rouan.\n';
email.data += 'Test maaaail incoming!\n\n\r\n.\r\n';
//EMAIL END

email.rcptdomain = email.rcpt;
email.rcptdomain = email.rcptdomain.slice(email.rcptdomain.indexOf('@')+1, email.rcptdomain.length);
console.log(email.rcptdomain)

var dns = require('dns');

var mx = []

dns.resolveMx(email.rcptdomain, function(err, data) {
  if (data) {
    mx = data;
    sendemail();
  }  
})

var smtpserver = {}
var sending = 0;
var wait = 1;
function sendemail() {
  console.log(mx[0].exchange)
  var net = require('net');
  var client = net.connect({host: mx[0].exchange, port: 25}, function() { //'connect' listener
    console.log('client connected');
    //client.write('world!\r\n');
  });

  client.on('data', function(data) {
    var datastr = data.toString();
    console.log('S:'+datastr);
    wait = 0;

    if (datastr.indexOf("220") == 0) { 
      smtpserver.host = datastr.slice(datastr.indexOf(' ')+1, datastr.indexOf('ESMTP')-1);
      var msg = 'HELO '+mailbot.server+'\n'
      console.log(msg); client.write(msg); wait = 1;
    };

    if ((datastr.indexOf("250") == 0)&&(sending==0)&&(wait==0)) { 
      var msg = 'MAIL FROM: <'+email.from+'>\n'
      console.log(msg); client.write(msg); 
      sending = 1; wait = 1;
    }

    if ((datastr.indexOf("250") == 0) && (sending==1)&&(wait==0)) {
      var msg = "RCPT TO:<"+email.rcpt+">\n";
      console.log(msg); client.write(msg);
      sending=2; wait = 1;
    }

    if ((datastr.indexOf("250")== 0) && (sending==2)&&(wait==0)) {
      var msg = "DATA\n";
      console.log(msg); client.write(msg);
      sending=3; wait = 1;
    }    
    
    if ((datastr.indexOf("354")== 0) && (sending==3)&&(wait==0)) {
      var msg = email.data;
      console.log(msg); client.write(msg);      
      sending=4; wait = 1;
    } 

    if ((datastr.indexOf("250")== 0) && (sending==4)&&(wait==0)) {
      var msg = "QUIT\n"
      console.log(msg); client.write(msg);
      sending=5; wait = 1;
    }        

    if ((datastr.indexOf("221")== 0) && (sending==5)&&(wait==0)) {
      console.log('END Successfully mailed it seems.');
      client.end();
    }        
  });
  
  client.on('end', function() {
    console.log('client disconnected');
  });
}

