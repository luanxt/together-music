/* sails.config.app */

module.exports.app = {

	YOUTUBE: {
		API_KEY: [
			{
				/* LUANXT GET LINK KEY: 50.000.000 */
				key: "AIzaSyDSMEznksaAw9RPO_AE2vRdTLvF4Qw-XNY",
				expired: false,
			},
			{
				key: "AIzaSyBL5KGbYnBvUqaO0biNIO6GjZFupq5d3l8",
				expired: false,
			},
			{
				key: "AIzaSyB8x6H5YgpZH-8IAM26RjB9B5ocLAEeQ6g",
				expired: false,
			},
			{
				key: "AIzaSyDBKmvLJ7030xWAsjThGWHgW30ED2LM7s8",
				expired: false,
			},
			{
				key: "AIzaSyAFmuzaHTgJ_PPZFt2tXrvXRU1nSWd5V6Y",
				expired: false,
			}
		],
		SEARCH: {
			maxResults: 20
		},
	},

	ACCOUNT: {
		ADMIN: {username: "admin", password: "admin@123"},
	},

	SOCKET_EVENT: {
		MEDIA_LIST: {code: "MEDIA_LIST"},
		PLAY_NOW: {code: "PLAY_NOW"},
	},

	USER_ROLE: {
		ADMIN: 1,
		USER: 2,
	},

	LIMIT: {
		MAX_DISLIKE_INTERVAL: 3,
	},

	JWT_SECRET_KEY: "8af3bdf65790b7b337b7a61a6a3f2d29",
};