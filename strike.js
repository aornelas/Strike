var STRIKES_TO_UNFOLLOW = 3

function strikeTweet(id, account) {
    var strikedAccounts = JSON.parse(localStorage.strikes || '{}')
    var strikedTweets = strikedAccounts[account] || []

    if(strikedTweets.indexOf(id) === -1) { strikedTweets.push(id) }
    strikedAccounts[account] = strikedTweets
    localStorage.strikes = JSON.stringify(strikedAccounts)

    console.log('Striked tweet by ' + account + ' with id: ' + id)
    console.log(localStorage.strikes)

    runUmpire(account, strikedAccounts[account].length)
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

// Extend Element('ul.tweet-actions') with Tweet utility methods
Element.prototype.isRetweet = function() {
    return this.parentNode.children[0].children.length > 0
}
Element.prototype.getTweetId = function() {
    return this.parentNode.parentNode.parentNode.parentNode.getAttribute('data-item-id')
}
Element.prototype.getAccount = function() {
    account = this.parentNode.parentNode.parentNode.getAttribute('data-screen-name')
    if(this.isRetweet()) {
        //TODO: Return the account of who retweeted
        alert("Strike doesn't support Retweets yet. Sorry!")
        throw "Striking Retweets is not yet supported"
    }
    return account
}

function injectStrikes() {
    document.querySelectorAll('ul.tweet-actions') // returns NodeList
            .forEach(function(ul) {
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
            var tweetId = ul.getTweetId()
            var account = ul.getAccount()
            strikeTweet(tweetId, account)
        }
        a.appendChild(icon)
        a.appendChild(b)

        var li = document.createElement('li')
        li.className = 'action-strike-container'
        li.appendChild(a)

        ul.appendChild(li)
    })
}

injectStrikes()
