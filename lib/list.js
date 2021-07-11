export default class{
    /**
     * Create Array-like interface for rendering arrays as components
     * @param {array} initial Array to set as initial value
     */
    constructor(initial) {
        this.value = initial.slice()
        this.listeners = []

    }

    render(component){
        return (parent) => {
            this.listeners.push({parent, component})
            this.value.forEach(value => parent.appendChild(component(value)))
        }
    }

    push(value){
        this.value.push(value)
        this.listeners.forEach(({parent, component}) => parent.appendChild(component(value)))
    }

    pop(){
        const result = this.value.pop()
        this.listeners.forEach(({ parent }) => parent.lastChild.remove())
        return result
    }

    shift(){
        const result = this.value.shift()
        this.listeners.forEach(({ parent }) => parent.firstChild.remove())
        return result
    }

    unshift(value){
        this.value.unshift(value)
        this.listeners.forEach(({parent, component}) => parent.prepend(component(value)))
    }

    move(start, end){
        const value = this.value[start]
        if (end > start) end--

        this.value.splice(start, 1)

        this.value.splice(end, 0, value)

        this.listeners.forEach(({parent}) => {
            
        })
    }

    remove(index){

    }
}