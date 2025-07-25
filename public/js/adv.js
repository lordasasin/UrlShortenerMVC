document.addEventListener("DOMContentLoaded", () => {
  const shortUrl = localStorage.getItem("lastShortUrl");
  console.log(shortUrl);
  if (!shortUrl) {
    alert("Yönlendirilecek kısa link bulunamadı!");
    return;
  }

  setTimeout(() => {
    window.location.href = shortUrl;
  }, 5000);
});
