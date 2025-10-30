import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Test Server Running!</h1><p>If you see this, your localhost works fine.</p>');
});

server.listen(3002, '0.0.0.0', () => {
  console.log('Test server running at:');
  console.log('- http://localhost:3002');
  console.log('- http://127.0.0.1:3002');
  console.log('\nIf this works, the issue is with Next.js, not your network.');
});
