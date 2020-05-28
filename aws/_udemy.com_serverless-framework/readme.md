
# Serverless Framework Bootcamp: Node.js, AWS & Microservices

https://www.udemy.com/course/serverless-framework

## S01 Course Introduction

### S01/E01 Project Overview

- Auction Service
  - **AWS Labda functions**
    - like traditional REST APIs
    - createAuction, getAuctions, getAuction, placeBid, uploadAcutionPicture, processAuction
  - **AWS API Gateway**
    - provides a public gateway that triggers lambda functions using endpoints
  - **AWS DynamoDB**
  - **AWS Event Bridge**
    - triggers: processAuction
  - **AWS S3**
- **Auth Service**
  - **AWS Labda function**
    - authorizer
  - JWT - JSON Web Token
- Notification Service
  - **AWS SQS MailQueue**
  - **AWS SES**
  - **AWS Labda function**
    - sendMail

### S01/E02 Serverless Architecture in a Nutshell

- Cloud computing execution model
  - Cloud provider runs the server
  - Dynamically manages the allocation of machine resources
- Pricing is based on the resources consumed by the application
- Scaling is handled automatically by the cloud provider
- AWS Lambda:
  - supports: NodeJS, Python, Ruby, Java, Golang, C#
- Serverless applications can be combined with non-Serverless applications
- Serverless might not be the solution for all problems

### S01/E03 Introduction to Serverless Framework

- Free and open-source framework
- Makes it easy to develop, deploy, manage and debug Serverless applications
- Supports multiple cloud providers
  - AWS, Azure, GCP, Knative, Tecent Cloud, Alibaba Cloud, Cloudflare, fn, Kubeless, OpenWhisk, spotinst
- **FaaS - Function as a Service**
  - building blocks
  - AWS Lambda, Google Cloud Functions, Azure Functions
- Fucntions need to by triggered by some event
- **serverless.yml**
  - is the hearth of the Serverless Framework application
  - defines service name, provider, functions, resources etc.
- Framework has a rich set of plugins:
  - serverless-webpack, serverless-domain-manager, serverless-offline, serverless-plugin-typescript, etc.
- **IaC - Infrastructure as Code**
  - application infrastructure side-by-side with code that uses it
    - no redundant resources
    - no manual configuration
    - version control
  - increased site reliability
    - change tracking, migrations, updates are recorded and logged
    - deployments have states what changes are applied on  
  - no extreme complexity of defining infrastructure
- all Service Framework applications are deployed as **Cloud Formation** stacks on AWS

### S01/E04 Real-world Serverless Use Cases

### S01/E05 Introduction to Microservices Architecture

- Microservices Architecture is one solution to the challenge of distributing a system
- Benefits
  - Reduce dependency between development teams
  - Can scale independently of other services
  - Can be deployed and updated independently of other services
  - Allows for flexibility in technology choices
  - Help reduce point of failure
  - Tends to reflect the structure of the business
- Communication Between Services
  - **HTTP Requests**
  - **Messaging (Pub/Sub)**
    - one party publishes a message, other party can subscribe to that message
    - messages that are not picked up by subscribers simply evaporate
    - e.g.: **AWS SNS - Simple Notification Service**
  - **Message Queues**
    - messages are sent to a queue and had to be picked up on the other end to be processed
    - can help with dealing a very high volume of traffic
    - e.g.: **AWS SQS - Simple Queue Service**, **RabbitMQ**
  - **Event Streams**
    - streams that facilitate information exchange based on events
    - event producers and event consumers
    - can act as a storage layer, messages do not evaporate when not picked up
    - e.g.: **AWS Kinesis**, **Apache Kafka**

### S01/E06 AWS Free Tier

## S02 Requirements and Prerequisites

### S02/E07 Installing Node.js and NPM

### S02/E08 Installing the AWS CLI

### S02/E09 Installing the Serverless Framework CLI

### S02/E10 Configuring the AWS CLI + IAM

### S02/E11 (Optional) AWS Budgets and Alerts

