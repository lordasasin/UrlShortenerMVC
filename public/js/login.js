document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        window.location.href = "/home";
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.message || response.statusText}`);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  });
});
