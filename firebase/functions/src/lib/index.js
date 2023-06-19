"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
/* eslint-disable max-len */
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require("firebase-functions/logger");
const params_1 = require("firebase-functions/params");
const request = require("request");
const { onRequest } = require("firebase-functions/v2/https");
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
// define spotify client id
const spotifyClientId = (0, params_1.defineSecret)("spotify_client_id");
// define spotify client secret
const spotifyClientSecret = (0, params_1.defineSecret)("spotify_client_secret");
exports.SpotifyAuth = onRequest((req, res) => {
    logger.info('REQUEST SENT', req, { structuredData: true });
    res.set("Access-Control-Allow-Origin", "*");
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization: "Basic " + Buffer.from(spotifyClientId.value() + ":" + spotifyClientSecret.value()).toString("base64"),
        },
        form: {
            grant_type: "client_credentials",
        },
        json: true,
    };
    logger.info(authOptions, "request" + req, { structuredData: true });
    request.post(authOptions, function (error, response, body) {
        logger.info("posted authOptions", authOptions, response, body, error, { structuredData: true });
        if (!error && response.statusCode === 200) {
            // return the access token in the response
            res.status(200).send(response);
        }
        else {
            logger.info("error!!" + error, { structuredData: true });
            res.send(error);
        }
    });
});
//# sourceMappingURL=index.js.map