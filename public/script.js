

function renderTodos(todosArray) {
    const todosHtmlArray = todosArray.map(todo => {
        return `<li class="${todo.completed ? 'completed' : 'incomplete'}"> ${todo.text}</li><br>
        <button class="delete-button" data-id="${todo.id} data-completed="${todo.completed ? 'completed' : 'incomplete'}">Delete</button>
        <button class="toggle-complete" data-id="${todo.id}" >Completed?</button>`
    })
    return todosHtmlArray.join('')
}


function fetchTodos() {
    fetch('/api/v1/todos')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            todos.innerHTML = renderTodos(data)
        })
}

const todos = document.getElementById('todos')
const todoForm = document.getElementById('todoForm')


fetchTodos() 


todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = document.getElementById('todo_text')
    fetch('/api/v1/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: todoText.value
        })
    })
        .then(res => res.json())
        .then(data => {
            fetchTodos()
            todoForm.reset
        })
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
        const id = e.target.dataset.id
        fetch(`/api/v1/todos/${id}`, {
            method: 'DELETE'
        })
            .then(res => !res.ok &&
                res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                fetchTodos()

            })


    }
})
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-complete')) {
        const id = e.target.dataset.id
        const completed = e.target.dataset.completed;
        fetch(`/api/v1/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: completed === 'completed' ? false : true
            })
            
        })
            .then(res => !res.ok &&
                res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                fetchTodos()

            })


    }
})
