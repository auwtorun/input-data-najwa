# maksimal data mahasiswa yang dapat ditampung
MAX_MAHASISWA = 100
# maksimal admin yang dapat login
MAX_USERS = 1
# ID dan password admin
ADMIN_ID = "admin"
ADMIN_PASSWORD = "admin"

# Struktur data mahasiswa
class Mahasiswa:
    def _init_(self, id, nama, nim):
        self.id = id
        self.nama = nama
        self.nim = nim

# Array untuk menyimpan data mahasiswa
daftar_mahasiswa = []
jumlah_mahasiswa = 0

# Struktur data untuk pengguna
class User:
    def _init_(self, id, password):
        self.id = id
        self.password = password

# Array untuk menyimpan data pengguna
users = []

# Fungsi untuk menambahkan mahasiswa baru
def tambah_mahasiswa():
    global jumlah_mahasiswa
    if jumlah_mahasiswa < MAX_MAHASISWA:
        nama = input("Masukkan nama: ")
        nim = int(input("Masukkan NIM: "))
        mahasiswa = Mahasiswa(jumlah_mahasiswa + 1, nama, nim)
        daftar_mahasiswa.append(mahasiswa)
        jumlah_mahasiswa += 1
        print(f"Mahasiswa berhasil ditambahkan dengan ID: {mahasiswa.id}")
    else:
        print("Kapasitas maksimum mahasiswa telah tercapai.")

# Fungsi untuk menampilkan data semua mahasiswa
def tampilkan_mahasiswa():
    print("Daftar Mahasiswa:")
    print("ID\tNama\t\tNIM")
    for mahasiswa in daftar_mahasiswa:
        print(f"{mahasiswa.id}\t{mahasiswa.nama}\t\t{mahasiswa.nim}")

# Fungsi untuk menghapus mahasiswa berdasarkan ID
def hapus_mahasiswa(id):
    global jumlah_mahasiswa
    index = -1
    for i, mahasiswa in enumerate(daftar_mahasiswa):
        if mahasiswa.id == id:
            index = i
            break
    if index != -1:
        daftar_mahasiswa.pop(index)
        jumlah_mahasiswa -= 1
        print(f"Mahasiswa dengan ID {id} berhasil dihapus.")
    else:
        print(f"Mahasiswa dengan ID {id} tidak ditemukan.")

# Fungsi untuk mengedit data mahasiswa berdasarkan ID
def edit_mahasiswa(id):
    for mahasiswa in daftar_mahasiswa:
        if mahasiswa.id == id:
            mahasiswa.nama = input("Masukkan nama baru: ")
            mahasiswa.nim = int(input("Masukkan NIM baru: "))
            print(f"Data mahasiswa dengan ID {id} berhasil diupdate.")
            return
    print(f"Mahasiswa dengan ID {id} tidak ditemukan.")

# Fungsi untuk login
def login():
    id = input("ID: ")
    password = input("Password: ")
    return id == ADMIN_ID and password == ADMIN_PASSWORD

# Main program
if login():
    while True:
        print("\nMenu CRUD:")
        print("1. Tambah Mahasiswa")
        print("2. Tampilkan Mahasiswa")
        print("3. Edit Mahasiswa")
        print("4. Hapus Mahasiswa")
        print("5. Keluar")
        pilihan = input("Pilih: ")

        if pilihan == "1":
            tambah_mahasiswa()
        elif pilihan == "2":
            tampilkan_mahasiswa()
        elif pilihan == "3":
            id = int(input("Masukkan ID mahasiswa yang ingin diedit: "))
            edit_mahasiswa(id)
        elif pilihan == "4":
            id = int(input("Masukkan ID mahasiswa yang ingin dihapus: "))
            hapus_mahasiswa(id)
        elif pilihan == "5":
            print("Keluar dari program.")
            break
        else:
            print("Pilihan tidak valid.")
else:
    print("Login gagal. Keluar dari program.")