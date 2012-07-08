var STRIKES_TO_UNFOLLOW = 3

function strikeTweet(id, account) {
    var striked = false;
    var strikedAccounts = JSON.parse(localStorage.strikes || '{}')
    var strikedTweets = strikedAccounts[account] || []

    var tweetIndex = strikedTweets.indexOf(id)
    if(tweetIndex === -1) {
        strikedTweets.push(id)
        striked = true
    } else {
        strikedTweets.splice(tweetIndex, 1)
    }
    strikedAccounts[account] = strikedTweets
    localStorage.strikes = JSON.stringify(strikedAccounts)

    console.log('Striked tweet by ' + account + ' with id: ' + id)
    console.log(localStorage.strikes)

    runUmpire(account, strikedAccounts[account].length)
    return striked
}

function runUmpire(account, strikeCount) {
    if(strikeCount >= STRIKES_TO_UNFOLLOW) {
        if(confirm(strikeCount + ' strikes!\nDo you want to unfollow ' + account + '?')) {
            //TODO: Add account to 'Stroke Out' list and unfollow; remove strikes for account
        }
    }
}

// Extend NodeList with Array's forEach
NodeList.prototype.forEach = Array.prototype.slice.call(this).forEach

// Extend Element('ul.tweet-actions') with data getters
Element.prototype.getTweetId = function() {
    return this.parentNode.parentNode.parentNode.parentNode.getAttribute('data-item-id')
}
Element.prototype.getAccount = function() {
    return this.parentNode.parentNode.parentNode.getAttribute('data-screen-name')
}

function injectStrikes() {
    document.querySelectorAll('ul.tweet-actions') // returns NodeList
            .forEach(function(ul) {
        var tweetId = ul.getTweetId()
        var account = ul.getAccount()

        var icon = document.createElement('span')
        icon.className = 'sm-strike'
        icon.textContent = '✘'

        var unstrike = document.createElement('span')
        unstrike.className = 'unstrike'
        unstrike.title = 'Undo strike'
        unstrike.textContent = 'Striked'

        var strike = document.createElement('span')
        strike.className = 'strike'
        strike.title = strike.textContent = 'Strike'

        var b = document.createElement('b')
        b.appendChild(unstrike)
        b.appendChild(strike)

        var a = document.createElement('a')
        a.className = 'with-icn js-toggle-strike'
        a.onclick = function() {
            striked = strikeTweet(tweetId, account)
            toggleStrike(striked)
        }
        a.appendChild(icon)
        a.appendChild(b)

        var li = document.createElement('li')
        li.className = 'action-strike-container'
        li.appendChild(a)

        ul.appendChild(li)

        function toggleStrike(toRed) {
            if(toRed) {
                strike.style.display = 'none'
                unstrike.style.display = 'inline'
                icon.style.color = 'red'
                a.style.color = 'red'
            } else {
                strike.style.display = 'inline'
                unstrike.style.display = 'none'
                //TODO: Programmatically get this color
                icon.style.color = a.style.color = '#2FC2EF'
            }
        }

        function loadStrike() {
            var strikedAccounts = JSON.parse(localStorage.strikes || '{}')
            var strikedTweets = strikedAccounts[account] || []

            var tweetIndex = strikedTweets.indexOf(tweetId)
            if(tweetIndex != -1) {
                toggleStrike(true)
            }
        }
        loadStrike()
    })
}

injectStrikes()
