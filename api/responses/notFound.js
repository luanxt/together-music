module.exports = function notFound (data, options) {
	let req = this.req;
	let res = this.res;
	let sails = req._sails;

	return res.fail({code: 404, message: "Not found !", data: {}});
};

