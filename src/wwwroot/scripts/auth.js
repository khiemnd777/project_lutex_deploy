document.addEventListener("submit", async (evt) => {
  if (evt.target.id === "login_form") {
    evt.preventDefault();
    await login(evt.target);
  }
});

async function authGuard() {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return false;
  }
  if (authToken) {
  }
  fetchResult = await fetch("/auth/me", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const result = await fetchResult.json();
  if (!result.isValid) {
    return false;
  }
  return true;
}

async function login(form) {
  const fetchResult = await fetch("/auth/login", {
    method: "POST",
    body: new FormData(form),
  });
  const result = await fetchResult.json();
  if (result.isAuth) {
    localStorage.setItem("authToken", result.jwt);
    location.href = "/";
    return;
  }
  const messageElm = document.getElementById("message");
  messageElm.innerText = "Oops! Wrong credentials.";
}

function logout() {
  localStorage.setItem("authToken", "");
  location.href = "/login";
}
