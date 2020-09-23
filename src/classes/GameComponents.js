import {wrapComponent, fillTheField} from '../core/utils'
class GameComponent {
    constructor(selector) {
        this.selector = selector
    }
    create() {
        return ``
    }
}
export class Size extends GameComponent {
    constructor(selector) {
        super(selector)
    }
    create() {
        const input = document.createElement('input')
        input.type = 'range'
        input.name = 'scroll'
        input.id = 'scroll'
        input.value = '3'
        input.min = '2'
        input.max = '5'
        this.input = input
        return wrapComponent(this.selector, input)
    }
    onChange(fn) {
        this.input.addEventListener('change', fn)
    }
    onInput(fn) {
        this.input.addEventListener('input', fn)
    }
}
export class Field extends GameComponent {
    constructor(selector) {
        super(selector)
    }
    prepare() {

    }
    create() {
        const field = document.createElement('div')
        field.id = this.selector
        this.field = field
        return field
    }
    clear() {
        return this.field.innerHTML = ``
    }
    fill(items) {
        this.clear()
        fillTheField(items, this.field)
    }
    onClick(fn) {
        this.field.addEventListener('click', fn)
    }
}