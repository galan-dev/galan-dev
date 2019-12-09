// feedback form
$(document).ready(function() {
    var sendFeedbackForm = function(formData){
        console.log(formData);
         return fetch("/galan-modules/interview/user/feedback", {
                    mode: 'cors',
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Module': 'interview-module',
                    }
                }).then(response => {
                    return response.json().then(data => {
                        if (response.ok) {
                            console.log(data);
                            $('#feedbackForm').html(data);
                            return data;
                        } else {
                            return Promise.reject({status: response.status, data});
                        }
                    });
                });
     }
    $("#feedbackFormSubmit").click(function() {
        console.log("feedback clicked");
       var feedbackArr = $('#feedbackForm').serializeArray();
       var canSend = false;
       var commentVal = '';
       var compareStr = '';
        for(var i in feedbackArr){
            compareStr += feedbackArr[i].name;
            if(feedbackArr[i].name == "currentPractice"){
                commentVal = feedbackArr[i].value;
            }
            if(feedbackArr[i].name == "addFeatures" && feedbackArr[i].value == ''){
                feedbackArr[i].value  = 'No Features';
            }
        }

        if (compareStr.includes("videouseful")
        && commentVal != ''){
            canSend = true;
        }

        if (canSend){
            console.log("feedback send");
            var sendObj = {
                data: feedbackArr,
            }
            sendFeedbackForm(JSON.stringify(sendObj));
        }
    })
})