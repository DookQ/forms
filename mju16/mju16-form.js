document.getElementById("mjuForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = true;

    const fullname = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const courseType = document.getElementById("courseType").value;
    const credits = parseFloat(document.getElementById("credits").value);
    const gpa = parseFloat(document.getElementById("gpa").value);
    const reason = document.getElementById("reason").value.trim();

    // Reset error
    ["fullnameError","phoneError","courseTypeError","creditsError","gpaError","reasonError"].forEach(id => {
        document.getElementById(id).textContent = "";
    });

    // ชื่อ-นามสกุล
    if (fullname.split(" ").length < 2) {
        document.getElementById("fullnameError").textContent = "กรุณากรอกชื่อ-นามสกุลอย่างน้อย 2 คำ";
        isValid = false;
    }

    // เบอร์โทรศัพท์
    if (!/^0\d{9}$/.test(phone)) {
        document.getElementById("phoneError").textContent = "กรุณากรอกเบอร์โทรศัพท์ 10 หลักขึ้นต้นด้วย 0";
        isValid = false;
    }

    // ประเภทหลักสูตร
    if (!courseType) {
        document.getElementById("courseTypeError").textContent = "กรุณาเลือกประเภทหลักสูตร";
        isValid = false;
    }

    // หน่วยกิต + GPA ตามเกณฑ์
    if (isNaN(credits) || credits <= 0) {
        document.getElementById("creditsError").textContent = "กรุณากรอกหน่วยกิตสะสม";
        isValid = false;
    }
    if (isNaN(gpa) || gpa <= 0) {
        document.getElementById("gpaError").textContent = "กรุณากรอก GPA";
        isValid = false;
    }

    if (courseType === "4ปี" && (credits < 30 || gpa < 2.00)) {
        document.getElementById("creditsError").textContent = "หลักสูตร 4 ปี ต้องมีหน่วยกิต ≥ 30 และ GPA ≥ 2.00";
        isValid = false;
    }
    if (courseType === "4ปีเทียบเข้า" && (credits < 18 || gpa < 2.00)) {
        document.getElementById("creditsError").textContent = "หลักสูตร 4 ปีเทียบเข้า ต้องมีหน่วยกิต ≥ 18 และ GPA ≥ 2.00";
        isValid = false;
    }

    // เหตุผลการย้าย
    if (reason.length === 0) {
        document.getElementById("reasonError").textContent = "กรุณากรอกเหตุผลการย้าย";
        isValid = false;
    }

    if (isValid) {
        showModal(`ส่งคำร้องสำเร็จ! (${fullname})`);
    }
});

function showModal(message) {
    document.getElementById("modalMessage").textContent = message;
    document.getElementById("resultModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("resultModal").style.display = "none";
}
