document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already authenticated and redirect to dashboard
    fetch('/api/check-auth')
        .then(res => res.json())
        .then(data => {
            if (data.isAuthenticated) {
                window.location.href = '/dashboard';
            }
        })
        .catch(err => console.error('Auth check error:', err));

    const loginCard = document.getElementById('login-card');
    const registerCard = document.getElementById('register-card');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');

    // UI Switching logic
    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginCard.style.display = 'none';
        registerCard.style.display = 'block';
        registerError.style.display = 'none';
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerCard.style.display = 'none';
        loginCard.style.display = 'block';
        loginError.style.display = 'none';
    });

    // Login Form Submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const btn = loginForm.querySelector('button');
        btn.textContent = 'Logging in...';
        btn.disabled = true;

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                window.location.href = '/dashboard';
            } else {
                loginError.textContent = data.error || 'Login failed';
                loginError.style.display = 'block';
                btn.textContent = 'Log In';
                btn.disabled = false;
            }
        } catch (error) {
            loginError.textContent = 'An error occurred. Please try again.';
            loginError.style.display = 'block';
            btn.textContent = 'Log In';
            btn.disabled = false;
        }
    });

    // Register Form Submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        const btn = registerForm.querySelector('button');

        if (password !== confirmPassword) {
            registerError.textContent = 'Passwords do not match';
            registerError.style.display = 'block';
            return;
        }

        btn.textContent = 'Signing up...';
        btn.disabled = true;

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                // Switch to login view on successful registration
                alert('Registration successful! Please log in.');
                registerForm.reset();
                registerCard.style.display = 'none';
                loginCard.style.display = 'block';
                loginError.style.display = 'none';
                btn.textContent = 'Sign Up';
                btn.disabled = false;
            } else {
                registerError.textContent = data.error || 'Registration failed';
                registerError.style.display = 'block';
                btn.textContent = 'Sign Up';
                btn.disabled = false;
            }
        } catch (error) {
            registerError.textContent = 'An error occurred. Please try again.';
            registerError.style.display = 'block';
            btn.textContent = 'Sign Up';
            btn.disabled = false;
        }
    });
});
