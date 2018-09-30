function signout()	{

	fetch('http://127.0.0.1:5000/api/v2/auth/signout', {
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