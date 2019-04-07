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

        let listData = await AppService.searchYouTube(req, keyword);
        return res.success({code: reponses.GET_DATA_SUCCESS.code, message: reponses.GET_DATA_SUCCESS.message, data: listData});
    },

    likeMedia: async function(req, res){
        let media = req.param("media", {});

        let listData = AppService.likeMedia(req, req.userData.userID, media);
        AppService.sendMediaListToAllRooms();

        return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: reponses.UPDATE_DATA_SUCCESS.message, data: {}});
    },

    dislikeMedia: async function(req, res){
        let media = req.param("media", {});

        let listData = AppService.dislikeMedia(req, req.userData.userID, media);
        AppService.sendMediaListToAllRooms();

        return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: reponses.UPDATE_DATA_SUCCESS.message, data: {}});
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

