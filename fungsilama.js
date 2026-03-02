<script>
        const iframe = document.getElementById('iframeGAS');
        let base64Gambar = "";

        // Preview Gambar & Convert ke Base64
        function previewImage(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function() {
                const img = document.getElementById('imgPreview');
                img.src = reader.result;
                img.style.display = "block";
                base64Gambar = reader.result; // Data Base64 siap dikirim
            };
            reader.readAsDataURL(file);
        }

        // 1. KIRIM DATA KE GAS
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
            iframe.contentWindow.postMessage({ tipe: "SIMPAN_DATA", data: payload }, "*");
            alert("Sedang mengirim...");
        }

        // 2. REQUEST DATA DARI GAS
        function requestData() {
            iframe.contentWindow.postMessage({ tipe: "REQUEST_DATA" }, "*");
        }

        // 3. TERIMA BALASAN DARI GAS
        window.addEventListener("message", (event) => {
            if (!event.origin.includes("googleusercontent.com") && event.origin !== "https://script.google.com") return;
            
            const { tipe, data } = event.data;
            if (tipe === "LOAD_UI") {
                document.getElementById('teks').value = data.teks;
                document.getElementById('password').value = data.pass;
                document.getElementById('tanggal').value = data.tgl;
                document.getElementById('selectOption').value = data.id_sel;
                document.getElementById('imgPreview').src = data.img_url;
                document.getElementById('imgPreview').style.display = "block";
                alert("Data berhasil di-load!");
            }
        });

        function clearUI() {
            document.querySelectorAll('input').forEach(i => i.value = "");
            document.getElementById('imgPreview').style.display = "none";
            base64Gambar = "";
        }
    </script>
