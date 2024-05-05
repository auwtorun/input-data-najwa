const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false, // Aktifkan mode raw
});

// Fungsi untuk membaca data member dari file JSON
function bacaDataMember() {
  try {
    const data = fs.readFileSync("members.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Fungsi untuk menulis data member ke file JSON
function tulisDataMember(data) {
  fs.writeFileSync("members.json", JSON.stringify(data, null, 2));
}

// Fungsi untuk menampilkan menu utama
function tampilkanMenuUtama() {
  console.log("===== Sistem Perpustakaan =====");
  console.log("1. Tambah Member");
  console.log("2. Cari Member");
  console.log("3. Hapus Member");
  console.log("4. Edit Member");
  console.log("5. Tampilkan Semua Member");
  console.log("6. Keluar");
  rl.question("Pilih opsi: ", (opsi) => {
    switch (opsi) {
      case "1":
        tambahMember();
        break;
      case "2":
        cariMember();
        break;
      case "3":
        hapusMember();
        break;
      case "4":
        editMember();
        break;
      case "5":
        tampilkanSemuaMember();
        break;
      case "6":
        console.log("Keluar dari program.");
        rl.close();
        return;
      default:
        console.log("Opsi tidak valid.");
        tampilkanMenuUtama();
    }
  });

  // Tambahkan event listener untuk menangani tombol "Escape"
  rl.input.on("keypress", (str, key) => {
    if (key && key.name === "escape") {
      console.log("Operasi dibatalkan.");
      rl.close();
    }
  });
}

// Fungsi untuk menampilkan menu setelah transaksi selesai
function tampilkanMenuSetelahTransaksi() {
  console.log("\nTransaksi selesai.\n");
  tampilkanMenuUtama();
}

// Fungsi untuk menambah member baru
function tambahMember() {
  rl.question("Masukkan ID member: ", (id) => {
    // Validasi ID member harus terdiri dari 5 digit dan hanya angka
    if (!/^\d{5}$/.test(id)) {
      console.log(
        "ID member harus terdiri dari 5 digit angka. Silakan coba lagi."
      );
      tambahMember(); // Mengulangi proses tambah member dari awal
      return;
    }

    const members = bacaDataMember();
    const existingMember = members.find((member) => member.id === id);
    if (existingMember) {
      console.log("ID member sudah ada.");
      tampilkanMenuSetelahTransaksi();
      return;
    }

    rl.question("Masukkan nama member: ", (nama) => {
      members.push({ id, nama });
      tulisDataMember(members);
      console.log("Member telah ditambahkan.");
      tampilkanMenuSetelahTransaksi();
    });
  });
}

// Fungsi untuk mencari member berdasarkan ID
function cariMember() {
  rl.question("Masukkan ID member yang ingin dicari: ", (id) => {
    const members = bacaDataMember();
    const member = members.find((member) => member.id === id);
    if (member) {
      console.log(`Nama member: ${member.nama}`);
    } else {
      console.log("Member tidak ditemukan.");
    }
    tampilkanMenuSetelahTransaksi();
  });
}

// Fungsi untuk menghapus member berdasarkan ID
function hapusMember() {
  rl.question("Masukkan ID member yang ingin dihapus: ", (id) => {
    let members = bacaDataMember();
    const filteredMembers = members.filter((member) => member.id !== id);
    if (filteredMembers.length < members.length) {
      tulisDataMember(filteredMembers);
      console.log("Member telah dihapus.");
    } else {
      console.log("Member tidak ditemukan.");
    }
    tampilkanMenuSetelahTransaksi();
  });
}

// Fungsi untuk mengedit member berdasarkan ID
function editMember() {
  rl.question("Masukkan ID member yang ingin diedit: ", (id) => {
    let members = bacaDataMember();
    const memberIndex = members.findIndex((member) => member.id === id);
    if (memberIndex !== -1) {
      rl.question("Masukkan nama baru: ", (nama) => {
        members[memberIndex].nama = nama;
        tulisDataMember(members);
        console.log("Member telah diedit.");
        tampilkanMenuSetelahTransaksi();
      });
    } else {
      console.log("Member tidak ditemukan.");
      tampilkanMenuSetelahTransaksi();
    }
  });
}

// Fungsi untuk menampilkan semua member
function tampilkanSemuaMember() {
  const members = bacaDataMember();
  console.log("Daftar Member:");
  console.log("ID\tNama");
  members.forEach((member) => {
    console.log(`${member.id}\t${member.nama}`);
  });
  tampilkanMenuSetelahTransaksi();
}

// Main program
tampilkanMenuUtama();
