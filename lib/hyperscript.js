export default function(tag, attributes, ...children){

    let element

    if (typeof tag === 'function') // Component
        element = tag(attributes)

    else { // HTML
        element = document.createElement(tag)

        for (const attribute_name in attributes) {
            const attribute = attributes[attribute_name]

            if (typeof attribute === 'function'){
                if (attribute_name === 'map') attribute(element)
                else if (attribute_name.startsWith('on')) element.addEventListener(attribute_name.substring(2), attribute)
                else attribute((value) => element.setAttribute(attribute_name, value))

            } else {
                if (attribute_name === 'style' && typeof attribute === 'object'){
                    for (const style_name in attribute){
                        const style = attribute[style_name]
                        if (typeof style === 'function') style((value) => element.style[style_name] = value)
                        else element.style[style_name] = style
                    }
                } else if (attribute_name === 'ref' && typeof attribute === 'function')
                    attribute(element)
                else
                    element.setAttribute(attribute_name, attribute)
            }
            
        }
    }

    for (const child of children){
        const child_type = typeof child
        if (child_type === 'string') element.appendChild(document.createTextNode(child))
        else if (child_type === 'function') {
            const node = document.createTextNode('')
            child((value) => node.textContent = value)
            element.appendChild(node)
        }
        else element.appendChild(child)
    }

    return element
}