module.exports = function fail(data) {

	let req = this.req;
	let res = this.res;
	let sails = req._sails;

	res.setHeader("Cache-Control", "no-cache, no-store");

	let returnData = {
		status: "FAIL",
		code: data.code,
		message: data.message,
		data: data.data
	};

	return res.json(returnData);

};