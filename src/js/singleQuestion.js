$(window).on('load', function () {
    $('.loader').delay(1000).fadeOut('slow')
})

// User get a single question
function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

var question_id = getParam('id');
function singleQuestion() {
    // fetch("http://127.0.0.1:5000/api/v2/questions/"+question_id, {
    fetch("https://stackoverflow-lite-v2.herokuapp.com/api/v2/questions/" + question_id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("question").innerHTML = data.Question.question;
        })
}

// Display Answers
function loadAnswers() {
    // fetch("http://127.0.0.1:5000/api/v2/questions/"+question_id+"/answers",   {
    fetch("https://stackoverflow-lite-v2.herokuapp.com/api/v2/questions/" + question_id + "/answers", {
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
                    <div class="card" style="color: #80808F;">
                        <span>
                            ${ answer.answer}
                        </span>
                        <div class="upvote">
                            <a  id="upvotebutton" href="https://stackoverflow-lite-v2.herokuapp.com/api/v2/answers/${answer.id}" class="upvote my-button">Upvote<i class="fas fa-thumbs-up"></i></a>
                            <a id="downvotebutton" href="https://stackoverflow-lite-v2.herokuapp.com/api/v2/answers/${answer.id}" class="downvote my-button">Downvote<i class="fas fa-thumbs-down"></i></a>
                        </div>
                        <h5 style="color:grey; font-size:15px; text-align:left;">Posted by: ${ answer.name}</h5>
                    </div>
                    `).join("")
                }
                `;

            if (data.length == 0) {
                answers.innerHTML = answers.innerHTML + "<div>No answers posted</div>"
            } else {
                answers.innerHTML = answers.innerHTML + content;
            }
        });
}

document.getElementById("answers").addEventListener('click', upvotedownvote)


// Upvote/downvote an answer
function upvotedownvote(e) {
    const upvotebutton = document.getElementById('upvotebutton');
    const downvotebutton = document.getElementById('downvotebutton');


    e.preventDefault();
    const target = e.target;
    const url = target.getAttribute('href');

    if (target.classList.contains('upvote')) {
        console.log(url);
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "status": "upvote"
            })
        }).then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    target.style.color = 'green';
                    downvotebutton.style.color = 'blue';
                }, 1000);
            });
    } else if (target.classList.contains('downvote')) {
        console.log(url);
        // fetch("http://127.0.0.1:5000/api/v2/answers"+answer_id+"/downvote", {
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "status": "downvote"
            })
        }).then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    target.style.color = 'green';
                    upvotebutton.style.color = 'blue';
                }, 1000);
            });
    }

}


document.addEventListener('DOMContentLoaded', () => {
    singleQuestion()
    loadAnswers()
});