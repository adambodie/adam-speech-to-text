/*
** z2c-speech.js
*/


pigLatin = text => {
    let regex = /(^[^aeiou]*)(\w*\'?\w*)/ig;
    let replacement = '$2-$1ay';
    pigLatinSpeech = [];
    newSpeech = text.split(" ");
	newSpeech.forEach((element) => { pigLatinSpeech.push(element.replace(regex, replacement)); });
	if (pigLatinSpeech[pigLatinSpeech.length - 1 ] == "-ay") {pigLatinSpeech.pop();}
    translatedSpeech = pigLatinSpeech.join(" ");
    return translatedSpeech;
  }

initPage = () => {
	const _mic = $('#microphone'), 
		  _stop = $('#stop'),
		  _reset = $('#reset'),
		  _speech = $('#speech'),
		  _translate = $('#translate');
	_mic.addClass("mic_enabled");
	_stop.addClass("mic_disabled");
	_reset.addClass("mic_enabled");
	_translate.addClass("mic_disabled");

	_reset.on("click", () => {
		_mic.addClass("mic_enabled");
		_mic.removeClass("mic_disabled");
		_translate.addClass("mic_disabled");
		_translate.removeClass("mic_enabled");
		const resetText = _speech.text().replace(/.*/, "Spoken output goes here");
		_speech.html(resetText);
		console.log("Speech cleared");
	});
	
	_mic.on("click", function() {
		let _className = this.className;
		if(this.className == "mic_enabled") {
			_mic.addClass("mic_disabled");
			_mic.removeClass("mic_enabled");
			_stop.addClass("mic_enabled");
			_stop.removeClass("mic_disabled");
			$.when($.get('/api/speech-to-text/token')).done(
				(token) => {
					stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
					token: token,
					outputElement: '#speech' // CSS selector or DOM Element
				});
				_speech.css( "text-transform", "capitalize" );
				stream.on('error', (err) => { console.log(err); });
			});
        } else {
			console.log("Unable to complete request");
		}
	});
		_stop.on("click", () => {
			console.log("Stopping text-to-speech service...");
			if (!((typeof(stream) == "undefined") || (stream == null))) { stream.stop(); }
			_mic.addClass("mic_enabled");
			_mic.removeClass("mic_disabled");
			_stop.addClass("mic_disabled");
			_stop.removeClass("mic_enabled");
			_translate.addClass("mic_enabled");
			_translate.removeClass("mic_disabled");
		});
		
		_translate.on("click", () => {
			_speech.html(pigLatin(_speech.text()));
			console.log("Translated to Pig Latin");
		});
	}

module.exports = pigLatin;