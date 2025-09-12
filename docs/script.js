document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os ícones do Lucide
    lucide.createIcons();

    // ===== Lógica da Navegação =====
    const nav = document.getElementById('navigation');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    // Efeito de scroll na navegação
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Toggle do menu mobile
    mobileMenuButton.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        mobileMenuButton.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        lucide.createIcons();
    });

    // Fecha o menu mobile ao clicar em um link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenuButton.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });

    // ===== Lógica do Tema (Claro/Escuro) =====
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Carrega o tema salvo no localStorage ou usa o padrão do sistema
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Define as variáveis de cor RGB para os gradientes e sombras
    function setRGBColors() {
        const styles = getComputedStyle(document.documentElement);
        const primary = styles.getPropertyValue('--primary').trim();
        const secondary = styles.getPropertyValue('--secondary').trim();
        const background = styles.getPropertyValue('--background').trim();
        
        document.documentElement.style.setProperty('--primary-rgb', hexToRgb(primary));
        document.documentElement.style.setProperty('--secondary-rgb', hexToRgb(secondary));
        document.documentElement.style.setProperty('--background-rgb', hexToRgb(background));
        document.documentElement.style.setProperty('--card-rgb', hexToRgb(styles.getPropertyValue('--card').trim()));
    }

    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length == 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length == 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        return `${+r},${+g},${+b}`;
    }

    setRGBColors(); // Define na carga inicial
    new MutationObserver(setRGBColors).observe(html, { attributes: true, attributeFilter: ['data-theme'] });


    // ===== Lógica do Formulário de Contato =====
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        const phoneNumber = "5512991015266";
        const text = `Olá, meu nome é ${name} (Email: ${email}) Assunto:${subject} Mensagem: ${message}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        
        window.open(whatsappUrl, "_blank");
    });
});
