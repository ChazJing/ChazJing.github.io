---
layout: default
title: 帖子列表
---

<div class="posts-container">
    <h1 class="page-title">所有帖子</h1>
    
    {% for category in site.categories %}
    <section class="category-section">
        <h2 class="category-title" id="{{ category[0] }}">{{ category[0] }}</h2>
        <div class="posts-list">
            {% for post in category[1] %}
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
        </div>
    </section>
    {% endfor %}
</div>
