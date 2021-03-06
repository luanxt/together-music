/* AppService */

let qs = require("qs");
let appConfigs = sails.config.app;

let mediaList = {};
let likeList = {};
let dislikeList = {};
let bannedList = {}; /* SET IN HOOK ON APP LIFT */
let allowedConnections = {}; /* SET IN HOOK ON APP LIFT */

module.exports = {

    /* CONNECTION */
    addAllowedConnection: async function(req, ip){
        let returnData = {};
        try {
            let apiData = await UtilsService.callHTTP({
                method: "post",
                headers: {"content-type": "application/x-www-form-urlencoded;charset=utf-8"},
                url: appConfigs.MEDIA_API.BASE_URL + "app/insertAllowedIPV4",
                data: qs.stringify({
                    appID: appConfigs.MEDIA_API.APP_ID,
                    ip: ip,
                    token: UtilsService.md5(appConfigs.MEDIA_API.APP_ID + ip + appConfigs.MEDIA_API.SECRET_KEY)
                })
            });
            returnData = apiData;
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    deleteAllAllowedConnections: async function(req){
        let returnData = {};
        try {
            let apiData = await UtilsService.callHTTP({
                method: "post",
                headers: {"content-type": "application/x-www-form-urlencoded;charset=utf-8"},
                url: appConfigs.MEDIA_API.BASE_URL + "app/deleteAllAllowedConnections",
                data: qs.stringify({
                    appID: appConfigs.MEDIA_API.APP_ID,
                    token: UtilsService.md5(appConfigs.MEDIA_API.APP_ID + appConfigs.MEDIA_API.SECRET_KEY)
                })
            });
            returnData = apiData;
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    getAllAllowedConnections: async function(req){
        let returnData = {};

        try {
            let apiData = await UtilsService.callHTTP({
                method: "get",
                url: appConfigs.MEDIA_API.BASE_URL + "app/getAllAllowedConnections",
                params: {
                    appID: appConfigs.MEDIA_API.APP_ID,
                }
            });

            if (apiData.code == "success"){
                returnData = apiData.data;
                allowedConnections = returnData;
            }
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },
    /* END */

    /* BANNED MEDIA */
    banMedia: async function(req, media){
        let returnData = {};
        try {
            let apiData = await UtilsService.callHTTP({
                method: "post",
                headers: {"content-type": "application/x-www-form-urlencoded;charset=utf-8"},
                url: appConfigs.MEDIA_API.BASE_URL + "app/insertBannedMedia",
                data: qs.stringify({
                    appID: appConfigs.MEDIA_API.APP_ID,
                    mediaID: media.mediaID,
                    mediaName: media.mediaName,
                    mediaImage: media.mediaImage,
                    mediaDescription: media.mediaDescription,
                    mediaDuration: media.mediaDuration,
                    token: UtilsService.md5(appConfigs.MEDIA_API.APP_ID + appConfigs.MEDIA_API.SECRET_KEY)
                })
            });
            returnData = apiData;
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    deleteBannedMedia: async function(req, media){
        let returnData = {};
        try {
            let apiData = await UtilsService.callHTTP({
                method: "post",
                headers: {"content-type": "application/x-www-form-urlencoded;charset=utf-8"},
                url: appConfigs.MEDIA_API.BASE_URL + "app/deleteBannedMedia",
                data: qs.stringify({
                    appID: appConfigs.MEDIA_API.APP_ID,
                    mediaID: media.mediaID,
                    token: UtilsService.md5(appConfigs.MEDIA_API.APP_ID + appConfigs.MEDIA_API.SECRET_KEY)
                })
            });
            returnData = apiData;
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    getBannedMedia: async function(req, page){
        let returnData = {
            media: [],
            allMedia: {},
            rows: 0,
            pages: 0,
            currentPage: 1,
        };

        try {
            let apiData = await UtilsService.callHTTP({
                method: "get",
                url: appConfigs.MEDIA_API.BASE_URL + "app/getBannedMedia",
                params: {
                    appID: appConfigs.MEDIA_API.APP_ID,
                    page: page
                }
            });

            if (apiData.code == "success"){
                returnData = apiData.data;
                bannedList = returnData.allMedia;
                /* PREPAIR DATA */
                let now = new Date().getTime();
                returnData.media.forEach(function(item, index){
                    item.sourceType = "youtube";
                    item.sourceIcon = "youtube fa fa-youtube-play class iconSource";
                    item.mediaLink = `https://www.youtube.com/watch?v=${item.mediaID}`;
                    item.createdAt = (now - index);
                    item.liked = false;
                    item.disliked = false;
                    item.likes = {
                        counts: 0,
                        users: [],
                    };
                    item.dislikes = {
                        counts: 0,
                        users: [],
                    };
                    item.isPlaying = false;
                });
                /* END */
            }
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    getAllBannedMedia: async function(req){
        let returnData = {};

        try {
            let apiData = await UtilsService.callHTTP({
                method: "get",
                url: appConfigs.MEDIA_API.BASE_URL + "app/getAllBannedMedia",
                params: {
                    appID: appConfigs.MEDIA_API.APP_ID,
                }
            });

            if (apiData.code == "success"){
                returnData = apiData.data;
                bannedList = returnData;
            }
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },
    /* END */

    /* FAVOURITE MEDIA */
    loveMedia: async function(req, media){
        let returnData = {};
        try {
            let apiData = await UtilsService.callHTTP({
                method: "post",
                headers: {"content-type": "application/x-www-form-urlencoded;charset=utf-8"},
                url: appConfigs.MEDIA_API.BASE_URL + "app/insertFavouriteMedia",
                data: qs.stringify({
                    appID: appConfigs.MEDIA_API.APP_ID,
                    mediaID: media.mediaID,
                    mediaName: media.mediaName,
                    mediaImage: media.mediaImage,
                    mediaDescription: media.mediaDescription,
                    mediaDuration: media.mediaDuration,
                    token: UtilsService.md5(appConfigs.MEDIA_API.APP_ID + appConfigs.MEDIA_API.SECRET_KEY)
                })
            });
            returnData = apiData;
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    deleteFavouriteMedia: async function(req, media){
        let returnData = {};
        try {
            let apiData = await UtilsService.callHTTP({
                method: "post",
                headers: {"content-type": "application/x-www-form-urlencoded;charset=utf-8"},
                url: appConfigs.MEDIA_API.BASE_URL + "app/deleteFavouriteMedia",
                data: qs.stringify({
                    appID: appConfigs.MEDIA_API.APP_ID,
                    mediaID: media.mediaID,
                    token: UtilsService.md5(appConfigs.MEDIA_API.APP_ID + appConfigs.MEDIA_API.SECRET_KEY)
                })
            });
            returnData = apiData;
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    getFavouriteMedia: async function(req, page){
        let returnData = {
            media: [],
            allMedia: {},
            rows: 0,
            pages: 0,
            currentPage: 1,
        };

        try {
            let apiData = await UtilsService.callHTTP({
                method: "get",
                url: appConfigs.MEDIA_API.BASE_URL + "app/getFavouriteMedia",
                params: {
                    appID: appConfigs.MEDIA_API.APP_ID,
                    page: page
                }
            });

            if (apiData.code == "success"){
                returnData = apiData.data;
                /* PREPAIR DATA */
                let now = new Date().getTime();
                returnData.media.forEach(function(item, index){
                    item.sourceType = "youtube";
                    item.sourceIcon = "youtube fa fa-youtube-play class iconSource";
                    item.mediaLink = `https://www.youtube.com/watch?v=${item.mediaID}`;
                    item.createdAt = (now - index);
                    item.liked = false;
                    item.disliked = false;
                    item.likes = {
                        counts: 0,
                        users: [],
                    };
                    item.dislikes = {
                        counts: 0,
                        users: [],
                    };
                    item.isPlaying = false;
                });
                /* END */
            }
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    getAllFavouriteMedia: async function(req){
        let returnData = {};

        try {
            let apiData = await UtilsService.callHTTP({
                method: "get",
                url: appConfigs.MEDIA_API.BASE_URL + "app/getAllFavouriteMedia",
                params: {
                    appID: appConfigs.MEDIA_API.APP_ID,
                }
            });

            if (apiData.code == "success"){
                returnData = apiData.data;
            }
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },
    /* END */

    getAvailableYouTubeKey: function(){
        let returnData = "";
        try {
            for (let item of appConfigs.YOUTUBE.API_KEY){
                if (item.expired === false){
                    return item.key;
                }
            }
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    searchYouTube: async function(req, keyword){
        let returnData = {code: "SUCCESS", message: "Chưa tìm thấy bài hát nào.", data: []};

        try {
            /* CHECK CONNECTION */
            if (!_.isEmpty(allowedConnections) && !allowedConnections.hasOwnProperty(req.userData.ip)){
                return {code: "CONNECTION_NOT_ALLOWED"};
            }

            let youtubeKey = AppService.getAvailableYouTubeKey();
            let searchURL = "https://www.googleapis.com/youtube/v3/search";
            let detailURL = "https://www.googleapis.com/youtube/v3/videos";
            let youtubeIDs = [];
            let youtubeID = UtilsService.getYouTubeID(keyword);
            let searchResults;

            if ((keyword.indexOf("https:/") != "-1" || keyword.indexOf("http:/") != "-1") && !_.isEmpty(youtubeID)){ /* NHAP YOUTUBE LINK */
                youtubeIDs.push(youtubeID);
            } else { /* SEARCH */
                searchResults = await UtilsService.callHTTP({
                    method: "get",
                    url: searchURL,
                    params: {
                        part: "snippet",
                        q: keyword,
                        fields: "items(id(videoId))",
                        maxResults: appConfigs.YOUTUBE.SEARCH.maxResults,
                        key: youtubeKey,
                    }
                });

                /* ERROR LOGS */
                if (!_.isEmpty(searchResults.error)){
                    console.log(searchResults.error.message);
                }

                if (!_.isEmpty(searchResults.items)){
                    for (let item of searchResults.items){
                        youtubeIDs.push(item.id.videoId);
                    }
                }
            }

            if (!_.isEmpty(youtubeIDs)){

                searchResults = await UtilsService.callHTTP({
                    method: "get",
                    url: detailURL,
                    params: {
                        part: "snippet,contentDetails",
                        fields: "items(id,snippet(title,description,thumbnails(high(url))),contentDetails(duration))",
                        id: youtubeIDs.toString(),
                        key: youtubeKey,
                    }
                });

                /* ERROR LOGS */
                if (!_.isEmpty(searchResults.error)){
                    console.log(searchResults.error.message);
                }

                if (!_.isEmpty(searchResults.items)){

                    let userList = UserService.getUserList();
                    let now = new Date().getTime();
                    let searchMediaList = [];

                    for (let [index, item] of searchResults.items.entries()){

                        /* GET LIKES */
                        let likes = 0;
                        let likeUsers = [];
                        let liked = false;

                        if (likeList.hasOwnProperty(item.id)){
                            likes = Object.keys(likeList[item.id]).length;

                            /* SET USERS WHO LIKE IT */
                            for (let userID in likeList[item.id]){
                                if (userList.hasOwnProperty(userID)){
                                    likeUsers.push({
                                        id: userList[userID].userID,
                                        fullname: userList[userID].fullname,
                                    });
                                }
                                if (userID == req.userData.userID){
                                    liked = true;
                                }
                            }
                        }

                        /* GET DISLIKES */
                        let dislikes = 0;
                        let dislikeUsers = [];
                        let disliked = false;

                        if (dislikeList.hasOwnProperty(item.id)){
                            dislikes = Object.keys(dislikeList[item.id]).length;

                            /* SET USERS WHO DISLIKE IT */
                            for (let userID in dislikeList[item.id]){
                                if (userList.hasOwnProperty(userID)){
                                    dislikeUsers.push({
                                        id: userList[userID].userID,
                                        fullname: userList[userID].fullname,
                                    });
                                }
                                if (userID == req.userData.userID){
                                    disliked = true;
                                }
                            }
                        }
                        /* END */

                        searchMediaList.push({
                            sourceType: "youtube",
                            sourceIcon: "youtube fa fa-youtube-play class iconSource",
                            mediaID: item.id,
                            mediaName: item.snippet.title,
                            mediaLink: `https://www.youtube.com/watch?v=${item.id}`,
                            mediaImage: item.snippet.thumbnails.high.url,
                            mediaDescription: UtilsService.characterLimiter(item.snippet.description, 350),
                            mediaDuration: UtilsService.convertYouTubeDuration(item.contentDetails.duration),
                            createdAt: (now - index),
                            liked: liked,
                            disliked: disliked,
                            likes: {
                                counts: likes,
                                users: likeUsers,
                            },
                            dislikes: {
                                counts: dislikes,
                                users: dislikeUsers,
                            },
                            isPlaying: false,
                            inPlaylist: mediaList.hasOwnProperty(item.id),
                        });
                    }

                    returnData.data = searchMediaList;
                }
            }


        } catch (err) {
            console.log(err);
        }

        return returnData;
    },

    playMediaNow: function(media){
        try {
            /* CHECK BANNED */
            if (bannedList.hasOwnProperty(media.mediaID)){
                return {code: "BANNED"};
            }

            /* UNSET PLAYING */
            for (let mediaKey in mediaList){
                mediaList[mediaKey].isPlaying = false;
            }

            /* SET PLAYING FOR PLAY NOW MEDIA */
            if (!mediaList.hasOwnProperty(media.mediaID)){ /* CHUA CO MEDIA TRONG LIST */
                media.isPlaying = true;
                media.createdAt = new Date().getTime();
                mediaList[media.mediaID] = media;
            } else {
                mediaList[media.mediaID].isPlaying = true;
                mediaList[media.mediaID].createdAt = new Date().getTime();
            }
        } catch (err) {
            console.log(err);
            return {code: "FAIL"};
        }
        return {code: "SUCCESS"};
    },

    sendPlayingMediaNowToAllRooms: function(mediaID){
        try {
            sails.sockets.blast(appConfigs.SOCKET_EVENT.PLAY_NOW.code, {
                mediaID: mediaID
            });
        } catch (err) {
            console.log(err);
        }
    },

    finishMedia: function(req, mediaID){
        try {
            delete mediaList[mediaID];
            delete likeList[mediaID];
            delete dislikeList[mediaID];

            /* NEU mediaList empty, XOA CAC USER KHONG CON ONLINE */
            if (_.isEmpty(mediaList)){
                let userList = UserService.getUserList();
                let socketList = UserService.getSocketList();

                let onlineUsers = {};
                for (let socket in socketList){
                    onlineUsers[socketList[socket]] = true;
                }
                onlineUsers = Object.keys(onlineUsers);

                for (let userID in userList){
                    if (!onlineUsers.includes(userID)){
                        delete userList[userID];
                    }
                }
                UserService.setUserList(userList);
            }
        } catch (err) {
            console.log(err);
        }
    },

    /* INPUT: sourceType, sourceIcon, mediaID, mediaName, mediaLink, mediaImage, mediaDuration */
    likeMedia: function(req, userID, media){
        try {
            /* CHECK CONNECTION */
            if (!_.isEmpty(allowedConnections) && !allowedConnections.hasOwnProperty(req.userData.ip)){
                return {code: "CONNECTION_NOT_ALLOWED"};
            }

            /* CHECK BANNED */
            if (bannedList.hasOwnProperty(media.mediaID)){
                return {code: "BANNED"};
            }

            if (!mediaList.hasOwnProperty(media.mediaID)){ /* CHUA CO MEDIA TRONG LIST */
                media.createdAt = new Date().getTime();
                mediaList[media.mediaID] = media;

                /* SET LIKE */
                _.set(likeList, `${media.mediaID}.${userID}`, true);

            } else { /* DA CO MEDIA TRONG LIST */
                /* SET LIKE TOGGLE */
                if (!_.has(likeList, `${media.mediaID}.${userID}`)){ /* CHUA LIKE */
                    _.set(likeList, `${media.mediaID}.${userID}`, true);
                } else { /* DA LIKE */
                    delete likeList[media.mediaID][userID];
                }

                /* DELETE DISLIKE */
                if (_.has(dislikeList, `${media.mediaID}.${userID}`)){
                    delete dislikeList[media.mediaID][userID];
                }
            }
        } catch (err) {
            console.log(err);
            return {code: "FAIL"};
        }
        return {code: "SUCCESS"};
    },

    /* INPUT: mediaID */
    dislikeMedia: function(req, userID, media){
        try {
            /* CHECK CONNECTION */
            if (!_.isEmpty(allowedConnections) && !allowedConnections.hasOwnProperty(req.userData.ip)){
                return {code: "CONNECTION_NOT_ALLOWED"};
            }

            if (mediaList.hasOwnProperty(media.mediaID)){
                /* SET DISLIKE TOGGLE */
                if (!_.has(dislikeList, `${media.mediaID}.${userID}`)){ /* CHUA DISLIKE */
                    _.set(dislikeList, `${media.mediaID}.${userID}`, true);
                } else { /* DA DISLIKE */
                    delete dislikeList[media.mediaID][userID];
                }

                /* DELETE LIKE */
                if (_.has(likeList, `${media.mediaID}.${userID}`)){
                    delete likeList[media.mediaID][userID];
                }

                /* CHECK MAX DISLIKES */
                let likes = 0;
                if (likeList.hasOwnProperty(media.mediaID)){
                    likes = Object.keys(likeList[media.mediaID]).length;
                }

                let dislikes = 0;
                if (dislikeList.hasOwnProperty(media.mediaID)){
                    dislikes = Object.keys(dislikeList[media.mediaID]).length;
                }

                if ((dislikes - likes) > appConfigs.LIMIT.MAX_DISLIKE_INTERVAL){ /* OVER MAX */
                    let orderedMediaList = AppService.getMediaListByOrder();
                    if (!_.isEmpty(orderedMediaList)){
                        let nowPlayingMedia = orderedMediaList[0];
                        if (nowPlayingMedia.mediaID == media.mediaID){ /* PLAYING */
                            /* NEXT MEDIA LIKE */
                            AppService.finishMedia(req, media.mediaID);
                            if (orderedMediaList.length > 1){ /* HAS NEXT */
                                AppService.sendMediaListToAllRooms(orderedMediaList[1].mediaID);
                            } else {
                                AppService.sendMediaListToAllRooms("STOP");
                            }
                        } else {
                            /* FINISH MEDIA LIKE */
                            AppService.finishMedia(req, media.mediaID);
                            AppService.sendMediaListToAllRooms();
                        }
                    }
                }
                /* END */
            }
        } catch (err) {
            console.log(err);
            return {code: "FAIL"};
        }
        return {code: "SUCCESS"};
    },

    init: function(){
        try {

            /* new Date().getTime(); */
            mediaList = {
                "TMsuP-QCEro": {
                    sourceType: "youtube",
                    sourceIcon: "youtube fa fa-youtube-play class iconSource",
                    mediaID: "TMsuP-QCEro",
                    mediaName: "Năm Tháng Vội Vã - Vương Phi",
                    mediaLink: "https://www.youtube.com/watch?v=TMsuP-QCEro",
                    mediaImage: "https://i.ytimg.com/vi/dT4A3rttrs8/hqdefault.jpg",
                    mediaDuration: "05:08",
                    createdAt: 1553142987240,
                    liked: false,
                    disliked: false,
                    likes: {
                        counts: 0,
                        users: [],
                    },
                    dislikes: {
                        counts: 0,
                        users: [],
                    },
                    isPlaying: false,
                },
                "UCXao7aTDQM": {
                    sourceType: "youtube",
                    sourceIcon: "youtube fa fa-youtube-play class iconSource",
                    mediaID: "UCXao7aTDQM",
                    mediaName: "Tháng Tư Là Lời Nói Dối Của Em - Hà Anh Tuấn",
                    mediaLink: "https://www.youtube.com/watch?v=UCXao7aTDQM",
                    mediaImage: "https://i.ytimg.com/vi/dT4A3rttrs8/hqdefault.jpg",
                    mediaDuration: "05:08",
                    createdAt: 1553142987241,
                    liked: false,
                    disliked: false,
                    likes: {
                        counts: 0,
                        users: [],
                    },
                    dislikes: {
                        counts: 0,
                        users: [],
                    },
                    isPlaying: false,
                },
                "GwCUbhE0TY0": {
                    sourceType: "youtube",
                    sourceIcon: "youtube fa fa-youtube-play class iconSource",
                    mediaID: "GwCUbhE0TY0",
                    mediaName: "Một Bước Yêu Van Bước Đau - Mr. Siro",
                    mediaLink: "https://www.youtube.com/watch?v=GwCUbhE0TY0",
                    mediaImage: "https://i.ytimg.com/vi/dT4A3rttrs8/hqdefault.jpg",
                    mediaDuration: "05:08",
                    createdAt: 1553142987241,
                    liked: false,
                    disliked: false,
                    likes: {
                        counts: 0,
                        users: [],
                    },
                    dislikes: {
                        counts: 0,
                        users: [],
                    },
                    isPlaying: false,
                },
            };

            likeList = {
                "GwCUbhE0TY0": {
                    "user-id-001": true,
                },
                "UCXao7aTDQM": {
                    "user-id-001": true,
                },
            };

            dislikeList = {
                "GwCUbhE0TY0": {
                    "user-id-001": true,
                }
            };

        } catch (err) {
            console.log(err);
        }
    },

    sendMediaListToAllRooms: function(playNowMediaID){
        try {
            sails.sockets.blast(appConfigs.SOCKET_EVENT.MEDIA_LIST.code, AppService.getAppMediaList(playNowMediaID));
        } catch (err) {
            console.log(err);
        }
    },

    /* GET MEDIA LIST BY LIKES, TIME */
    getMediaListByOrder: function(){
        let returnData = [];
        try {
            /* 12_1553142987240.SItFPrgEITM */
            /* SORTING */
            let userList = UserService.getUserList();
            let currentTime = new Date().getTime();
            let orderedKeys = [];
            for (let mediaKey in mediaList){
                let likes = 0;
                if (mediaList[mediaKey].isPlaying){
                    likes = (Object.keys(userList).length + 1); /* MAX USERS CONNECTED */
                } else if (likeList.hasOwnProperty(mediaKey)){
                    likes = Object.keys(likeList[mediaKey]).length;
                }
                orderedKeys.push(likes + "" + (currentTime - mediaList[mediaKey].createdAt + 1000000000000) + "_" + mediaKey);
            }
            orderedKeys.sort(function(a, b){
                return (parseFloat(b) - parseFloat(a));
            });

            if (orderedKeys.length !== 0){

                /* RECREATE MEDIA LIST */
                for (let [index, item] of orderedKeys.entries()){

                    let mediaKey = item.substr(item.indexOf("_") + 1);

                    /* SET FIRST MEDIA PLAYING */
                    if (index === 0){
                        mediaList[mediaKey].isPlaying = true;
                    } else {
                        mediaList[mediaKey].isPlaying = false;
                    }

                    /* GET LIKES */
                    let likes = 0;
                    if (likeList.hasOwnProperty(mediaKey)){
                        likes = Object.keys(likeList[mediaKey]).length;

                        /* SET USERS WHO LIKE IT */
                        mediaList[mediaKey].likes.users = [];
                        for (let userID in likeList[mediaKey]){
                            if (userList.hasOwnProperty(userID)){
                                mediaList[mediaKey].likes.users.push({
                                    id: userList[userID].userID,
                                    fullname: userList[userID].fullname,
                                });
                            }
                        }
                    }

                    /* GET DISLIKES */
                    let dislikes = 0;
                    if (dislikeList.hasOwnProperty(mediaKey)){
                        dislikes = Object.keys(dislikeList[mediaKey]).length;

                        /* SET USERS WHO DISLIKE IT */
                        mediaList[mediaKey].dislikes.users = [];
                        for (let userID in dislikeList[mediaKey]){
                            if (userList.hasOwnProperty(userID)){
                                mediaList[mediaKey].dislikes.users.push({
                                    id: userList[userID].userID,
                                    fullname: userList[userID].fullname,
                                });
                            }
                        }
                    }

                    mediaList[mediaKey].likes.counts = likes;
                    mediaList[mediaKey].dislikes.counts = dislikes;

                    /* FIX FOR ANGULAR "$$hashKey" */
                    delete mediaList[mediaKey]["$$hashKey"];
                    delete mediaList[mediaKey]["interactionContent"];
                    delete mediaList[mediaKey]["inPlaylist"];

                    returnData.push(mediaList[mediaKey]);
                }
            }
        } catch (err) {
            console.log(err);
        }
        return returnData;
    },

    getAppMediaList: function(playNowMediaID){
        return {
            mediaList: AppService.getMediaListByOrder(),
            likeList: likeList,
            dislikeList: dislikeList,
            playNowMediaID: playNowMediaID
        };
    },

    resetAllMedia: function(req){
        try {
            mediaList = {};
            likeList = {};
            dislikeList = {};

            AppService.finishMedia(req, "dummy");
        } catch (err) {
            console.log(err);
        }
    },

    updateYouTubeKey: function(req, key, expired){
        try {
            appConfigs.YOUTUBE.API_KEY.forEach(function(item){
                if (item.key == key){
                    item.expired = (expired === true ? true : false);
                }
            });
        } catch (err) {
            console.log(err);
        }
    },

    getAllYouTubeKeys: function(req){
        try {
            return appConfigs.YOUTUBE.API_KEY;
        } catch (err) {
            console.log(err);
        }
    },

    getAll: function(req){
        try {
            /* FOR TEST */
            if (_.isEmpty(mediaList)){
                AppService.init();
            }
            /* END */

            /* SORTING */
            let userList = UserService.getUserList();
            let currentTime = new Date().getTime();
            let orderedKeys = [];
            for (let mediaKey in mediaList){
                let likes = 0;
                if (mediaList[mediaKey].isPlaying){
                    likes = (Object.keys(userList).length + 1); /* MAX USERS CONNECTED */
                } else if (likeList.hasOwnProperty(mediaKey)){
                    likes = Object.keys(likeList[mediaKey]).length;
                }
                orderedKeys.push(likes + "" + (currentTime - mediaList[mediaKey].createdAt) + "_" + mediaKey);
            }
            orderedKeys.sort();
            orderedKeys.reverse();
            /* END */

            /*return AppService.getAppMediaList();*/
            return {
                mediaListOrdered: AppService.getMediaListByOrder(),
                mediaList: mediaList,
                orderedKeys: orderedKeys,
                likeList: likeList,
                dislikeList: dislikeList,
                allowedConnections: allowedConnections,
            };
        } catch (err) {
            console.log(err);
        }
    },

};