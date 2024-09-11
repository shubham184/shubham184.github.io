---
layout: page
title: So, What Data Should You Manage as Master Data?
description: Understanding Master Data Management for telco
img: assets/img/collibra-metadata.jpg
importance: 1
category: Data Governance & Metadata Management
---

In a telecom company, deciding which data should be managed as **master data** depends on several key criteria. Master data refers to the **core business data** that is frequently reused, complex, and critical for consistent and accurate operations across systems. Here's how you can define which data qualifies as **master data** in the telecom industry:

### **1. Data Reuse**

Master data should be **shared across multiple systems**. In telecoms, data such as **customer information** is used across several platforms (e.g., billing systems, CRM, network operations, and marketing systems). This ensures that all departments have access to the same accurate and consistent data.

**Example:**

- **Customer Master Data**: A customer's name, address, and contact information need to be consistent across the CRM, billing systems, and customer support to avoid issues such as incorrect billing or marketing outreach to outdated contact details.

---

### **2. Data Complexity**

Master data tends to be more **complex** than other types of data, often involving multiple attributes, relationships, and hierarchies. In telecoms, managing product catalogs that include various service plans with different pricing models and features can be highly complex.

**Example:**

- **Product Master Data**: Telecoms offer a range of services like mobile plans, internet packages, and value-added services. Each product has variations, such as pricing, data limits, and regional availability. Managing this product data ensures consistency across sales, marketing, and service delivery.

---

### **3. Data Volatility**

Master data is typically **less volatile** than transactional data but still subject to occasional updates. In telecoms, customer data and product catalogs don't change frequently but require updates when there are changes such as address modifications or new product launches.

**Example:**

- **Customer Plans and Services**: If a customer changes their mobile or internet plan, this update must reflect across billing, CRM, and customer service systems. Ensuring these changes are made in master data avoids inconsistencies across systems.

---

### **4. Data Cardinality**

Master data generally involves **large sets** of entities. As the number of data entities increases, the need for master data management becomes critical.

**Example:**

- **Network Location Data**: Telecom companies manage thousands of cell towers and network infrastructure points. **Location master data** is necessary to manage these critical assets effectively for service delivery and operational management.

---

### **5. Data Lifecycle (CRUD Cycle)**

Master data has a well-defined **create, read, update, and delete (CRUD)** lifecycle. In telecoms, customer profiles and product offerings go through these lifecycle processes and need to be governed centrally.

**Example:**

- **Device Master Data**: Telecoms manage a large inventory of devices (e.g., phones, routers). Device master data includes attributes such as model, brand, and compatibility. Managing this data ensures technical support, sales, and distribution teams have up-to-date information.

---

### **6. Data Value**

The more **valuable** the data is to the business, the more likely it is to be managed as master data. In telecoms, data related to **high-value customers**, critical network assets, and essential services are particularly important.

**Example:**

- **High-Value Customer Data**: Telecom companies often identify and segment high-value customers. Ensuring **VIP customers** have accurate and well-maintained data enables the company to offer personalized services and marketing, improving customer retention.

---

### **7. Behavior Data** (Important Addition)

Behavior data refers to how master data **interacts with transactional data**. In telecoms, this involves relationships between entities (customers, products, locations) and their transactional interactions (calls, data usage, billing).

**Example:**

- **Customer-Product Interaction**: A customer subscribes to a mobile data plan. The **customer** (master data) and the **mobile plan** (product master data) are linked by interactions such as data usage or calls. These interactions are recorded as **transactional data** and provide insight into customer behavior, enabling better personalization and service improvements.

---

### **Conclusion:**

In the **telecom industry**, master data typically includes:

- **Customer Data**: Core customer details used across billing, CRM, and service platforms.
- **Product Data**: Details about service plans, pricing, and features.
- **Location Data**: Information about network infrastructure, towers, and service areas.
- **Device Data**: Inventory and specifications of telecom devices like phones, modems, and routers.
- **Employee Data**: Information on staff interactions with customers and internal resources.
- **Behavior Data**: Relationships between customer actions, service usage, and products, helping to link master data to transactional events.

Master Data Management (MDM) helps telecom companies ensure **data consistency**, **improve customer service**, and **optimize operational efficiency** by centralizing and governing these critical data domains.

---

### **Master Data Horror Story: A Telecom Billing Disaster**

**Scenario:**

At **TeleCo**, a large telecom provider, customer data is managed across various systems, including billing, customer service, and network management. Over the years, due to multiple system upgrades and acquisitions, customer master data became fragmented, leading to a serious oversight.

**The Problem:**

**John Smith**, a long-time customer of TeleCo, moves from **123 Main St.** to **456 Elm St.** and updates his billing address through the company’s self-service portal. However, due to fragmented systems, his new address is only updated in the billing system, while other systems like customer support and marketing still hold his old address.

- **Billing System**: Address is updated to **456 Elm St.** (correct).
- **Marketing System**: Still using **123 Main St.** (incorrect).
- **Customer Service System**: Also retains **123 Main St.** (incorrect).

When TeleCo sends a promotional offer, it is sent to **123 Main St.**, John’s old address. The new tenant at that address ignores the mail, and John never receives the offer. A month later, TeleCo also sends his bill to **123 Main St.**, and since the new resident doesn’t forward mail, John misses the payment due date.

- John calls customer service, and they mistakenly verify his address as **123 Main St.**, due to their outdated system. Frustrated, John leaves the call unresolved.

**The Fallout:**

A few weeks later, John receives a **late payment notice** at his correct address, **456 Elm St.**, along with a **service suspension warning**. Furious about the mix-up, John contacts TeleCo again. The service agent once again reads out the incorrect address, **123 Main St.**, from their customer service system. After several back-and-forth calls and no resolution, John decides to **switch to a competitor**, leaving TeleCo after 10 years of loyalty.

To make matters worse, John’s case wasn’t unique. An internal audit later revealed that **10,000 customers** were affected by similar address inconsistencies, leading to **lost bills, customer churn, and negative reviews**. TeleCo faced **millions in revenue loss** due to uncollected payments, and its reputation suffered severe damage from frustrated customers.

**Root Cause:**

- **Fragmented Master Data**: John’s address change wasn’t synchronized across all systems, leading to conflicting data across departments.
- **No Single Source of Truth**: TeleCo didn’t have a **Master Data Management (MDM)** system in place, resulting in multiple versions of customer information in different systems.

**The Lesson:**
A centralized **MDM solution** would have ensured that John’s address was updated across **all systems** in real-time, preventing the billing disaster and customer frustration. By failing to maintain a unified master data system, TeleCo not only lost a loyal customer but also faced significant financial and reputational damage.

---

### **Key Takeaway:**

This horror story underscores the critical need for **consistent, unified master data** in a telecom company. Without proper **Master Data Management (MDM)**, even a simple change like an address update can lead to **operational breakdowns**, **customer churn**, and **revenue loss**—all of which can be avoided with the right MDM practices in place.
