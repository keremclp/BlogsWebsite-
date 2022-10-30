const container = document.querySelector('.blogs');
const searchFrom = document.querySelector('.search');

const renderPosts = async (term) => {
    let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';

    if (term) {
        uri += `&q=${term}`;
    }

    const res = await fetch(uri); // fetch the data from the server
    const posts = await res.json(); // convert the response to JSON
    console.log(posts); // log the posts to the console
    let template = ''; // create an empty string to hold the HTML
    posts.forEach(post => {
        template += `
            <div class="post">
                <h2>${post.title}</h2>
                <p><small>${post.likes} likes</small></p>
                <p>${post.body.slice(0, 200)}</p>
                <a href="/details.html?id=${post.id}">Read more</a>
            </div> 
        `;
    })// loop through the posts

    container.innerHTML = template; // add the HTML to the page

}

// search posts
searchFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const term = searchFrom.term.value.trim();
    renderPosts(searchFrom.term.value.trim());
})


window.addEventListener('DOMContentLoaded', () => renderPosts());