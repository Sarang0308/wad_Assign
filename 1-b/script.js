const API_URL = "https://67a4fb0dc0ac39787a1d1ed8.mockapi.io/users"; // Replace with your MockAPI URL

document.addEventListener("DOMContentLoaded", fetchUsers);

function sendAJAX(method, url, data, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(JSON.parse(xhr.responseText));
            } else {
                alert("Error: " + xhr.responseText);
            }
        }
    };

    xhr.send(data ? JSON.stringify(data) : null);
}

function signUp() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    sendAJAX("POST", API_URL, { username, password }, function (response) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(response);
        localStorage.setItem("users", JSON.stringify(users));
        alert("User registered successfully!");
        fetchUsers();
    });
}

function signIn() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert("Login successful!");
    } else {
        alert("Invalid Username or Password.");
    }
}

function fetchUsers() {
    sendAJAX("GET", API_URL, null, function (users) {
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("userList").innerHTML =
            users.map(user => `<li>${user.username}</li>`).join("");
    });
}
