const call = {
	command_id: 1,
	from: {
		extension: 1,
		number: 1
	},
	to_number: 1,
	line_number: 1
};

const callGroup = {
	command_id: 1,
	from: 1,
	to: 1,
	line_number: 1
};

const hangup = {
	command_id: 1,
	call_id: 1
};

const route = {
	command_id: 1,
	call_id: 1,
	to_number: 1
};

const transfer = {
	command_id: 1,
	call_id: 1,
	method: 1,
	to_number: 1,
	initiator: 1
};

const sms = {
	command_id: 1,
	text: 1,
	from_extension: 1,
	to_number: 1,
	sms_sender: 1
};

const statsRequest = {
	date_from: 1,
	date_to: 1,
	fields: 1,
	from: {
		extension: 1,
		number: 1
	},
	to: {
		extension: 1,
		number: 1
	},
	call_party: {
		extension: 1,
		number: 1
	},
	request_id: 1
};

const statsResult = {
	key: 1
};

const users = {
	extension: 1
};

const recording = {
	action: 1,
	recording_id: 1
};

const recordingStart = {
	command_id: 1,
	call_id: 1,
	call_party_number: 1
};

const dctUserInfo = {
	number: 1
};

const dctUserHistory = {
	number: 1
};

module.exports = {
	call,
	callGroup,
	hangup,
	route,
	transfer,
	users,
	statsRequest,
	statsResult,
	recording,
	recordingStart,
	sms,
	dctUserInfo,
	dctUserHistory
};
