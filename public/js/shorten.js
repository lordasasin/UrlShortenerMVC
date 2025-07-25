document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("shortenForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalUrl = document.getElementById("originalUrl").value.trim();
    if (!originalUrl) {
      alert("Lütfen bir link gir!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ originalUrl }),
      });

      if (response.ok) {
        const data = await response.json();

        alert(`Kısa link: ${data.result.shortUrl}`);
        localStorage.setItem("lastShortUrl", data.result.shortUrl);
        window.location.href = "/shorten/adv";
      } else {
        const err = await response.json();
        alert(`Hata: ${err.message || response.statusText}`);
      }
    } catch (error) {
      alert("Network hatası: " + error.message);
    }
  });
});
