---
layout: default
section: literature
title: 攻略与经验
---

<div class="posts-container">
    <h1 class="page-title">攻略与经验</h1>
    <p class="category-desc">一点点过来人的路罢了</p>
    
    {% for post in site.posts %}
    {% if post.categories contains '经验帖' %}
    <article class="post-item">
        <h3 class="post-title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <div class="post-meta">
            <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
        </div>
        <p class="post-excerpt"><a href="{{ post.url | relative_url }}">{{ post.excerpt | strip_html | truncate: 100 }}</a></p>
    </article>
    {% endif %}
    {% endfor %}
    
    {% assign has_posts = false %}
    {% for post in site.posts %}
        {% if post.categories contains '经验帖' %}
            {% assign has_posts = true %}
        {% endif %}
    {% endfor %}
    
    {% if has_posts == false %}
    <p style="color: #888;">这一页还在等待新的文字，敬请期待。</p>
    {% endif %}
</div>
