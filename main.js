// Menjalankan semua skrip hanya setelah seluruh halaman (DOM) selesai dimuat
// Ini untuk memastikan semua elemen HTML sudah siap sebelum dimanipulasi oleh JS
document.addEventListener('DOMContentLoaded', () => {

    /**
     * FUNGSI 1: DARK/LIGHT MODE TOGGLE
     * - Mengecek localStorage untuk tema yang tersimpan.
     * - Menerapkan tema saat halaman dimuat.
     * - Mendengarkan perubahan pada tombol toggle.
     * - Menyimpan preferensi tema ke localStorage.
     */
    const themeToggle = document.getElementById('theme-checkbox');
    const htmlElement = document.documentElement; // Targetnya adalah tag <html>

    // Cek tema yang tersimpan di localStorage saat pertama kali buka halaman
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    // Tambahkan event listener untuk tombol toggle
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // Simpan pilihan ke localStorage
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); // Simpan pilihan ke localStorage
        }
    });


    /**
     * FUNGSI 2: SLIDESHOW GAMBAR PROFIL
     * - Mengambil semua gambar profil.
     * - Mengganti gambar setiap beberapa detik secara otomatis.
     */
    const profilePics = document.querySelectorAll('.profile-pic');
    if (profilePics.length > 0) {
        let currentPicIndex = 0;
        const slideInterval = 4000; // Ganti gambar setiap 4 detik

        setInterval(() => {
            profilePics[currentPicIndex].classList.remove('active'); // Sembunyikan gambar lama
            currentPicIndex = (currentPicIndex + 1) % profilePics.length; // Pindah ke index berikutnya
            profilePics[currentPicIndex].classList.add('active'); // Tampilkan gambar baru
        }, slideInterval);
    }


    /**
     * FUNGSI 3: EFEK KETIK (TYPING EFFECT)
     * - Cek bahasa halaman (ID atau EN) dari tag <html lang="...">.
     * - Menyiapkan array teks yang sesuai dengan bahasa.
     * - Mengetik dan menghapus teks secara berulang.
     */
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        let roles;
        // Cek atribut 'lang' pada tag <html> untuk menentukan bahasa
        if (document.documentElement.lang === 'id') {
            roles = ["Fotografer", "Retoucher", "Desainer"];
        } else {
            roles = ["Photographer", "Retoucher", "Designer"];
        }

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 150;
        const deletingSpeed = 100;
        const delayBetweenRoles = 2000;

        function type() {
            const currentRole = roles[roleIndex];
            let newText = '';

            if (isDeleting) {
                // Proses menghapus
                newText = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Proses mengetik
                newText = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            typingElement.textContent = newText;

            // Logika untuk ganti state (mengetik -> menghapus -> ganti kata)
            if (!isDeleting && charIndex === currentRole.length) {
                // Selesai mengetik, mulai menghapus setelah jeda
                isDeleting = true;
                setTimeout(type, delayBetweenRoles);
            } else if (isDeleting && charIndex === 0) {
                // Selesai menghapus, ganti kata dan mulai mengetik lagi
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500);
            } else {
                // Lanjutkan mengetik/menghapus
                setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
            }
        }
        
        type(); // Mulai efek ketik
    }


    /**
     * FUNGSI 4: MENU HAMBURGER UNTUK MOBILE
     * - Mengatur buka/tutup menu saat tombol hamburger di-klik.
     */
    const hamburgerBtn = document.getElementById('hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            // Toggle class 'active' untuk mengubah ikon hamburger (X) dan menampilkan menu
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Bonus: Tutup menu jika salah satu link di dalam menu mobile di-klik
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    
    /**
     * FUNGSI 5: ANIMASI SAAT SCROLL (Intersection Observer)
     * - Untuk memberikan efek zoom/fade-in pada section profile.
     * - CSS untuk ini akan kita tambahkan nanti.
     */
    // (Fungsi ini akan ditambahkan jika kita ingin efek scroll yang lebih kompleks,
    // untuk saat ini, kita biarkan kosong karena efek dasar sudah diatur di CSS)


    /**
     * FUNGSI 6: TOMBOL "SCROLL TO TOP"
     * - Akan muncul jika user sudah scroll ke bawah.
     */
    // (Fitur ini juga akan kita tambahkan nanti jika diperlukan, sesuai permintaan opsional)

});
