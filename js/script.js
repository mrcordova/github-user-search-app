const GITHUB_API = "https://api.github.com/users/";
let userName = "octocat";
const profileImg = document.querySelector(".profile-pic>img");
let nameEle = document.querySelector(".name-container>h2");
let username = document.querySelector(".name-container>h3");
let date = document.querySelector(".date-container>span");
let bioPara = document.querySelector(".bio");
let stats = document.querySelectorAll(
  "p[data-repo], p[data-followers], p[data-following]"
);
let links = document.querySelectorAll(".links>div");
const toggleBtn = document.getElementById("toggle-btn");
const searchInput = document.querySelector("input[data-search]");
const searchBtn = document.querySelector("button[data-search-btn]");
const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "April",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sept",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

async function updateProfile() {
  const githubResponse = await fetch(`${GITHUB_API}${userName}`);

  if (githubResponse.status == 200) {
    const {
      avatar_url,
      bio,
      created_at,
      followers,
      following,
      public_repos,
      blog,
      name,
      login,
      company,
      location,
      twitter_username,
    } = await githubResponse.json();

    const dateText = new Date(created_at);
    profileImg.setAttribute("src", avatar_url);
    nameEle.textContent = name != null ? name : login;
    username.textContent = `@${login}`;
    date.textContent = `${dateText.getDate()} ${
      months[dateText.getMonth()]
    } ${dateText.getFullYear()}`;
    bioPara.textContent = bio != null ? bio : "This profile has no bio";
    bioPara.classList.toggle("unavailable", bio == null);

    stats[0].textContent = public_repos;
    stats[0].dataset.repo = public_repos;
    stats[1].textContent = followers;
    stats[1].dataset.followers = followers;
    stats[2].textContent = following;
    stats[2].dataset.following = following;

    links[0].children[1].textContent =
      location != null ? location : "Not Available";

    links[0].classList.toggle("unavailable", location == null);

    console.log(blog);
    links[1].children[1].textContent =
      blog.trim() != "" ? blog : "Not Available";

    links[1].children[1].setAttribute("href", `${blog}`);
    links[1].classList.toggle("unavailable", blog.trim() == "");

    links[2].children[1].textContent =
      twitter_username != null ? twitter_username : "Not Available";
    links[2].children[1].setAttribute(
      "href",
      `http://twitter.com/${twitter_username}`
    );
    links[2].classList.toggle("unavailable", twitter_username == null);

    links[3].children[1].textContent =
      company != null ? company : "Not Available";
    links[3].children[1].setAttribute(
      "href",
      `https://github.com/${company?.slice(1)}`
    );
    links[3].classList.toggle("unavailable", company == null);
    searchInput.nextElementSibling.classList.toggle("hide", true);
  } else {
    console.error("no results");
    searchInput.nextElementSibling.classList.toggle("hide", false);
  }
}

window.addEventListener("load", async () => {
  await updateProfile();
});

toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("light-mode");
});

searchBtn.addEventListener("click", async (e) => {
  // console.log(searchInput.value);

  userName = searchInput.value;
  await updateProfile();
  searchInput.value = "";
});
