
// Function to fetch blogs from the API
function getALLBlogs() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
            const blogList = document.getElementById("blog-list");
            console.log(data);

            data.forEach((blog) => {
                const blogItem = document.createElement("li");
                blogItem.className = "blog-item";
                blogItem.innerHTML = `
                <h2>${blog.title}</h2>
                <p>${blog.body}</p>
                <button class="btn btn-danger" onclick="deleteBlog(${blog.id})">Delete</button>
              `;
                blogList.appendChild(blogItem);
            });
        })
        .catch((error) => {
            console.log("Error:", error);
        });
}

// Function to add a new blog
function createBlog() {
    const titleInput = document.getElementById("title");
    const bodyInput = document.getElementById("body");
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (title === "" || body === "") {
        alert("Please enter a title and body for the blog.");
        return;
    }

    const newBlog = {
        title: title,
        body: body,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
    })
        .then((response) => response.json())
        .then((data) => {
            // Clear input fields
            titleInput.value = "";
            bodyInput.value = "";

            // Add new blog to the UI
            const blogList = document.getElementById("blog-list");
            const blogItem = document.createElement("li");
            blogItem.className = "blog-item";
            blogItem.innerHTML = `
              <h2>${data.title}</h2>
              <p>${data.body}</p>
              <button class="btn btn-danger" onclick="deleteBlog(${data.id})">Delete</button>
            `;
            blogList.appendChild(blogItem);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
}

// Function to delete a blog
function deleteBlog(blogId) {
    if (confirm("Are you sure you want to delete this blog?")) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    // Remove the blog from the UI
                    const blogItem = document.querySelector(
                        `li.blog-item button[data-blog-id="${blogId}"]`
                    ).parentNode;
                    blogItem.remove();
                } else {
                    throw new Error("Failed to delete the blog.");
                }
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }
}

// Fetch blogs when the page loads
getALLBlogs();
