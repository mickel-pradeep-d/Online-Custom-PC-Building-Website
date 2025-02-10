document.addEventListener("DOMContentLoaded", function () {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || {};
    const productContainer = document.querySelector("#product-container");

    // Function to Display Products
    function displayProducts(category) {
        productContainer.innerHTML = `<h2>${category}</h2>`;

        if (!storedProducts[category] || storedProducts[category].length === 0) {
            productContainer.innerHTML += "<p>No products available</p>";
            return;
        }

        storedProducts[category].forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product-box");
            productDiv.innerHTML = `
                <p><strong>${product.brand}</strong> - ${product.model}</p>
                <p>Price: \u20B9${product.price}</p>
                <button>Add to Cart</button>
            `;
            productContainer.appendChild(productDiv);
        });
    }

    // Category Button Click Event (For `mainpage.html`)
    document.querySelectorAll(".category-btn").forEach(button => {
        button.addEventListener("click", function () {
            const category = this.dataset.category;
            displayProducts(category);
        });
    });

    // User Registration
    if (document.querySelector("#register-form")) {
        document.querySelector("#register-form").addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.querySelector("#name").value;
            const username = document.querySelector("#username").value;
            const phone = document.querySelector("#phone").value;
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;

            if (localStorage.getItem(username)) {
                alert("Username already exists! Choose another.");
                return;
            }

            const user = { name, username, phone, email, password };
            localStorage.setItem(username, JSON.stringify(user));
            alert("Registration Successful! Please login.");
            window.location.href = "index.html";
        });
    }

    // User Login
    if (document.querySelector("#user-login-form")) {
        document.querySelector("#user-login-form").addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.querySelector("#login-username").value;
            const password = document.querySelector("#login-password").value;

            const user = JSON.parse(localStorage.getItem(username));

            if (user && user.password === password) {
                sessionStorage.setItem("loggedInUser", username);
                window.location.href = "mainpage.html"; // Redirect to shopping page
            } else {
                alert("Invalid Username or Password!");
            }
        });
    }

    // Admin Login (Static Credentials)
    if (document.querySelector("#admin-login-form")) {
        document.querySelector("#admin-login-form").addEventListener("submit", function (event) {
            event.preventDefault();
            const adminUsername = document.querySelector("#admin-username").value;
            const adminPassword = document.querySelector("#admin-password").value;

            if (adminUsername === "admin" && adminPassword === "admin123") {
                window.location.href = "admin.html"; // Redirect to Admin Panel
            } else {
                alert("Invalid Admin Credentials!");
            }
        });
    }

    // Admin - Add Products
    if (document.querySelector("#add-product-form")) {
        document.querySelectorAll(".category-btn").forEach(button => {
            button.addEventListener("click", function () {
                document.querySelector("#category").value = this.dataset.category;
                alert(`Selected Category: ${this.dataset.category}`);
            });
        });

        document.querySelector("#add-product-form").addEventListener("submit", function (event) {
            event.preventDefault();
            const category = document.querySelector("#category").value;
            const brand = document.querySelector("#brand").value;
            const model = document.querySelector("#model").value;
            const price = document.querySelector("#price").value;

            if (!category) {
                alert("Please select a category!");
                return;
            }

            if (!storedProducts[category]) storedProducts[category] = [];
            storedProducts[category].push({ brand, model, price });

            localStorage.setItem("products", JSON.stringify(storedProducts));
            alert("Product added successfully!");
            this.reset();
        });
    }

    // Display User Details in Dashboard
    if (document.querySelector("#user-name")) {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            window.location.href = "index.html";
        } else {
            const user = JSON.parse(localStorage.getItem(loggedInUser));
            document.querySelector("#user-name").textContent = user.name;
            document.querySelector("#user-username").textContent = user.username;
            document.querySelector("#user-phone").textContent = user.phone;
            document.querySelector("#user-email").textContent = user.email;
        }
    }

    // Logout Function
    if (document.querySelector("button[onclick='logout()']")) {
        document.querySelector("button[onclick='logout()']").addEventListener("click", function () {
            sessionStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        });
    }

    // Display Default Category on Main Page
    if (productContainer) {
        displayProducts("Monitors");
    }
});
