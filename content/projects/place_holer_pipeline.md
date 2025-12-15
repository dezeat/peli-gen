Title: Real-Time Data Pipeline Monitor
Date: 2025-12-12 00:00  
Type: project
Category: Data Engineering
Tags: Python, Apache Kafka, Flask, Prometheus
Summary: A lightweight, open-source monitoring dashboard designed to track latency and throughput across various stages of an ETL/ELT pipeline. It provides real-time alerts and historical performance metrics.
Thumbnail: images/blog/default_tb.png
Main: images/blog/default_main.png

# Real-Time Data Pipeline Monitor

This project addresses the critical need for observability in modern data infrastructure. It leverages a stack built around open-source tools to provide a comprehensive, low-latency view of data flow.

## Key Features

* **Real-Time Metrics:** Ingests metrics directly from producer and consumer applications using a dedicated Kafka topic.
* **Visualization:** A Flask application serves a dashboard using Chart.js to visualize key performance indicators (KPIs) like latency and record count.
* **Alerting:** Integrated with Prometheus to trigger alerts if pipeline lag exceeds defined thresholds.

The goal was to build a system that is simple to deploy, easy to integrate with existing infrastructure, and provides immediate value by minimizing downtime caused by pipeline failures.