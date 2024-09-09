---
layout: page
title: Scalable Real-Time Data Platform for E-Commerce
description: Implemented a high-performance data platform using API-first design, Kafka, FastAPI, and Airflow for an e-commerce giant, enabling real-time personalization and handling over 100,000 requests per second.
img: assets/img/real-time-data-platform.jpg
importance: 1
category: Messaging & Queuing Systems
---

## Situation

As the lead Enterprise Data Architect at GlobalShop, a rapidly growing e-commerce platform with over 50 million active users, I faced several critical challenges:

1. **Data Processing Bottlenecks**: Our legacy batch-oriented data processing systems struggled to handle the increasing volume of user interactions, product updates, and transaction data. This led to delays in updating product recommendations and personalized content, affecting user experience and sales conversion rates.

   _Example_: During our summer sale, it took up to 4 hours to update product recommendations, resulting in outdated suggestions and missed cross-selling opportunities.

2. **API Integration Complexity**: The existing monolithic architecture made it difficult to integrate new services and third-party APIs. This slowed down the development of new features and hindered our ability to adapt to changing market demands.

   _Example_: Integrating a new payment gateway took 3 months due to the tight coupling of our systems, delaying our expansion into a new market.

3. **Scalability Issues**: During peak shopping periods like Black Friday, our systems experienced significant slowdowns and occasional outages, unable to handle the surge in traffic and data processing requirements.

   _Example_: Last Black Friday, our site experienced a 30-minute outage, resulting in an estimated $2 million in lost sales.

4. **Real-Time Analytics Gap**: Our marketing and product teams lacked access to real-time insights, hampering their ability to make data-driven decisions and respond quickly to emerging trends or issues.

   _Example_: A pricing error on a popular product went unnoticed for 2 hours, leading to a significant loss in profit margin.

5. **Inconsistent Data Models**: Different teams were using inconsistent data models and schemas, leading to data quality issues and making it challenging to create a unified view of our customers and products.

   _Example_: Customer segmentation efforts were hampered by inconsistent definitions of "active user" across different departments, leading to misaligned marketing campaigns.

## Task

As the lead data architect, my primary responsibilities were to:

1. Design and implement a scalable, real-time data platform that could handle our current and future data processing needs.
2. Develop an API-first architecture to simplify integration and enable rapid development of new features.
3. Implement a robust event streaming solution to enable real-time data processing and analytics.
4. Create a flexible and scalable microservices architecture to replace our monolithic system.
5. Establish a unified data model and schema management system across the organization.
6. Orchestrate complex data pipelines to ensure data consistency and timely updates across all systems.

## Action

To address these challenges, I led a team of data engineers and software developers in implementing a comprehensive solution. Here's a detailed account of the steps we took:

### 1. Implementing API-First Design Principles

I introduced an API-first approach to our development process, which involved:

- **API Design Workshops**: I organized weekly workshops with product managers, developers, and data scientists to design and refine our API specifications before implementation.

  _Example_: In one workshop, we designed the Product Catalog API, defining endpoints for product search, filtering, and detailed product information. We used user stories to guide the design, such as "As a mobile app user, I want to search for products by category and filter by price range."

- **OpenAPI (Swagger) Specification**: We used OpenAPI 3.0 to create detailed, standardized API documentation for all our services.

  _Example_: For our User Profile API, we created an OpenAPI spec that included endpoints for user registration, profile updates, and preference management. Here's a snippet:

  ```yaml
  paths:
    /users/{userId}/preferences:
      get:
        summary: Retrieve user preferences
        parameters:
          - name: userId
            in: path
            required: true
            schema:
              type: string
      put:
        summary: Update user preferences
        requestBody:
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/UserPreferences"
  ```

- **API Gateway**: Implemented Kong as our API gateway to manage, secure, and monitor all API traffic.

  _Example_: We configured Kong to handle rate limiting, caching, and authentication for our APIs. For the Product Catalog API, we set a rate limit of 1000 requests per minute per API key and cached frequent product queries for 5 minutes to reduce database load.

- **Contract Testing**: Introduced Pact for contract testing between service consumers and providers, ensuring API compatibility.

  _Example_: We created Pact contracts between our mobile app (consumer) and the Product Catalog API (provider). This allowed us to catch breaking changes early, such as when a required field was accidentally removed from the product search response.

### 2. Using Kafka for Real-Time Event Streaming

To enable real-time data processing, we implemented Apache Kafka as our central event streaming platform:

