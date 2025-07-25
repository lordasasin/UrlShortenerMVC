document.addEventListener("DOMContentLoaded", async () => {
  if (!token) {
    alert("Token bulunamadı, lütfen giriş yap bro!");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("/user/myurls", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      alert("Hata: " + (err.message || res.statusText));
      return;
    }

    const urls = await res.json();

    const list = document.getElementById("myUrlList");
    list.innerHTML = "";

    urls.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `Orijinal: ${item.originalUrl} — Kısa: <a href="http://localhost:3000/url/${item.shortUrl}" target="_blank">${item.shortUrl}</a>`;
      list.appendChild(li);
    });
  } catch (e) {
    alert("Network hatası: " + e.message);
  }
});
