console.log("Index is connected!");

function removeActiveClass() {
  const activeButton = document.getElementsByClassName("active");

  for (let btn of activeButton) {
    btn.classList.remove("active");
  }
}

function loadCategories() {
  // 1- Fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2- Convert promise to json
    .then((res) => res.json())
    // 3- Send data to display Categories
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        const clickedBtn = document.getElementById(`btn-${id}`);
        clickedBtn.classList.add("active");
        displayVideos(data.category);
    });
}

function displayCategories(categories) {
  // get the container
  const categoryContainer = document.getElementById("category-container");

  // Loop operation on Array of objects
  for (let cat of categories) {
    // Create Element
    const categoryDiv = document.createElement("div");

    categoryDiv.innerHTML = `<button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>`;

    // Append the element
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";

  if(videos.length == 0) {
    videoContainer.innerHTML = `
        <div class="py-20 col-span-full flex flex-col justify-center items-center text-center gap-5">
            <img class="w-[140px]" src="assets/Icon.png" alt="">
            <h2 class="text-3xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
    `;
    return;
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        
        <div class="card bg-base-100">
        <figure class="relative">
            <img class="w-full h-[200px] object-cover" src="${video.thumbnail}"/>
            <span class="absolute bottom-2 right-2 text-sm text-white bg-black px-2 pb-1 rounded">3hrs 56 min ago</span>
        </figure>
        <div class="flex gap-3 px-0 py-5">
            <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-7 rounded-full ring ring-offset-2">
                        <img src="${video.authors[0].profile_picture}"/>
                    </div>
                </div>
            </div>
            <div class="intro">
                <h2 class="font-bold">${video.title}</h2>
                <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
                <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"></p>
                <p class="text-sm text-gray-400">${video.others.views} views</p>
            </div>
        </div>

        `;
    videoContainer.append(videoCard);
  });
};

loadCategories();

