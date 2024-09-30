const inputEl = (document.getElementsByClassName('app__controls-input')) [0]
const btnEl = (document.getElementsByClassName('app__controls-button')) [0]
const listEl = (document.getElementsByClassName('app__list')) [0]
let counter = 1
let data = []

function init() {
    const tmp = localStorage.getItem('data')
    if (tmp != null) {
        data = JSON.parse(tmp)
    }
    data.forEach((item) => {
        if (item.id > counter) {
            counter = item.id
        }
        })
        if (counter > 1) {
            counter++
        }
    render()
}

function syncData() {
    localStorage.setItem('data', JSON.stringify(data))
    render()
}

function deleteByID(id){
    const idx = data.findIndex((i) => {
        return i.id === id
    })
    data.splice(idx, 1)
    syncData()
}

function ToDoIsDone(id){

    const item = data.find((i) => {
        if (i.id === id){
            return i.isDone = !i.isDone
        }
    })
    syncData()
}


function createTask(objectData) {
    const root = document.createElement('div')
    root.classList.add('app__list-item')   
    if (objectData.isDone === true) {
        root.classList.add('app__list-item_done')
    } else {
        root.classList.remove('app__list-item_done')
    }
    

    const input = document.createElement('input')
    input.classList.add('app__list-checkbox')
    input.type = 'checkbox'
    if (objectData.isDone === true) {
        input.checked = true
    }


    const txt = document.createElement('p')
    txt.classList.add('app__list-text')
    txt.innerText = objectData.text


    root.addEventListener('click', ()=>{
        ToDoIsDone(objectData.id)
    })
    

    const btn = document.createElement('button')
    btn.classList.add('app__list-btn')

    const img = document.createElement('img')
    img.src = '/Image/Trash.svg'
    img.alt = 'Trash'

    img.addEventListener('click', ()=>{
        deleteByID(objectData.id)
    })

    btn.appendChild(img)

    root.appendChild(input)
    root.appendChild(txt)
    root.appendChild(btn)
    console.log(objectData)
    return root
}


btnEl.addEventListener('click', () => {
    const textValue = inputEl.value
    data.push({
        id: counter++,
        text: textValue,
        isDone: false
    })
    syncData()
    inputEl.value = ''
})

function render() {
    listEl.innerHTML = ''
    for (let item of data) {
        const tmpElement = createTask(item)
        listEl.appendChild(tmpElement)
    }
}


init()
