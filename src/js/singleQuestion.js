// User get a single question
function singleQuestion(){
    fetch("http://127.0.0.1:5000/api/v2/questions/"+question_id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("token")
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("question").value = data.res.question;
    })
}

// Userr can modify a question
function modifyQuestion(card){
    fetch("http://127.0.0.1:5000/api/v2/questions/"+question_id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem('token')
        },
        body: JSON.stringify(toJSON(card))
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === "Question not available"){
            alert("That question is available to be updated")
        }else{
            alert("Question has been updated!")
        }
            windows.location.href = "../dashboard.html"
    })
    return false;
}

function toJSON(card) {
    let cardData = new cardData(card);
    let object = {};

    cardData.forEach(function (value, key)  {
        object[key] = value;
    });

    return object;
}

// User delete a question
function deleteQuestion(question_id){
    fetch("http://127.0.0.1:5000/api/v2/questions/"+question_id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
    })
    .then(response => response.json())
    .then(data => {
    	alert("Question has been deleted!")
    	window.location.reload()
    })
    return false;
}

