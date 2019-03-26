module.exports = function forbidden (data, options) {
	let req = this.req;
	let res = this.res;
	let sails = req._sails;

	return res.fail({code: 403, message: "Forbidden !", data: {}});
};