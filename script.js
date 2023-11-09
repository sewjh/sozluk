const ui = new UI();
let dict = [];

if (localStorage.getItem("dict") !== null) { // verilerin tarayıcı hafızasında saklanmasını saglamak
    dict = JSON.parse(localStorage.getItem("dict"));
}

function displayDict() {
    ui.keyList.innerHTML = "";
    let tag = ``;
    for (let d of dict) {
        tag = `<abbr class="card" onclick="changeValue(this, '${d.key}')" title="${d.value}"><span class="key">${d.key}</span><div class="icon"><i class="fa-solid fa-key"></i></div></abbr>`;
        ui.keyList.insertAdjacentHTML("beforeend", tag);
    }
}

displayDict();

ui.textboxAdd.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        ui.addBtn.click();
    }
})

ui.removeTxt.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        ui.removeBtn.click();
    }
})

ui.addBtn.addEventListener("click", function() {
    let txtValue = ui.addValueTxt.value;
    let txtKey = ui.addKeyTxt.value;
    txtKey = txtKey[0].toUpperCase() + txtKey.slice(1);
    txtValue = txtValue[0].toUpperCase() + txtValue.slice(1);
    if (txtValue.trim() == "" || txtKey.trim() == "") {
        alert("Kutucuklar boş olamaz!");
    } else if (dict.find(d => d.key == txtKey) != undefined) {
        alert ("Eklemeye çalıştığınız kelime zaten sözlükte mevcut.");
    } else { 
        dict.push({key: txtKey, value: txtValue});
        localStorage.setItem("dict", JSON.stringify(dict)); // tarayıcı hafızasını guncellemek
        displayDict();
        console.log(dict);
        ui.addKeyTxt.value = "";
        ui.addValueTxt.value = "";
    }
})

ui.removeBtn.addEventListener("click", function() {
    let txtKey = ui.removeTxt.value;
    txtKey = txtKey[0].toUpperCase() + txtKey.slice(1);
    if (txtKey.trim() == "") {
        alert("Kutucuk boş olamaz!");
    } else if (dict.find(d => d.key == txtKey) == undefined) {
        alert("Silmeye çalıştığınız kelime sözlükte mevcut değildir.");
    } else {
        for (let d in dict) {
            if (dict[d].key == txtKey) {
                dict.splice(d,1);
                localStorage.setItem("dict", JSON.stringify(dict));
                displayDict();
                console.log(dict);
                ui.removeTxt.value = "";
            }
        }
    }
})

ui.clearBtn.addEventListener("click", function() {
    dict.splice(0, dict.length);
    localStorage.setItem("dict", JSON.stringify(dict));
    displayDict();
})

function changeValue(selected, dct) {
    let selectedDict;
    for (let d of dict) {
        if (d.key == dct) {
            selectedDict = d;
        }
    }
    if (selected.textContent == selectedDict.key) {
        selected.querySelector("span").textContent = selectedDict.value;
        selected.querySelector(".icon").innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    } else if (selected.textContent == selectedDict.value) {
        selected.querySelector("span").textContent = selectedDict.key;
        selected.querySelector(".icon").innerHTML = '<i class="fa-solid fa-key"></i>';
    }
}