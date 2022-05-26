(function (doc, win) {
    const docEl = doc.documentElement

    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

    const reCalc = function () {
        const { clientWidth } = docEl
        if (!clientWidth) return
        docEl.style.fontSize = `${clientWidth / 3.75}px`
    }

    if (!doc.addEventListener) return

    win.addEventListener(resizeEvt, reCalc, false)

    doc.addEventListener('DOMContentLoaded', reCalc, false)
})(document, window)