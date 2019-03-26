/**
* is-user
*/
module.exports = async function (req, res, proceed) {
  let responses = sails.config.responses;

  /* CHECK LOGGED IN */
  if (_.isEmpty(req.headers.authorization)){
    return res.fail({code: responses.NOT_AUTHORIZED.code, message: responses.NOT_AUTHORIZED.message, data: {}});
  } else {
    try {
        /* REMOVE Bearer IF EXISTED */
        if (req.headers.authorization.toLowerCase().indexOf("bearer ") !== -1){
          req.headers.authorization = req.headers.authorization.substring(7);
        }

        /* PARSE USER OBJECT */
        let jwt = require("jsonwebtoken");
        let jwtData = jwt.verify(req.headers.authorization, sails.config.app.JWT_SECRET_KEY);

        req["userData"] = jwtData.userData; /* SET USER DATA TO REQUEST TO USE GLOBAL */
        return proceed();
    } catch(err) {
      return res.fail({code: responses.NOT_AUTHORIZED.code, message: responses.NOT_AUTHORIZED.message, data: {}});
    }
  }
  /* END */
};
