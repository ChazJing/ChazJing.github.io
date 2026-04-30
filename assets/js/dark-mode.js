document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    
    // 从 localStorage 读取保存的设置
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        if (toggleBtn) toggleBtn.textContent = '黑夜模式：开';
    }
    
    // 点击切换
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
});
