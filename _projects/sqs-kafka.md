---
layout: page
title: SQS vs Kafka
description: Complementing Kafka with SQS
img: assets/img/sqs-kafka.jpg
importance: 8
category: Tools & Technology
---

## What are SQS and Kafka?

Imagine you're organizing a big event, and you need to manage various tasks and communications. SQS (Amazon Simple Queue Service) and Kafka are like two different systems you might use to help manage this event, each with its own strengths.

1. **SQS (Amazon Simple Queue Service)**:

   - Think of SQS as a to-do list app for your event.
   - It's great for distributing specific tasks to your team members.
   - Each task (message) is usually processed once and then removed from the list.

2. **Kafka**:
   - Think of Kafka as a bulletin board system for your event.
   - It's excellent for broadcasting announcements that multiple team members need to see.
   - Messages stick around for a while, so team members can review past announcements.

## How do they work?

### SQS:

1. **Sending Messages**: People can add tasks to the to-do list.
2. **Storing Messages**: Tasks stay on the list until someone picks them up.
3. **Delivering Messages**: When a team member is free, they take a task from the list.
4. **Processing**: Once a task is completed, it's removed from the list.

### Kafka:

1. **Sending Messages**: People can post announcements on different bulletin boards (topics).
2. **Storing Messages**: Announcements stay on the board for a set period.
3. **Delivering Messages**: Team members can subscribe to boards they're interested in.
4. **Processing**: Multiple team members can read the same announcement.

## Simple Example: An E-commerce Platform

Let's say you're running an online store. Here's how you might use both SQS and Kafka:

1. **Order Processing (SQS)**:

   - When a customer places an order, it goes into an SQS queue.
   - Available workers pick up orders one by one to process them.
   - Once an order is processed, it's removed from the queue.

2. **Inventory Updates (Kafka)**:
   - When inventory levels change, a message is published to a Kafka topic.
   - Multiple systems (website, mobile app, analytics) read these updates.
   - They can also look back at past inventory changes if needed.

## How do SQS and Kafka complement each other?

1. **Task Distribution vs. Event Streaming**:

   - SQS is great for distributing tasks that need to be processed once.
   - Kafka excels at broadcasting events that multiple systems need to know about.

2. **Message Lifetime**:

   - SQS typically deletes messages after they're processed.
   - Kafka keeps messages for a configurable retention period, allowing for replay.

3. **Scaling**:

   - SQS automatically scales to handle any number of messages.
   - Kafka requires more manual scaling but can handle higher throughput.

4. **Order of Messages**:

   - SQS doesn't guarantee the order of messages (unless using FIFO queues).
   - Kafka maintains the order of messages within each partition.

5. **Consumers**:
   - In SQS, each message is typically processed by one consumer.
   - In Kafka, multiple consumer groups can read the same messages independently.

## Why use both?

Using both SQS and Kafka allows you to:

1. **Handle different types of workloads**: Use SQS for task queues and Kafka for event streaming.
2. **Ensure reliability**: SQS can act as a buffer for Kafka, handling temporary spikes in traffic.
3. **Decouple systems**: Use Kafka for real-time updates and SQS for asynchronous task processing.
4. **Optimize costs**: Use SQS for lower-volume, transient workloads and Kafka for high-volume, persistent streams.

By leveraging both services, you can build a robust, scalable system that efficiently handles both task processing and real-time data streaming.
