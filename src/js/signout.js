$(window).on('load', function(){
    $('.loader').delay(1000).fadeOut('slow')
})

function signout()	{

	fetch('https://stackoverflow-lite-v2.herokuapp.com/api/v2/questions/api/v2/auth/signout', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+ localStorage.removeItem('token')
		}
	})
	.then((response) => {
		status_code = response.status
		return response.json()
	})
	.then((response) => {
		if (status_code == 200){
			window.location.replace('signin.html')
		}

		console.log(response.message)
	})
	.catch((err) => console.log(err))
}