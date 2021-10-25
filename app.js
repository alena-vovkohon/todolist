let switchTheme = document.querySelector('.change-theme')
let themeLink = document.getElementById('theme')
let createTask = document.querySelector('.create')
let createInput = document.querySelector('.create__input')
let todoList = document.querySelector('.todo__list')
let checkboxCreate = document.querySelector('.create__checkbox')
let checkboxTodo = document.querySelector('.todo__checkbox')
let activeElem = document.querySelector('.function__active')
let completedElem = document.querySelector('.function__completed')
let allElem = document.querySelector('.function__all')
let clearElems = document.querySelector('.footer__clear')
let footerElems = document.querySelector('.footer__function')
let calkNumber = document.querySelector('.calc__number')
let todoTask = document.querySelectorAll('.todo__task')
let button = document.querySelector('.button')

let light = 'light-theme.css'
let dark = 'dark-theme.css'
let tasks = []
let todoItemElems = []

let activeTasks = []
let completedTasks = []

console.log('tasks', tasks)

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

const taskAllLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const filterTasks = () => {
  activeTasks = tasks.length && tasks.filter((item) => item.completed == false)
  completedTasks =
    tasks.length && tasks.filter((item) => item.completed == true)
  // tasks = [...completedTasks, ...activeTasks]
}

console.log('activeTasks:', activeTasks)
console.log('completedTasks:', completedTasks)

/*Кількість активних задачь */
const calkTasks = () => {
  activeTasks = tasks.length && tasks.filter((item) => item.completed == false)
  let calk = activeTasks.length
  if (calk !== 0) {
    calkNumber.innerHTML = calk
  } else {
    calkNumber.innerHTML = '0'
  }
}
calkTasks()

const createList = (task, index) => {
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
  label.innerHTML = task.description

  if (task.completed == true) {
    li.classList.add('checked')
    inputCheckbox.checked = true
  }
  inputCheckbox.addEventListener('click', function () {
    completeTask(index)
  })

  img.addEventListener('click', function () {
    deleteTask(index)
  })
}

const inputClean = (createInput, checkboxCreate) => {
  createInput.value = ''
  checkboxCreate.checked = false
}

const fillHtmlList = (list) => {
  filterTasks()
  todoList.innerHTML = ''
  if (list.length !== 0) {
    list.forEach((item, index) => {
      createList(item, index)
    })
    todoItemElems = document.querySelectorAll('.todo__task')
  }
}
fillHtmlList(tasks)

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed
  if (tasks[index].completed === true) {
    todoItemElems[index].classList.add('checked')
  } else {
    todoItemElems[index].classList.remove('checked')
  }
  filterTasks()
  calkTasks()
  taskAllLocalStorage()
  fillHtmlList(tasks)
}

activeElem.addEventListener('click', function () {
  let active = document.querySelector('.active')
  active.classList.remove('active')
  this.classList.add('active')
  fillHtmlList(activeTasks)
})

completedElem.addEventListener('click', function () {
  let active = document.querySelector('.active')
  active.classList.remove('active')
  this.classList.add('active')
  fillHtmlList(completedTasks)
})

const deleteTask = (index) => {
  todoItemElems[index].classList.add('delete')
  setTimeout(() => {
    tasks.splice(index, 1)
    taskAllLocalStorage()
    fillHtmlList(tasks)
    filterTasks()
  }, 500)
}

allElem.addEventListener('click', function () {
  let active = document.querySelector('.active')
  active.classList.remove('active')
  this.classList.add('active')
  fillHtmlList(tasks)
})

createTask.addEventListener('keypress', (keyPressed) => {
  const keyEnter = 13
  if (keyPressed.which == keyEnter) {
    let valueInput = createInput.value
    let valueCreateCheckbox = checkboxCreate.checked
    tasks.push(new Task(valueInput, valueCreateCheckbox))
    taskAllLocalStorage()
    fillHtmlList(tasks)
    filterTasks()
    inputClean(createInput, checkboxCreate)
  }
})

clearElems.addEventListener('click', function () {
  let clearTasks = tasks.filter((item) => item.completed == false)
  tasks = [...clearTasks]
  taskAllLocalStorage()
  fillHtmlList(tasks)
  filterTasks()
})

/*Змінюємо тему */
switchTheme.addEventListener('click', function () {
  if (themeLink.getAttribute('href') == dark) {
    themeLink.href = light
    localStorage.removeItem('theme')
  } else {
    themeLink.href = dark
    localStorage.setItem('theme', dark)
  }
})

console.log('tasks:', tasks)
console.log('activeTasks:', activeTasks)
console.log('completedTasks:', completedTasks)
