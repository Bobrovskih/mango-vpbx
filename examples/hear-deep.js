
const app = require('express')();
const bodyParser = require('body-parser');

const VPBX = require('../');

const vpbx = new VPBX();

const events = vpbx.events('http://example.com/mango-vpbx');
events.hear({ event: 'call', to: { acd_group: '22', extension: '101' }, seq: '1' }, e => console.log('call event to group 22, to extension 101, sequence 1: ', e.location, e.call_state));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(events.all);
app.use((req, res) => res.status(404).send({ error: 'not found' }));
app.listen(80);
