// User get a single question
function getParam(param){
    return new URLSearchParams(window.location.search).get(param);
  }

var question_id = getParam('id');
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
        document.getElementById("question").innerHTML = data.Question.question;
    })
}

// Display Answers
function loadAnswers(){
            fetch("http://127.0.0.1:5000/api/v2/questions/"+question_id+"/answers",   {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(response => response.json())
            .then(data => {
                let answers = document.getElementById("answers");
                let content = `
                    ${data.Answers.map(answer => `
                    <div>
                        <span>
                            ${ answer.answer }
                        </span>
                        <h5 style="color:grey; font-size:15px; text-align: right">Posted by: ${ answer.name }</h5>
                    </div>
                    `).join("")
                    }
                `;

                if(data.length == 0){
                    answers.innerHTML = answers.innerHTML + "<div>No answers posted</div>"
                }else{
                    answers.innerHTML = answers.innerHTML + content;
                }
            });
}

// Upvote an answer
function upvote(answer_id){
    fetch("http://127.0.0.1:5000/api/v2/answers"+answer_id+"/upvote", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
    }).then(response => response.json())
    .then(data => {
        let answer = data.Answer;
        let row = document.getElementById("answer_"+answer_id);

        let content = "<span>"+answer.answer_id+"</span><p>"+answer.answer+
        "</p><p>"+answer.date_posted+"</p><span>"+answer.status+
        "</span><button onclick='upvote("+answer.answer_id+")''>Upvote</button>";

        alert('Answer upvoted')
        window.location.href = "../dashboard"
        row.innerHTML = content;
    });
}

// Downvote an answer
function downvote(answer_id){
    fetch("http://127.0.0.1:5000/api/v2/answers"+answer_id+"/downvote", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
    }).then(response => response.json())
    .then(data => {
        let answer = data.Answer;
        let row = document.getElementById("answer_"+answer_id);

        let content = "<span>"+answer.answer_id+"</span><p>"+ answer.answer+
        "</p><p>"+answer.date_posted+"</p><span>"+answer.status+
        "</span><button onclick='downvote("+answer.answer_id+")''>Downvote</button>";

        alert("Answer downvoted")
        window.location.href = "../dashboard.html"
        row.innerHTML = content;
    });
}


document.addEventListener('DOMContentLoaded', ()=>{
    singleQuestion()
    loadAnswers()
});