// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // Loading Screen
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('fade-out');
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 2000);

    // Matrix Rain Background
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"#&_(),.;:?!\\|{}<>[]^~';
    const lettersArray = letters.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize) * fontSize;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px 'Share Tech Mono'`;

        for (let i = 0; i < drops.length; i++) {
            const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Typing Effect
    const typingText = document.querySelector('.typing-text');
    const typingCommand = document.querySelector('.typing-command');
    const texts = [
        "Ethical Hacker",
        "Bug Hunter",
        "Security Researcher",
        "CTF Player"
    ];
    const commands = [
        "nmap -sS -sV 192.168.1.1",
        "python exploit.py --target example.com",
        "john --wordlist=rockyou.txt hash.txt",
        "sqlmap -u 'http://test.com?id=1' --dbs"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isTypingCommand = false;
    let commandIndex = 0;

    function typeText() {
        const currentText = texts[textIndex];

        if (!isDeleting && charIndex <= currentText.length) {
            typingText.innerHTML = currentText.substring(0, charIndex) + '<span class="cursor">|</span>';
            charIndex++;
            setTimeout(typeText, 100);
        } else if (isDeleting && charIndex >= 0) {
            typingText.innerHTML = currentText.substring(0, charIndex) + '<span class="cursor">|</span>';
            charIndex--;
            setTimeout(typeText, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                textIndex = (textIndex + 1) % texts.length;
            }
            setTimeout(typeText, 1200);
        }
    }

    function typeCommand() {
        const currentCommand = commands[commandIndex];

        if (!isTypingCommand && charIndex <= currentCommand.length) {
            typingCommand.textContent = currentCommand.substring(0, charIndex);
            charIndex++;
            setTimeout(typeCommand, 50);
        } else if (isTypingCommand && charIndex >= 0) {
            typingCommand.textContent = currentCommand.substring(0, charIndex);
            charIndex--;
            setTimeout(typeCommand, 30);
        } else {
            isTypingCommand = !isTypingCommand;
            if (!isTypingCommand) {
                commandIndex = (commandIndex + 1) % commands.length;
            }
            setTimeout(typeCommand, 1500);
        }
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate skill bars on scroll
    function animateSkills() {
        const skills = document.querySelectorAll('.skill-progress');
        skills.forEach(skill => {
            const skillPosition = skill.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (skillPosition < screenPosition) {
                const width = skill.style.width;
                skill.style.width = '0%';
                setTimeout(() => {
                    skill.style.width = width;
                }, 300);
            }
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]').value;
            const message = this.querySelector('textarea').value;

            // Simple validation
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                alert('Message sent successfully! In a real website, this would send an email.');

                // Reset form
                this.reset();

                // Create a cool hacker-style message
                const terminalBody = document.querySelector('.terminal-body');
                const newMessage = document.createElement('p');
                newMessage.innerHTML = `<span class="prompt">$</span> echo "Message sent to Shafin!"`;
                terminalBody.appendChild(newMessage);
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Initialize everything
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Start animations
    setInterval(drawMatrix, 50);
    setTimeout(typeText, 1000);
    setTimeout(typeCommand, 2000);
    window.addEventListener('scroll', animateSkills);

    // Add some random hacker-like effects
    setInterval(() => {
        const randomElement = document.querySelectorAll('.hacker-text, .prompt')[Math.floor(Math.random() * 5)];
        if (randomElement) {
            randomElement.style.textShadow = `0 0 10px ${Math.random() > 0.5 ? '#00ff41' : '#ff003c'}`;
            setTimeout(() => {
                randomElement.style.textShadow = '';
            }, 300);
        }
    }, 2000);
});
