/**
* admin/AppController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/

let reponses = sails.config.responses;

module.exports = {

	playMediaNow: async function(req, res){
		let media = req.param("media", {});

		AppService.playMediaNow(media);
		AppService.sendMediaListToAllRooms(media.mediaID);
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