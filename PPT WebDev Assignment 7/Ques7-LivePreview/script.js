const form = document.querySelector(".form");
const contentContainer = document.querySelector(".content");


form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  
  const title = document.getElementById("title").value;
  const imageUrl = document.getElementById("img-url").value;
  const author = document.getElementById("name").value;
  const category = document.getElementById("catagory").value;
  const story = document.querySelector(".form textarea").value;
  const newStoryData = {
    title: title,
    imageUrl: imageUrl,
    author: author,
    category: category,
    story: story,
  };

 
  const existingStories = JSON.parse(localStorage.getItem("stories")) || [];

 
  existingStories.push(newStoryData);

  
  localStorage.setItem("stories", JSON.stringify(existingStories));

  
  updateContentContainer();

  
  form.reset();
});


function updateContentContainer() {
  
  contentContainer.innerHTML = "";

  
  const storedStories = JSON.parse(localStorage.getItem("stories")) || [];

 
  storedStories.forEach(function (storyData, index) {
    const { title, imageUrl, story, author, category } = storyData;
    const newStory = document.createElement("div");
    newStory.classList.add("card");
    newStory.innerHTML = `
      <div class="img-box">
        <img src="${imageUrl}" alt="error">
      </div>
      <div class="text">
        <h2 class="title">${title}</h2>
        <p class="paragraph">${story}</p>
        <div class="author-name">Authored: ${author}</div>
        <div class="btns">
        <button class="delete-card" data-index="${index}">Delete Post</button>
        </div>
        <div class="category">${category}</div>
      </div>
    `;
    contentContainer.appendChild(newStory);
  });

  
  const deleteButtons = document.querySelectorAll(".delete-card");
  deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener("click", function (event) {
      const index = event.target.dataset.index;
      deleteStory(index);
    });
  });
}

function deleteStory(index) {
  
  const existingStories = JSON.parse(localStorage.getItem("stories")) || [];

 
  existingStories.splice(index, 1);

  
  localStorage.setItem("stories", JSON.stringify(existingStories));

 
  updateContentContainer();
}


window.addEventListener("load", updateContentContainer);
  