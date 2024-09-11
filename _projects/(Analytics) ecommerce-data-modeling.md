---
layout: page
title: Data Modeling for E-commerce - Reducing Redundancy and Improving Customer Insights
description: A comprehensive overhaul of an e-commerce platform's data model, resulting in 40% reduced data redundancy and 25% improved customer segmentation accuracy.
img: assets/img/ecommerce-data-model.jpg
importance: 1
category: Analytics & Data Warehousing
---

## Project Overview

In this project, I led the redesign of the data model for a rapidly growing e-commerce platform. The existing model was struggling with data redundancy, slow query performance, and limited capabilities for customer segmentation. Our goal was to create a more efficient, scalable data model that would reduce redundancy, improve query performance, and enable more sophisticated customer insights.

## My Role

As the lead data engineer on this project, my responsibilities included:

1. Analyzing the existing data model and identifying areas for improvement
2. Designing the new data model, focusing on normalization and efficiency
3. Collaborating with stakeholders to ensure the new model met business requirements
4. Implementing the new data model and migrating existing data
5. Optimizing queries and creating new views for improved customer segmentation

## Implementation Details

### Architecture

To visualize the transformation of our data architecture, I've created before and after diagrams using Mermaid.js:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <div id="architecture-diagram"></div>
    </div>
</div>
<div class="caption">
    Before and After: E-commerce Data Model Architecture
</div>

### Data Modeling Techniques and Best Practices

1. **Normalization**: We applied Third Normal Form (3NF) to reduce data redundancy and improve data integrity. This involved:

   - Eliminating repeating groups
   - Removing partial dependencies
   - Removing transitive dependencies

2. **Dimensional Modeling**: For our analytical needs, we implemented a star schema with fact and dimension tables. This allowed for faster query performance and easier report generation.

3. **Slowly Changing Dimensions (SCD)**: We implemented Type 2 SCD for customer and product dimensions to track historical changes, crucial for accurate time-based analysis.

4. **Indexing Strategy**: We carefully designed indexes to optimize query performance, including:

   - Clustered indexes on primary keys
   - Non-clustered indexes on frequently queried columns
   - Covering indexes for common query patterns

5. **Partitioning**: We implemented table partitioning on large fact tables (e.g., orders, page views) based on date ranges to improve query performance and data management.

### Before and After Schemas

Here's a simplified view of our main entities before and after the redesign:

**Before:**

```sql
CREATE TABLE Customers (
  CustomerID INT PRIMARY KEY,
  Name VARCHAR(100),
  Email VARCHAR(100),
  Address VARCHAR(200),
  PhoneNumber VARCHAR(20),
  PreferredCategories VARCHAR(500)
);

CREATE TABLE Products (
  ProductID INT PRIMARY KEY,
  Name VARCHAR(100),
  Description TEXT,
  Price DECIMAL(10, 2),
  Category VARCHAR(50),
  Inventory INT
);

CREATE TABLE Orders (
  OrderID INT PRIMARY KEY,
  CustomerID INT,
  OrderDate DATETIME,
  TotalAmount DECIMAL(10, 2),
  ShippingAddress VARCHAR(200),
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderItems (
  OrderItemID INT PRIMARY KEY,
  OrderID INT,
  ProductID INT,
  Quantity INT,
  Price DECIMAL(10, 2),
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
  FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
```

**After:**

```sql
CREATE TABLE Customers (
  CustomerID INT PRIMARY KEY,
  Name VARCHAR(100),
  Email VARCHAR(100),
  PhoneNumber VARCHAR(20)
);

CREATE TABLE CustomerAddresses (
  AddressID INT PRIMARY KEY,
  CustomerID INT,
  AddressType VARCHAR(20),
  Address VARCHAR(200),
  IsDefault BIT,
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Categories (
  CategoryID INT PRIMARY KEY,
  Name VARCHAR(50),
  ParentCategoryID INT,
  FOREIGN KEY (ParentCategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE Products (
  ProductID INT PRIMARY KEY,
  Name VARCHAR(100),
  Description TEXT,
  BasePrice DECIMAL(10, 2),
  CategoryID INT,
  FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE ProductInventory (
  ProductID INT,
  WarehouseID INT,
  Quantity INT,
  LastUpdated DATETIME,
  PRIMARY KEY (ProductID, WarehouseID),
  FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE Orders (
  OrderID INT PRIMARY KEY,
  CustomerID INT,
  OrderDate DATETIME,
  TotalAmount DECIMAL(10, 2),
  ShippingAddressID INT,
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
  FOREIGN KEY (ShippingAddressID) REFERENCES CustomerAddresses(AddressID)
);

CREATE TABLE OrderItems (
  OrderItemID INT PRIMARY KEY,
  OrderID INT,
  ProductID INT,
  Quantity INT,
  Price DECIMAL(10, 2),
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
  FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE CustomerPreferences (
  CustomerID INT,
  CategoryID INT,
  PreferenceScore DECIMAL(3, 2),
  LastUpdated DATETIME,
  PRIMARY KEY (CustomerID, CategoryID),
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
  FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
```

## Challenges and Solutions

