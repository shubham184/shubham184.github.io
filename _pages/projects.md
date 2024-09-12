---
layout: page
title: projects
permalink: /projects/
description: A growing collection of my data projects.
nav: true
nav_order: 3
mermaid: true
display_categories:
 [
Case-Studies Impacting Telecom Industry

 ]
horizontal: false
---

<!-- pages/projects.md -->
<div class="projects">
  {% if site.enable_project_categories and page.display_categories %}
    <!-- Display categorized projects -->
    <div class="accordion-container">
      {% for category in page.display_categories %}
        <div class="accordion-item">
          <button class="accordion-header" id="header-{{ category | slugify }}">
            <h2 class="category">
              {% case category %}
                {% when 'Data Integration' %}
                  <i class="fas fa-random category-icon"></i>
                {% when 'Data Governance & Metadata Management' %}
                  <i class="fas fa-tasks category-icon"></i>
                {% when 'Data Architecture & Engineering' %}
                  <i class="fas fa-sitemap category-icon"></i>
                {% when 'Analytics & Data Warehousing' %}
                  <i class="fas fa-chart-bar category-icon"></i>
                {% when 'Messaging & Queuing Systems' %}
                  <i class="fas fa-envelope category-icon"></i>
                {% when 'Tools & Technology' %}
                  <i class="fas fa-tools category-icon"></i>
                {% else %}
                  <i class="fas fa-folder category-icon"></i>
              {% endcase %}
              {{ category }}
            </h2>
            <span class="accordion-icon"></span>
          </button>
          <div class="accordion-content" id="content-{{ category | slugify }}">
            {% assign categorized_projects = site.projects | where: "category", category %}
            {% assign sorted_projects = categorized_projects | sort: "importance" %}
            <div class="project-list">
              {% for project in sorted_projects %}
                <a href="{{ project.url | relative_url }}" class="project-card">
                  {% if project.img %}
                    <div class="project-image">
                      <img src="{{ project.img | relative_url }}" alt="{{ project.title }}" />
                    </div>
                  {% endif %}
                  <div class="project-info">
                    <h3 class="project-title">{{ project.title }}</h3>
                    {% if project.description %}
                      <p class="project-description">{{ project.description }}</p>
                    {% endif %}
                  </div>
                </a>
              {% endfor %}
            </div>
          </div>
        </div>
      {% endfor %}
    </div>
  {% else %}
    <!-- Display projects without categories -->
    {% assign sorted_projects = site.projects | sort: "importance" %}
    <div class="project-list">
      {% for project in sorted_projects %}
        <a href="{{ project.url | relative_url }}" class="project-card">
          {% if project.img %}
            <div class="project-image">
              <img src="{{ project.img | relative_url }}" alt="{{ project.title }}" />
            </div>
          {% endif %}
          <div class="project-info">
            <h3 class="project-title">{{ project.title }}</h3>
            {% if project.description %}
              <p class="project-description">{{ project.description }}</p>
            {% endif %}
          </div>
        </a>
      {% endfor %}
    </div>
  {% endif %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
</script>

<style>
  .accordion-container {
    width: 100%;
  }
  
  .accordion-item {
    margin-bottom: 1rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 0.25rem;
    overflow: hidden;
  }
  
  .accordion-header {
    background-color: var(--global-code-bg-color);
    color: var(--global-text-color);
    cursor: pointer;
    padding: 1rem;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: all 0.3s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .accordion-header:hover,
  .accordion-header.active {
    background-color: var(--global-theme-color);
    color: var(--global-bg-color);
  }
  
  .accordion-header h2 {
    margin: 0;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    transition: color 0.3s ease;
  }
  
  .category-icon {
    margin-right: 0.5rem;
    font-size: 1.1em;
    transition: color 0.3s ease;
  }
  
  .accordion-header:hover h2,
  .accordion-header:hover .category-icon,
  .accordion-header.active h2,
  .accordion-header.active .category-icon {
    color: var(--global-bg-color);
  }
  
  .accordion-icon {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid currentColor;
    border-radius: 50%;
    position: relative;
    transition: transform 0.3s ease, border-color 0.3s ease;
  }
  
  .accordion-icon::before,
  .accordion-icon::after {
    content: "";
    position: absolute;
    background-color: currentColor;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .accordion-icon::before {
    width: 0.75rem;
    height: 2px;
  }
  
  .accordion-icon::after {
    width: 2px;
    height: 0.75rem;
    transition: transform 0.3s ease;
  }
  
  .accordion-header.active .accordion-icon {
    transform: rotate(180deg);
  }
  
  .accordion-content {
    background-color: var(--global-bg-color);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
  }
  
  .project-list {
    padding: 1rem;
  }
  
  .project-card {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--global-divider-color);
    text-decoration: none;
    color: inherit;
    transition: background-color 0.3s ease;
  }
  
  .project-card:hover {
    background-color: var(--global-code-bg-color);
  }
  
  .project-card:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  .project-image {
    flex: 0 0 100px;
    margin-right: 1rem;
  }
  
  .project-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .project-info {
    flex: 1;
  }
  
  .project-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: var(--global-theme-color);
  }
  
  .project-description {
    margin: 0;
    font-size: 0.9rem;
    color: var(--global-text-color-light);
  }
</style>
