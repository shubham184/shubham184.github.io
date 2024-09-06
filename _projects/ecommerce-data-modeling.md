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