1. **Data Migration**:

   - Challenge: Migrating existing data to the new model without downtime.
   - Solution: Implemented a staged migration process using temporary tables and carefully orchestrated data copy operations during off-peak hours.

2. **Query Performance**:

   - Challenge: Some complex queries were still slow after the initial redesign.
   - Solution: Implemented materialized views for common aggregate queries and fine-tuned indexing strategy based on query patterns.

3. **Historical Data Preservation**:

   - Challenge: Maintaining historical accuracy while improving the current model.
   - Solution: Implemented a comprehensive auditing system and used Slowly Changing Dimensions for key entities.

4. **Stakeholder Buy-in**:
   - Challenge: Convincing some stakeholders of the need for a complete redesign.
   - Solution: Created a detailed impact analysis showing projected improvements in query performance and data quality.

## Outcome

The redesigned data model yielded significant improvements:

1. **40% reduction in data redundancy**, leading to reduced storage costs and improved data consistency.
2. **25% improvement in customer segmentation accuracy**, enabling more targeted marketing campaigns.
3. **60% faster query performance** for common analytical queries, improving overall system responsiveness.
4. **30% increase in data model scalability**, better positioning the platform for future growth.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <canvas id="performance-chart"></canvas>
    </div>
</div>

## Conclusion

This project demonstrated the critical importance of proper data modeling in e-commerce platforms. By focusing on reducing redundancy and improving the structure of our data, we not only enhanced system performance but also unlocked new capabilities for customer insights. The new data model provides a solid foundation for future growth and advanced analytics initiatives, positioning the company for continued success in the competitive e-commerce landscape.

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="{{ '/assets/js/ecommerce-data-modeling/chart.js' | relative_url }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/8.13.10/mermaid.min.js"></script>
<script>
mermaid.initialize({ startOnLoad: true });

document.addEventListener("DOMContentLoaded", function() {
    var diagram = `
    graph TD
        subgraph Before
        A[Customers] --> B[Orders]
        C[Products] --> D[OrderItems]
        B --> D
        end
        subgraph After
        E[Customers] --> F[CustomerAddresses]
        E --> G[CustomerPreferences]
        H[Categories] --> I[Products]
        I --> J[ProductInventory]
        E --> K[Orders]
        F --> K
        I --> L[OrderItems]
        K --> L
        end
    `;
    
    var insertSvg = function(svgCode, bindFunctions) {
        document.getElementById("architecture-diagram").innerHTML = svgCode;
    };
    
    mermaid.render("mermaid-diagram", diagram, insertSvg);
});
</script>

# Summary

---

### **Situation:**
At my previous company, I was tasked with leading the redesign of the data model for a rapidly growing e-commerce platform. The platform was struggling with several key issues: data redundancy, slow query performance, and limited ability to generate accurate customer insights. These issues were becoming a roadblock as the business scaled, and they needed a more efficient and scalable data model to support continued growth and deliver more sophisticated customer segmentation.

### **Task:**
I was fortunate to lead the project as the data engineer responsible for analyzing the existing data model, identifying areas for improvement, and working closely with the business stakeholders to ensure that the new model aligned with both technical and business requirements. My role also included implementing the new model, migrating the existing data without disrupting operations, and optimizing queries to support better customer segmentation.

### **Action:**
The first step was analyzing the existing data model, which had significant data redundancy due to a lack of normalization. After evaluating the structure, I confidently proposed a new model that followed Third Normal Form (3NF) principles, which reduced duplication and improved data integrity. We also implemented a star schema to enhance query performance for our analytics needs. 

One challenge we faced was migrating the data without downtime. To address this, I implemented a staged migration process, where we used temporary tables and orchestrated data copy operations during off-peak hours. This allowed us to seamlessly switch to the new model without affecting the platform’s daily operations.

While it was a challenge, I was able to optimize the query performance further by implementing an indexing strategy that included both clustered and non-clustered indexes on frequently queried columns. For example, we indexed customer-related columns that were often used for segmentation, which significantly sped up these queries. Additionally, I collaborated closely with the analytics team to implement Slowly Changing Dimensions (SCD) Type 2 for our customer and product tables, ensuring historical data accuracy.

Another challenge I faced was gaining stakeholder buy-in for a complete redesign. Some were hesitant due to the complexity and potential risks of the project. I worked closely with them, creating a detailed impact analysis that projected improvements in performance and data quality. By presenting this analysis and showing the potential long-term benefits, I was able to secure their support.

### **Result:**
The new data model resulted in a **40% reduction in data redundancy**, which not only reduced storage costs but also improved overall data consistency. This was a major win for the business as it provided a more scalable foundation for future growth.

In terms of customer insights, the redesign led to a **25% improvement in customer segmentation accuracy**, allowing the marketing team to launch more targeted campaigns based on refined customer data. This was a direct result of implementing the new model and optimizing the queries used for segmentation.

We also saw **60% faster query performance** for common analytical queries, particularly those related to order and customer data. This improvement greatly enhanced the responsiveness of the platform and allowed the team to run more complex queries without long wait times.

Finally, I’m particularly proud that the data model we implemented increased the platform’s scalability by **30%**, positioning the company to handle continued growth without the risk of performance degradation.

---