- **Event Sourcing**: Designed an event-driven architecture where all significant state changes (e.g., user clicks, purchases, inventory updates) were captured as events in Kafka topics.

  _Example_: We created a `user-activity` Kafka topic to capture all user interactions. Here's a sample event schema:

  ```json
  {
    "event_type": "product_view",
    "user_id": "12345",
    "product_id": "89101",
    "timestamp": "2023-09-06T14:30:00Z",
    "session_id": "abcde12345",
    "device_type": "mobile"
  }
  ```

- **Kafka Streams**: Utilized Kafka Streams for real-time data processing, including aggregations and joins across multiple event streams.

  _Example_: We implemented a Kafka Streams application to calculate real-time product popularity scores. It consumed events from the `user-activity` and `purchase` topics, aggregating views and purchases for each product over a sliding 1-hour window.

- **Schema Registry**: Implemented Confluent Schema Registry to manage and evolve our event schemas, ensuring backward compatibility.

  _Example_: When we needed to add a `category_id` field to our `product_view` event, we used Schema Registry to manage this evolution, ensuring that old consumers could still process new events without breaking.

- **Kafka Connect**: Used Kafka Connect to integrate with various data sources and sinks, including our legacy databases and cloud services.

  _Example_: We used Kafka Connect with the JDBC source connector to stream changes from our legacy MySQL product catalog database to a `product-updates` Kafka topic. This allowed us to keep our new microservices in sync with legacy data in real-time.

### 3. Developing Microservices with FastAPI

To replace our monolithic architecture, we developed a suite of microservices using FastAPI:

- **Service Decomposition**: Broke down our monolith into smaller, domain-specific services (e.g., user management, product catalog, order processing).

  _Example_: We extracted the product recommendation functionality into a separate microservice. This service consumed user activity data from Kafka and exposed an API endpoint for personalized recommendations.

- **Asynchronous Processing**: Leveraged FastAPI's asynchronous capabilities to handle high-concurrency scenarios efficiently.

  _Example_: In our Order Processing service, we implemented an asynchronous endpoint for order creation:

  ```python
  @app.post("/orders", response_model=OrderResponse)
  async def create_order(order: OrderCreate):
      order_id = await create_order_async(order)
      await publish_order_created_event(order_id)
      return {"order_id": order_id, "status": "processing"}
  ```

- **Data Validation**: Utilized Pydantic models for request/response validation and automatic OpenAPI documentation generation.

  _Example_: For our User Profile service, we defined Pydantic models for user data:

  ```python
  from pydantic import BaseModel, EmailStr

  class UserCreate(BaseModel):
      username: str
      email: EmailStr
      full_name: str

  class UserResponse(UserCreate):
      id: int
      created_at: datetime
  ```

- **Dependency Injection**: Implemented a clean dependency injection pattern for database connections, caching, and external service clients.

  _Example_: In our Product Catalog service, we used FastAPI's dependency injection to manage database connections:

  ```python
  async def get_db():
      db = await create_db_pool()
      try:
          yield db
      finally:
          await db.close()

  @app.get("/products/{product_id}")
  async def get_product(product_id: int, db: Database = Depends(get_db)):
      return await db.fetch_one("SELECT * FROM products WHERE id = :id", {"id": product_id})
  ```

### 4. Orchestrating Data Pipelines with Airflow

To manage our complex data workflows, we implemented Apache Airflow:

- **DAG Design**: Created modular, reusable Directed Acyclic Graphs (DAGs) for various data processing tasks, including ETL jobs, model training, and data quality checks.

  _Example_: We created a DAG for daily product sales analysis:

  ```python
  with DAG('daily_product_sales_analysis', schedule_interval='@daily') as dag:
      extract_sales_data = PythonOperator(
          task_id='extract_sales_data',
          python_callable=extract_sales_data_func
      )
      transform_sales_data = PythonOperator(
          task_id='transform_sales_data',
          python_callable=transform_sales_data_func
      )
      load_sales_data = PythonOperator(
          task_id='load_sales_data',
          python_callable=load_sales_data_func
      )
      extract_sales_data >> transform_sales_data >> load_sales_data
  ```

- **Sensor Tasks**: Implemented custom sensors to trigger workflows based on events in our Kafka streams or changes in our data lake.

  _Example_: We created a custom Kafka sensor to trigger our product recommendation model retraining when significant user behavior changes were detected:

  ```python
  class UserBehaviorChangeSensor(BaseSensorOperator):
      def poke(self, context):
          consumer = KafkaConsumer('user-behavior-metrics')
          messages = consumer.poll(timeout_ms=5000)
          for message in messages:
              if message.value['behavior_change_score'] > 0.7:
                  return True
          return False
  ```

