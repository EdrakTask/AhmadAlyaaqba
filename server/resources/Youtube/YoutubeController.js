var fs = require('fs');
var readline = require('readline');
var util = require('util');
const  { google }  = require("googleapis");
const { OAuth2Client } = require('google-auth-library');

exports.upload = function(req ,res){
  let youtubeData = {}
  var SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']
  var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
  var TOKEN_PATH = TOKEN_DIR + 'google-apis-nodejs-quickstart.json';
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the YouTube API.
    //See full code sample for authorize() function code.
    authorize(JSON.parse(content), {'params': {'part': 'snippet,status'}, 'properties': {'snippet.categoryId': '22',
    'snippet.description': req.body.desc,
    'snippet.title': req.body.cName,}, 'mediaFilename': req.body.location}, videosInsert);
  });

  function authorize(credentials, requestData, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    //var auth = new googleAuth();
    var oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        getNewToken(oauth2Client, requestData, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client, requestData);
      }
    });
  }

  function getNewToken(oauth2Client, requestData, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client, requestData);
      });
    });
  }

  function storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
  }

  async function videosInsert(auth, requestData) {
    var service = google.youtube({version: 'v3'});
    // var parameters = removeEmptyParameters(requestData['params']);
    // parameters['auth'] = auth;
    // parameters['media'] = { body: fs.createReadStream(requestData['mediaFilename']) };
    // parameters['notifySubscribers'] = false;
    // parameters['resource'] = createResource(requestData['properties']);

  var fileSize = fs.statSync(requestData['mediaFilename']).size;
  const resYoutube = await service.videos.insert({
    part: 'id,snippet,status',
    notifySubscribers: false,
    requestBody: {
      snippet: {
        title: requestData['properties']['snippet.title'],
        description: requestData['properties']['snippet.description']
      },
      status: {
        privacyStatus: 'private'
      }
    },
    media: {
      body: fs.createReadStream(requestData['mediaFilename'])
    },
    auth : auth
  }, {
    // Use the `onUploadProgress` event from Axios to track the
    // number of bytes uploaded to this point.
    onUploadProgress: evt => {
      const progress = (evt.bytesRead / fileSize) * 100;
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`${Math.round(progress)}% complete`);
    }
  });
  
    console.log('\n\n');
    console.log(resYoutube.data);
    youtubeData = resYoutube.data
    res.send(youtubeData)
  }
  
}