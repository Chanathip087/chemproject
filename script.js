function calculateGas() {
    const P = parseFloat(document.getElementById('pInput').value);
    const V = parseFloat(document.getElementById('vInput').value);
    const n = parseFloat(document.getElementById('nInput').value);
    const T = parseFloat(document.getElementById('tInput').value);
    const R = 0.0821;
    let resText = "";

    // ตรวจสอบว่าช่องไหนว่าง (NaN) และคำนวณค่าจากสูตร PV = nRT
    if (!P && V && n && T) {
        resText = "ความดัน (P) = " + ((n * R * T) / V).toFixed(4) + " atm";
    } else if (P && !V && n && T) {
        resText = "ปริมาตร (V) = " + ((n * R * T) / P).toFixed(4) + " L";
    } else if (P && V && !n && T) {
        resText = "จำนวนโมล (n) = " + ((P * V) / (R * T)).toFixed(4) + " mol";
    } else if (P && V && n && !T) {
        resText = "อุณหภูมิ (T) = " + ((P * V) / (n * R)).toFixed(4) + " K";
    } else {
        resText = "กรุณากรอกข้อมูลให้ครบ 3 ค่าเพื่อหาค่าที่เหลือ";
    }

    document.getElementById('result').innerText = resText;
}