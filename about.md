---
layout: default
title: 关于我
---

<div class="about-container">
    <div class="about-section">
        <div class="profile-photo">
            <img src="{{ "/assets/images/photo.jpg" | relative_url }}" alt="我的照片">
        </div>
        
        <div class="profile-info">
            <h1>你好，我是 [你的名字]</h1>
            <p class="bio">[在这里写下你的简介，比如：我是xxx，喜欢探索新技术，喜欢分享学习心得...]</p>
            
            <div class="contact-info">
                <h2>联系方式</h2>
                <ul>
                    <li><strong>邮箱：</strong><a href="mailto:your.email@example.com">your.email@example.com</a></li>
                    <li><strong>GitHub：</strong><a href="https://github.com/{{ site.github_username }}" target="_blank">@{{ site.github_username }}</a></li>
                    <li><strong>微博：</strong><a href="#">@你的微博名</a></li>
                </ul>
            </div>
        </div>
    </div>
    
    <div class="about-content">
        <h2>关于这个网站</h2>
        <p>欢迎来到我的个人网站！我在这里分享我的学习经验和生活感悟。</p>
        
        <h3>网站内容分类</h3>
        <ul>
            <li><strong>技术分享</strong> - 关于编程和技术的学习笔记</li>
            <li><strong>生活感悟</strong> - 日常生活的思考和感悟</li>
            <li><strong>读书笔记</strong> - 读过的书籍总结</li>
        </ul>
    </div>
</div>
