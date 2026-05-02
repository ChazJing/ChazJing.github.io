document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const tocToggle = document.getElementById('toc-toggle');
    const tocWrapper = document.getElementById('toc-wrapper');
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        if (toggleBtn) toggleBtn.textContent = '黑夜模式：开';
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            if (isDark) {
                this.textContent = '黑夜模式：开';
                localStorage.setItem('darkMode', 'true');
            } else {
                this.textContent = '黑夜模式：关';
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    if (tocToggle && tocWrapper) {
        tocToggle.addEventListener('click', function() {
            tocWrapper.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!tocWrapper.contains(e.target) && !tocToggle.contains(e.target)) {
                tocWrapper.classList.remove('active');
            }
        });
    }
});
