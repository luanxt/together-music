/* UtilsService */

module.exports = {

    characterLimiter: function(str = "", limit = 10){
        if (str.length > limit){
            return (str.substr(0, limit) + "...");
        }
        return str;
    },

    getYouTubeID: function(url){
        let id = "";
        try {
            url = url.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            if (url[2] !== undefined){
                id = url[2].split(/[^0-9a-z_\-]/i);
                id = id[0];
            }
        } catch (err){/* DO NOTHING NOW */}
        return id;
    },

    /* INPUT: PT1M21S */
    convertYouTubeDuration: function(duration){
        duration = duration.replace("PT", "");
        duration = duration.replace("H", " giờ ");
        duration = duration.replace("M", " phút ");
        duration = duration.replace("S", " giây");
        if (duration == "0 giây"){
            return "Trực tiếp";
        }
        return duration;
    },

    /* ATTRIBUTES: method, url, headers, params, data */
    callHTTP: async function(options){
        let responseData = "";
        const axios = require("axios");
        const returnData = await axios({
            method: options.method,
            url: options.url,
            headers: options.headers,
            params: options.params,
            data: options.data
        }).catch(function (error){
            responseData = error.response.data;
        });
        return responseData == "" ? returnData.data : responseData;
    },

    /* ATTRIBUTES: method, url, headers, params, data */
    callAsyncHTTP: function(options, callback){
        const axios = require("axios");
        const returnData = axios({
            method: options.method,
            url: options.url,
            headers: options.headers,
            params: options.params,
            data: options.data
        })
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error){
            callback(null);
        });
    },

    padZeroNumber: function(number, size = 3) {
        let sign = Math.sign(number) === -1 ? "-" : "";
        return sign + new Array(size).concat([Math.abs(number)]).join("0").slice(-size);
    },

    isNumeric: function(number){
        return !isNaN(parseFloat(number)) && isFinite(number);
    },

    durationFormat: function(second){
        if (second === undefined) return "0:00";
        return (second - (second %= 60)) / 60 + (9 < second ? ":" : ":0") + second;
    },

    stripTags: function(data, allowedKeys, allowedTags, tagReplacement){
        let striptags = require("striptags");
        if (_.isObject(data)){
            for (let key in data) {
                if (data.hasOwnProperty(key) && (_.contains(allowedKeys, key) === true)) {
                    if (!_.isObject(data[key])){
                        data[key] = striptags(data[key]);
                    } else {
                        data[key] = UtilsService.stripTags(data[key], allowedTags, tagReplacement);
                    }
                }
            }
            return data;
        } else {
            return striptags(data);
        }
    },

    getRandomString: function(length){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },

    md5: function(str){
        let crypto = require("crypto");
        return crypto.createHash("md5").update(str).digest("hex");
    },

};

