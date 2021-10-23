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

let tasks = []

function Task(description, completed, id) {
  this.description = description
  this.completed = completed
  this.id = id
}

addTask.addEventListener('click', function () {
  let valueInput = createInput.value
  let valueCreateCheckbox = checkboxCreate.checked
  let idCreateInput = tasks.length + 1
  console.log(valueCreateCheckbox)
  console.log(valueInput)
  console.log(idCreateInput)
  createElements(valueInput, idCreateInput)

  tasks.push(new Task(valueInput, valueCreateCheckbox, idCreateInput))
  let calk = tasks.length
  console.log(calk)
  calcTasks(calk)
})

function createElements(value, id) {
  let li = document.createElement('li')
  li.classList.add('todo__task')
  let inputCheckbox = document.createElement('input')
  inputCheckbox.classList.add('todo__checkbox')
  inputCheckbox.setAttribute('type', 'checkbox')
  inputCheckbox.setAttribute('id', id)
  let label = document.createElement('label')
  label.classList.add('todo__item')
  label.setAttribute('for', id)
  label.innerHTML = value
  let img = document.createElement('img')
  img.classList.add('todo__icon')
  img.setAttribute('src', 'image/del.svg')
  todoList.appendChild(li)
  li.appendChild(inputCheckbox)
  li.appendChild(label)
  li.appendChild(img)
}

function calcTasks(calk) {
  let i = calk
}
