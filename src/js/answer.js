function getParam(param){
    return new URLSearchParams(window.location.search).get(param);
  }

// Post an answer to a question
import api from './api';

const post_answer = document.getElementById('answer')

var question_id = getParam('id');

let data = {
    answer: null
    // user_id: localStorage('token')
}

answer.addEventListener("change", e => {
    data.answer = e.target.value;
    // console.log(data);
});

post_answer.addEventListener('click', function(e) {
    console.log("data", data)
    // e.preventDefault();
    if(data.answer) {
        api.post('/questions/'+question_id+'/answers', data)
        .then(response => response.json())
        .then(data => console.log(data))
    } else {
        console.log("All fields are required")
    }
})

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