Title: My Way into Data Engineering
Date: 2025-12-01 15:00
Type: article
Category: Career
Tags: Data Engineering, Career Path, Learning, Software Engineering
Summary: A personal reflection on my journey into data engineering, from early tech curiosity to cloud-based data work.
Image: images/windy_road.png
Cover: images/windy_road.png

I started this blog as a place to document what I'm learning and building — a personal knowledge base that helps me think, and occasionally something I can point others to.
This post is a short overview of how I ended up in data engineering, even though I didn't follow the classic computer science route.

## Early PC curiosity

I grew up with computers, games, and the early web — the kind of environment where you naturally learn how things work by experimenting and spending way too many hours in front of a screen.

When I was around thirteen, a friend showed me how to build a PC. We put together a gaming tower at his place, and for the first time I actually understood — by touching the parts — what a CPU is, what RAM does, what a network card and hard drive look like, and how they fit together. That hands-on moment stuck with me.

Between twelve and eighteen, I spent a huge amount of time at the computer: gaming, tinkering, and just being online. I took an HTML course at school and tried out bits and pieces on my own, but I was never the script kiddie type. I did have friends who were, though — and I loved listening to them. I could spend hours hearing them talk about what they were building or breaking, and I always found it fascinating to learn from them. I wasn't the one writing scripts, but I was very curious about how it all worked.

## First technical foundations

Before moving into the social sciences, I briefly studied Cognitive Science.
There, I took Computer Science I & II, covering algorithms, data structures, and object-oriented programming in Java. Even though I didn't continue the program, these were the first structured programming concepts I ever learned — and they stayed with me.

## Learning to Think with Data

I eventually moved into political science but always gravitated toward the quantitative side.
My bachelor's and master's work focused on statistics, empirical methods, and R. I designed experiments, modeled survey data, and performed data analyses for my scientific work.

As this wasn't just theoretical — I often had to get hands-on with raw measurement data, transforming and cleaning it before any analysis could happen. For my master's thesis, I managed the entire process end-to-end, from study design and data collection to the final analysis. Essentially, I learned how to think with data long before I worked with it in production systems.

## First practical step: applied data work

My real entry point into tech didn't come through a computer science degree, but through a student job during the pandemic.
I worked in a data-heavy marketing environment: dashboards, SQL, automation, R scripts, and small workflow optimizations. It was hands-on and made me realize that working at the intersection of data, tooling, and infrastructure is exactly what interests me.

## From SQL Scripts to Modern Engineering

After university, I joined a large e-commerce company as a junior data developer. Our team of three juniors was hired to inherit a data infrastructure within a business unit, independent of central IT.

We managed a BigQuery warehouse where transformation logic was buried in a web of undocumented SQL, stitched together with legacy Pentaho jobs and shell scripts running via Crontab.

We spent the first year just keeping the system running. Eventually, however, we modernized the entire stack: migrating orchestration to Airflow, introducing GitHub for version control, and establishing development standards.

In this role, I learned a lot. Coming from a non-traditional background, this job was in many ways a practical education in software engineering. It bridged the gap between writing ad-hoc scripts to solve a problem and building maintainable systems that last. 

Digging through the legacy logic taught me the mechanics of BigQuery, while the modernization process forced me to adopt professional standards. This is where I really understood the value of CI/CD automation, branching strategies, and system observability—not just as concepts, but as necessary tools for stability.

## Where I Am Now: Cloud Platforms & PySpark

Now I work as a Data Engineer in the energy sector, in a team that builds and operates a cloud-based data platform using Azure, Databricks, Python, and PySpark.

My role connects platform engineering and core data modeling. On one hand, I maintain and extend a large, custom-built PySpark framework and manage our automated CI/CD pipelines via Azure DevOps. On the other, I use that infrastructure to deliver business value: gathering requirements, designing data models, and deploying them to production.

I've been in this role since summer 2024. It is a complex environment that requires shifting focus between lower-level framework code and high-level business logic. 

This duality has been my biggest takeaway so far—learning how to maintain a heavy codebase while ensuring the data products remain reliable. It’s a strong environment to grow in, allowing me to get hands-on with software engineering best practices like solid test suites and modular system design

## Why this blog

This blog is a place to:

- collect notes about what I'm experimenting with
- document small projects
- reflect on patterns in data engineering
- write about tools, design ideas, and things I want to understand more deeply

I also enjoy writing — structuring my thoughts, putting them into words, and making sense of what I'm learning along the way.