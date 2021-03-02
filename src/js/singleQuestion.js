window.addEventListener('load', singleQuestionData);
function singleQuestionData(){
    let question_id = localStorage.getItem('clickedId')
    let token = localStorage.getItem('token')
    fetch('http://127.0.0.1:5000/api/v2/questions/' + question_id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
    })
    .then((response) => {
        status_code = response.status
        return response.json
    })
    .then((response) => {
        if (status_code == 200){
            let parentElement = document.getElementById('all-quests');
            let question = document.createElement('h3');
            let questionText = document.createTextNode(response.Question.question);
            let date_posted = document.getElementById('p')
            let date_postedText = document.createTextNode(response.Question.date_posted);
            let textarea = document.createElement('textarea');
                let answerButton = document.createElement('input');
                let br = document.createElement('BR');
                textarea.setAttribute('class', 'textarea');
                textarea.setAttribute('rows', '2');
                textarea.setAttribute('cols', '60');
                textarea.setAttribute('id','submit_q');
                answerButton.setAttribute('class', 'submit_q');
                answerButton.setAttribute('id','submitAnswer');
                textarea.setAttribute('placeholder', 'Your Answer');
                textarea.setAttribute('id', 'textarea');
                answerButton.setAttribute('id', 'submitAnswer');
                answerButton.setAttribute('value', 'Reply')
                answerButton.addEventListener('click',postAnswerData)
                content.appendChild(contentText);
                title.appendChild(titleText);
                parentElement.appendChild(title)
                parentElement.appendChild(content);
                parentElement.appendChild(textarea);
                parentElement.appendChild(br);
                parentElement.appendChild(answerButton);
                let heading = document.createElement('h3')
                heading.innerHTML='Answers:'
                content.appendChild(heading)
                for (let answer in response.Question.answers){
                    let elemH6 = document.createElement('h6');
                    elemH6.innerHTML = response.Question.answers[answer].answer_body;
                    content.appendChild(elemH6)
                }
            }
            if (statusCode == 401){
                alert(response.Message)
            }
        
        })
        .catch((err) => console.log(err))
           
}


function postAnswerData() { 
    let question_id = localStorage.getItem('clickedId')  
    let answer_body = document.getElementById("textarea").value;
    let token = localStorage.getItem('token')
    let answer_data = JSON.stringify({
        "answer_body":answer_body  
        })

    fetch('http://127.0.0.1:5000/api/v2/questions/' + question_id +'/answers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            
        },
        body: answer_data
    })
    .then((response) => {
            statusCode = response.status
            return response.json()
        })
        .then((response) => {
            if (statusCode == 200){
                alert(response.Message)
            }
            if (statusCode == 401){
                alert(response.Message)
            }
            if (statusCode == 400){
                alert(response.Message)
            }
            if (statusCode == 409){
                alert(response.message)
            }
            console.log(response.Message)
        })
        .catch((err) => console.log(err))
        
}

function displayAnswers(){

}
