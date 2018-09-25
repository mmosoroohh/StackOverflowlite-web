window.addEventListener('load', get_questions);
function get_questions() {
    fetch('http://127.0.0.1:5000/api/v2/questions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }})
    .then(response =>  response.json())
    .then(data => {
        let questions = document.getElementById("questions").querySelector("tbody");
        questions.innerHTML = 
        `
            ${ data.message === "No questions found"?`
                    <h2 id="no_questions">No Questions to display</h2>`:
                    data.res.map( (question) => `
                            <tr>
                                <td>${ question.question_id }</td>
                                <td>${ question.questions }</td>
                                <td>${ question.date_posted }</td>
                                <td>${ "<button onclick='modify("+question.question_id+")'Edit</button" }</td>
                                <td>${ "<button onclick='deleteQuestion("+question.question_id+")'>Delete</button" }</td>
                            </tr>
                    `).join("") }
            `;
    });
}
get_questions();

