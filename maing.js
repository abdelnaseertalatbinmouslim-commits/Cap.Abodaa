Enterfunction get_barcode(n, i, g) {
    var area = document.getElementById('res_area');
    area.innerHTML = ""; 

    var card_html = '<div class="card-box">' +
        '<div class="card-header">' +
        '<h3>جامعة أسيوط</h3>' +
        '<h4>كلية التربية الرياضية</h4>' +
        '</div>' +
        '<div id="canvas"></div>' +
        '<div class="card-info">' +
        '<p class="n-text">' + n + '</p>' +
        '<p class="d-text">مجموعة: ' + g + ' | كود: ' + i + '</p>' +
        '</div>' +
        '<div class="card-footer">معسكر التدريب الطلابي 2026</div>' +
        '</div>' +
        '<p style="text-align:center; color:#666; font-size:12px;">(خد شاشة الكارنيه سكرين شوت)</p>';
        
    area.innerHTML = card_html;

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

    if (val.length < 3) return;

    _data_provider.forEach(function(item) {
        if (item._n.indexOf(val) !== -1) {
            var row = document.createElement('div');
            row.className = 's_row';
            row.innerHTML = '<span>' + item._n + '</span>' + 
                           '<button onclick="get_barcode(\''+item._n+'\', \''+item._id+'\', \''+item._g+'\')">عرض الكارنيه</button>';
            res_box.appendChild(row);
        }
    });
}
