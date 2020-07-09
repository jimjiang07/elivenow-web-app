export default function getMessagingWssUrl() {
  return process.env.NODE_ENV === 'prd' ? 'https://socket.elivenow.co/': 'ws://localhost:4001';
}
