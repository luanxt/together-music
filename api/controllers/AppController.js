/**
* AppController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/

let reponses = sails.config.responses;

module.exports = {

    searchYouTube: async function(req, res){
        let keyword = req.param("keyword", "");
        let returnData = await AppService.searchYouTube(req, keyword);
        switch (returnData.code){
            case "CONNECTION_NOT_ALLOWED":
                return res.fail({code: reponses.CONNECTION_NOT_ALLOWED.code, message: reponses.CONNECTION_NOT_ALLOWED.message, data: {}});
            default:
                return res.success({code: reponses.GET_DATA_SUCCESS.code, message: reponses.GET_DATA_SUCCESS.message, data: returnData.data});
        }
    },

    likeMedia: async function(req, res){
        let media = req.param("media", {});
        let returnData = AppService.likeMedia(req, req.userData.userID, media);
        switch (returnData.code){
            case "SUCCESS":
                AppService.sendMediaListToAllRooms();
                return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: reponses.UPDATE_DATA_SUCCESS.message, data: {}});
            case "BANNED":
                return res.fail({code: reponses.MEDIA_BANNED.code, message: reponses.MEDIA_BANNED.message, data: {}});
            case "CONNECTION_NOT_ALLOWED":
                return res.fail({code: reponses.CONNECTION_NOT_ALLOWED.code, message: reponses.CONNECTION_NOT_ALLOWED.message, data: {}});
            default:
                return res.fail({code: reponses.UPDATE_DATA_FAIL.code, message: reponses.UPDATE_DATA_FAIL.message, data: {}});
        }
    },

    dislikeMedia: async function(req, res){
        let media = req.param("media", {});
        let returnData = AppService.dislikeMedia(req, req.userData.userID, media);
        switch (returnData.code){
            case "SUCCESS":
                AppService.sendMediaListToAllRooms();
                return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: reponses.UPDATE_DATA_SUCCESS.message, data: {}});
            case "CONNECTION_NOT_ALLOWED":
                return res.fail({code: reponses.CONNECTION_NOT_ALLOWED.code, message: reponses.CONNECTION_NOT_ALLOWED.message, data: {}});
            default:
                return res.fail({code: reponses.UPDATE_DATA_FAIL.code, message: reponses.UPDATE_DATA_FAIL.message, data: {}});
        }
    },

    getMediaList: async function(req, res){
        let listData = AppService.getAppMediaList();
        return res.success({code: reponses.GET_DATA_SUCCESS.code, message: reponses.GET_DATA_SUCCESS.message, data: listData});
    },

    index: async function(req, res){
        return res.success({code: 200, message: "Welcome to Music Together APIs", data: {}});
    },

    getAll: async function(req, res){
        let listData = AppService.getAll(req);
        /*sails.sockets.blast("lxt", { userList: userList });*/
        AppService.sendMediaListToAllRooms();
        return res.success({code: 200, message: "Get data successfully!", data: listData});
    },

};

