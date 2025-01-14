
        const form = document.getElementById('pengaduanForm');
        const alertSuccess = document.getElementById('alertSuccess');
        const belumTerlaksanaTable = document.getElementById('pengaduanBelumTerlaksana');
        const terlaksanaTable = document.getElementById('pengaduanTerlaksana');

        // Fungsi untuk menambahkan pengaduan baru
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (form.checkValidity()) {
                const nama = document.getElementById('nama').value;
                const email = document.getElementById('email').value;
                const kategori = document.getElementById('kategori').value;
                const pesan = document.getElementById('pesan').value;

                const currentDate = new Date();
                const dateString = currentDate.toLocaleString();

                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${nama}</td>
                    <td>${email}</td>
                    <td>${kategori}</td>
                    <td>${pesan}</td>
                    <td>${dateString}</td>
                    <td>Belum Terlaksana</td>
                    <td>
                        <button class="btn btn-secondary btn-sm me-1" onclick="responPengaduan(this)">Respon</button>
                        <button class="btn btn-warning btn-sm" onclick="tandaiProses(this)">Proses</button>
                    </td>

                `;
                belumTerlaksanaTable.appendChild(newRow);

                alertSuccess.classList.remove('d-none');
                form.reset();
                form.classList.remove('was-validated');
            } else {
                form.classList.add('was-validated');
            }
        });

// Fungsi untuk memberikan respon terhadap pengaduan
function responPengaduan(button) {
    const row = button.closest('tr');
    const pesan = row.cells[3].textContent; // Pesan pengaduan

    const respon = prompt("Masukkan respon untuk pengaduan:", "Tulis respon...");
    if (respon) {
        alert(`Respon Anda: ${respon}`);
        row.cells[5].textContent = respon; // Menampilkan balasan di kolom status
    }
}

// Fungsi untuk memindahkan pengaduan ke tahap proses
function tandaiProses(button) {
    const row = button.closest('tr');
    row.cells[5].textContent = "Sedang Proses";

    // Perbarui tombol aksi
    row.cells[6].innerHTML = `
        <button class="btn btn-success btn-sm" onclick="tandaiTerlaksana(this)">Tandai Terlaksana</button>
    `;
}

// Fungsi untuk menandai pengaduan sebagai terlaksana
function tandaiTerlaksana(button) {
    const row = button.closest('tr');

    // Pindahkan data ke tabel "Terlaksana"
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${row.cells[0].textContent}</td>
        <td>${row.cells[1].textContent}</td>
        <td>${row.cells[2].textContent}</td>
        <td>${row.cells[3].textContent}</td>
        <td>${row.cells[4].textContent}</td>
        <td>Selesai</td>

    `;
    terlaksanaTable.appendChild(newRow);

    // Hapus baris dari tabel "Belum Terlaksana"
    row.remove();
}