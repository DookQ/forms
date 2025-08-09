document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const fullname = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const ticketType = document.getElementById("ticketType").value;
    const ticketQty = parseInt(document.getElementById("ticketQty").value, 10);

    // Reset error
    document.getElementById("fullnameError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("ticketTypeError").textContent = "";
    document.getElementById("ticketQtyError").textContent = "";

    // Validate ชื่อ-นามสกุล
    if (fullname.split(" ").length < 2) {
        document.getElementById("fullnameError").textContent = "กรุณากรอกชื่อและนามสกุลอย่างน้อย 2 คำ";
        isValid = false;
    }

    // Validate เบอร์โทรศัพท์
    if (!/^0\d{9}$/.test(phone)) {
        document.getElementById("phoneError").textContent = "กรุณากรอกเบอร์โทรศัพท์ 10 หลักขึ้นต้นด้วย 0";
        isValid = false;
    }

    // Validate ประเภทตั๋ว
    if (!ticketType) {
        document.getElementById("ticketTypeError").textContent = "กรุณาเลือกประเภทตั๋ว";
        isValid = false;
    }

    // Validate จำนวนตั๋ว
    if (isNaN(ticketQty) || ticketQty < 1 || ticketQty > 5) {
        document.getElementById("ticketQtyError").textContent = "จำนวนตั๋วต้องระหว่าง 1 ถึง 5";
        isValid = false;
    }
    if ((ticketType === "VIP" || ticketType === "Premium") && ticketQty > 2) {
        document.getElementById("ticketQtyError").textContent = "VIP/Premium จำกัดไม่เกิน 2 ใบ";
        isValid = false;
    }

    if (isValid) {
        showModal(`จองตั๋วสำเร็จ จำนวน: ${ticketQty} ประเภท: ${ticketType}`);
    }
});

function showModal(message) {
    document.getElementById("modalMessage").textContent = message;
    document.getElementById("successModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("successModal").style.display = "none";
}
