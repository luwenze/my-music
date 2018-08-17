export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }

    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}
//获取缓存值方法
export function getData(el, name, val) {
    name = 'data-' + name
    if (val) {
        return el.setAttribute(name, val)
    } else {
        return el.getAttribute(name)
    }
}

export function unescapeHTML(lrc) {
    var t = document.createElement('div')
    t.innerHTML = lrc + ''
    return t
}

//深层拷贝
//p为数组，则需传递第二个参数为[]；否则p为对象，c可省略
export function deepClone(initalObj) {
    var obj = {}
    try {
        obj = JSON.parse(JSON.stringify(initalObj))
    } finally {
        return obj
    }
}