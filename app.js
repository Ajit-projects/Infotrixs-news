const body = document.body;

let newsBox = document.getElementById("newsBox");

let newsCategory = [
  "national",
  "business",
  "sports",
  "world",
  "politics",
  "technology",
  "startup",
  "entertainment",
  "miscellaneous",
  "science",
  "automobile",
];

// Create XMLHttpRequest Object
const xhr = new XMLHttpRequest();

function sendCategory(index) {
  getNews(newsCategory[index]);
}
getNews("all");

function getNews(newsCategoryName) {
  xhr.open(
    "GET",
    `https://inshortsapi.vercel.app/news?category=${newsCategoryName}`,
    true
  );

  xhr.getResponseHeader("Content-type", "application/json");

  xhr.onload = function () {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let data = json.data;

      let newsHTML = "";

      function showSpinner() {
        spinner.style.visibility = "hidden";
        newsBox.style.visibility = "visible";
      }

      xhr.onprogress = showSpinner;

      for (key in data) {
        let news = `<div class="newsCard">
        <div class="imageWrapper">
        <img src="${data[key].imageUrl}"
        class="thumnail" alt="Image">
            </div>
            <div class="card-body">
            <div class="card-date">${data[key].date}</div>
                      <h5 class="card-title">${data[key].title}</h5>
                                <h5 class="card-author">Author: ${data[key].author}</h5>
                                <p class="card-text">${data[key].content}</p>
                                <a target="_blank" href="${data[key].readMoreUrl}" class="btn btn-primary">Read more..</a>
                            </div>
                        </div>`;
        newsHTML += news;
      }

      newsBox.innerHTML = newsHTML;
    } else {
      console.log("Some Error Occurred");
    }
  };
  xhr.send();
}
