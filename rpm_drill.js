function calculate() {
    let D = parseFloat(document.getElementById("diameter").value);
    let toolType = document.getElementById("toolType").value;
    let material = document.getElementById("material").value;
    let Vc, fz;

    // 設定不同材料的切削速度 (Vc, m/min)
    let vcTable = {
        "steel": 25,        // 低碳鋼
        "stainless": 15,    // 不鏽鋼
        "aluminum": 200,    // 鋁合金
        "castIron": 50,     // 鑄鐵
        "brass": 100,       // 黃銅
        "plastic": 150      // 塑膠
    };

    // 設定不同材料的單齒進給量 (fz, mm/rev)
    let fzTable = {
        "hss": { "steel": 0.1, "stainless": 0.05, "aluminum": 0.2, "castIron": 0.1, "brass": 0.15, "plastic": 0.3 },
        "carbide": { "steel": 0.15, "stainless": 0.08, "aluminum": 0.3, "castIron": 0.15, "brass": 0.2, "plastic": 0.4 }
    };

    // 取得對應的 Vc 與 fz 值
    Vc = vcTable[material];
    fz = fzTable[toolType][material];

    // 計算主軸轉速 (S)
    let S = ((1000 * Vc) / (Math.PI * D))*0.8;

    // 計算進給率 (F)
    let Z = 2; // 鑽頭刃數固定為 2
    let F = (fz * Z * S)*0.8;

    // 顯示結果
    let result = `材料: ${document.getElementById("material").selectedOptions[0].text}\n`;
    result += `刀具: ${document.getElementById("toolType").selectedOptions[0].text}\n`;
    result += `鑽頭直徑: ${D} mm\n`;
    result += `切削速度 (Vc): ${Vc} m/min\n`;
    result += `單齒進給量 (fz): ${fz} mm/rev\n`;
    result += `主軸轉速 (S): ${S.toFixed(2)} RPM\n`;
    result += `進給速度 (F): ${F.toFixed(2)} mm/min\n`;

    document.getElementById("result").value = result;
}


