//toaster
function toaster(message, color) {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message; // Set pesan snackbar
  snackbar.classList.add("show"); // Tambahkan kelas 'show' untuk menampilkan snackbar
  snackbar.style.backgroundColor = color;

  // Set timeout untuk menyembunyikan snackbar setelah beberapa detik
  setTimeout(function () {
    snackbar.classList.remove("show"); // Hapus kelas 'show' untuk menyembunyikan snackbar
  }, 3000); // Atur waktu tampilan snackbar (dalam milidetik)
}

// Fungsi untuk generate Unique ID dengan 8 angka
function generateUniqueId() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

// Fungsi untuk generate NIM dengan 5 angka
function generateNIM() {
  return Math.floor(10000 + Math.random() * 90000);
}

// Fungsi untuk mengecek apakah input hanya berisi huruf
function isAlphabet(input) {
  return /^[a-zA-Z]+$/.test(input);
}

// Database untuk menyimpan data mahasiswa
let mahasiswaDB = [];

// Fungsi untuk menambahkan data mahasiswa
function addMahasiswa(
  nama,
  tempatLahir,
  tanggalLahir,
  jenisKelamin,
  alamat,
  jurusan
) {
  let mahasiswa = {
    id: generateUniqueId(),
    nim: generateNIM(),
    nama: nama,
    tempatLahir: tempatLahir,
    tanggalLahir: tanggalLahir,
    jenisKelamin: jenisKelamin,
    alamat: alamat,
    jurusan: jurusan,
  };

  mahasiswaDB.push(mahasiswa);
  saveToLocalStorage();
}

// Fungsi untuk menyimpan data ke local storage
function saveToLocalStorage() {
  localStorage.setItem("mahasiswaDB", JSON.stringify(mahasiswaDB));
}

// Fungsi untuk membaca data mahasiswa berdasarkan NIM
function readMahasiswaByNIM(nim) {
  let mahasiswa = mahasiswaDB.find((mhs) => mhs.nim === nim);
  return mahasiswa ? mahasiswa : "Mahasiswa tidak ditemukan";
}

// Fungsi untuk membaca semua data mahasiswa
function readAllMahasiswa() {
  return mahasiswaDB;
}

// Fungsi untuk mengupdate data mahasiswa berdasarkan ID
// function updateMahasiswa(id, newData) {
//   let index = mahasiswaDB.findIndex((mhs) => mhs.id === id);
//   if (index !== -1) {
//     mahasiswaDB[index] = { ...mahasiswaDB[index], ...newData };
//     saveToLocalStorage();
//     return "Data mahasiswa berhasil diupdate";
//   } else {
//     return "Data mahasiswa tidak ditemukan";
//   }
// }

// Fungsi untuk menghapus data mahasiswa berdasarkan ID
function deleteMahasiswaById(id) {
  let index = mahasiswaDB.findIndex((mhs) => mhs.id === id);
  if (index !== -1) {
    mahasiswaDB.splice(index, 1);
    saveToLocalStorage();
    return "Data mahasiswa berhasil dihapus";
  } else {
    return "Data mahasiswa tidak ditemukan";
  }
}
// Fungsi untuk menginisialisasi aplikasi
function init() {
  // Ambil data dari localStorage saat aplikasi dimuat
  const storedData = localStorage.getItem("mahasiswaDB");
  if (storedData) {
    mahasiswaDB = JSON.parse(storedData);
    // Tampilkan data mahasiswa saat aplikasi dimuat
    renderMahasiswaTable();
  }
}

