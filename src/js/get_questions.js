window.addEventListener('load', get_questions);
function get_questions() {
    let token = localStorage.getItem('token')

    fetch('http://127.0.0.1:5000/api/v2/questions', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    .then((response) => {
        status_code = response.status
        return response.json()
    })
    .then((response) => {
        if (status_code == 200) {
            let parentElement = document.getElementById('questions');
            console.log(response.Questions)
            for (let question in response.Questions){
                let question_id = document.createElement('p');
                let question_idText = document.createElement(response.Questions[question_id].question_id);
                let question = document.createElement('h3');
                let questionText = document.createElement(response.Questions[question].question);
                let date_posted = document.createElement('p');
                let date_postedText = document.createElement(response.Questions[date_posted].date_posted);
                question_id.appendChild(question_idText);
                question.appendChild(questionText);
                date_posted.appendChild(date_postedText);
                parentElement.appendChild(question_id);
                parentElement.appendChild(question);
                parentElement.appendChild(date_posted);

                console.log(questionText)

            }
        }
        if (status_code == 401){
            alert(response.message)
        }

        console.log(response.Message)
    })
    .catch((err) => console.log(err))
}
get_questions();

// User get a single question

fetch("/questions/"+localStorage.getItem("question_id"), {
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

// Userr can modify a question
function modifyQuestion(card){
    fetch("/questions/"+localStorage.getItem("question_id"), {
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
    fetch("/questions/"+question_id, {
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