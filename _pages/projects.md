---
layout: page
title: projects
permalink: /projects/
description: A growing collection of my data projects.
nav: true
nav_order: 3
display_categories:
 [
Data Integration,
Data Governance & Metadata Management,
Data Architecture & Engineering,
Analytics & Data Warehousing,
Messaging & Queuing Systems,
Tools & Technology,
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
                <div class="project-card">
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
                </div>
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
        <div class="project-card">
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
        </div>
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
        if (content.style.height) {
          content.style.height = null;
        } else {
          content.style.height = content.scrollHeight + "px";
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
    background-color: var(--global-bg-color);
    color: var(--global-text-color);
    cursor: pointer;
    padding: 1rem;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .accordion-header:hover {
    background-color: var(--global-hover-color);
  }
  
  .accordion-header h2 {
    margin: 0;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }
  
  .category-icon {
    margin-right: 0.5rem;
    font-size: 1.1em;
  }
  
  .accordion-icon {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid var(--global-text-color);
    border-radius: 50%;
    position: relative;
  }
  
  .accordion-icon::before,
  .accordion-icon::after {
    content: "";
    position: absolute;
    background-color: var(--global-text-color);
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
    transition: 0.4s;
  }
  
  .accordion-header.active .accordion-icon::after {
    transform: translate(-50%, -50%) rotate(90deg);
    opacity: 0;
  }
  
  .accordion-content {
    background-color: var(--global-bg-color);
    overflow: hidden;
    transition: height 0.2s ease-out;
    height: 0;
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
  }
  
  .project-description {
    margin: 0;
    font-size: 0.9rem;
    color: var(--global-text-color-light);
  }
</style>
