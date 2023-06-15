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

import * as logger from "firebase-functions/logger";
import {defineSecret} from "firebase-functions/params";
const { onRequest } = require("firebase-functions/v2/https");
import request = require("request");
// const cors = require("cors")({origin: true});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// define spotify client id
const spotifyClientId = defineSecret("spotify_client_id");
// define spotify client secret
const spotifyClientSecret = defineSecret("spotify_client_secret");

exports.SpotifyAuth = onRequest(
  {cors: ["http://localhost:3000", "localhost:3000", "https://www.whatgenreisthis.com","https://www.whatgenreisthis.com/", "http://www.whatgenreisthis.com", "www.whatgenreisthis.com"]},
  (req:any, res:any) => {

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

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("accept", "*/*");
  
  logger.info(authOptions, "request" + req, {structuredData: true});

  request.post(authOptions, function (error: string, response: {statusCode: number}, body: any) {
    logger.info("error!!" + error, {structuredData: true});
    logger.info("posted authOptions", authOptions, response, body, error, {structuredData: true});
    if (!error && response.statusCode === 200) {
      // return the access token in the response
      res.send(response);
    } else {
      res.send(error);
    }
  });
});

