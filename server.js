// Tiny static server, no dependencies beyond the MediaPipe package.
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 8000;
const PUB = path.join(__dirname, 'public');
const VENDOR = path.join(__dirname, 'node_modules', '@mediapipe', 'hands');
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json',
  '.wasm': 'application/wasm', '.mp3': 'audio/mpeg', '.tflite': 'application/octet-stream',
  '.binarypb': 'application/octet-stream', '.data': 'application/octet-stream'
};

if (!fs.existsSync(VENDOR)) {
  console.error('MediaPipe files not found. Run "npm install" first.');
  process.exit(1);
}

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/') url = '/index.html';
  const isVendor = url.startsWith('/vendor/');
  const root = isVendor ? VENDOR : PUB;
  const rel = isVendor ? url.slice('/vendor/'.length) : url.slice(1);
  const file = path.join(root, rel);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => {
  console.log('Thumb Beat running at http://localhost:' + PORT);
  console.log('Serving files from: ' + PUB);
});
