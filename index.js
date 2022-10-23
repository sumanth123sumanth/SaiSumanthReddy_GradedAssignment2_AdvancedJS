function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const invalidmsg = document.getElementById("invalidmsg");
  console.log(username);
  console.log(password);
  if (username === "test" && password === "test") {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    invalidmsg.style.visibility = "hidden";
    location.href = "resume.html";
  } else {
    invalidmsg.style.visibility = "visible";
  }
}
