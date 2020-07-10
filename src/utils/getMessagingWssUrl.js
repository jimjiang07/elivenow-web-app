export default function getMessagingWssUrl() {
  return process.env.NODE_ENV === 'development' ? 'ws://localhost:4001/' : 'wss://ws.elivenow.co/';
}
