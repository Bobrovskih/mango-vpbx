
const app = require('express')();
const bodyParser = require('body-parser');

const VPBX = require('../index');

const vpbx = new VPBX();

const events = vpbx.events('http://example.com/mango-vpbx');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(events.call);
app.use(events.summary);
app.use(events.recording);
app.use(events.dtmf);
app.use(events.sms);
app.use(events.ping);

events.hear({ event: 'ping' }, e => console.log('yes!'));
events.hear({ event: 'ping', filter: { date: '>=0' } }, e => console.log('yes!'));
events.hear({ event: 'call' }, e => console.log(e));

events.on('data', e => console.log('on any events', e));

app.use((req, res) => res.status(404).send({ error: 'not found' }));
app.listen(8080);
