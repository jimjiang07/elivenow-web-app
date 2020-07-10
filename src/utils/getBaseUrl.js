
export default function getBaseUrl() {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:4000/dev/' : 'https://api.elivenow.co/';
}
