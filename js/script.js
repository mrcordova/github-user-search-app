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

window.addEventListener("load", async () => {
  const githubResponse = await fetch(`${GITHUB_API}${userName}`);
  //   console.log(await githubResponse.json());
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

  //   console.log(await githubResponse.json());
  profileImg.setAttribute("src", avatar_url);
  nameEle.textContent = name != null ? name : login;
  username.textContent = `@${login}`;
  date.textContent = created_at;
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

  links[1].children[1].textContent = blog != null ? blog : "Not Available";
  links[1].children[1].setAttribute("href", `${blog}`);
  links[1].classList.toggle("unavailable", blog == null);

  links[2].children[1].textContent =
    twitter_username != null ? twitter_username : "Not Available";
  links[2].children[1].setAttribute(
    "href",
    `htttps://x.com/${twitter_username}`
  );
  links[2].classList.toggle("unavailable", twitter_username == null);

  links[3].children[1].textContent =
    company != null ? company : "Not Available";
  links[3].children[1].setAttribute(
    "href",
    `https://github.com/${company.slice(1)}`
  );
  links[3].classList.toggle("unavailable", company == null);
});
