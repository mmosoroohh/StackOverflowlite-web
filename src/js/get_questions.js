$(window).on('load', function(){
    $('.loader').delay(1000).fadeOut('slow')
});

window.addEventListener('load', get_questions);

function show_question(data){
    window.location.replace('http://127.0.0.1:42237/view.html');
    question = document.getElementById('question');
    question.innerHTML = data;

}

function get_questions() {
    fetch('https://stackoverflow-lite-v2.herokuapp.com/api/v2/questions',{
    // fetch('http://127.0.0.1:5000/api/v2/questions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }})
    .then(response =>  response.json())
    .then(data => {
        let parentNode = document.getElementById('tab');
        let node = document.createElement('card');
        let new_data = data.Questions;
        for(var i in new_data){
            let div = document.createElement("div");

            // let span_id = document.createElement("span");
            // span_id.innerHTML = new_data[i]["id"];
            let qId = new_data[i]['id'];

            let span_question = document.createElement("span");
            span_question.innerHTML = `<a href="view.html?id=${qId}" id="question_body${qId}">${new_data[i]["question"]}</a>`;

            let p_date = document.createElement("p");
            p_date.innerHTML = new_data[i]["date_posted"];

            let p_actions = document.createElement("p");

            let button_edit = document.createElement("button");
            button_edit.innerHTML = "Edit"; 
            let questionIdAttribute = document.createAttribute('data-id');
            questionIdAttribute.value = qId;

            button_edit.setAttributeNode(questionIdAttribute)
            button_edit.classList.add("btn")

            p_actions.appendChild(button_edit);

            let button_delete = document.createElement("button");
            button_delete.innerHTML = "Delete";
            let a = document.createAttribute("data-id");
            a.value = qId;

            button_delete.setAttributeNode(a);
            button_delete.classList.add("btn")


            p_actions.appendChild(button_delete);

            // div.appendChild(span_id);
            div.appendChild(span_question);
            div.appendChild(p_date);
            div.appendChild(p_actions);

            button_edit.addEventListener("click", function(){
                modifyQuestion(button_edit)
            });

            button_delete.addEventListener("click", function(){
                deleteQuestion(new_data[i]['id'])
            });

            parentNode.appendChild(div);
    }
});
}

// User can modify a question
function modifyQuestion(card){
    let qId = card.getAttribute('data-id');
    let questionBody = document.getElementById('question_body'+qId)
    console.warn(questionBody.innerHTML)
    console.warn(qId);
    fetch("https://stackoverflow-lite-v2.herokuapp.com/api/v2/questions/"+id, {
    // fetch("http://127.0.0.1:5000/api/v2/questions/"+id, {
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
            alert("That question is available to be edited")
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
function deleteQuestion(id){
    if(confirm("Do you want to delete this question?")){
        fetch("https://stackoverflow-lite-v2.herokuapp.com/api/v2/questions/"+id, {
        // fetch("http://127.0.0.1:5000/api/v2/questions/"+id, {
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
    }
    return false;
}

