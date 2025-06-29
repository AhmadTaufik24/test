/**
 * Menjalankan semua skrip setelah seluruh halaman (DOM) selesai dimuat.
 * Ini memastikan semua elemen HTML sudah ada dan siap dimanipulasi.
 */
document.addEventListener('DOMContentLoaded', () => {

    /**
     * FUNGSI 1: DARK/LIGHT MODE TOGGLE
     * - Mengecek localStorage untuk tema yang tersimpan.
     * - Menerapkan tema saat halaman dimuat.
     * - Mengatur event listener pada tombol toggle.
     * - Menyimpan preferensi tema ke localStorage saat diubah.
     */
    const themeToggle = document.getElementById('theme-checkbox');
    const htmlElement = document.documentElement; // Targetnya adalah tag <html>

    // Fungsi untuk menerapkan tema berdasarkan input
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            themeToggle.checked = true;
        } else {
            themeToggle.checked = false;
        }
    };

    // Cek tema yang tersimpan saat pertama kali membuka halaman
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // Event listener untuk tombol toggle tema
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Simpan pilihan baru
    });


    /**
     * FUNGSI 2: SLIDESHOW GAMBAR PROFIL
     * - Mengambil semua gambar profil.
     * - Mengganti kelas 'active' untuk menampilkan gambar berikutnya secara berkala.
     */
    const profilePics = document.querySelectorAll('.profile-pic');
    if (profilePics.length > 0) {
        let currentPicIndex = 0;
        const slideInterval = 4000; // Ganti gambar setiap 4 detik

        setInterval(() => {
            profilePics[currentPicIndex].classList.remove('active');
            currentPicIndex = (currentPicIndex + 1) % profilePics.length;
            profilePics[currentPicIndex].classList.add('active');
        }, slideInterval);
    }


    /**
     * FUNGSI 3: EFEK KETIK (TYPING EFFECT)
     * - Mendeteksi bahasa halaman dari atribut 'lang' di tag <html>.
     * - Memilih set teks yang benar (Inggris atau Indonesia).
     * - Menjalankan animasi mengetik dan menghapus secara berulang.
     */
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        let roles;
        // Cek bahasa halaman
        if (document.documentElement.lang === 'id') {
            roles = ["Fotografer", "Retoucher", "Desainer"];
        } else {
            roles = ["Photographer", "Retoucher", "Designer"];
        }

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentRole = roles[roleIndex];
            const typeSpeed = isDeleting ? 100 : 150;

            // Mengetik atau menghapus teks
            typingElement.textContent = currentRole.substring(0, charIndex);

            if (!isDeleting) {
                charIndex++;
            } else {
                charIndex--;
            }

            // Logika untuk mengubah state
            if (!isDeleting && charIndex === currentRole.length + 1) {
                // Selesai mengetik, tunggu, lalu mulai hapus
                isDeleting = true;
                setTimeout(type, 2000); // Jeda sebelum menghapus
            } else if (isDeleting && charIndex === -1) {
                // Selesai menghapus, ganti kata, mulai ketik lagi
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500); // Jeda sebelum mengetik kata baru
            } else {
                // Lanjutkan animasi
                setTimeout(type, typeSpeed);
            }
        }
        
        type(); // Panggil fungsi untuk pertama kali
    }


    /**
     * FUNGSI 4: MENU HAMBURGER UNTUK MOBILE
     * - Mengatur buka/tutup panel menu saat tombol hamburger di-klik.
     */
    const hamburgerBtn = document.getElementById('hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            // Menambahkan/menghapus kelas 'active' untuk animasi ikon dan panel
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

});
