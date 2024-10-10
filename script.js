// Initialize Netlify Identity
netlifyIdentity.init();

// Show registration form
document.getElementById('register').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    netlifyIdentity
        .signup({
            email: email,
            password: password
        })
        .then(user => {
            console.log("Registration successful:", user);
            document.getElementById('registration').style.display = 'none';
            document.getElementById('user-info').style.display = 'block';
            document.getElementById('welcome-message').innerText = `Welcome, ${user.user_metadata.full_name}!`;
        })
        .catch(error => {
            console.error("Registration error:", error);
        });
});

// Login button event listener
document.getElementById('login').addEventListener('click', function () {
    netlifyIdentity.open(); // Open the login modal
});

// Logout event listener
document.getElementById('logout').addEventListener('click', function () {
    netlifyIdentity.logout();
});

// Listen for login/logout events
netlifyIdentity.on("login", function (user) {
    console.log("User logged in:", user);
    document.getElementById('registration').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('welcome-message').innerText = `Welcome, ${user.user_metadata.full_name}!`;
});

netlifyIdentity.on("logout", function () {
    console.log("User logged out");
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('registration').style.display = 'block';
});
