
// Extend NodeList with Array's forEach
NodeList.prototype.forEach = Array.prototype.slice.call(this).forEach

function injectStrikes() {
    document.querySelectorAll('ul.tweet-actions') // returns NodeList
            .forEach(function(ul) {
        var i = document.createElement('i')
        i.class = 'sm-strike'

        var b = document.createElement('b')
        b.textContent = '✘ Strike'

        var a = document.createElement('a')
        a.class = 'with-icn js-toggle-strike'
        a.href = '#'
        a.appendChild(i)
        a.appendChild(b)

        var li = document.createElement('li')
        li.class = 'action-strike'
        li.appendChild(a)

        ul.appendChild(li)
    })
}

injectStrikes()
