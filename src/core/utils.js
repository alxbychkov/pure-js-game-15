export function wrapComponent(selector, ...block) {
    const div = document.createElement('div')
    div.id = selector
    div.append(...block)
    return div
}
export function fillTheField(items, block) {
    const arr = fillArray(items)
    // shuffle(arr)
    let k = 0
    while (items--) {
        const fieldItem = document.createElement('div')
        fieldItem.classList.add('field-item')
        fieldItem.dataset.id = arr[items]
        fieldItem.dataset.index = k++
        arr[items] === 0 && fieldItem.classList.add('last')
        block.append(fieldItem)
    }
}
export  function getWidth(selector) {
    const main = document.getElementById(selector)
    const width = main.clientWidth > 418 ? 398 : main.clientWidth - 20
    return width
}
export function getRows(selector) {
    const size = document.getElementById(selector)
    const input = size.querySelector('input')
    return +input.value
}
export function setStyles(key, value) {
    const body = document.querySelector('body')
    body.style.setProperty(key, value)
}
export function setPosition(width, rows, array) {
    const step = width / rows
    let positions = []
    let temp = []
    let k = 0
    for (let i=0; i<rows; i++) {
        for (let j=0; j<rows; j++) {
            let key = +array[k].dataset.id
            positions.push(`${-j*step}px ${-step*i}px`)
            temp.push(key)
            k++
        }
    }
    positions.reverse()
    array.forEach((el, index)=>{
        el.style.backgroundPosition = positions[temp[index]]
    })
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5)
    return array
}
function fillArray(i) {
    let array = []
    while(i--) {
        array.push(i)
    }
    return array.reverse()
}
function isInteger(num) {
    return (num^0) === num
}
export function bouncing(element) {
    element.classList.add('bounce')
    setTimeout(()=>{
        element.classList.remove('bounce')
    },600)
}
export function canMove(array, id, rows) {
    const top = !!array[id-rows] ? +array[id-rows].dataset.id : -1
    const left = !!array[id-1] ? +array[id-1].dataset.id : -1
    const right = !!array[id+1] ? +array[id+1].dataset.id : -1
    const bottom = !!array[id+rows] ? +array[id+rows].dataset.id : -1
    const current = +array[id].dataset.id
    const arr = [current, top, right, bottom, left]
    if (arr.includes(0)) { 
        if (left === 0 && isInteger((id)/rows)) {
            return false
        } else if (right === 0 && isInteger((id+1)/rows)) {
            return false
        } else return true
    }
}
export function swap(id, array) {
    let last = array.find(i=>i.dataset.id == 0)
    let current = array.find(i=>i.dataset.id == id)

    const temp = [current.dataset.id, current.style.backgroundPosition]
    current.dataset.id = last.dataset.id
    current.style.backgroundPosition = last.style.backgroundPosition
    current.classList.add('last')
    last.dataset.id = temp[0]
    last.style.backgroundPosition = temp[1]
    last.classList.remove('last')
}
export function shuffleField(array) {
    const newArr = shuffle(fillArray(array.length))
    let data = []
    newArr.forEach(item => {
        const temp = { 
            id: array[item].dataset.id,
            pos: array[item].style.backgroundPosition
        }
        data.push(temp)
    })
    array.forEach((item, index) => {
        item.classList.contains('last') && item.classList.remove('last')
        item.dataset.id = data[index].id
        item.dataset.id === '0' && item.classList.add('last')
        item.style.backgroundPosition = data[index].pos
    })
}