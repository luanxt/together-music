/**
* Route Mappings
* (sails.config.routes)
*
* Your routes tell Sails what to do each time it receives a request.
*
* For more information on configuring custom routes, check out:
* https://sailsjs.com/anatomy/config/routes-js
*/

module.exports.routes = {
  /* APP & MEDIA */
  "GET /": { controller: "AppController", action: "index" },
  "GET /app/getMediaList": { controller: "AppController", action: "getMediaList" },
  "POST /app/likeMedia": { controller: "AppController", action: "likeMedia" },
  "POST /app/dislikeMedia": { controller: "AppController", action: "dislikeMedia" },
  "POST /app/search/youtube": { controller: "AppController", action: "searchYouTube" },

  /* ADMIN */
  /* MEDIA */
  "POST /admin/app/finishMedia": { controller: "admin/AppController", action: "finishMedia" },
  "POST /admin/app/nextMedia": { controller: "admin/AppController", action: "nextMedia" },
  "POST /admin/app/playMediaNow": { controller: "admin/AppController", action: "playMediaNow" },
  "POST /admin/app/resetAllMedia": { controller: "admin/AppController", action: "resetAllMedia" },

  /* FAVOURITE MEDIA */
  "GET /admin/app/getAllFavouriteMedia": { controller: "admin/AppController", action: "getAllFavouriteMedia" },
  "GET /admin/app/getFavouriteMedia": { controller: "admin/AppController", action: "getFavouriteMedia" },
  "POST /admin/app/loveMedia": { controller: "admin/AppController", action: "loveMedia" },
  "POST /admin/app/deleteFavouriteMedia": { controller: "admin/AppController", action: "deleteFavouriteMedia" },

  /* BANNED MEDIA */
  "GET /admin/app/getAllBannedMedia": { controller: "admin/AppController", action: "getAllBannedMedia" },
  "GET /admin/app/getBannedMedia": { controller: "admin/AppController", action: "getBannedMedia" },
  "POST /admin/app/banMedia": { controller: "admin/AppController", action: "banMedia" },
  "POST /admin/app/deleteBannedMedia": { controller: "admin/AppController", action: "deleteBannedMedia" },

  /* YOUTUBE KEY */
  "POST /admin/app/updateYouTubeKey": { controller: "admin/AppController", action: "updateYouTubeKey" },
  "GET /admin/app/getAllYouTubeKeys": { controller: "admin/AppController", action: "getAllYouTubeKeys" },

  /* CONNECTION */
  "GET /admin/app/getAllAllowedConnections": { controller: "admin/AppController", action: "getAllAllowedConnections" },
  "POST /admin/app/addAllowedConnection": { controller: "admin/AppController", action: "addAllowedConnection" },
  "POST /admin/app/deleteAllAllowedConnections": { controller: "admin/AppController", action: "deleteAllAllowedConnections" },

  /* USER */
  "POST /user/loginUser": { controller: "UserController", action: "loginUser" },
  "POST /user/loginAdmin": { controller: "UserController", action: "loginAdmin" },
  "POST /user/changeName": { controller: "UserController", action: "changeName" },
  "POST /user/joinRoom": { controller: "UserController", action: "joinRoom" },
  "POST /user/logout": { controller: "UserController", action: "logout" },

  /* TESTING */
  "GET /user/getAll": { controller: "UserController", action: "getAll" },
  "GET /media/getAll": { controller: "AppController", action: "getAll" },
};
