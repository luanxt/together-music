/* UserService */

let appConfigs = sails.config.app;

let userList = {};
let socketList = {};

module.exports = {

    loginAdmin: async function(req, user){
        let returnData = {isLogged: false};
        try {
            if (user.username.toLowerCase() == appConfigs.ACCOUNT.ADMIN.username && user.password == appConfigs.ACCOUNT.ADMIN.password){
                if (userList.hasOwnProperty(user.userID)){
                    userList[user.userID].roleID = sails.config.app.USER_ROLE.ADMIN;
                    returnData.isLogged = true;
                    /* ADD ALLOWED CONNECTION */
                    await AppService.addAllowedConnection(req, req.userData.ip);
                    await AppService.getAllAllowedConnections(req); /* RESET LIST */
                }
            }
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    loginUser: async function(req, user){
        let returnData = {authorization: "", userData: {}};
        try {
            let jwt = require("jsonwebtoken");
            returnData.authorization = jwt.sign({
                userData: {
                    userID: user.userID,
                    ip: user.ip
                }},
            appConfigs.JWT_SECRET_KEY);

            /* ADD USER TO USER LIST */
            returnData.userData = UserService.addUser(req, user);
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    /* INPUT: userID */
    /* OUTPUT: userID, roleID, fullname */
    addUser: function(req, user){
        try {
            if (!userList.hasOwnProperty(user.userID)){
                user.roleID = sails.config.app.USER_ROLE.USER;
                /* FOR DEMO ONLY */
                if (user.userID == "admin-demo"){
                    user.roleID = sails.config.app.USER_ROLE.ADMIN;
                }
                /* END */
                user.fullname = ("Guest-" + UtilsService.padZeroNumber((Object.keys(userList).length + 1), 3));

                userList[user.userID] = user;
            }
            return userList[user.userID];
        } catch (err) {
            console.log(err);
        }
        return {};
    },

    joinRoom: function(req, user){
        try {
            sails.sockets.join(req, user.userID, function(err) {
                socketList[sails.sockets.getId(req)] = user.userID;
            });
        } catch (err) {
            console.log(err);
        }
        return {};
    },

    logout: function(req, user){
        let returnData = {isLogged: true};
        try {
            if (userList.hasOwnProperty(user.userID)){
                userList[user.userID].roleID = sails.config.app.USER_ROLE.USER;
                returnData.isLogged = false;
            }
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    removeSocketID: function(socketID){
        try {
            delete socketList[socketID];
        } catch (err) {
            console.log(err);
        }
    },

    removeUserByID: function(req, user){
        try {
            delete userList[user.userID];
        } catch (err) {
            console.log(err);
        }
    },

    removeAllUsers: function(req, user){
        try {
            userList = {};
        } catch (err) {
            console.log(err);
        }
    },

    changeName: function(req, user){
        try {
            userList[user.userID].fullname = user.fullname;
        } catch (err) {
            console.log(err);
        }
    },

    getUserList: function(){
        return userList;
    },

    setUserList: function(newUserList){
        userList = newUserList;
    },

    getSocketList: function(){
        return socketList;
    },

    getAll: function(req){
        try {
            /* sockets: {}, connected: {}, rooms: [] */
            /*sails.sockets.broadcast("user-id-001", "lxt", {fullname: "LXT"});*/
            let sockets = sails.io.sockets.clients();
            return {userList: userList, socketList: socketList, online: Object.keys(sockets.sockets).length};
        } catch (err) {
            console.log(err);
        }
    },

};