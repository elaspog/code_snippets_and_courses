# Serverless Framework Bootcamp: Node.js, AWS & Microservices

https://www.udemy.com/course/serverless-framework

[_udemy.com_serverless-framework](../_udemy.com_serverless-framework/)

## S03 Auction Service: Part 1

### S03/E22 Introduction to DynamoDB

- DynamoDB
  - Fully managed - don't have to ensure that the DB is running
  - NoSQL database
  - Serverless
  - High Availability
  - Performance
  - Durability
  - Spreads the data and traffic across efficient number of servers to handle throughput and storage requirements to ensure consistent and fast performance
  - Data stored on SSDs
  - Replicated across multiple Availability Zones
  - DynamoDB components
    - **tables**
    - **items**
    - **attributes**
  - Schemaless
    - flexible in it's properties what can be added to the records
  - Records in JSON
  - **Scan** - through entire table
    - for searching values not as partition or sort keys
  - **Query** - using **primary key** or **secondary indexes**
    - when querying
      - the **partition key** is always defined
      - the **sort key** is optionally defined
  - **Primary Key**
    - necessary to specify when creating the table
    - helps uniquely identify the items of the table
    - types:
      - **Partition Key** - composed of one unique attribute
      - **Composite Primary Key** - composed of two attributes (**partition and sort key**)
        - can't run queries on the sort key alone, the partition key must be also specified
  - **Secondary Indexes**
    - adds querying flexibility to the table
    - other keys can be specified apart from those what were already specified for the table when it was created
    - types:
      - **Global Secondary Index**
        - index with a Partition Key and Sort Key that can be different from those on the table
        - can create up to 20 for a table
      - **Local Secondary Index**
        - index that has the same partition key as the table, but a different sort key
  - Read Consistency
    - **Eventually Consistent Reads**
      - might not reflect the results of the most up-to-date data after writing, this is due to the way how DynamoBD spreads the data across multiple Availability Zones for better durability and high availability
    - **Strongly Consistent Reads**
      - always reflect the most up-to-date data
      - might not be available due to network delay or outage
      - potential higher latency
      - not supported on Global Secondary Indexes
      - use more throughput capacity (= more money spent)
  - Read/Write Capacity Modes
    - **On-Demand**
      - Flexible, Elastically adapting to the workload
      - Capable of serving thousands of requests per second
      - No need to plan capacity ahead-of-time
      - Pay-per-request basis - only pay for what is used
      - Delivery time usually single-digit millisecond latency (SLA)
      - useful when introducing new table, where the workload/traffic is hard to predict
    - **Provision Mode**
      - Read and write capacity per second need to be specified
      - Can specify auto-scaling rules to automatically adjust the capacity
      - Allows to reserve capacity in advance (reducing costs significantly)
      - Capacity specified:
        - **Read Capacity Units (RCU)**
          - one strongly or two eventually consistent reads per second, for up to 4 KB in size
        - **Write Capacity Units (WCU)**
          - one write per second for up to 1 KB in size
  - **DynamoDB Streams**
    - allows to react on new item creation, update or deletion in table
