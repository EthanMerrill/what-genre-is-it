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

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// define spotify client id
const spotifyClientId = defineSecret("spotify_client_id");
// define spotify client secret
const spotifyClientSecret = defineSecret("spotify_client_secret");

export const helloWorld = onRequest({secrets: [spotifyClientId, spotifyClientSecret]}, (request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send(`Hello from Firebase! -Ethan test ${spotifyClientId.value()}, ${spotifyClientSecret.value()}`);
});

/**
 * Get the spotify client id from google secrets manager
 */
// get the spotify client id from google secrets manager