- **Dynamic DAG Generation**: Developed a system to dynamically generate DAGs based on configuration files, allowing business users to define new data pipelines without coding.

  _Example_: We created a YAML-based configuration system for generating ETL DAGs:

  ```yaml
  dag_id: product_category_etl
  schedule_interval: "@daily"
  tasks:
    - name: extract_category_data
      type: postgres_to_s3
      source_table: product_categories
      s3_bucket: raw-data
    - name: transform_category_data
      type: spark_job
      job_name: category_transformer
    - name: load_category_data
      type: s3_to_redshift
      s3_bucket: transformed-data
      redshift_table: dim_product_categories
  ```

- **Monitoring and Alerting**: Set up comprehensive monitoring and alerting for all Airflow tasks, integrated with our existing PagerDuty system.

  _Example_: We configured Airflow to send alerts to PagerDuty when critical DAGs failed or ran longer than expected. For our daily sales reconciliation DAG, we set up an alert if the job took more than 2 hours to complete or if the final reconciliation step showed a discrepancy greater than 0.1%.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <div id="architecture-diagram"></div>
    </div>
</div>
<div class="caption">
    Real Time Data Platform
</div>

### 5. Implementing Additional Integration Technologies

To further enhance our system's capabilities and ensure comprehensive coverage of integration technologies, we implemented additional solutions:

- **Message Queuing**: While Kafka handled our event streaming needs, we implemented RabbitMQ for task queuing and point-to-point messaging scenarios.

  _Example_: We used RabbitMQ for our order processing workflow. When an order is placed, a message is sent to a queue, which is then processed by our fulfillment service. This allowed us to handle spikes in order volume gracefully.

  ```python
  # Publishing an order to RabbitMQ
  channel.basic_publish(
      exchange='',
      routing_key='order_processing',
      body=json.dumps(order_data),
      properties=pika.BasicProperties(
          delivery_mode=2,  # make message persistent
      ))
  ```

- **Enterprise Service Bus (ESB)**: We implemented an ESB using Apache Camel to handle complex integration scenarios and provide a centralized point of control for our service interactions.

  _Example_: We used Camel to integrate our legacy inventory system with our new microservices architecture. Camel routes transformed the data formats and handled the communication protocols, allowing seamless integration without modifying the legacy system.

- **API Lifecycle Management**: Extended our API management solution to cover the full API lifecycle, including design, testing, deployment, and retirement.

  _Example_: We implemented a CI/CD pipeline specifically for APIs, which automated the process of updating API documentation, running contract tests, deploying to staging, and promoting to production upon approval.

These additional integration technologies complemented our existing architecture, providing:

- Improved resilience through decoupled, asynchronous processing
- Better interoperability between legacy and modern systems
- Enhanced governance and control over our growing API ecosystem

The combination of these technologies with our existing Kafka, FastAPI, and Airflow implementation created a robust, flexible, and scalable integration layer that could adapt to our evolving business needs.

## Result

The implementation of our new data platform led to significant improvements across various aspects of our e-commerce operations:

1. **Improved System Performance**:

   - **Real-time processing**: Reduced data processing latency from hours to **milliseconds** for critical workflows.
     _Example_: Product recommendations now update within 500ms of a user action, compared to the previous 4-hour delay.
   - **Scalability**: Successfully handled **Black Friday peak of 150,000 requests per second**, a 200% increase from the previous year, with no downtime.
     _Example_: Our systems remained responsive even during a flash sale that generated 3x normal traffic.
   - **API response times**: Decreased average API response time by **75%**, from 200ms to 50ms.
     _Example_: The product search API now returns results in under 100ms for 99% of queries.

2. **Enhanced Development Efficiency**:

   - **Time-to-market**: Reduced new feature development time by **60%** due to the API-first approach and microservices architecture.
     _Example_: Integration of a new payment gateway was completed in 3 weeks, compared to 3 months previously.
   - **Code reusability**: Increased code reuse by **40%** through well-defined API contracts and shared libraries.
     _Example_: Our new user authentication microservice is now used across 12 different applications.
   - **Testing efficiency**: Improved test coverage by **30%** and reduced integration testing time by **50%** with contract testing.
     _Example_: Automated contract tests now catch 95% of integration issues before they reach production.

3. **Business Metrics Improvement**:

   - **Conversion rate**: Increased overall conversion rate by **15%** due to more accurate, real-time personalization.
     _Example_: The "You May Also Like" section now has a 22% click-through rate, up from 15%.
   - **Customer engagement**: Boosted average session duration by **25%** and pages per session by **20%**.
     _Example_: Mobile app users now spend an average of 7 minutes per session, up from 5.5 minutes.
   - **Revenue impact**: Achieved a **12% increase in average order value** attributed to improved product recommendations.
     _Example_: Cross-sell suggestions during checkout increased attachment rate from 8% to 13%.

