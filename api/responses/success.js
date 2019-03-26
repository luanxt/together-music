module.exports = function success(data) {

	let req = this.req;
	let res = this.res;
	let sails = req._sails;

	res.setHeader("Cache-Control", "no-cache, no-store");

    let returnData = {
        status: "SUCCESS",
        code: data.code,
        message: data.message,
        data: data.data
    };

    return res.json(returnData);
};