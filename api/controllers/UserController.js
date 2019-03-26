/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let reponses = sails.config.responses;

module.exports = {

    loginUser: async function(req, res){
        let user = {
            userID: req.param("userID", "user00000"),
        };
        let loginData = await UserService.loginUser(req, user);
        return res.success({code: reponses.LOGIN_SUCCESS.code, message: reponses.LOGIN_SUCCESS.message, data: loginData});
    },

    loginAdmin: async function(req, res){
        let user = {
            userID: req.userData.userID,
            username: req.param("username", ""),
            password: req.param("password", ""),
        };
        let loginData = await UserService.loginAdmin(req, user);
        if (loginData.isLogged){
            return res.success({code: reponses.LOGIN_SUCCESS.code, message: reponses.LOGIN_SUCCESS.message, data: loginData});
        } else {
            return res.fail({code: reponses.LOGIN_FAIL.code, message: reponses.LOGIN_FAIL.message, data: loginData});
        }
    },

    changeName: async function(req, res){
        let user = {
            userID: req.userData.userID,
            fullname: req.param("fullname", "User 00000"),
        };
        let loginData = await UserService.changeName(req, user);
        return res.success({code: reponses.USER_CHANGE_NAME_SUCCESS.code, message: reponses.USER_CHANGE_NAME_SUCCESS.message, data: {}});
    },

    joinRoom: async function(req, res){
        if (req.isSocket){
            UserService.joinRoom(req, req.userData);
        }
        return res.success({code: 200, message: "", data: {}});
    },

    getAll: async function(req, res){
        let listData = UserService.getAll(req);
        /*sails.sockets.blast("lxt", { userList: userList });*/
        return res.success({code: 200, message: "Get data successfully!", data: listData});
    },

};

