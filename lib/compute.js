/**
 * @callback listener
 * @param {*} new_value New value for listened state.
 */

/**
 * @callback computed
 * @param {listener} [listener] Pass nothing to return cached computation. Pass listener to listen for changes. 
 */

/**
 * @callback computation
 * @returns {*} New computed value to cache.
 */

/**
 * Create a computed value that will recompute & cache when any depended-upon state changes.
 * @param {import("./state").state[]} dependencies Array of states to listen to
 * @param {computation} computation Function to compute when any dependency changes. Returned value will be cached
 * @returns {computed} 
 */
 export default function(dependencies, computation){
    const listeners = []
    let cache = computation()

    dependencies.forEach(dependency => dependency(() => {
        cache = computation()
        listeners.forEach(listener => listener(cache))
    }))

    return (listener) => {
        if (listener === undefined) return cache
        else if (typeof listener === 'function'){
            listener(cache)
            listeners.push(listener)
        }
    }
}