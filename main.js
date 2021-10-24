let switchTheme = document.querySelector('.change-theme')
let themeLink = document.getElementById('theme')
let addTask = document.querySelector('.create__button')
let createInput = document.querySelector('.create__input')
let todoList = document.querySelector('.todo__list')
let checkboxCreate = document.querySelector('.create__checkbox')
let checkboxTodo = document.querySelector('.todo__checkbox')
let activeElem = document.querySelector('.function__active')
let completedElem = document.querySelector('.function__completed')
let clearElems = document.querySelector('.footer__clear')
let footerElems = document.querySelector('.footer__function')
let calkNumber = document.querySelector('.calc__number')

let light = 'light-theme.css'
let dark = 'dark-theme.css'

let tasks = []
let todoItemElems = []
let activeTasks = []
let completedTasks = []

if (localStorage.getItem('tasks') !== null) {
  tasks = JSON.parse(localStorage.getItem('activeTasks'))
}

function Task(description, completed) {
  this.description = description
  this.completed = completed
}

const taskAllLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
// taskAllLocalStorage()

/* Ф-я яка створює HTML  */
const createList = (tasks, index) => {
  let li = document.createElement('li')
  li.classList.add('todo__task')
  let inputCheckbox = document.createElement('input')
  inputCheckbox.classList.add('todo__checkbox')
  inputCheckbox.setAttribute('type', 'checkbox')
  inputCheckbox.setAttribute('id', index)
  let label = document.createElement('label')
  label.classList.add('todo__item')
  label.setAttribute('for', index)
  let img = document.createElement('img')
  img.classList.add('todo__icon')
  img.setAttribute('src', 'image/del.svg')
  todoList.appendChild(li)
  li.appendChild(inputCheckbox)
  li.appendChild(label)
  li.appendChild(img)
  label.innerHTML = tasks.description

  if (tasks.completed == true) {
    li.classList.add('checked')
    inputCheckbox.checked = true
    console.log(inputCheckbox.checked)
  }
  inputCheckbox.addEventListener('click', function () {
    completeTask(index)
  })
  img.addEventListener('click', function () {
    deleteTask(index)
  })
}

const calkTasks = () => {
  let calk = tasks.length
  if (tasks.length !== 0) {
    calkNumber.innerHTML = calk
  } else {
    calkNumber.innerHTML = '0'
  }
  console.log(calk)
}

const inputClean = (createInput, checkboxCreate) => {
  createInput.value = ''
  checkboxCreate.checked = false
}

/* Ф-я яка створює HTML  */
const fillHtmlList = () => {
  todoList.innerHTML = ''
  if (tasks.length !== 0) {
    // calkTasks(tasks.length)
    tasks.forEach((item, index) => {
      // todoList.innerHTML += createList(item, index)
      createList(item, index)
    })
    todoItemElems = document.querySelectorAll('.todo__task')
  }
}
fillHtmlList()

addTask.addEventListener('click', function () {
  let valueInput = createInput.value
  let valueCreateCheckbox = checkboxCreate.checked
  tasks.push(new Task(valueInput, valueCreateCheckbox))

  taskAllLocalStorage()
  fillHtmlList()
  inputClean(createInput, checkboxCreate)
  calkTasks()
})
