// config/googleConfig.js
const { OAuth2 } = require('googleapis').google.auth;

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

module.exports = { oAuth2Client, SCOPES };
