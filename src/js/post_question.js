$(window).on('load', function(){
    $('.loader').delay(1000).fadeOut('slow')
})

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

