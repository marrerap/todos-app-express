function renderTodos(todosArray) {
    const todosHtmlArray = todosArray.map(todo => {
        return `<li class="${todo.completed ? 'completed' : 'incomplete'}"> ${todo.text}</li>`
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





