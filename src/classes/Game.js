import {bouncing, canMove, getRows, getWidth, setPosition, setStyles, shuffleField, swap, wrapComponent} from '../core/utils'
import {Size, Field} from './GameComponents'

export class Game {
    constructor(selector) {
        this.selector = selector
        this.size = new Size('size')
        this.field = new Field('field')
    }
    prepare() {      
        this.create()
        this.width = getWidth(this.selector)
        this.rows = getRows(this.selector)
        setStyles('--imageWidth', this.width+'px')
        this.renderFields(this.width, this.rows)
        this.init()
        this.play()
    }
    create() {
        this.main = document.getElementById(this.selector)
        this.main.append(wrapComponent('game', this.size.create(), this.field.create()))
        return this.main
    }
    init() {
        shuffleField(this.fields)
        this.size.onChange((e) => {
            shuffleField(this.fields)
        })
        this.size.onInput((e) => {
            const value = e.target.value
            setStyles('--rows', value)
            this.renderFields(getWidth(this.selector), value)
        })
        window.addEventListener('resize',() => {
            if (this.main.clientWidth < 418) {    
                const width = getWidth(this.selector)
                const rows = getRows(this.selector)
                setStyles('--imageWidth', width + 'px')
                this.renderStyles(width, rows, this.fields)
            }
        })
    }
    renderFields(width, rows) {
        this.field.fill(rows ** 2)
        this.fields = [...this.field.field.childNodes] 
        setPosition(width, rows, this.fields)
    }
    renderStyles(width, rows, array) {
        setPosition(width, rows, array)
    }
    play() {
        this.field.onClick(e => {
            const item = e.target
            const id = +item.dataset.id
            const index = +item.dataset.index
            if(id && id !== 0) {
                canMove(this.fields, index, getRows(this.selector)) ? swap(id, this.fields) : bouncing(item)
            }
        })
    }
}
