/**
 * @callback state
 * @param {*} [value] Pass nothing to return current value. Pass non-function to set value. Pass a function that accepts 1 parameter to listen for changes.
 */

/**
 * Create observable state
 * @param {*} initial Initial value to set state to
 * @returns {state}
 */
 export default function(initial){
    let current = initial
    const listeners = []
    return (value) => {
        if (value === undefined) return current
        else if (typeof value !== 'function') {
            if (value !== current){
                current = value
                listeners.forEach(listener => listener(value))
            }
        } else {
            value(current)
            listeners.push(value)
        }
    }
}