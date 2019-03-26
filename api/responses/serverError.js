module.exports = function serverError (data, options) {
	let req = this.req;
	let res = this.res;
	let sails = req._sails;

	return res.fail({code: 500, message: "Service is not available !", data: {}});
};

