const base = 'https://app.mango-office.ru/vpbx/';

/**
 * суфиксы url-ов для API команд
 */
const suffix = {
	call: 'commands/callback',
	callGroup: 'commands/callback_group',
	hangup: 'commands/call/hangup',
	route: 'commands/route',
	transfer: 'commands/transfer',
	users: 'config/users/request',
	statsRequest: 'stats/request',
	statsResult: 'stats/result',
	recordingPost: 'queries/recording/post',
	recordingLink: 'queries/recording/link',
	recordingStart: 'commands/recording/start',
	sms: 'commands/sms',
	dctUserInfo: 'queries/user_info_by_dct_number',
	dctUserHistory: 'queries/user_history_by_dct_number'
};

const realtime = {
	call: 'events/call',
	recording: 'events/recording',
	dtmf: 'events/dtmf',
	summary: 'events/summary',
	sms: 'result/sms',
	callback: 'result/callback',
	stats: 'result/stat',
	ping: 'ping'
};

module.exports = {
	base,
	suffix,
	realtime
};
