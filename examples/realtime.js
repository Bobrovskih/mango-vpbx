
const app = require('express')();

const VPBX = require('../index');

const vpbx = new VPBX();

const events = vpbx.events('http://localhost/endpoint/example');

app.use(events.call);
app.use(events.summary);
app.use(events.recording);
app.use(events.dtmf);
app.use(events.sms);

events.on('call', e => console.log('on events/call', e));
events.on('summary', e => console.log('on events/summary', e));
events.on('recording', e => console.log('on events/recording', e));
events.on('dtmf', e => console.log('on events/dtmf', e));
events.on('sms', e => console.log('on events/sms', e));

events.on('data', e => console.log('on any events', e));

app.use((req, res) => res.status(404).send({ error: 'not found' }));
