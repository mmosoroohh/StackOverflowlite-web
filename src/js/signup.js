$(window).on('load', function(){
    $('.loader').delay(1000).fadeOut('slow')
})

import api from './api';

const name = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const signup = document.getElementById('signup')

let data = {
    name:null,
    email: null,
    password: null
}

name.addEventListener("change", e => {
    data.name= e.target.value;
    // console.log(data)
})

email.addEventListener("change", e => {
    data.email= e.target.value;
    // console.log(data);
});

password.addEventListener("change", e => {
    data.password= e.target.value;
    // console.log(data);
});




signup.addEventListener('click', function(e) {
    e.preventDefault();
    if(data.name && data.email && data.password) {
        api.post('/auth/signup', data)
        .then(res => res.json())
        .then(data => {
            if (data.message === 'New user registered!') {

            // call the form
            const signupform = document.getElementById('signup-user');
            loadMessage(data.message, 'success', signupform)
            };
            window.location.href = "/signin.html";
        })
    } else {
        console.log('All fields are required')
    }
})

function loadMessage(message, classname, insertbfr) {
    removeMessage(classname);
    // Create a div element
    const div = document.createElement('div');
    div.className = classname;
    div.textContent = message;
    // Call the main tag
    const main = document.getElementById('signupMain');
    main.insertBefore(div, insertbfr);
    // Remove after 1.5 seconds
    setTimeout(() => {
        main.removeChild(div);
    }, 1500);
}

function removeMessage(classname) {
    // Call the main tag
    const main = document.getElementById('signupMain');
    const message = document.querySelector(`.${classname}`);
    if (message) {
        main.removeChild(message);
    }
}

