module.exports = function unauthorized (data, options) {
	let req = this.req;
	let res = this.res;
	let sails = req._sails;

	res.setHeader("Cache-Control", "no-cache, no-store");

	return res.fail({code: 401, message: "Unauthorized !", data: {}});
};

