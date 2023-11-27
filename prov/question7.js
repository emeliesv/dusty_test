// 6.1 (3p) Hämta posts med fetch från denna url: https://jsonplaceholder.typicode.com/posts
// Visa title och body från varje post på sidan inuti: <div id="posts"></div>
// Visa endast posts från användaren med userId: 1

// 6.2 (3p)
// Varje post ska ha padding: 20px och margin: 10px
// Texten på title ska vara bold
// Text-färgen ska vara grå
// Backgrundsfärgen på varje post ska vara ljus-grå
// När man för muspekaren över en post ska bakgrundsfärgen ändras till vit
// Visa posts i fyra kolumner för desktop och en kolumn för mobil

// 6.3 (3p)
// Hämta posts från url: https://jsonplaceholder.typicode.com/posts
// och hämta comments från denna url: https://jsonplaceholder.typicode.com/comments
// Visa title och body från varje post
// Under varje post visa alla dess tillhörande kommentarer.
// name och body visas för varje kommentar.
// Lägg alla posts med kommentarer på sidan inuti: <div id="postsWithComments"></div>
// Styla posts och comments på samma sätt som ovan.
// tips: comments är kopplade till posts med postId

const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  const parentElement = document.querySelector("#posts");

  data.forEach((post) => {
    if (post.userId === 1) {
      const postElement = document.createElement("div");

      //Det står inte i uppgiften att man måste sätta all styling via javascript.
      //Det går naturligtvis att göra det via javascript direkt genom
      //att använda sig av postElement.style.backgroundColor = "grey" t.ex men jag har
      //valt att sätta stylingen via CSS för att jag tycker det är smidigare och
      //blir mer lättläst i koden.
      postElement.setAttribute("class", "user_post");
      postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
      parentElement.appendChild(postElement);
    }
  });
};

//getPosts();

const getOtherPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const postData = await response.json();

  const secondResponse = await fetch(
    "https://jsonplaceholder.typicode.com/comments"
  );
  const commentData = await secondResponse.json();

  console.log("Posts:", postData, "Comments:", commentData);

  const postsWithCommentsParent = document.querySelector("#postsWithComments");

  postData.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.setAttribute("class", "user_post");
    postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;

    commentData.forEach((commentPost) => {
      if (commentPost.postId === post.id) {
        const commentElement = document.createElement("div");
        commentElement.setAttribute("class", "comments");
        commentElement.innerHTML = `<h3>${commentPost.name}</h3><p>${commentPost.body}</p>`;
        postElement.appendChild(commentElement);
      }
    });

    postsWithCommentsParent.appendChild(postElement);
  });
};

getOtherPosts();