// Fungsi untuk menampilkan data mahasiswa ke dalam tabel
function renderMahasiswaTable() {
  const tableBody = document.querySelector("#tabelMahasiswa tbody");
  tableBody.innerHTML = ""; // Kosongkan isi tabel sebelum menambahkan data baru

  mahasiswaDB.forEach((mahasiswa) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${mahasiswa.nim}</td>
      <td>${mahasiswa.nama}</td>
      <td>${mahasiswa.tempatLahir}</td>
      <td>${mahasiswa.tanggalLahir}</td>
      <td>${mahasiswa.jenisKelamin}</td>
      <td>${mahasiswa.alamat}</td>
      <td>${mahasiswa.jurusan}</td>
      <td>
        <!-- <button onclick="editMahasiswa(${mahasiswa.id})">Edit</button> -->
        <button onclick="deleteMahasiswa(${mahasiswa.id})">Hapus</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", submitForm);

// Tambahkan event listener untuk mendengarkan penekanan tombol Enter di dalam formulir
document
  .getElementById("formMahasiswa")
  .addEventListener("keypress", function (event) {
    // Cek jika tombol yang ditekan adalah tombol Enter (kode ASCII 13)
    if (event.key === "Enter") {
      submitForm(event); // Jalankan fungsi submitForm jika tombol Enter ditekan
    }
  });
// Fungsi untuk menambahkan data mahasiswa dari formulir
// Fungsi untuk menambahkan data mahasiswa dari formulir
function submitForm(event) {
  event.preventDefault(); // Hindari pengiriman form secara default

  const nama = document.querySelector("#nama").value;
  const tempatLahir = document.querySelector("#tempatLahir").value;
  const tanggalLahir = document.querySelector("#tanggalLahir").value;
  const jenisKelamin = document.querySelector("#jenisKelamin").value;
  const alamat = document.querySelector("#alamat").value;
  const jurusan = document.querySelector("#jurusan").value;

  if (
    nama.trim() === "" ||
    tempatLahir.trim() === "" ||
    tanggalLahir.trim() === "" ||
    jenisKelamin.trim() === "" ||
    alamat.trim() === "" ||
    jurusan.trim() === ""
  ) {
    toaster(
      "Gagal menambahkan mahasiswa. Harap lengkapi semua input data.",
      "red"
    );
    return; // Hentikan eksekusi jika ada input data yang kosong
  }

  addMahasiswa(nama, tempatLahir, tanggalLahir, jenisKelamin, alamat, jurusan);
  renderMahasiswaTable(); // Tampilkan data mahasiswa terbaru di tabel
  document.getElementById("formMahasiswa").reset(); // Bersihkan formulir setelah ditambahkan
  toaster("Data Added Successfully", "green");
}

// Fungsi untuk menghapus data mahasiswa
// Function to show the confirmation box
// Function to show the confirmation box with animation
function showConfirmationBox(id) {
  const confirmationOverlay = document.getElementById("confirmationOverlay");
  confirmationOverlay.style.display = "block";
  const confirmationBox = document.getElementById("confirmationBox");
  confirmationBox.style.display = "block";

  // Trigger reflow
  void confirmationBox.offsetWidth;

  // Apply animation
  confirmationBox.style.opacity = "1";

  // Add event listener to confirm delete button
  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", function () {
      const result = deleteMahasiswaById(id);
      if (result === "Data mahasiswa berhasil dihapus") {
        renderMahasiswaTable();
        toaster("Data Deleted Successfully", "green");
      } else {
        toaster(result);
      }
      // Hide the confirmation box after deleting
      confirmationBox.style.opacity = "0";
      confirmationOverlay.style.display = "none";
      setTimeout(function () {
        confirmationBox.style.display = "none";
      }, 100); // Match the transition duration
    });

  // Add event listener to cancel delete button
  document
    .getElementById("cancelDeleteBtn")
    .addEventListener("click", function () {
      confirmationBox.style.opacity = "0";
      setTimeout(function () {
        confirmationBox.style.display = "none";
      }, 100); // Match the transition duration
    });
}

// Function to delete mahasiswa
function deleteMahasiswa(id) {
  showConfirmationBox(id);
}

// // Fungsi untuk menampilkan data mahasiswa di formulir saat tombol "Edit" diklik
// function editMahasiswa(id) {
//   const mahasiswa = mahasiswaDB.find((mhs) => mhs.id === id);
//   if (mahasiswa) {
//     document.querySelector("#nama").value = mahasiswa.nama;
//     document.querySelector("#tempatLahir").value = mahasiswa.tempatLahir;
//     document.querySelector("#tanggalLahir").value = mahasiswa.tanggalLahir;
//     document.querySelector("#jenisKelamin").value = mahasiswa.jenisKelamin;
//     document.querySelector("#alamat").value = mahasiswa.alamat;
//     document.querySelector("#jurusan").value = mahasiswa.jurusan;

//     const editButton = document.getElementById("edit");
//     const submitButton = document.getElementById("submit");

//     // Menyembunyikan tombol "Tambah" dan menampilkan tombol "Edit"
//     submitButton.classList.add("hide");
//     editButton.classList.remove("hide");

//     // Menyimpan ID mahasiswa yang akan diedit di dalam atribut data pada tombol "Edit"
//     editButton.dataset.idToEdit = id;
//   }
// }

// // Fungsi untuk mengupdate data mahasiswa dari formulir
// function updateMahasiswa(id) {
//   const nama = document.querySelector("#nama").value;
//   const tempatLahir = document.querySelector("#tempatLahir").value;
//   const tanggalLahir = document.querySelector("#tanggalLahir").value;
//   const jenisKelamin = document.querySelector("#jenisKelamin").value;
//   const alamat = document.querySelector("#alamat").value;
//   const jurusan = document.querySelector("#jurusan").value;

//   // Update data mahasiswa yang sesuai di dalam mahasiswaDB
//   const result = updateMahasiswaById(id, {
//     nama: nama,
//     tempatLahir: tempatLahir,
//     tanggalLahir: tanggalLahir,
//     jenisKelamin: jenisKelamin,
//     alamat: alamat,
//     jurusan: jurusan,
//   });

//   if (result === "Data mahasiswa berhasil diupdate") {
//     renderMahasiswaTable(); // Tampilkan data mahasiswa terbaru di tabel
//     document.getElementById("formMahasiswa").reset(); // Bersihkan formulir setelah diperbarui
//     deleteSubmitButtonId(); // Hapus atribut data dari tombol "Edit"
//     toaster("Data Updated Successfully"); // Tampilkan snackbar dengan pesan sukses
//   } else {
//     toaster(result); // Tampilkan pesan kesalahan jika gagal mengupdate data mahasiswa
//   }
// }

// // Fungsi untuk menghapus atribut data dari tombol "Edit"
// function deleteSubmitButtonId() {
//   const editButton = document.getElementById("edit");
//   delete editButton.dataset.idToEdit;
// }

// Panggil fungsi init saat aplikasi dimuat
init();
