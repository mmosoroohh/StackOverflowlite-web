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
        api.post('/auth/signup', data).then(res => res.json()).then(data => console.log(data))
    } else {
        console.log('All fields are required')
    }
})


