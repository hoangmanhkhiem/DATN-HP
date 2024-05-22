var data_arr = [];

let osData = {};
let ramData = {};
let diskData = {};

async function run() {
    event.preventDefault();
    loadIP_Search();
}


function loadIP_Search() {
    let range_ip = document.getElementById("ipRangeInput").value;
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
                function renderHtmlForRowTools(id_computer, room, type, index) {
                    let tempHtml = [
                        "<button onclick='update(" + id_computer + ", " + room + " , " + index + ")'><i class='fas fa-download'></i></button>",
                        "<button onclick='stop(" + id_computer + ", " + room + " , " + index + ")'><i class='fas fa-download'></i></button>",
                        "<button onclick='restart(" + id_computer + ", " + room + " , " + index + ")'><i class='fas fa-download'></i></button>",
                    ]
                    return tempHtml[type];
                }

                for (let j = 0; j < data.length; j++) {
                    data_arr.push(data[j]);
                    let ip_arr = data[j].ip;
                    console.log("IP: " + ip_arr);
                    let _ip_arr = ip_arr.split(".");
                    let ip_num = parseInt(_ip_arr[3]);
                    console.log("Checking IP: " + ip_num);
                    if (ip_num >= start_ip_num && ip_num <= end_ip_num) {
                        const row = document.createElement('tr');
                        row.classList.add('highlight-row');

                        row.innerHTML = `
                            <td>${data[j].id}</td>
                            <td>${data[j].name}</td>
                            <td>${data[j].ip}</td>
                            <td>${data[j].room}</td>
                            <td>${data[j].disk}</td>
                            <td>${renderHtmlForRowTools(data[j].id, data[j].room, 2, 0)}</td> 
                            <td>${renderHtmlForRowTools(data[j].id, data[j].room, 1, 0)}</td> 
                            <td>${renderHtmlForRowTools(data[j].id, data[j].room, 0, 0)}</td>
                            `;

                        tableBody.appendChild(row);
                    }

                }
            });

    }
}

function stop(id_computer, room, index) {
    event.preventDefault();
    fetch("src/remote/stop.py", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id_computer,
            "room": room,
        })
    })
        .then(response => {
            return response.text()
        })
        .then(data => {
            console.log(data)
            if (data === "SC") {
                alert("Tắt thành công " + " cho máy " + id_computer)
            } else {
                alert("Tắt thất bại " + " cho máy " + id_computer)
            }
        })
}

function update(id_computer, room, index) {
    event.preventDefault();
    fetch("src/remote/update.py", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id_computer,
            "room": room,
        })
    })
        .then(response => {
            return response.text()
        })
        .then(data => {
            console.log(data)
            if (data === "SC") {
                alert("Cập nhật thành công " + " cho máy " + id_computer)
            } else {
                alert("Cập nhật thất bại " + " cho máy " + id_computer)
            }
        })
}

function restart(id_computer, room, index) {
    event.preventDefault();
    fetch("src/remote/restart.py", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id_computer,
            "room": room,
        })
    })
        .then(response => {
            return response.text()
        })
        .then(data => {
            console.log(data)
            if (data === "SC") {
                alert("Khởi động thành công " + " cho máy " + id_computer)
            } else {
                alert("Khởi động thất bại " + " cho máy " + id_computer)
            }
        })
}
