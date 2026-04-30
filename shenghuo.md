---
layout: default
title: 生活记录
---

<div class="posts-container">
    <h1 class="page-title">生活记录</h1>
    
    {% for post in site.categories["生活记录"] %}
    <article class="post-item">
        <h3 class="post-title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <div class="post-meta">
            <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
        </div>
        <p class="post-excerpt">{{ post.excerpt }}</p>
    </article>
    {% endfor %}
    
    {% if site.categories["生活记录"].size == 0 %}
    <p style="color: #888;">暂无此分类的帖子，敬请期待！</p>
    {% endif %}
</div>