### S02/E12 My Postman Setup

## S03 Auction Service: Part 1

### S03/E13 Let's Connect!

### S03/E14 Creating a Serverless Framework Project

### S03/E15 The Anatomy of a Serverless Project

### S03/E16 TIP: Serverless IDE VSCode Plugin

### S03/E17 Deploying Our Application for the First Time

### S03/E18 (Tip) Stack Removal

### S03/E19 Creating an Auction (Part 1)

### S03/E20 Creating an Auction (Part 2)

### S03/E21 NOTE: Introduction to DynamoDB

### S03/E22 Introduction to DynamoDB

### S03/E23 Creating our DynamoDB Table (IaaC)

### S03/E24 Using the DynamoDB DocumentClient to Insert an Auction

### S03/E25 Defining IAM Role Statements (Permissions)

### S03/E26 Optimising serverless.yml (Part 1): Roles and IAM Statements

### S03/E27 Optimising serverless.yml (Part 2): Intrinsic Functions and Custom Variables

### S03/E28 Serverless Offline - Is It Worth It?

## S04 Auctions Service: Part 2 (CRUD Operations)

### S04/E29 Introduction to Middy and Middleware

### S04/E30 CRUD Operation: Get Auctions

### S04/E31 CRUD Operation: Get Auction by ID

### S04/E32 Creating a Common Middleware

### S04/E33 CRUD Operation: Placing a Bid

### S04/E34 Validation: Placing a Bid

## S05 Auction Service: Part 3 (Processing Auctions)

### S05/E35 Using Scheduled Events to Process Our Auctions

### S05/E36 Creating a Global Secondary Index (status, endingAt)

### S05/E37 Identifying Ended Auctions

### S05/E38 Closing Auctions

### S05/E39 Validation: Bidding on Closed Auctions

### S05/E40 (Challenge) Getting Auctions - Filter by Status

### S05/E41 JSON Schema Validation - Get Auctions Status

### S05/E42 (Optional) Detailed Error Messages

### S05/E43 (Challenge) Create Auction Schema Validation

### S05/E44 (Challenge) Place Bid Schema Validation

## S06 Auth Service

### S06/E45 Section Introduction

### S06/E46 Introduction to Auth0

### S06/E47 Creating an Auth0 Application

### S06/E48 Getting Test Tokens

### S06/E49 Deploying Auth Service

### S06/E50 Protecting Auction Service Endpoints

### S06/E51 Specifying Seller Identity

### S06/E52 Specifying Bidder Identity (+Validation)

## S07 Notification Service

### S07/E53 Notification Service Setup

### S07/E54 Reminder: Linting Disabled

### S07/E55 Verify Email Address (AWS SES)

### S07/E56 Defining the sendMail Lambda Function

### S07/E57 Sending Our First (Test) Email

### S07/E58 Introduction to SQS and Message Queues

### S07/E59 Provisioning AWS SQS Message Queue (MailQueue)

### S07/E60 Manually Sending SQS Messages

### S07/E61 Exporting MailQueue Variables (CloudFormation)

### S07/E62 Importing Outputs in Auction Service

### S07/E63 Notifying Bidder and Seller

### S07/E64 (Challenge) Handling No Bids Case

### S07/E65 (Optional) Uncommenting EventBridge Trigger

## S08 Auction Picture (Amazon S3)

### S08/E66 Setting up an S3 Bucket and Lambda Function

### S08/E67 (Optional) Amazon S3 Picture Expiry

### S08/E68 Uploading Picture to S3

### S08/E69 Quick Error Handling Fix

### S08/E70 Setting Picture URL in DynamoDB

### S08/E71 (Challenge) Validate Auction Ownership

### S08/E72 (Challenge) Validate Request Body (base64)

### S08/E73 Moving Forward & Future Content

## S09 (Bonus) Front-end Application

### S09/E74 Front-end Demo

### S09/E75 Enabling CORS on Auction Service

### S09/E76 Setting up the Auctions Front-end
