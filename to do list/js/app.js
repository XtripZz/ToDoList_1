let newTodo = document.querySelector('.write-new-todo'),
    addNewTodo = document.querySelector('.add'),
    allTodo = document.querySelector('.all-todo'),
    todoList = []

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'))
    toDisplay()
}

addNewTodo.addEventListener('click', e => {
    if (newTodo.value != '' && newTodo.value != ' ') {
        todoList.push({
            todo: newTodo.value,
            checked: false,
            important: false,
        })

        toDisplay()
        localStorage.setItem('todo', JSON.stringify(todoList))
        newTodo.value = ''
    }
})

function toDisplay() {
    let text = ''
    if (todoList.length === 0) allTodo.innerHTML = ''
    todoList.forEach((el, index) => {
        text += `
            <li>
                <input type="checkbox" id="elem_${index}" ${el.checked ? 'checked' : ''}>
                <label for="elem_${index}" class="${el.important ? 'important' : ''}">${el.todo}</label>
                <button id={del_${index}}>Delete</button>
            </li>
        `
        allTodo.innerHTML = text
    })
}

allTodo.addEventListener('change', e => {
    let valueOfLabel = allTodo.querySelector(`[for=${e.target.id}]`).innerHTML
    todoList.forEach(el => {
        if (valueOfLabel === el.todo) {
            el.checked = !el.checked
        }
    })

    toDisplay()
    localStorage.setItem('todo', JSON.stringify(todoList))
})

allTodo.addEventListener('contextmenu', e => {
    e.preventDefault()
    todoList.forEach((el, index) => {
        if (el.todo === e.target.innerHTML) {
            el.important = !el.important
        }
    })
    
    toDisplay()
    localStorage.setItem('todo', JSON.stringify(todoList))
})

allTodo.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {

        let buttonId = e.target.id.split('_')[1]
        buttonId = Number(buttonId.substring(0, buttonId.length - 1))

        todoList.forEach((el, index) => {
            if (buttonId === index) {
                todoList.splice(index, 1)
            }
        })

        toDisplay()
        localStorage.setItem('todo', JSON.stringify(todoList))
    }
})