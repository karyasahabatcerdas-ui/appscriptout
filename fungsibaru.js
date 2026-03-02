// --- FUNGSI KIRIM: GitHub -> GAS ---
function kirimKeAppsScript(paket) {
    const iframe = document.getElementById('iframeGAS');
    if (iframe && iframe.contentWindow) {
        // Gunakan "*" sebagai targetOrigin agar pesan masuk ke domain sandbox manapun
        iframe.contentWindow.postMessage(paket, "*"); 
    }
}

function submitData() {
    const sel = document.getElementById('selectOption');
    const payload = {
        teks: document.getElementById('teks').value,
        pass: document.getElementById('password').value,
        tgl: document.getElementById('tanggal').value,
        id_sel: sel.value,
        txt_sel: sel.options[sel.selectedIndex].text,
        img: base64Gambar
    };
    kirimKeAppsScript({ tipe: "SIMPAN_DATA", data: payload });
    console.log("Mengirim data ke GAS...");
}

function requestData() {
    kirimKeAppsScript({ tipe: "REQUEST_DATA" });
}

// --- FUNGSI TERIMA: GAS -> GitHub ---
window.addEventListener("message", (event) => {
    // Validasi: Izinkan semua sub-domain googleusercontent.com
    const isGoogle = /googleusercontent\.com$/.test(event.origin) || event.origin === "https://script.google.com";
    if (!isGoogle) return;

    const { tipe, data } = event.data;
    if (tipe === "LOAD_UI") {
        // ... isi logika load UI Anda ...
        alert("Data berhasil dimuat dari database GAS!");
    }
});
