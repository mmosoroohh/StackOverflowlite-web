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
        .then(user => {console.log(user);
            setItems(user.token);
            window.location.href = "/dashboard.html";
        })
    } else {
        let err = document.getElementById('err-message')
        err.style.backgroundColor = "Block";
        err.style.color = 'black';
        err.innerHTML = user.message;
        console.log("All fields are required!")
        window.location.href = "/signin.html"
    }
})
        


function toJSON(form) {
    let formData = new FormData(form);
    let object = {};

    formData.forEach(function (value, key) {
        object[key] = value;
    });

    return object;
}

//return error message response
function response(){
	if(!response.ok){
		throw new Error("Please enter valid information..")
	}
	return response
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
