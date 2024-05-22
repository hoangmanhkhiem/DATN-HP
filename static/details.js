$(document).ready(function () {
    $('.serviceColumn').hide(); // Ẩn tất cả các cột service ban đầu
    $('.service-checkbox').change(function () {
        var service = $(this).val(); // Lấy giá trị của checkbox đã thay đổi
        if (this.checked) {
            $('.' + service + 'Column').show(); // Hiển thị cột tương ứng nếu checkbox được chọn
        } else {
            $('.' + service + 'Column').hide(); // Ẩn cột tương ứng nếu checkbox không được chọn
        }
    });
});

function loadIP_Search() {
    let range_ip = document.getElementById("ipRangeInput").value
    var tableBody = document.getElementById("tableBody");
    if (tableBody.innerHTML !== "") {
        tableBody.innerHTML = "";
    }
    var range = range_ip.split("-");
    var start_ip = range[0];
    var end_ip = range[1];
    var start_ip_arr = start_ip.split(".");
    var end_ip_arr = end_ip.split(".");
    var start_ip_num = parseInt(start_ip_arr[3]);
    var end_ip_num = parseInt(end_ip_arr[3]);
    console.log("Start IP: " + start_ip_num);
    console.log("End IP: " + end_ip_num);
    for (let i = 1; i <= 3; i++) {
        fetch(`src/data/40${i}.json`)
            .then(response => response.json())
            .then(data => {
                for (let j = 0; j < data.length; j++) {
                    let ip_arr = data[j].ip;
                    console.log("IP: " + ip_arr);
                    let _ip_arr = ip_arr.split(".");
                    let ip_num = parseInt(_ip_arr[3]);
                    console.log("Checking IP: " + ip_num);
                    if (ip_num >= start_ip_num && ip_num <= end_ip_num) {
                        console.log("IP " + ip_num + " is in range. Adding to computerData.");
                        var row = document.createElement("tr");
                        row.classList.add("highlight-row");

                        row.innerHTML = `
                        <td>${data[j].id}</td>
                        <td>${data[j].status}</td>
                        <td>${data[j].room}</td>
                        <td>${data[j].name}</td>
                        <td>${data[j].ip}</td>                 
                        <td class="serviceColumn cpuColumn"> ${data[j].cpu}</td>
                        <td class="serviceColumn memoryColumn">${data[j].memory}</td>
                        <td class="serviceColumn diskColumn">${data[j].disk}</td>
                        <td class="serviceColumn networkColumn">${data[j].network}</td>
                    `;
                        $(document).ready(function () {
                            $('.serviceColumn').hide(); // Ẩn tất cả các cột service ban đầu
                            $('.service-checkbox').change(function () {
                                var service = $(this).val(); // Lấy giá trị của checkbox đã thay đổi
                                if (this.checked) {
                                    $('.' + service + 'Column').show(); // Hiển thị cột tương ứng nếu checkbox được chọn
                                } else {
                                    $('.' + service + 'Column').hide(); // Ẩn cột tương ứng nếu checkbox không được chọn
                                }
                            });
                        });

                        tableBody.appendChild(row);
                    }
                }
            });
    }
}

async function run() {
    event.preventDefault();
    loadIP_Search();
}