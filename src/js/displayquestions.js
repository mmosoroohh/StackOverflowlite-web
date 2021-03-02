$(window).on('load', function(){
    $('.loader').delay(1000).fadeOut('slow')
})

window.addEventListener('load', display_questions);
function display_questions() {
    fetch('https://stackoverflow-lite-v2.herokuapp.com/api/v2/users/questions', {
    // fetch('http://127.0.0.1:5000/api/v2/users/questions',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
    .then(response =>  response.json())
    .then(data => {
        let parentNode = document.getElementById('tab');
        let node = document.createElement('table');
        let new_data = data.Questions;
        // console.log(new_data)
        for(var i in new_data){
            // console.log(new_data[i]["id"]);
            // node.innerHTML = `
            var my_node = `
            <div class="card">
                <span><a href="view.html?id=${new_data[i]['id']}">${new_data[i]["question"]}</a></span>
                <h5 style="color:grey; font-size:10px">${new_data[i]["date_posted"]}</h5>
                <p style="text-align:right; font-size:10px">Posted By: ${new_data[i]["name"]}</p>
            </div>`;
            // node.classList.add("item");
            parentNode.insertAdjacentHTML('afterbegin', my_node);
            // parentNode.appendChild(node)
            // console.log(parentNode)
        };

    });
}

