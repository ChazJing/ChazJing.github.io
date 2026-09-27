---
layout: default
title: 文学作品集
section: literature
permalink: /about
---

<div class="home-container literature-home">
    <section class="intro-section">
        <div class="profile-card">
            <div class="profile-photo">
                <img src="{{ "/assets/images/photo.jpg" | relative_url }}" alt="我的照片">
            </div>

            <div class="profile-info">
                <p class="collection-eyebrow">CHAZJING · 文字与生活</p>
                <h1>文学作品集</h1>
                <p class="collection-intro">欢迎来到我的小窝。在这里，记录走过的路，留住生活、回忆与偶然的心绪。</p>
                <p class="bio">喜欢用文字记录生活，公众号“Chaz Jing”时不时更新原创作品。网易云重度选手。｜<a href="https://web.chazjing.icu/" target="_blank">https://web.chazjing.icu/</a></p>

                <div class="contact-links">
                    <h3>联系方式</h3>
                    <ul>
                        <li>📧 邮箱：<a href="mailto:zhengshijing@zju.edu.cn">zhengshijing@zju.edu.cn</a></li>
                        <li>公众号：Chaz Jing<br><span>截至 2026 年 9 月底，已写下 65 篇原创。</span><img src="{{ '/assets/images/wechat-qr.webp' | relative_url }}" alt="公众号 Chaz Jing 二维码" width="160" height="160" loading="lazy" style="display:block;width:160px;height:auto;max-width:100%;margin-top:12px;background:#fff;"></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="categories-section">
        <h2>按分类阅读</h2>
        <p class="collection-note">攻略与经验、生活与回忆，还有一些随感和笑容。</p>
        <div class="categories-grid">
            <a href="{{ "/jingyan" | relative_url }}" class="category-card">
                <h3>攻略与经验</h3>
                <p class="collection-note">攻略与经验 · 一点点过来人的路</p>
                <span class="post-count">{% if site.categories["经验帖"] %}{{ site.categories["经验帖"].size }}{% else %}0{% endif %} 篇作品</span>
            </a>
            <a href="{{ "/shenghuo" | relative_url }}" class="category-card">
                <h3>生活记录</h3>
                <p class="collection-note">当下即所有</p>
                <span class="post-count">{% if site.categories["生活记录"] %}{{ site.categories["生活记录"].size }}{% else %}0{% endif %} 篇作品</span>
            </a>
            <a href="{{ "/huiyi" | relative_url }}" class="category-card">
                <h3>回忆</h3>
                <p class="collection-note">记忆即为永恒</p>
                <span class="post-count">{% if site.categories["回忆"] %}{{ site.categories["回忆"].size }}{% else %}0{% endif %} 篇作品</span>
            </a>
            <a href="{{ "/suigan" | relative_url }}" class="category-card">
                <h3>随感</h3>
                <p class="collection-note">很喜欢碎碎念</p>
                <span class="post-count">{% if site.categories["随感"] %}{{ site.categories["随感"].size }}{% else %}0{% endif %} 篇作品</span>
            </a>
            <a href="{{ "/xiaoyixiao" | relative_url }}" class="category-card">
                <h3>笑一笑</h3>
                <p class="collection-note">留下一些笑容片段</p>
                <span class="post-count">{% if site.categories["笑一笑"] %}{{ site.categories["笑一笑"].size }}{% else %}0{% endif %} 篇作品</span>
            </a>
        </div>
    </section>

    <section class="recent-posts">
        <h2>最近写下</h2>
        <div class="posts-grid">
            {% for post in site.posts limit:6 %}
            <article class="post-card">
                <h3 class="post-title">
                    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                </h3>
                <div class="post-meta">
                    <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
                    {% if post.categories %}
                    <span class="post-categories">
                        {% for category in post.categories %}
                        {% case category %}
                        {% when "经验帖" %}
                        <a href="{{ site.baseurl }}/jingyan">{{ category }}</a>
                        {% when "生活记录" %}
                        <a href="{{ site.baseurl }}/shenghuo">{{ category }}</a>
                        {% when "回忆" %}
                        <a href="{{ site.baseurl }}/huiyi">{{ category }}</a>
                        {% when "随感" %}
                        <a href="{{ site.baseurl }}/suigan">{{ category }}</a>
                        {% when "笑一笑" %}
                        <a href="{{ site.baseurl }}/xiaoyixiao">{{ category }}</a>
                        {% else %}
                        {{ category }}
                        {% endcase %}
                        {% endfor %}
                    </span>
                    {% endif %}
                </div>
                <p class="post-excerpt"><a href="{{ post.url | relative_url }}">{{ post.excerpt | strip_html | truncate: 120 }}</a></p>
            </article>
            {% endfor %}
        </div>

        <div class="view-all">
            <a href="{{ "/posts" | relative_url }}" class="btn">浏览全部作品 →</a>
        </div>
    </section>
</div>
