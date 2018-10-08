$(window).on('load', function () {
    $('.loader').delay(1000).fadeOut('slow')
})

import api from './api';

const postquestion = document.getElementById('question')


let data = {
    question: null,
    // user_id: localStorage("token")
}

question.addEventListener("change", e => {
    data.question = e.target.value;
    // console.log(data);
});


postquestion.addEventListener('click', function (e) {
    console.log("data", data)
    e.preventDefault();
    if (data.question) {
        api.post('/questions', data)
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Question created successfully!') {

                    //Call the form
                    const postqform = document.getElementById('post-question');
                    loadMessage(data.message, 'success', postqform)
                }
            })
    } else {
        console.log('All fields are required')
    }
})

function loadMessage(message, classname, insertbfr) {
    removeMessage(classname);
    //Create a div element
    const div = document.createElement('div');
    div.className = classname;
    div.textContent = message;
    //Call the main tag
    const main = document.getElementById('questionMain');
    main.insertBefore(div, insertbfr);
    //remove after 1.5 seconds
    setTimeout(() => {
        main.removeChild(div);
    }, 1500);
}

function removeMessage(classname) {
    //Call the main tag
    const main = document.getElementById('questionMain');
    const message = document.querySelector(`.${classname}`);
    if (message) {
        main.removeChild(message);
    }
}
