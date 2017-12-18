
 var extend = require('extend');
 var watson = require('watson-developer-cloud');
 var vcapServices = require('vcap_services');
 
 // load in the environment data for our application
 var config = require('../../env.json');
 
 /**
  * this returns a speech to text token to be used in the browser for direct access
  * to the Watson speech to text service. 
  * @param {NodeJS Request Object} req - provides information about the inbound request
  * @param {NodeJS Response Object} res - this is how we respond back to the browser
  */
 exports.token = function(req, res) {
     // the extend function adds additional information into our credentials from within the 
     // Watson and Bluemix operating environment
     var sttConfig = extend(config.speech_to_text, vcapServices.getCredentials('speech_to_text'));
     // request authorization to access the service
     var sttAuthService = watson.authorization(sttConfig);
 
     // now that we're authenticated, get the token
     sttAuthService.getToken({
         url: sttConfig.url
     }, function(err, token) {
         if (err) {
             // send an error back if we cannot retrieve the token successfully
             console.log('Error retrieving token: ', err);
             res.status(500).send('Error retrieving token'+ReferenceError);
             return;
         }
         // if we're successful, then send the new token back to the browser
         res.send(token);
     });
 }
 
