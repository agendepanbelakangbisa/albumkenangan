const pages = document.querySelectorAll(".page");
let currentPage = 0;
const flipSound = document.getElementById("flipSound");

let autoPlay = false;
let autoPlayInterval;

// set z-index awal
pages.forEach((page, index) => {
  page.style.zIndex = pages.length - index;
});

function playFlipSound() {
  flipSound.currentTime = 0;
  flipSound.play();
}

function nextPage() {
  if (currentPage < pages.length) {
    pages[currentPage].classList.add("flipped");
    currentPage++;
    playFlipSound();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    pages[currentPage].classList.remove("flipped");
    playFlipSound();
  }
}

function toggleFullscreen() {
  const book = document.getElementById("book");
  if (!document.fullscreenElement) {
    book.requestFullscreen().catch(err => {
      alert(`Error: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

function toggleAutoPlay() {
  autoPlay = !autoPlay;
  const btn = document.getElementById("autoBtn");

  if (autoPlay) {
    btn.textContent = "⏸ Stop Auto";
    autoPlayInterval = setInterval(() => {
      if (currentPage < pages.length) {
        nextPage();
      } else {
        clearInterval(autoPlayInterval);
        autoPlay = false;
        btn.textContent = "▶️ Auto Play";
      }
    }, 3000); // ganti halaman setiap 3 detik
  } else {
    clearInterval(autoPlayInterval);
    btn.textContent = "▶️ Auto Play";
  }
}
