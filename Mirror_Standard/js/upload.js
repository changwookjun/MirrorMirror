// Copyright 2013-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
var fs = require('fs');
var google = require('../lib/googleapis.js');
var drive = google.drive('v2');
var OAuth2Client = google.auth.OAuth2;

var CLIENT_ID = '608630183663-kcdi97qj26fqhrebpmhn2gkqcmkkooak.apps.googleusercontent.com';
var CLIENT_SECRET = 'QWOqts_3LSa8FT_IHcsoRK-L';
var REDIRECT_URL = 'https://developers.google.com/oauthplayground/?code=4/UX8LPCTh1uP_P75R6Kx2WDyxa7dk10c03AuFBDnVweU#';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oauth2Client.setCredentials({
  access_token: 'ya29.Ci9mA445MehtmrZGDZ2-wOLTLhiWUiIPns_ltkRTHtbfNKyByUyR9OZ7foU0RZbRqQ'
});

/*
drive.files.insert({
  resource: {
    title: 'by mirror',
    mimeType: 'image/jpg'
  },
  media: {
    mimeType: 'image/jpg',
    body: fs.createReadStream('../public/photo/photo0.jpg')
  },
  auth: oauth2Client
}, function (err, response) {
  console.log('ok' + response + err);
});
*/
module.exports.upload = function() {
	console.log('upload');
	drive.files.insert({
	  resource: {
	    title: 'by mirror',
	    mimeType: 'image/jpg'
	  },
	  media: {
	    mimeType: 'image/jpg',
	    body: fs.createReadStream('./public/photo/photo0.jpg')
	  },
	  auth: oauth2Client
	}, function (err, response) {
	  console.log('ook'+response+err);
});
}
