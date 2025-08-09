const hasDiseaseCheckbox = document.getElementById("hasDisease");
const diseaseDetailBox = document.getElementById("diseaseDetailBox");

hasDiseaseCheckbox.addEventListener("change", () => {
    diseaseDetailBox.style.display = hasDiseaseCheckbox.checked ? "block" : "none";
});

document.getElementById("healthForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const age = parseInt(document.getElementById("age").value, 10);
    const gender = document.querySelector("input[name='gender']:checked");
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const hasDisease = document.getElementById("hasDisease").checked;
    const diseaseDetail = document.getElementById("diseaseDetail").value.trim();

    // Reset error
    ["ageError","genderError","weightError","heightError","diseaseDetailError"].forEach(id => {
        document.getElementById(id).textContent = "";
    });

    // Validate อายุ
    if (isNaN(age) || age < 15 || age > 60) {
        document.getElementById("ageError").textContent = "อายุต้องอยู่ระหว่าง 15–60 ปี";
        isValid = false;
    }

    // Validate เพศ
    if (!gender) {
        document.getElementById("genderError").textContent = "กรุณาเลือกเพศ";
        isValid = false;
    }

    // Validate น้ำหนัก
    if (isNaN(weight) || weight <= 0) {
        document.getElementById("weightError").textContent = "น้ำหนักต้องเป็นค่าบวก";
        isValid = false;
    }

    // Validate ส่วนสูง
    if (isNaN(height) || height <= 0) {
        document.getElementById("heightError").textContent = "ส่วนสูงต้องเป็นค่าบวก";
        isValid = false;
    }

    // Validate โรคประจำตัว
    if (hasDisease && diseaseDetail.length === 0) {
        document.getElementById("diseaseDetailError").textContent = "กรุณากรอกรายละเอียดโรคประจำตัว";
        isValid = false;
    }

    if (isValid) {
        const bmi = weight / ((height / 100) ** 2);
        let category = "";
        if (bmi < 18.5) category = "น้ำหนักน้อย";
        else if (bmi < 24.9) category = "ปกติ";
        else if (bmi < 29.9) category = "น้ำหนักเกิน";
        else category = "อ้วน";

        showModal(`BMI ของคุณคือ ${bmi.toFixed(2)} (${category})`);
    }
});

function showModal(message) {
    document.getElementById("modalMessage").textContent = message;
    document.getElementById("resultModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("resultModal").style.display = "none";
}
