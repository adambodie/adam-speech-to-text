/*
** z2c-speech.js
*/

function initPage () {
  const _mic = $('#microphone'); const _stop = $('#stop'); const _reset = $('#reset'); const _speech = $('#speech');
    _mic.addClass("mic_enabled");
    _stop.addClass("mic_disabled");
    _reset.addClass("mic_enabled");
    
  _reset.on("click", () => {
      _mic.addClass("mic_enabled");
      _mic.removeClass("mic_disabled");
	  const resetText = _speech.text().replace(/.*/, "Spoken output goes here");
	  _speech.html(resetText);
	  console.log("Speech cleared");
   });
  _mic.on("click", function() {
      var _className = this.className;
      if(this.className == "mic_enabled") {
        _mic.addClass("mic_disabled");
        _mic.removeClass("mic_enabled");
        _stop.addClass("mic_enabled");
        _stop.removeClass("mic_disabled");
        $.when($.get('/api/speech-to-text/token')).done(
          function (token) {

            stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
               token: token,
               outputElement: '#speech' // CSS selector or DOM Element
             });
             _speech.css( "text-transform", "capitalize" );
            stream.on('error', function(err) { console.log(err); });
          });
        }
      });

  _stop.on("click", () => {
    console.log("Stopping text-to-speech service...");

    if (!((typeof(stream) == "undefined") || (stream == null))) {
		stream.stop(); 
	}
    _mic.addClass("mic_enabled");
    _mic.removeClass("mic_disabled");
    _stop.addClass("mic_disabled");
    _stop.removeClass("mic_enabled");
  });
}
