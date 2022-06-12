window.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('github-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let input = e.target.search.value
        fetch('https://api.github.com/search/users?q=octocat')
        .then(res => res.json())
        .then(users => inDatabase(input,users))
    })

    

})
fetch('https://api.github.com/search/users?q=octocat', {
    method: "POST",
    headers:
    {
        "Content-Type": "application/json",
        Accept: application/vnd.github.v3+json
    },
    body: JSON.stringify({
       "name": $`{loginName}`, 
    })
})

function inDatabase(input,users) {

    let cont = document.getElementById('user-list')

    let userMatch = []
    users['items'].forEach(obj => {
        if (obj['login'].includes(input)) {
            userMatch.push(obj['login'])
        }
    })

    console.log(userMatch)
    userMatch.forEach(user => {
        let p = document.createElement('p')
        p.textContent = user
        p.addEventListener('click',() => {
            getUserData(user)
        })
        cont.appendChild(p)
    })
}

function getUserData(user) {
    let rep = document.getElementById('repos-list')

    fetch(`https://api.github.com/users/${user}/repos`)
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            let p = document.createElement('p')
            p.textContent = element['name']
            rep.appendChild(p)
        })
    })
}
