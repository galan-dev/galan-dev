$(document).ready(function(){
        $('#questionContainer').hide();
        $('#pause').hide();
        var questions = function(){
            return fetch('/galan-modules/interview/{"tags": "some,other,words,that,work"}')
            .then(function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
            // Examine the text in the response
                return response.json();
            }
            ).then(function(json) {
                var jsonData = JSON.parse(json.data);
                console.log(jsonData);
                var qlist = [];
                for(var i in jsonData){
                    qlist.push([i, jsonData[i]]);
                }
                return qlist;
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
        }
        var setPromise =  questions();
        var qList = [];
        setPromise.then(function(data){
            $("#questionData").text(JSON.stringify(data));
        });
        var currQ;
        $('.btn-controller').click(function(){
            var buttonId = this.id;
            console.log(buttonId);
            switch(true){
                case buttonId == "start" && !started:
                    $('#questionContainer').show();
                    $('#startContainer').hide();
                    $('#pause').show();
                    $('#play').hide();
                    $("#btnSubmitAnswer").removeAttr("disabled");
                    $('#next').removeAttr('disabled');
                    $('#reset').removeAttr('disabled');
                    $('#speech').removeAttr('disabled');
                    $('#speech-to-text').removeAttr('disabled');

                    var resText = $("#questionData").text();
                    console.log(resText);
                    var jsText = JSON.parse(resText);
                    console.log(jsText);
                    qList = jsText;
                    var randomQuestion = Math.floor(Math.random() * qList.length);
                    currQ = randomQuestion;
                    console.log(currQ);
                    var currText = qList[randomQuestion][1];
                    $("#displayQuestion").text(currText);

                    started = true;
                    sw.start();
                    console.log(started);
                    // show and start timer
                    break;
                case buttonId == "play" && !started:
                    $('#questionContainer').show();
                    $('#startContainer').hide();
                    $('#pause').show();
                    $('#play').hide();
                    $("#btnSubmitAnswer").removeAttr("disabled");
                    $('#next').removeAttr('disabled');
                    $('#reset').removeAttr('disabled');
                    $('#speech').removeAttr('disabled');
                    $('#speech-to-text').removeAttr('disabled');

                    var resText = $("#questionData").text();
                    console.log(resText);
                    var jsText = JSON.parse(resText);
                    console.log(jsText);
                    qList = jsText;
                    var randomQuestion = Math.floor(Math.random() * qList.length);
                    currQ = randomQuestion;
                    console.log(currQ);
                    var currText = qList[randomQuestion][1];
                    $("#displayQuestion").text(currText);

                    started = true;
                    sw.start();
                    console.log(started);
                    // show and start timer
                    break;
                case buttonId == "reset":
                    // restart timer
                    $('#pause').show();
                    $('#play').hide();
                    sw.reset();
                    sw.start();
                    $('#userAnswer').val("");
                    break;
                case buttonId == "play" && started:
                    $('#pause').show();
                    $('#play').hide();
                    sw.start();
                    // continue timer
                    break;
                case buttonId == "pause":
                    $('#pause').hide();
                    $('#play').show();
                    sw.stop();
                    // pause timer
                    break;
                case buttonId == "next":
                    sw.stop();
                    sw.reset();
                    sw.start();
                    $('#pause').show();
                    $('#play').hide();
                    var nextQuestion = Math.floor(Math.random() * qList.length);
                    while(nextQuestion == currQ){
                        nextQuestion = Math.floor(Math.random() * qList.length);
                    }
                    currQ = nextQuestion;
                    currText = qList[currQ][1];
                    $("#displayQuestion").text(currText);
                    break;
                // case buttonId == "speech":
                //     if (synth.speaking){
                //         try{
                //             speechSynthesis.cancel();
                //         }catch(e){
                //             console.log(e);
                //         }
                //     }else{
                //         if (currQ){
                //             u.text = qList[currQ][1];
                //             u.lang = 'en-AU';
                //             u.rate = 0.95;
                //             u.pitch = 1;
                //             synth.speak(u);
                //         }   
                //     }
                //     break;
                case buttonId == "btnSubmitAnswer":
                    if(/([^\s])/.test($("#userAnswer").val().toString())){
                        $('#alltext').append('\n' + 'Q: ' + $("#displayQuestion").text());
                        $('#alltext').append('\n' + '['+ $('#currTimer').text() +']'+ 'A: '+ $("#userAnswer").val().toString().trim());
                        $("#userAnswer").val('');
                        var sH = document.getElementById("alltext").scrollHeight;
                        $("#alltext").animate({ scrollTop: sH }, 'slow');
                        sw.stop();
                        sw.reset();
                        sw.start();
                        $('#pause').show();
                        $('#play').hide();
                        var nextQuestion = Math.floor(Math.random() * qList.length);
                        while(nextQuestion == currQ){
                            nextQuestion = Math.floor(Math.random() * qList.length);
                        }
                        currQ = nextQuestion;
                        currText = qList[currQ][1];
                        $("#displayQuestion").text(currText);
                    }else{
                            alert("please enter your answer")
                    }
                    break;
                // case buttonId == "speech-to-text":
                //     var recognizing;
                //     var recognition = new SpeechRecognition();
                //     recognition.continuous = true;
                //     recognition.interimResults = true;
                //     reset();
                //     // recognition.onend = reset;
                //     var final_transcript = '';
                //     // var button = window.getElementById(buttonId)
                //     // var textarea = window.getElementById("userAnswer")
                //     $('#' +  buttonId).click(function(){
                //         if (recognizing) {
                //             recognition.stop();
                //             reset();
                //         } else {
                //             recognition.start();
                //             recognizing = true;
                //             console.log('Ready to receive a command.');
                //         //button.innerHTML = "Click to Stop";
                //         }
                //     });

                //     function reset() {
                //         recognizing = false;
                //         //button.innerHTML = "Click to Speak";
                //     }
                //     recognition.onresult = function (event) {
                //         var final = "";
                //         var interim = "";
                //         for (var i = 0; i < event.results.length; ++i) {
                //             if (event.results[i].isFinal) {
                //                 final += event.results[i][0].transcript;
                //             } else {
                //                 interim += event.results[i][0].transcript;
                //                 //$('#userAnswer').val();
                //             }
                //             $('#userAnswer').val(interim);
                //         }
                //         $('#userAnswer').val(final);
                //     }

                //     recognition.onspeechend = function() {
                //         recognition.stop();
                //         console.log('Speech recognition has stopped.');
                //     }
                //     break;
            }
        });
    });