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
const allowedOrigins = ["https://www.whatgenreisthis.com", "https://www.localhost:3000", "https://localhost:3000"];
exports.SpotifyAuth = onRequest({ cors: true }, (req, res) => {
    // if the origin is in the allowedOrigins array, set the Access-Control-Allow-Origin header to the origin
    if (allowedOrigins.indexOf(req.get("origin")) > -1) {
        res.set("Access-Control-Allow-Origin", req.get("origin"));
    }
    if (req.method === "OPTIONS") {
        // Send response to OPTIONS requests
        res.set("Access-Control-Allow-Methods", "GET");
        // res.set('Access-Control-Allow-Origin', 'https://whatgenreisthis.com')
        // res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set("Access-Control-Max-Age", "3600");
        res.status(204).send("");
    }
    else {
        // get the token from spotify
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
    }
});
//# sourceMappingURL=index.js.map