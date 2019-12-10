// Speech Recognition Script
var speechInUse = false;
var started = false;
try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    //var sps = new SpeechSynthesis();
    var recognition = new SpeechRecognition();
    var synth = window.speechSynthesis;
    var u = new SpeechSynthesisUtterance();
    // u.text = 'Hello World';
    // u.lang = 'en-US';
    // u.rate = 1.2;
    // u.onend = function(event) { alert('Finished in ' + event.elapsedTime + ' seconds.'); }
    // speechSynthesis.speak(u);
    // console.log(speechSynthesis.getVoices());
    }
    catch(e) {
    console.error(e);
}

try{
    speechSynthesis.cancel();
}catch(e){
    console.log(e);
}