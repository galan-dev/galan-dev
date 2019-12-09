// feedback form
$(document).ready(function() {
    var sendFeedbackForm = function(formData){
        console.log(formData);
         return fetch("/galan-modules/interview/user/suggestion", {
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
                            $('#questionSuggestion').val('');
                            $('#addCompany').val('');
                            $('#thankyouSuggestion').show();

                            return data;
                        } else {
                            return Promise.reject({status: response.status, data});
                        }
                    });
                });
     }
    $("#questionFormSubmit").click(function() {
        console.log("suggestQuestionForm clicked");
       var feedbackArr = $('#suggestQuestionForm').serializeArray();
       var canSend = false;
       var commentVal = '';
        for(var i in feedbackArr){
            if(feedbackArr[i].name == "questionSuggestion"){
                commentVal = feedbackArr[i].value;
            }
            if(feedbackArr[i].name == "addCompany" && feedbackArr[i].value == ''){
                feedbackArr[i].value  = 'No Company';
            }
        }

        if (commentVal != ''){
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