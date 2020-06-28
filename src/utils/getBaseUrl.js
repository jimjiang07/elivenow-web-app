
export default function getBaseUrl() {
  return process.env.NODE_ENV === 'prd' ? 'https://api.elivenow.co/': 'http://localhost:4000/dev/';
}
