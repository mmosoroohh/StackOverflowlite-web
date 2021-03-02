$(window).on('load', function(){
    $('.loader').delay(1000).fadeOut('slow')
})
import api from './api';

const email = document.getElementById('email')
const password = document.getElementById('password')
const signin = document.getElementById('signin')

let user = {
    email: null,
    password: null
}

email.addEventListener("change", e => {
    user.email= e.target.value;
    // console.log(data);
});

password.addEventListener("change", e => {
    user.password= e.target.value;
    // console.log(data);
});


signin.addEventListener('click', function(e) {
    e.preventDefault();
    if(user.email && user.password) {
        api.post('/auth/signin', user)
        .then(res => res.json())
        .catch(error => console.error('Error '+ error))
        .then(user => {
            if (user.message === 'Logged in successfully!') {

                // call form
                const signinform = document.getElementById('signin-user');
                loadMessage(user.message, 'success', signinform)
            };
            setItems(user.token);
            window.location.href = "/dashboard.html";
        })
    } else {
        console.log("All fields are required!")
        window.location.href = "/signin.html"
    }
})
        
//return error message response
function response(){
	if(!res.ok){
		throw new Error("Please enter valid information..")
	}
	return res
}

function setItems(token){	
	localStorage.setItem('token', token);	
}

function getItems(){
	let token = localStorage.getItem('token');
	return {
		'token': token
    }
}

function loadMessage(message, classname, insertbfr) {
    removeMessage(classname);
    // Create a div element
    const div = document.createElement('div');
    div.className = classname;
    div.textContent = message;
    // Call the main tag
    const main = document.getElementById('signinMain');
    main.insertBefore(div, insertbfr);
    // remove after 1.5 seconds
    setTimeout(() => {
        main.removeChild(div);
    }, 1500);
}

function removeMessage(classname) {
    // Call the main tag
    const main = document.getElementById('signinMain');
    const message = document.querySelector(`.${classname}`);
    if (message) {
        main.removeChild(message);
    }
}