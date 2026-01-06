function get_barcode(n, i, g) {
    var area = document.getElementById('res_area');
    area.innerHTML = ""; 

    var card_html = '<div class="card-box">' +
        '<div class="card-header">' +
        '<h3>جامعة أسيوط</h3>' +
        '<h4>كلية علوم الرياضة</h4>' +
        '</div>' +
        '<div id="canvas"></div>' +
        '<div class="card-info">' +
        '<p class="n-text">' + n + '</p>' +
        '<p class="d-text">مجموعة: ' + g + ' | كود: ' + i + '</p>' +
        '</div>' +
        '<div style="font-size:10px; color:#999; margin-top:10px;">معسكر 2026</div>' +
        '</div>';
        
    area.innerHTML = card_html;

    // رابط جيت هاب بتاعك
    var my_link = "https://nasser.github.io/camp/check.html?id=" + i;

    new QRCode(document.getElementById("canvas"), {
        text: my_link,
        width: 180,
        height: 180,
        colorDark : "#003366"
    });
}

function start_search() {
    var val = document.getElementById('search_in').value;
    var res_box = document.getElementById('res_area');
    res_box.innerHTML = "";

    // لو الخانة فاضية امسح النتائج
    if (val.trim() === "") return;

    // فحص: هل البيانات موجودة اصلاً؟
    if (typeof _data_provider === 'undefined') {
        res_box.innerHTML = "<p style='color:red'>خطأ: ملف الأسماء غير متصل!</p>";
        return;
    }

    var count = 0;
    _data_provider.forEach(function(item) {
        // البحث بالاسم (يتأكد ان الحروف مطابقة)
        if (item._n.indexOf(val) !== -1) {
            count++;
            var row = document.createElement('div');
            row.className = 's_row';
            row.innerHTML = '<span>' + item._n + '</span>' + 
                           '<button onclick="get_barcode(\''+item._n+'\', \''+item._id+'\', \''+item._g+'\')">عرض</button>';
            res_box.appendChild(row);
        }
    });

    if (count === 0 && val.length > 2) {
        res_box.innerHTML = "<p style='color:gray'>لم يتم العثور على الاسم</p>";
    }
}
