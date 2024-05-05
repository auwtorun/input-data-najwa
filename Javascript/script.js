function showOverlay(sectionId) {
  // Menampilkan overlay
  document.getElementById("overlay").style.display = "block";

  // Menampilkan div dari section yang dipilih
  var sectionContent = document.getElementById(sectionId).innerHTML;
  document.getElementById("overlay-content").innerHTML = sectionContent;
}

function overlayButtonFunction() {
  const overlayButton = document.getElementById("overlay-button");
  overlayButton.addEventListener("click", hideOverlay);
}

// Memanggil overlayButtonFunction untuk menetapkan event listener
overlayButtonFunction();
function hideOverlay() {
  // Menyembunyikan overlay
  document.getElementById("overlay").style.display = "none";
}

document.addEventListener("keydown", function (event) {
  // Mengecek apakah tombol yang ditekan adalah tombol Escape
  if (event.keyCode === 27) {
    // Memanggil fungsi a
    hideOverlay();
  }
});
