
# Serverless Framework Bootcamp: Node.js, AWS & Microservices

https://www.udemy.com/course/serverless-framework

## S01 Course Introduction

### S01/E01 Project Overview

### S01/E02 Serverless Architecture in a Nutshell

### S01/E03 Introduction to Serverless Framework

### S01/E04 Real-world Serverless Use Cases

### S01/E05 Introduction to Microservices Architecture

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
