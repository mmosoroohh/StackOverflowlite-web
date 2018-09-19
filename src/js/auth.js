import { AnimationFrameScheduler } from "rxjs/internal/scheduler/AnimationFrameScheduler";


class Authentication {

    UserIsLoggedIn = () => {
        const secretkey = this.getToken()
        if (secretkey === null || secretkey === 'undefined') {
            return false;
        }
        return true;
    }
    setToken = (token) => {
        return localStorage.setItem('token', token);
    }

    getToken = () => {
        return localStorage.getItem('token');
    }

    removeToken = () => {
        return localStorage.removeItem('token');
    }

    logOut = () => {
        let element = document.getElementById("logout");
        logout.addEventListener("click", event => {
            this.removeToken();
            redirect: window.location.replace("/auth/login");
        })
    }
}




// User Sign Up
const signup = document.getElementById('signup')
console.log(signup)

signup.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Clicked')
})

// User Sign In
const signin = document.getElementById('signin')
console.log(signin)

signin.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Clicked')
})


// User can post a question
const post_question = document.getElementById('post_question')
console.log(post_question)

post_question.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Clicked')
})


// User can get all question
const get_questions = document.getElementById('get_questions')
console.log(get_questions)

get_questions.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Clicked')
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

function setItems(token, email){	
	localStorage.setItem('token', token);
	localStorage.setItem('email', email);	
}

function getItems(){
	let token = localStorage.getItem('token')
	let email = localStorage.getItem('email')
	return {
		token,
		email 
	}
}
