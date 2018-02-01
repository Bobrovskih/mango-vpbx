
const app = require('express')();
const bodyParser = require('body-parser');

const VPBX = require('../index');

const vpbx = new VPBX();


const events = vpbx.events('http://example.com/mango-vpbx');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(events.all);

events.hear({ event: 'ping' }, e => console.log('ping works!'));
events.hear({ event: 'call' }, e => console.log('call event', e.location, e.call_state));
events.hear({ event: 'summary', call_direction: '2' }, e => console.log('завершился исходящий звонок', e.entry_id));
events.hear({ event: 'summary', call_direction: '1' }, e => console.log('завершился входящий звонок. длительность ', e.entry_result && (e.end_time - e.talk_time), 'секунд'));

events.hear({ event: 'recording', recording_state: 'Completed', completion_code: '1000' }, e => console.log('новая запись разговора!', e.recording_id));
events.hear({ event: 'dtmf' }, e => console.log('донабор в голосовом меню ', e.dtmf));
events.hear({ event: 'sms', result: '1000' }, e => console.log('смс успешно отправлено ', e.command_id));
events.hear({ event: 'callback', result: '1000' }, e => console.log('звонок успешно создан', e.command_id));
events.hear({ event: 'stats' }, e => console.log('статистика подготовлена ', e.key));

app.use((req, res) => res.status(404).send({ error: 'not found' }));
app.listen(80);
