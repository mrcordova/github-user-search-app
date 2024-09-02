const GITHUB_API = "https://api.github.com/users/";
let userName = "octocat";
const profileImg = document.querySelector(".profile-pic>img");

window.addEventListener("load", async () => {
  const githubResponse = await fetch(`${GITHUB_API}${userName}`);
  //   console.log(await githubResponse.json());
  const {
    avatar_url,
    bio,
    created_at,
    followers,
    following,
    public_repo,
    blog,
    name,
    login,
    company,
    location,
    twitter_username,
  } = await githubResponse.json();
  //   profileImg.setAttribute("src", avatar_url);
});
