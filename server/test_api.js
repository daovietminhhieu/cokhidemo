const http = require('http');

const data = JSON.stringify({
  name: "Antigravity Tester",
  email: "tester@example.com",
  message: "Testing logs and emails from Node script"
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/local/user/send-contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('BODY:', body);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
