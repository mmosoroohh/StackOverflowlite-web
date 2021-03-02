import api from './api';

const postquestion = document.getElementById('question')


let data = {
    question: null,
    // user_id: localStorage("token")
}

question.addEventListener("change", e => {
    data.question= e.target.value;
    // console.log(data);
});


postquestion.addEventListener('click', function(e) {
    console.log("data", data)
    e.preventDefault();
    if(data.question) {
        api.post('/questions', data)
        .then(res => res.json())
        .then(data => console.log(data))
    } else {
        console.log('All fields are required')
    }
})


// function post_question(card){
//     fetch('http://127.0.0.1:5000/api/v2/questions', {
//         method: 'post',
//         body: JSON.stringify(toJSON(card)),
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer "+ localStorage.getItem("token")
//         }
//     })
//     .then(response => response.json())
//     .catch(error => console.error('Error '+ error))
//     .then(data => {
//         if(data.status_code === 201){
//             alert(data.message)
//             console.log('message')
//             window.location.href = "../UI/dashboard.html"
//         }else{
//             let err = document.getElementById('err-message')
//             err.style.display = "block"
//             err.innerHTML = data.message
//         }
//     })
//     return false;
// }

// function toJSON(card) {
//     let cardData = new cardData(card);
//     let object = {};

//     cardData.forEach(function (value, key) {
//         object[key] = value;
//     });

//     return object;
// }