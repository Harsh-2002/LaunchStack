const { ensureHttpsProtocol, formatUrlForDisplay, isValidUrl } = require('./lib/url-utils.ts');

// Test cases
const testUrls = [
  'https://prod.n8n.example.com',
  'dev.n8n.example.com',
  'test.n8n.example.com',
  'https://https://double-protocol.com',
  'http://insecure.com',
  'ftp://ftp.example.com',
  ''
];

console.log('Testing URL utilities:');
console.log('====================');

testUrls.forEach(url => {
  console.log(`\nOriginal: ${url}`);
  console.log(`Ensure HTTPS: ${ensureHttpsProtocol(url)}`);
  console.log(`Display: ${formatUrlForDisplay(url)}`);
  console.log(`Valid: ${isValidUrl(url)}`);
});
