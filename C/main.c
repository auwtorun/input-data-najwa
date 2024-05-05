#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_MAHASISWA 100 // maksimal data mahasiswa yg bs diinput
#define MAX_USERS 10 // maksimal user yg bs login
#define ADMIN_ID "admin" // id admin utk login
#define ADMIN_PASSWORD "admin" // password

//4 data di atas bisa diubah

// struktur data mahasiswa
struct Mahasiswa {
    int id;
    char nama[50]; //maksimal huruf untuk nama
    int nim;
};

// array untuk menyimpan data mahasiswa
struct Mahasiswa daftarMahasiswa[MAX_MAHASISWA];
int jumlahMahasiswa = 0; //jumlah data awal

// struktur data admin
struct User {
    char id[20];
    char password[20];
};

// array untuk menyimpan data admin
struct User users[MAX_USERS];
int jumlahUsers = 0; //jumlah data admin awal

// funtion untuk menambahkan mahasiswa baru
void tambahMahasiswa() {
    if (jumlahMahasiswa < MAX_MAHASISWA) {
        struct Mahasiswa mhs;
        printf("Masukkan nama: ");
        scanf("%s", mhs.nama);
        printf("Masukkan NIM: ");
        scanf("%d", &mhs.nim);
        mhs.id = jumlahMahasiswa + 1; // ID unik adalah nomor urut mahasiswa
        daftarMahasiswa[jumlahMahasiswa++] = mhs;
        printf("Mahasiswa berhasil ditambahkan dengan ID: %d\n", mhs.id);
    } else {
        printf("Kapasitas maksimum mahasiswa telah tercapai.\n");
    }
}

// function untuk menampilkan data semua mahasiswa
void tampilkanMahasiswa() {
    printf("Daftar Mahasiswa:\n");
    printf("ID\tNama\t\tNIM\n");
    for (int i = 0; i < jumlahMahasiswa; i++) {
        printf("%d\t%s\t\t%d\n", daftarMahasiswa[i].id, daftarMahasiswa[i].nama, daftarMahasiswa[i].nim);
    }
}

// function untuk menghapus mahasiswa berdasarkan ID
void hapusMahasiswa(int id) {
    int index = -1;
    for (int i = 0; i < jumlahMahasiswa; i++) {
        if (daftarMahasiswa[i].id == id) {
            index = i;
            break;
        }
    }
    if (index != -1) {
        for (int i = index; i < jumlahMahasiswa - 1; i++) {
            daftarMahasiswa[i] = daftarMahasiswa[i + 1];
        }
        jumlahMahasiswa--;
        printf("Mahasiswa dengan ID %d berhasil dihapus.\n", id);
    } else {
        printf("Mahasiswa dengan ID %d tidak ditemukan.\n", id);
    }
}

// function untuk mengedit data mahasiswa berdasarkan ID
void editMahasiswa(int id) {
    int index = -1;
    for (int i = 0; i < jumlahMahasiswa; i++) {
        if (daftarMahasiswa[i].id == id) {
            index = i;
            break;
        }
    }
    if (index != -1) {
        printf("Masukkan nama baru: ");
        scanf("%s", daftarMahasiswa[index].nama);
        printf("Masukkan NIM baru: ");
        scanf("%d", &daftarMahasiswa[index].nim);
        printf("Data mahasiswa dengan ID %d berhasil diupdate.\n", id);
    } else {
        printf("Mahasiswa dengan ID %d tidak ditemukan.\n", id);
    }
}

// function untuk menampilkan menu CRUD / menu awal
void tampilkanMenuCRUD() {
    printf("\nMenu CRUD:\n");
    printf("1. Tambah Mahasiswa\n");
    printf("2. Tampilkan Mahasiswa\n");
    printf("3. Edit Mahasiswa\n");
    printf("4. Hapus Mahasiswa\n");
    printf("5. Keluar\n");
}

// function untuk login admin
int login() {
    char id[20], password[20];
    printf("Login:\n");
    printf("ID: ");
    scanf("%s", id);
    printf("Password: ");
    scanf("%s", password);
    if (strcmp(id, ADMIN_ID) == 0 && strcmp(password, ADMIN_PASSWORD) == 0) {
        return 1; // Login berhasil
    } else {
        return 0; // Login gagal
    }
}

int main() {
    int pilihan;
    if (!login()) {
        printf("Login gagal. Keluar dari program.\n");
        return 0;
    }
    do {
        tampilkanMenuCRUD();
        printf("Pilih: ");
        scanf("%d", &pilihan);

        switch (pilihan) {
            case 1:
                tambahMahasiswa();
                break;
            case 2:
                tampilkanMahasiswa();
                break;
            case 3: {
                int id;
                printf("Masukkan ID mahasiswa yang ingin diedit: ");
                scanf("%d", &id);
                editMahasiswa(id);
                break;
            }
            case 4: {
                int id;
                printf("Masukkan ID mahasiswa yang ingin dihapus: ");
                scanf("%d", &id);
                hapusMahasiswa(id);
                break;
            }
            case 5:
                printf("Keluar dari program.\n");
                break;
            default:
                printf("Pilihan tidak valid.\n");
        }
    } while (pilihan != 5);

    return 0;
}