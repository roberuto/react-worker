var events = require('events');
var eventEmitter = new events.EventEmitter();

export default function Worker() {
  console.log('FAKE WORKER!');
  this.postMessage = data => eventEmitter.emit('message', { data });

  this.addEventListener = (_, fn) => eventEmitter.on('message', e => fn(e));
  this.removeEventListener = jest.fn();
}
