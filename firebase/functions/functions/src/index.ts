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

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {defineSecret} from "firebase-functions/params";
import request = require("request");

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// define spotify client id
const spotifyClientId = defineSecret("spotify_client_id");
// define spotify client secret
const spotifyClientSecret = defineSecret("spotify_client_secret");

exports.SpotifyAuth = onRequest({cors: [/firebase\.com$/, "http://localhost:3003"], secrets: [spotifyClientId, spotifyClientSecret]}, (req, res) => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: "Basic " + (Buffer.from(spotifyClientId.value() + ":" + spotifyClientSecret.value()).toString("base64")),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };
  logger.info(authOptions, "request"+req, {structuredData: true});

  request.post(authOptions, function(error, response, body) {
    logger.info("error!!" + error, {structuredData: true});
    logger.info("posted authOptions", authOptions, response, body, error, {structuredData: true});
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      const token = body.access_token;
      const options = {
        url: "https://api.spotify.com/v1/users/jmperezperez",
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
      request.get(options, function(error, response, body) {
        console.log(response, body, error);
        logger.info(response, body, error, {structuredData: true});
        // response.send(body);
        res.send(`Hello from Firebase! -Ethan test ${spotifyClientId.value()}, ${spotifyClientSecret.value()}, ${token}, ${response}, ${body}, ${error}`);
      });
    } else {
        res.send(`Error: ${error}`);
    }
  });
});