4. **Operational Efficiency**:

   - **Data pipeline reliability**: Increased data pipeline success rate from 92% to **99.9%** with Airflow orchestration.
     _Example_: Our daily sales reconciliation process now completes successfully 29 days out of 30, up from 25.
   - **Incident response**: Reduced mean time to detect (MTTD) for data issues by **70%** and mean time to resolve (MTTR) by **50%**.
     _Example_: A recent pricing discrepancy was detected and corrected within 15 minutes, compared to 2 hours previously.
   - **Resource utilization**: Optimized cloud infrastructure costs, resulting in a **25% reduction** in per-transaction processing cost.
     _Example_: Our monthly AWS bill decreased by $50,000 despite a 30% increase in traffic.

5. **Data Accessibility and Quality**:
   - **Real-time analytics**: Provided marketing and product teams with dashboards updated in real-time, leading to **35% faster** decision-making in campaign management.
     _Example_: A/B test results are now available within minutes, allowing for rapid iteration of marketing campaigns.
   - **Data consistency**: Achieved **99.99% data consistency** across all systems with our unified data model and schema management.
     _Example_: Customer lifetime value calculations now match across all reports and systems.
   - **Data freshness**: Improved data freshness SLAs, with **95% of all data** now being less than 5 minutes old.
     _Example_: Inventory levels in our mobile app now reflect in-store purchases within 2 minutes.

In conclusion, the implementation of our scalable, real-time data platform using API-first design, Kafka, FastAPI, and Airflow transformed our e-commerce operations. It not only solved our immediate technical challenges but also positioned us for future growth and innovation in the highly competitive e-commerce landscape.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <canvas id="performance-chart"></canvas>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="{{ '/assets/js/supply-chain-analytics/chart.js' | relative_url }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/8.13.10/mermaid.min.js"></script>
<script>
mermaid.initialize({ startOnLoad: true });

document.addEventListener("DOMContentLoaded", function() {
    var diagram = `
    graph TB
        subgraph "API-First Design Process"
            A[API Design Workshops] --> B[OpenAPI Specification]
            B --> C[Contract Testing]
        end

        subgraph "Client Applications"
            D[Web App]
            E[Mobile App]
            F[Partner Systems]
        end

        subgraph "API Layer"
            G[Kong API Gateway]
            H[Authentication & Authorization]
        end

        subgraph "Microservices Layer"
            I[User Service]
            J[Product Catalog Service]
            K[Order Service]
            L[Recommendation Service]
            M[Inventory Service]
        end

        subgraph "Event Streaming Layer"
            N[Kafka Cluster]
            O[Kafka Connect]
            P[Kafka Streams]
            Q[Schema Registry]
        end

        subgraph "Data Processing Layer"
            R[Airflow]
            S[ETL Jobs]
            T[Machine Learning Pipeline]
        end

        subgraph "Data Storage Layer"
            U[Operational Databases]
            V[Data Warehouse]
            W[Data Lake]
        end

        subgraph "Analytics & Monitoring"
            X[Real-time Dashboards]
            Y[Monitoring & Alerting]
        end

        %% Client to API Gateway
        D --> G
        E --> G
        F --> G

        %% API Gateway to Microservices
        G --> H
        H --> I
        H --> J
        H --> K
        H --> L
        H --> M

        %% Microservices to Kafka
        I --> N
        J --> N
        K --> N
        L --> N
        M --> N

        %% Kafka to Data Processing
        N --> O
        N --> P
        N --> Q
        O --> R
        P --> R

        %% Data Processing to Storage
        R --> S
        R --> T
        S --> U
        S --> V
        S --> W
        T --> W

        %% Analytics & Monitoring
        N --> X
        R --> Y
        G --> Y

        %% API-First Design influence
        C -.-> G
        C -.-> I
        C -.-> J
        C -.-> K
        C -.-> L
        C -.-> M

        %% Data flow to Recommendation Service
        N --> L
        W --> L

        %% Airflow orchestration
        R --> N
        R --> U
        R --> V
        R --> W

        classDef microservice fill:#f9f,stroke:#333,stroke-width:2px;
        class I,J,K,L,M microservice;
        classDef kafka fill:#afd,stroke:#333,stroke-width:2px;
        class N,O,P,Q kafka;
        classDef storage fill:#ffa,stroke:#333,stroke-width:2px;
        class U,V,W storage;
    `;
    
    var insertSvg = function(svgCode, bindFunctions) {
        document.getElementById("architecture-diagram").innerHTML = svgCode;
    };
    
    mermaid.render("mermaid-diagram", diagram, insertSvg);
});
</script>
