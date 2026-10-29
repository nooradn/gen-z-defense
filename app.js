/**
 * Suara Gen Z - Interactive Logic
 * Features: Dark Mode, Filter Mitos, Kalkulator Kopi vs Rumah, Skakmat Generator,
 * Bingo Game + Confetti, Dinding Suara (localStorage), and Share Actions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. THEME TOGGLE (Dark / Light)
    // -------------------------------------------------------------
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('genz_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            localStorage.setItem('genz_theme', isDark ? 'dark' : 'light');
            if (window.lucide) lucide.createIcons();
        });
    }

    // -------------------------------------------------------------
    // 2. MOBILE MENU
    // -------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // -------------------------------------------------------------
    // 3. TOAST NOTIFICATION UTILITY
    // -------------------------------------------------------------
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    let toastTimeout;

    function showToast(message) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.classList.remove('translate-y-24', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-24', 'opacity-0');
        }, 3000);
    }

    // -------------------------------------------------------------
    // 4. MITOS FILTER
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mythCards = document.querySelectorAll('.myth-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active', 'bg-brand-yellow', 'text-black');
                b.classList.add('bg-white', 'dark:bg-slate-800');
            });
            btn.classList.add('active', 'bg-brand-yellow', 'text-black');
            btn.classList.remove('bg-white', 'dark:bg-slate-800');

            const filter = btn.getAttribute('data-filter');
            mythCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 5. KALKULATOR KOPI VS RUMAH
    // -------------------------------------------------------------
    const coffeePriceSlider = document.getElementById('coffeePrice');
    const housePriceSlider = document.getElementById('housePrice');
    const dpPercentSlider = document.getElementById('dpPercent');

    const coffeePriceVal = document.getElementById('coffeePriceVal');
    const housePriceVal = document.getElementById('housePriceVal');
    const dpPercentVal = document.getElementById('dpPercentVal');

    const yearsToDp = document.getElementById('yearsToDp');
    const yearsToCash = document.getElementById('yearsToCash');

    function formatRupiah(number) {
        return 'Rp ' + Number(number).toLocaleString('id-ID');
    }

    function calculateCoffeeVsHouse() {
        if (!coffeePriceSlider || !housePriceSlider || !dpPercentSlider) return;

        const coffeeDaily = Number(coffeePriceSlider.value);
        const housePrice = Number(housePriceSlider.value);
        const dpPercent = Number(dpPercentSlider.value);

        // Update labels
        coffeePriceVal.textContent = formatRupiah(coffeeDaily);
        housePriceVal.textContent = formatRupiah(housePrice);
        const dpAmount = housePrice * (dpPercent / 100);
        dpPercentVal.textContent = `${dpPercent}% (${formatRupiah(dpAmount)})`;

        // Calculate yearly coffee savings
        const yearlyCoffeeSavings = coffeeDaily * 365;

        // Years needed
        const yearsForDp = (dpAmount / yearlyCoffeeSavings).toFixed(1);
        const yearsForFull = (housePrice / yearlyCoffeeSavings).toFixed(1);

        yearsToDp.textContent = `${yearsForDp.replace('.', ',')} Tahun`;
        yearsToCash.textContent = `${yearsForFull.replace('.', ',')} Tahun`;
    }

    if (coffeePriceSlider && housePriceSlider && dpPercentSlider) {
        coffeePriceSlider.addEventListener('input', calculateCoffeeVsHouse);
        housePriceSlider.addEventListener('input', calculateCoffeeVsHouse);
        dpPercentSlider.addEventListener('input', calculateCoffeeVsHouse);
        // Initial run
        calculateCoffeeVsHouse();
    }

    // -------------------------------------------------------------
    // 6. GENERATOR JAWABAN SKAKMAT
    // -------------------------------------------------------------
    const comebacksDB = [
        {
            topic: "Kapan nikah? Umur segini bapak dulu udah punya rumah & anak dua!",
            sopan: {
                text: "Alhamdulillah Pak/Bu, kami memilih menyiapkan finansial dan kestabilan emosi terlebih dahulu agar anak cucu nanti tumbuh sejahtera tanpa dibebani hutang keluarga. Kualitas keluarga jauh lebih utama daripada sekadar buru-buru tanggal.",
                tips: "Ucapkan sambil tersenyum tenang dan menawarkan kue kering agar situasi tetap hangat."
            },
            data: {
                text: "Tahun 1990 rata-rata harga rumah hanya 3x gaji tahunan. Sekarang tahun 2026 rasionya sudah tembus 18x gaji tahunan dengan biaya persalinan dan sekolah anak naik 12-15% per tahun. Menikah dengan kalkulasi matang adalah bentuk tanggung jawab rasional.",
                tips: "Gunakan intonasi presentasi santai, jika perlu tunjukkan grafik inflasi di HP."
            },
            savage: {
                text: "Zaman bapak dulu beli tanah murah dan ga ada persaingan AI, Pak. Kalau sekarang saya buru-buru nikah demi gengsi arisan tapi ujungnya minjam duit ke om/tante, kan gak lucu?",
                tips: "Gunakan hanya jika sudah tidak tahan dengan desakan toxic berulang-ulang."
            }
        },
        {
            topic: "Anak baru kok jam 5 teng langsung rapi-rapi tas mau pulang?",
            sopan: {
                text: "Semua KPI dan task harian saya untuk hari ini sudah terselesaikan dengan baik, Pak/Bu. Saya izin pulang tepat waktu agar besok pagi bisa kembali bekerja dengan energi dan fokus maksimal.",
                tips: "Tunjukkan daftar todo list yang sudah centang hijau sebelum pamit pulang."
            },
            data: {
                text: "Menurut riset produktivitas dari Harvard Business Review dan WHO, bekerja lebih dari 50 jam seminggu menurunkan performa kerja hingga 35% dan meningkatkan risiko kesalahan fatal. Jam 5 teng pulang membuktikan efisiensi kerja yang terukur.",
                tips: "Kirim ringkasan pekerjaan harian di Slack/email jam 16:55 sebelum log-off."
            },
            savage: {
                text: "Dalam kontrak kerja saya tertulis jam 9 sampai jam 5, Pak. Kalau perusahaan bersedia membayar overtime rate 1.5x sesuai UU Ketenagakerjaan per jamnya, mari kita bicara.",
                tips: "Simpan draft CV dan perbarui profil LinkedIn sebelum melontarkan ini."
            }
        },
        {
            topic: "Zaman bapak dulu jalan kaki 10 km ke sekolah, kamu manja dikit-dikit ojol!",
            sopan: {
                text: "Kami sangat kagum dengan kegigihan Bapak dulu. Justru berkat perjuangan generasi Bapak yang membangun infrastruktur dan teknologi transportasi, sekarang kami bisa memanfaatkan waktu 1 jam di jalan untuk membaca materi atau bekerja mobile.",
                tips: "Puji perjuangannya dulu sebelum mengalihkan ke efisiensi waktu zaman now."
            },
            data: {
                text: "Kadar polusi udara Jakarta/kota besar saat ini sering menyentuh level PM2.5 tidak sehat (AQI > 150) plus suhu bumi naik 1.5°C. Jalan kaki 10 km di tengah polusi dan trotoar bolong lebih berisiko terkena infeksi saluran pernapasan daripada membangun stamina.",
                tips: "Buka aplikasi cek kualitas udara (AQI) untuk verifikasi langsung."
            },
            savage: {
                text: "Bapak dulu jalan kaki 10 km karena memang belum ada Gojek sama Grab, Pak. Kalau zaman dulu ada aplikasi diskon ojol Rp10 ribu, bapak juga pasti mesen kan?",
                tips: "Bercanda dengan nada santai biar disangka guyonan padahal fakta."
            }
        },
        {
            topic: "Gaji UMR kok dikit-dikit healing ke Bali atau nonton konser?",
            sopan: {
                text: "Bagi kami, anggaran hiburan secukupnya adalah investasi kewarasan agar kami tidak burnout dan tetap produktif mencari nafkah. Semua sudah kami anggarkan dari pos dana tabungan tersendiri tanpa mengganggu pos wajib.",
                tips: "Jelaskan dengan konsep budgeting 50/30/20 yang rapi."
            },
            data: {
                text: "Biaya konsultasi psikiater atau rawat inap akibat stres akut dan GERD di rumah sakit mencapai Rp2 juta - Rp8 juta sekali berobat. Nonton konser musik lokal Rp200.000 atau camping akhir pekan terbukti menjadi *preventive healthcare* yang jauh lebih murah.",
                tips: "Tunjukkan perbandingan biaya hiburan vs biaya tes endoskopi lambung."
            },
            savage: {
                text: "Uang Rp1,5 juta buat tiket konser kalau ditabung 10 tahun juga gak bakal cukup buat beli tanah di BSD, Om. Minimal kami masih bisa punya kenangan bahagia sebelum dunia kiamat.",
                tips: "Cocok diutarakan ke teman sebaya atau om yang suka banding-bandingin."
            }
        },
        {
            topic: "Kamu itu cuma kurang ibadah & kurang bersyukur, makanya gampang stres!",
            sopan: {
                text: "Ibadah dan doa selalu menjadi pegangan spiritual kami. Namun sebagaimana jika kita patah tulang kita pergi ke dokter ortopedi, ketika sistem saraf otak kita lelah, berkonsultasi ke psikolog/ahli adalah ikhtiar medis yang nyata.",
                tips: "Gunakan analogi penyakit fisik (seperti sakit gigi atau tipes) agar mudah dimengerti orang tua."
            },
            data: {
                text: "Kementerian Kesehatan RI mencatat 1 dari 10 orang Indonesia mengalami gangguan kesehatan mental. Stres klinis melibatkan ketidakseimbangan neurotransmitter serotonin dan kortisol di otak, yang membutuhkan pendekatan sains perilaku selain doa spiritual.",
                tips: "Bawa data bahwa tokoh agama modern pun menyarankan ikhtiar medis beriringan dengan doa."
            },
            savage: {
                text: "Kalau semua stres sembuh murni cuma dengan diam dan sabar tanpa ikhtiar medis, rumah sakit jiwa dan jurusan psikologi di seluruh dunia sudah ditutup sejak abad ke-18, Tante.",
                tips: "Tersenyumlah manis setelah mengucapkan ini."
            }
        },
        {
            topic: "Baru 6 bulan kerja kok udah mau resign? Gak tahan banting!",
            sopan: {
                text: "Saya sangat menghargai kesempatan kerja di sini, namun setelah evaluasi objektif, prospek perkembangan skill dan jenjang karir yang saya cari lebih terfasilitasi di kesempatan yang baru ini.",
                tips: "Fokus pada akselerasi karir masa depan, bukan menjelekkan kantor lama."
            },
            data: {
                text: "Survei Forbes dan LinkedIn menunjukkan pekerja yang melakukan evaluasi karir strategis setiap 1-2 tahun memiliki pertumbuhan pendapatan 50% lebih tinggi dibanding yang bertahan stagnan. Di era inflasi 4%, bertahan di tempat yang tidak memberi *growth* adalah kerugian finansial jangka panjang.",
                tips: "Siapkan angka persentase kenaikan offering letter baru."
            },
            savage: {
                text: "Perusahaan aja berani mem-PHK karyawan dalam tempo 1 hari lewat email kalau profit turun, kenapa karyawan harus mengorbankan masa depannya seumur hidup di lingkungan toxic?",
                tips: "Simpan ini sebagai status LinkedIn setelah resmi tanda tangan offering baru."
            }
        }
    ];

    const scenarioSelect = document.getElementById('scenarioSelect');
    const toneButtons = document.querySelectorAll('.tone-btn');
    const comebackText = document.getElementById('comebackText');
    const comebackTips = document.getElementById('comebackTips');
    const copyComebackBtn = document.getElementById('copyComebackBtn');
    const copyBtnText = document.getElementById('copyBtnText');

    let currentTone = 'sopan';

    function updateComeback() {
        if (!scenarioSelect || !comebackText) return;
        const index = Number(scenarioSelect.value) || 0;
        const scenario = comebacksDB[index];
        if (!scenario) return;

        const data = scenario[currentTone];
        comebackText.textContent = `"${data.text}"`;
        comebackTips.textContent = data.tips;
    }

    if (scenarioSelect) {
        scenarioSelect.addEventListener('change', updateComeback);
    }

    toneButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toneButtons.forEach(b => {
                b.classList.remove('active', 'bg-brand-yellow', 'text-black');
                b.classList.add('bg-white', 'dark:bg-slate-800');
            });
            btn.classList.add('active', 'bg-brand-yellow', 'text-black');
            btn.classList.remove('bg-white', 'dark:bg-slate-800');

            currentTone = btn.getAttribute('data-tone');
            updateComeback();
        });
    });

    if (copyComebackBtn) {
        copyComebackBtn.addEventListener('click', () => {
            const textToCopy = comebackText.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyBtnText.textContent = 'Tersalin!';
                showToast('Jawaban skakmat berhasil disalin ke clipboard! 📋');
                setTimeout(() => {
                    copyBtnText.textContent = 'Salin Teks';
                }, 2000);
            }).catch(() => {
                showToast('Gagal menyalin teks secara otomatis.');
            });
        });
    }

    // -------------------------------------------------------------
    // 7. BINGO BULLYAN GENERASI
    // -------------------------------------------------------------
    const bingoCells = document.querySelectorAll('.bingo-cell');
    const bingoScore = document.getElementById('bingoScore');
    const bingoStatus = document.getElementById('bingoStatus');
    const resetBingoBtn = document.getElementById('resetBingoBtn');

    const statusLevels = [
        { min: 0, max: 2, title: "Pendekar Baru Lulus 🌱", desc: "Masih lumayan suci dari omelan arisan." },
        { min: 3, max: 5, title: "Pejuang Tangguh Batin 🛡️", desc: "Sering denger ceramah, tapi masih bisa senyum tipis." },
        { min: 6, max: 8, title: "Master Kebal Nyinyir 🥋", desc: "Telinga sudah berpelapis anti-peluru dan anti-baper." },
        { min: 9, max: 9, title: "VIBRANIUM LEVEL GEN Z 👑🍓", desc: "Sudah mencapai taraf pencerahan nirwana, bully generasi ga mempan lagi!" }
    ];

    function updateBingoStats() {
        let count = 0;
        bingoCells.forEach(cell => {
            if (cell.getAttribute('data-checked') === 'true') {
                count++;
            }
        });

        if (bingoScore) bingoScore.textContent = `${count}/9`;

        const level = statusLevels.find(l => count >= l.min && count <= l.max) || statusLevels[0];
        if (bingoStatus) {
            bingoStatus.textContent = `${level.title} — ${level.desc}`;
        }

        // Trigger confetti on 9 (full bingo) or 5
        if (count === 9 && window.confetti) {
            triggerConfetti();
            showToast('🎉 BINGO SEMPURNA! Mentalmu sekuat baja vibranium!');
        }
    }

    bingoCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const isChecked = cell.getAttribute('data-checked') === 'true';
            const nextState = !isChecked;
            cell.setAttribute('data-checked', nextState ? 'true' : 'false');

            if (nextState) {
                cell.classList.add('checked');
            } else {
                cell.classList.remove('checked');
            }
            updateBingoStats();
        });
    });

    if (resetBingoBtn) {
        resetBingoBtn.addEventListener('click', () => {
            bingoCells.forEach((cell, idx) => {
                // Keep center free space checked
                if (idx === 4) {
                    cell.setAttribute('data-checked', 'true');
                    cell.classList.add('checked');
                } else {
                    cell.setAttribute('data-checked', 'false');
                    cell.classList.remove('checked');
                }
            });
            updateBingoStats();
            showToast('Bingo berhasil direset ke status awal.');
        });
    }

    function triggerConfetti() {
        if (!window.confetti) return;
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // -------------------------------------------------------------
    // 8. DINDING SUARA & CURHAT (Wall of Voices with LocalStorage)
    // -------------------------------------------------------------
    const openCurhatModalBtn = document.getElementById('openCurhatModalBtn');
    const closeCurhatModalBtn = document.getElementById('closeCurhatModalBtn');
    const cancelCurhatBtn = document.getElementById('cancelCurhatBtn');
    const curhatModal = document.getElementById('curhatModal');
    const curhatForm = document.getElementById('curhatForm');
    const wallGrid = document.getElementById('wallGrid');

    function openModal() {
        if (curhatModal) curhatModal.classList.remove('hidden');
    }

    function closeModal() {
        if (curhatModal) curhatModal.classList.add('hidden');
    }

    if (openCurhatModalBtn) openCurhatModalBtn.addEventListener('click', openModal);
    if (closeCurhatModalBtn) closeCurhatModalBtn.addEventListener('click', closeModal);
    if (cancelCurhatBtn) cancelCurhatBtn.addEventListener('click', closeModal);

    // Load saved user curhat from localStorage
    function loadUserCurhats() {
        const saved = localStorage.getItem('genz_curhat_list');
        if (!saved || !wallGrid) return;

        try {
            const list = JSON.parse(saved);
            list.forEach(item => {
                appendCurhatCard(item.author, item.role, item.content, item.likes || 12, false);
            });
        } catch (e) {
            console.error(e);
        }
    }

    function appendCurhatCard(author, role, content, likes = 1, isNew = true) {
        if (!wallGrid) return;
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-[#161722] border-2 border-black rounded-2xl p-6 shadow-neo flex flex-col justify-between transition-all hover:-translate-y-1";
        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between mb-3 text-xs text-slate-500">
                    <span class="font-bold text-brand-pink flex items-center gap-1">
                        <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> ${role}
                    </span>
                    <span>${isNew ? 'Baru saja' : 'Kemarin'}</span>
                </div>
                <p class="text-sm font-medium leading-relaxed mb-4 text-slate-800 dark:text-slate-200">
                    "${escapeHtml(content)}"
                </p>
            </div>
            <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                <span class="text-xs text-slate-400 font-semibold">— ${escapeHtml(author)}</span>
                <button class="like-curhat-btn text-xs font-bold flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-brand-pink hover:text-white transition-colors" data-liked="false">
                    <span>❤️</span> <span class="like-count">${likes}</span>
                </button>
            </div>
        `;

        if (isNew) {
            wallGrid.prepend(card);
        } else {
            wallGrid.appendChild(card);
        }

        bindLikeButtons(card);
        if (window.lucide) lucide.createIcons();
    }

    function escapeHtml(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function bindLikeButtons(parent = document) {
        const likeBtns = parent.querySelectorAll('.like-curhat-btn');
        likeBtns.forEach(btn => {
            if (btn.getAttribute('data-bound')) return;
            btn.setAttribute('data-bound', 'true');

            btn.addEventListener('click', () => {
                const isLiked = btn.getAttribute('data-liked') === 'true';
                const countSpan = btn.querySelector('.like-count');
                let count = parseInt(countSpan.textContent, 10) || 0;

                if (!isLiked) {
                    count++;
                    btn.setAttribute('data-liked', 'true');
                    btn.classList.add('bg-brand-pink', 'text-white');
                    btn.classList.remove('bg-slate-100', 'dark:bg-slate-800');
                } else {
                    count--;
                    btn.setAttribute('data-liked', 'false');
                    btn.classList.remove('bg-brand-pink', 'text-white');
                    btn.classList.add('bg-slate-100', 'dark:bg-slate-800');
                }
                countSpan.textContent = count;
            });
        });
    }

    bindLikeButtons(document);

    if (curhatForm) {
        curhatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const author = document.getElementById('curhatAuthor').value.trim();
            const role = document.getElementById('curhatRole').value.trim();
            const content = document.getElementById('curhatContent').value.trim();

            if (!author || !role || !content) return;

            appendCurhatCard(author, role, content, 1, true);

            // Save to localStorage
            const saved = localStorage.getItem('genz_curhat_list');
            let list = saved ? JSON.parse(saved) : [];
            list.unshift({ author, role, content, likes: 1 });
            localStorage.setItem('genz_curhat_list', JSON.stringify(list));

            // Reset & Close
            curhatForm.reset();
            closeModal();
            showToast('Curhatanmu berhasil dipajang di Dinding Suara! 📢');
            if (window.confetti) triggerConfetti();
        });
    }

    loadUserCurhats();

    // -------------------------------------------------------------
    // 9. SHARE SURAT TERBUKA KE WHATSAPP
    // -------------------------------------------------------------
    const shareOpenLetterBtn = document.getElementById('shareOpenLetterBtn');
    if (shareOpenLetterBtn) {
        shareOpenLetterBtn.addEventListener('click', () => {
            const text = `💌 *Surat Terbuka untuk Orang Tua dan Senior Kami:*\n\n"Bapak/Ibu yang kami hormati, kami bukan generasi lembek. Dunia saat ini sedang menghadapi inflasi properti gila-gilaan, krisis iklim, dan disrupsi AI yang sangat cepat. Ketika kami bicara mental health, kami hanya ingin memutus rantai trauma dan tetap waras mencari nafkah. Kita bukan musuh, mari saling menguatkan!"\n\nBaca manifesto lengkap dan data objektifnya di: ${window.location.href}`;
            const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Initialize initial stats for Bingo
    updateBingoStats();
});
