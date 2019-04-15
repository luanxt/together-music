/**
* admin/AppController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/

let reponses = sails.config.responses;

module.exports = {

	/* CONNECTION */
    deleteAllAllowedConnections: async function(req, res){
        let returnData = await AppService.deleteAllAllowedConnections(req);

        if (returnData.code == "success"){
            await AppService.addAllowedConnection(req, req.userData.ip); /* ADD CURRENT IP */
        	await AppService.getAllAllowedConnections(req); /* RESET LIST */
        	return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: returnData.message, data: {}});
        } else {
        	return res.fail({code: reponses.UPDATE_DATA_FAIL.code, message: returnData.message, data: {}});
        }
    },

    addAllowedConnection: async function(req, res){
        let returnData = await AppService.addAllowedConnection(req, req.userData.ip);

        if (returnData.code == "success"){
        	await AppService.getAllAllowedConnections(req); /* RESET LIST */
        	return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: returnData.message, data: {}});
        } else {
        	return res.fail({code: reponses.UPDATE_DATA_FAIL.code, message: returnData.message, data: {}});
        }
    },

	getAllAllowedConnections: async function(req, res){
		let returnData = await AppService.getAllAllowedConnections(req);
		return res.success({code: reponses.GET_DATA_SUCCESS.code, message: reponses.GET_DATA_SUCCESS.message, data: returnData});
	},
	/* END */

	/* BANNED MEDIA */
    deleteBannedMedia: async function(req, res){
        let media = req.param("media", {});
        let returnData = await AppService.deleteBannedMedia(req, media);

        if (returnData.code == "success"){
        	return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: returnData.message, data: {}});
        } else {
        	return res.fail({code: reponses.UPDATE_DATA_FAIL.code, message: returnData.message, data: {}});
        }
    },

    banMedia: async function(req, res){
        let media = req.param("media", {});
        let returnData = await AppService.banMedia(req, media);

        if (returnData.code == "success"){
        	return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: returnData.message, data: {}});
        } else {
        	return res.fail({code: reponses.UPDATE_DATA_FAIL.code, message: returnData.message, data: {}});
        }
    },

	getBannedMedia: async function(req, res){
		let returnData = await AppService.getBannedMedia(req, req.param("page", 1));
		return res.success({code: reponses.GET_DATA_SUCCESS.code, message: reponses.GET_DATA_SUCCESS.message, data: returnData});
	},

	getAllBannedMedia: async function(req, res){
		let returnData = await AppService.getAllBannedMedia(req);
		return res.success({code: reponses.GET_DATA_SUCCESS.code, message: reponses.GET_DATA_SUCCESS.message, data: returnData});
	},
	/* END */

	/* FAVOURITE MEDIA */
    deleteFavouriteMedia: async function(req, res){
        let media = req.param("media", {});
        let returnData = await AppService.deleteFavouriteMedia(req, media);

        if (returnData.code == "success"){
        	return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: returnData.message, data: {}});
        } else {
        	return res.fail({code: reponses.UPDATE_DATA_FAIL.code, message: returnData.message, data: {}});
        }
    },

    loveMedia: async function(req, res){
        let media = req.param("media", {});
        let returnData = await AppService.loveMedia(req, media);

        if (returnData.code == "success"){
        	return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: returnData.message, data: {}});
        } else {
        	return res.fail({code: reponses.UPDATE_DATA_FAIL.code, message: returnData.message, data: {}});
        }
    },

	getFavouriteMedia: async function(req, res){
		let returnData = await AppService.getFavouriteMedia(req, req.param("page", 1));
		return res.success({code: reponses.GET_DATA_SUCCESS.code, message: reponses.GET_DATA_SUCCESS.message, data: returnData});
	},

	getAllFavouriteMedia: async function(req, res){
		let returnData = await AppService.getAllFavouriteMedia(req);
		return res.success({code: reponses.GET_DATA_SUCCESS.code, message: reponses.GET_DATA_SUCCESS.message, data: returnData});
	},
	/* END */

	playMediaNow: async function(req, res){
		let media = req.param("media", {});

		let returnData = AppService.playMediaNow(media);

        switch (returnData.code){
            case "SUCCESS":
                AppService.sendMediaListToAllRooms(media.mediaID);
                return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: reponses.UPDATE_DATA_SUCCESS.message, data: {}});
            case "BANNED":
                return res.fail({code: reponses.MEDIA_BANNED.code, message: reponses.MEDIA_BANNED.message, data: {}});
            default:
                return res.fail({code: reponses.UPDATE_DATA_FAIL.code, message: reponses.UPDATE_DATA_FAIL.message, data: {}});
        }
	},

	nextMedia: async function(req, res){
		let currentMediaID = req.param("currentMediaID", "");
		let nextMediaID = req.param("nextMediaID", "");

		AppService.finishMedia(req, currentMediaID);
		AppService.sendMediaListToAllRooms(nextMediaID);
	},

	finishMedia: async function(req, res){
		let mediaID = req.param("mediaID", "");

		AppService.finishMedia(req, mediaID);
		AppService.sendMediaListToAllRooms();
	},

	resetAllMedia: async function(req, res){
		AppService.resetAllMedia(req);
		AppService.sendMediaListToAllRooms();
		return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: reponses.UPDATE_DATA_SUCCESS.message, data: {}});
	},

	updateYouTubeKey: async function(req, res){
		let key = req.param("key", "");
		let expired = req.param("expired", false);

		AppService.updateYouTubeKey(req, key, expired);
		return res.success({code: reponses.UPDATE_DATA_SUCCESS.code, message: reponses.UPDATE_DATA_SUCCESS.message, data: {}});
	},

	getAllYouTubeKeys: async function(req, res){
		let listData = AppService.getAllYouTubeKeys(req);
		return res.success({code: reponses.GET_DATA_SUCCESS.code, message: reponses.GET_DATA_SUCCESS.message, data: listData});
	},

};