let switchTheme = document.querySelector('.change-theme')
let themeLink = document.getElementById('theme')
let addTask = document.querySelector('.create__button')
let createInput = document.querySelector('.create__input')
let todoList = document.querySelector('.todo__list')
let checkboxCreate = document.querySelector('.create__checkbox')

let light = 'light-theme.css'
let dark = 'dark-theme.css'
let tasks = []

if (localStorage.getItem('tasks') !== null) {
  tasks = JSON.parse(localStorage.getItem('tasks'))
}

if (localStorage.getItem('theme') !== null) {
  themeLink.href = localStorage.getItem('theme')
}
function Task(description, completed) {
  this.description = description
  this.completed = completed
}

const taskLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const createList = (task, index) => {
  return `

<li class="todo__task ${task.completed ? 'checked' : ''}"  >
    <input
      type="checkbox"
      class="todo__checkbox"
      id="checkbox${index}" ${task.completed ? 'checked' : ''}
    />
    <label
      class="todo__item"
      for="checkbox${index}">
    </label>
      ${task.description}
  </li>`
}

function inputClean(createInput, checkboxCreate) {
  createInput.value = ''
  checkboxCreate.checked = false
}

const fillHtmlList = () => {
  todoList.innerHTML = ''
  if (tasks.length !== 0) {
    tasks.forEach((item, index) => {
      todoList.innerHTML += createList(item, index)
    })
  }
}
fillHtmlList()
switchTheme.addEventListener('click', function () {
  if (themeLink.getAttribute('href') == dark) {
    themeLink.href = light
    localStorage.removeItem('theme')
  } else {
    themeLink.href = dark
    localStorage.setItem('theme', dark)
  }
})

addTask.addEventListener('click', function () {
  let valueInput = createInput.value
  let valueCreateCheckbox = checkboxCreate.checked
  tasks.push(new Task(valueInput, valueCreateCheckbox))
  taskLocalStorage()
  fillHtmlList()
  inputClean(createInput, checkboxCreate)
})

console.log(tasks)
