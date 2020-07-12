
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

Example `serverless.yml`:
```yaml
provider:
  name: aws
  runtime: nodejs12.x
  memorySize: 256

functions:
  hello:
    handler: hello
    events:
      - http: GET hello
```

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

https://aws.amazon.com/free/

## S02 Requirements and Prerequisites

### S02/E07 Installing Node.js and NPM

https://nodejs.org/en/download/

- NodeJS (LTS)
- npm

```sh
node --version
```

### S02/E08 Installing the AWS CLI

https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

- AWS CLI

```sh
aws
# some output
```

### S02/E09 Installing the Serverless Framework CLI

https://www.serverless.com/  
https://www.serverless.com/framework/docs/getting-started/  

```sh
npm install -g serverless

sls --version
# some output
```

### S02/E10 Configuring the AWS CLI + IAM

- AWS
  - IAM / Users / Add user
    - Programmatic access
    - AWS Management Console access
    - Attach existing policy: AdministratorAccess

```sh
aws configure
# Access Key ID
# Secret Access Key
# default region name: eu-west-1
# default output format: yaml
```

### S02/E11 (Optional) AWS Budgets and Alerts

- AWS Console / Account Name / My Billing Dashboard / Billing Preferences
  - enable: Recieve Free Tier Usage Alerts
- AWS Console / Account Name / My Billing Dashboard / Budgets
  - Create Budget / Cost Budget
    - name: My Monthly Budget
    - Recurring Budget
    - Budget Amount: 10 USD
    - Alert 1:
      - Actual Cost
      - Alert threshold: 50 % of budgeted amount
      - email address
    - Alert 2:
      - Forecasted costs
      - Alert threshold: 80 % of budgeted amount
      - email address

### S02/E12 My Postman Setup

https://www.postman.com/downloads/

- Postman
  - add collection: Auction Service
  - add environment: dev

## S03 Auction Service: Part 1

### S03/E13 Let's Connect!

### S03/E14 Creating a Serverless Framework Project

**serverless.yml**  

https://github.com/codingly-io/sls-base

```sh
mkdir sls-course
cd sls-course
```

Templates in Serverless Framework:
```sh
# custom template made by the instructor:
# sls create --name YOUR_PROJECT_NAME --template-url https://github.com/codingly-io/sls-base

sls create --name auction-service --template-url https://github.com/codingly-io/sls-base
cd auction-service
npm install
```

### S03/E15 The Anatomy of a Serverless Project

**serverless.yml**  
**src/handlers/hello.js**  
**package.json**  

- hearth of the serverless application: `serverless.yml`
- YAML is superset of JSON
  - JSON can be used in YAML
  - indentation is very important

`serverless.yml`:
```yaml
service:
  name: auction-service

plugins:
  - serverless-bundle
  - serverless-pseudo-parameters

provider:
  name: aws
  runtime: nodejs12.x
  memorySize: 256
  stage: ${opt:stage, 'dev'}

functions:
  hello:
    handler: src/handlers/hello.handler
    events:
      - http:
          method: GET
          path: /hello

custom:
  bundle:
    linting: false
```

- `service` - metadata definition about the service
- `plugins`
  - `serverless-bundle` - bundle application using webpack
  - `serverless-pseudo-parameters` - interpolate AWS parameters: region, account id, etc.
- `provider` - cloud provider information
  - `name` - cloud provider name
  - `runtime` - runtime environment
  - `memorySize` - memory limit
  - `opt:stage` YAML variable with `dev` default value: `${opt:stage, 'dev'}` (interpolation syntax)
- `functions`
  - `handler: src/handlers/hello.handler` - the `handler` from `src/handlers/hello.js` is going to be executed when the function is called
  - `events` - this triggers the function call
    - `http` - protocol
      - `method` - HTTP method
      - `path` - endpoint
- `custom` - plugin configuration and custom variables
  - `bundle: linting: false` - disable linting in `serverless-bundle` plugin

`src/handlers/hello.js`:
```javascript
async function hello(event, context){
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from https://codingly.io' }),
  };
}

export const handler = hello;
```

`package.json`
- defines the npm package: project dependencies, dev dependencies

### S03/E16 TIP: Serverless IDE VSCode Plugin

plugin for autocompletion in `serverless.yml`:

https://marketplace.visualstudio.com/items?itemName=ThreadHeap.serverless-ide-vscode

### S03/E17 Deploying Our Application for the First Time

**serverless.yml**  

`serverless.yml`:
```yaml
# ...
provider:
  # ...
  region: eu-west-1
# ...
```

```sh
#sls deploy
# same as: sls deploy --stage dev
# due to: ${opt:stage, 'dev'} in serverless.yml

sls deploy -v
# he endpoint for the service is listed
```

Browser:
```sh
https://<random_generated>/execute-api.eu-west-1.amazonaws-com/dev/hello
# response: { "message": "Hello from https://codingly.io" }
```

CloudFormation / Region: eu-west-1 / Stacks
  - stack name: `auction-service-dev`
    - events, resources, log group, API gateway etc.

### S03/E18 (Tip) Stack Removal

```sh
sls remove
# or
sls remove -v
```

### S03/E19 Creating an Auction (Part 1)

**serverless.yml**  
**src/handlers/createAuction.js**  

`createAuction.js`:
```js
async function createAuction(event, context){
  return {
    statusCode: 200,
    body: JSON.stringify({ event, context }),
  };
}

export const handler = createAuction;
```

`serverless.yml`:
```yaml
service:
  name: auction-service

plugins:
  - serverless-bundle
  - serverless-pseudo-parameters

provider:
  name: aws
  runtime: nodejs12.x
  memorySize: 256
  stage: ${opt:stage, 'dev'}
  region: eu-west-1

functions:
  createAuction:
    handler: src/handlers/createAuction.handler
    events:
      - http:
          method: POST
          path: /auction

custom:
  bundle:
    linting: false
```

```sh
sls deploy -v
```

- in Postman
  - add a new Environment Variable `dev`
  - variable name: `AUCTIONS_HOST`
  - current value is the deployment's base url
  - set Body / raw / json

Postman:
```sh
# Body / raw / json:
{
    "title": "Super nice car"
}

POST {{AUCTIONS_HOST}}/auction
# 200 OK
# JSON in request
```

### S03/E20 Creating an Auction (Part 2)

**src/handlers/createAuction.js**  

`createAuction.js`:
```js
async function createAuction(event, context){
  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
  };

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;
```

- lambda runs for only 15 minutes

```sh
sls deploy -f createAuction -v
```

### S03/E21 NOTE: Introduction to DynamoDB

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

### S03/E23 Creating our DynamoDB Table (IaaC)

*resources.txt*  

- **Cloud Formation Syntax**
  - language created by AWS
  - is used in `serverless.yml`

`serverless.yml` (*resources.txt*):
```yaml
resources:
  Resources:
    AuctionsTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: AuctionsTable
        BillingMode: PAY_PER_REQUEST
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
```

- `Resources` - Yaml object
  - `Type` - AWS resource
  - `Properties` -
    - `TableName` - DynamoDB table name
    - `BillingMode` - can be preprovisioned to have certain amount of write capacity units or can be payed per request
    - `AttributeDefinitions` - columns for schemaless table
      - `AttributeName` - name
      - `AttributeType` - type
        - `S` for string
    - `KeySchema`
      - `AttributeName` - referred attribute
      - `KeyType` - Partition key

```sh
sls deploy -v
```

### S03/E24 Using the DynamoDB DocumentClient to Insert an Auction

**src/handlers/createAuction.js**  

https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

```sh
npm install uuid
```

`createAuction.js`:
```js
import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context){
  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
  };

  await dynamodb.put({
    TableName: "AuctionsTable",
    Item: auction,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;
```

```sh
sls deploy -f createAuction -v
```

Postman:
```sh
# Body / raw / json:
{
    "title": "Super nice car"
}

POST {{AUCTIONS_HOST}}/auction
# Internal server error
```
Reason: `AccessDeniedException` on the resource

### S03/E25 Defining IAM Role Statements (Permissions)

**serverless.yml**  

The problem is caused by the IAM Role

- CloudFormation / stack / resources
  - IamRoleLambdaExecution
    - Policies

Lambda can only write CloudWatch

`serverless.yml`:
```yml
provider:
  # ...
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:PutItem
      Resource:
        - arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/AuctionsTable
```

- `iamRoleStatements` - this will be appended to the role created by the framework
  - `Action`
    - `- dynamodb:*` - all actions, it's not recommended to use
  - `Resource`
    - service name: `dynamodb`
    - `#{AWS::Region}` - region, like `eu-west-1`
    - `#{AWS::AccountId}` - account ID
- `serverless-pseudo-parameters` provides the possibility of using: `#{AWS::Region}` and `#{AWS::AccountId}`

- CloudFormation / stack / resources
  - IamRoleLambdaExecution
    - Policies

Lambda can write CloudWatch and DynamoDB now

```sh
sls deploy -v
```

### S03/E26 Optimising serverless.yml (Part 1): Roles and IAM Statements

**resources/AuctionsTable.yml**  
**iam/AuctionsTableIAM.yml**  
**serverless.yml**  

https://github.com/codingly-io/course-auction-service/tree/df75d1e5373b756febfd8c566ddf79391d6724f6

`resources/AuctionsTable.yml`:
```yaml
AuctionsTable:
  Type: AWS::DynamoDB::Table
  Properties:
    TableName: AuctionsTable
    BillingMode: PAY_PER_REQUEST
    AttributeDefinitions:
      - AttributeName: id
        AttributeType: S
    KeySchema:
      - AttributeName: id
        KeyType: HASH
```

`iam/AuctionsTableIAM.yml`:
```yaml
AuctionsTableIAM:
  Effect: Allow
  Action:
    - dynamodb:PutItem
  Resource:
    - arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/AuctionsTable
```

Import above files with: `${file(RelativeDirectoryPath/FileName.yml):Node}`

`serverless.yml`:
```yaml
service:
  name: auction-service

plugins:
  - serverless-bundle
  - serverless-pseudo-parameters

provider:
  name: aws
  runtime: nodejs12.x
  memorySize: 256
  stage: ${opt:stage, 'dev'}
  region: eu-west-1
  iamRoleStatements:
    - ${file(iam/AuctionsTableIAM.yml):AuctionsTableIAM}

resources:
  Resources:
    AuctionsTable: ${file(resources/AuctionsTable.yml):AuctionsTable}

functions:
  createAuction:
    handler: src/handlers/createAuction.handler
    events:
      - http:
          method: POST
          path: /auction

custom:
  bundle:
    linting: false
```

```sh
sls deploy -v
```

Postman:
```sh
# Body / raw / json:
{
    "title": "Super nice car"
}

POST {{AUCTIONS_HOST}}/auction
# works
```

### S03/E27 Optimising serverless.yml (Part 2): Intrinsic Functions and Custom Variables

**resources/AuctionsTable.yml**  
**iam/AuctionsTableIAM.yml**  
**serverless.yml**  
**src/handlers/createAuction.js**  

- Avoid hardcoding table names
  - Hard to manage across environments

Tablename should contain current state: `${self:provider.stage}`

`resources/AuctionsTable.yml`:
```yaml
AuctionsTable:
  Type: AWS::DynamoDB::Table
  Properties:
    TableName: AuctionsTable-${self:provider.stage}
    BillingMode: PAY_PER_REQUEST
    AttributeDefinitions:
      - AttributeName: id
        AttributeType: S
    KeySchema:
      - AttributeName: id
        KeyType: HASH
```

Custom object is the source of truth:

`serverless.yml`:
```yaml
# ...
custom:
  AuctionsTable:
    name: !Ref AuctionsTable
    arn: !GetAtt AuctionsTable.Arn
  # ...
```

- Intrinsic functions: `Ref`, `GetAtt`

`iam/AuctionsTableIAM.yml`:
```yaml
AuctionsTableIAM:
  Effect: Allow
  Action:
    - dynamodb:PutItem
  Resource:
    - ${self:custom.AuctionsTable.arn}
```

- Environment Variables can be defined:
  - on function level
  - on provider/application level

Application level environment variable:

`serverless.yml`:
```yaml
# ...
provider:
  name: aws
  runtime: nodejs12.x
  memorySize: 256
  stage: ${opt:stage, 'dev'}
  region: eu-west-1
  environment:
    AUCTIONS_TABLE_NAME: ${self:custom.AuctionsTable.name}
  iamRoleStatements:
    - ${file(iam/AuctionsTableIAM.yml):AuctionsTableIAM}
# ...
```

Read table name from environment variable:

`createAuction.js`:
```js
// ...
async function createAuction(event, context){
  // ...
  await dynamodb.put({
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Item: auction,
  }).promise();
  // ...
}
```

```sh
sls deploy -v
```

Postman:
```sh
# Body / raw / json:
{
    "title": "Super nice car"
}

POST {{AUCTIONS_HOST}}/auction
# works
```

### S03/E28 Serverless Offline - Is It Worth It?

https://github.com/dherault/serverless-offline  
https://www.npmjs.com/package/serverless-offline  

- Plugin: Serverless Offline
  - too much services should be mocked on the machine
    - mocked services are community maintained are not official
    - no guarantee they reflect what actually happens on the cloud
  - does not worth it to use

## S04 Auctions Service: Part 2 (CRUD Operations)

### S04/E29 Introduction to Middy and Middleware

**serverless.yml**  
**src/handlers/createAuction.js**  

https://github.com/middyjs/middy

- Middleware - runs before or after lambda handler
  - **Middy** - middleware library

```sh
npm install @middy/core @middy/http-event-normalizer @middy/http-error-handler @middy/http-json-body-parser
npm install http-errors
```

- `http-json-body-parser`
  - automatically parses the stringified event body
  - results cleaner code
- `http-event-normalizer`
  - automatically adjust the API gateway event object to prevent accidentally having non-existing objects when trying to access path or query parameters
  - reduces the room for errors and the number of if statements
- `http-error-handler`
  - helps having smoother, easier and cleaner error handling process

`createAuction.js`:
```js
// ...
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';
// ...
async function createAuction(event, context){
  const { title } = event.body;
  // ...
  try {
    await dynamodb.put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction,
    }).promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  // ...
}
// ...
export const handler = middy(createAuction)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
```

- `@middy/http-json-body-parser`
  - no JSON parsing needed
  - `const { title } = event.body;` instead of `const { title } = JSON.parse(event.body);`
- `@middy/http-event-normalizer`
  - prevents accessing non existing path or query parameters from the request
  - reduces the room for errors and if statements
- `@middy/http-error-handler`
  - makes error handling process clean
  - works with `http-errors` package
- `http-errors`
  - allows to create HTTP error in a declarative way

```sh
sls deploy -f createAuction -v
```

Postman:
```sh
# Body / raw / json:
{
    "title": "Gold plated soda cans"
}

POST {{AUCTIONS_HOST}}/auction
# works
```

### S04/E30 CRUD Operation: Get Auctions

**serverless.yml**  
**iam/AuctionsTableIAM.yml**  
**src/handlers/getAuctions.js**  

https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property

Getting all auctions (scan):

`serverless.yml`:
```yaml
# ...
functions:
  createAuction:
    # ...
  getAuctions:
    handler: src/handlers/getAuctions.handler
    events:
      - http:
          method: GET
          path: /auctions
# ...
```

- DynamoDB scan operation

`getAuctions.js`:
```js
import AWS from 'aws-sdk';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context){
  let auctions;

  try {
    const result = await dynamodb.scan({
      TableName: process.env.AUCTIONS_TABLE_NAME
    }).promise();
    auctions = result.Items;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
}

export const handler = middy(getAuctions)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
```

- Allow scan action

`iam/AuctionsTableIAM.yml`:
```yaml
AuctionsTableIAM:
  Effect: Allow
  Action:
    - dynamodb:PutItem
    - dynamodb:Scan
  Resource:
    - ${self:custom.AuctionsTable.arn}
```

-

```sh
sls deploy -v
```

Postman:
```sh
GET {{AUCTIONS_HOST}}/auctions
# returned auction
```

### S04/E31 CRUD Operation: Get Auction by ID

**serverless.yml**  
**iam/AuctionsTableIAM.yml**  
**src/handlers/getAuction.js**  

https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property

Getting an auction by ID (query):

`serverless.yml`:
```yaml
# ...
functions:
  createAuction:
    # ...
  getAuctions:
    # ...
  getAuction:
    handler: src/handlers/getAuction.handler
    events:
      - http:
          method: GET
          path: /auction/{id}
# ...
```

`getAuction.js`:
```js
import AWS from 'aws-sdk';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context){
  let auction;
  const { id } = event.pathParameters;

  try {
    const result = await dynamodb.get({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: { id },
    }).promise();
    auction = result.Item;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!auction) {
    throw new createError.NotFound(`Auction with ID "${id}" not found!`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}

export const handler = middy(getAuction)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
```

`iam/AuctionsTableIAM.yml`:
```yaml
AuctionsTableIAM:
  Effect: Allow
  Action:
    - dynamodb:PutItem
    - dynamodb:Scan
    - dynamodb:GetItem
  Resource:
    - ${self:custom.AuctionsTable.arn}
```

```sh
sls deploy -v
```

Postman:
```sh
# get an id from DynamoDB
GET {{AUCTIONS_HOST}}/auction/<id>
# the item with the ID if exists or error message
```

### S04/E32 Creating a Common Middleware

**src/lib/commonMiddleware.js**  
**src/handlers/createAuction.js**  
**src/handlers/getAuctions.js**  
**src/handlers/getAuction.js**  

`src/lib/commonMiddleware.js`:
```js
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

export default handler => middy(handler)
  .use([
    httpJsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler()
  ]);
```

`createAuction.js`:
```js
import commonMiddleware from '../lib/commonMiddleware'
// ...
export const handler = commonMiddleware(createAuction);
```

`getAuction.js`:
```js
import commonMiddleware from '../lib/commonMiddleware'
// ...
export const handler = commonMiddleware(getAuction);
```

`getAuctions.js`:
```js
import commonMiddleware from '../lib/commonMiddleware'
// ...
export const handler = commonMiddleware(getAuctions);
```

```sh
sls deploy -v
```

- Serverless framework knows that nothing has changed in the infrastructure
  - reuploads only the handler functions not the infrastructure

Postman:
```sh
POST {{AUCTIONS_HOST}}/auction
# works

GET {{AUCTIONS_HOST}}/auctions
# works

GET {{AUCTIONS_HOST}}/auction/<id>
# works
```

### S04/E33 CRUD Operation: Placing a Bid

**src/lib/commonMiddleware.js**  
**src/handlers/createAuction.js**  
**src/handlers/getAuctions.js**  
**src/handlers/getAuction.js**  
**src/handlers/placeBid.js**  

https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property

`createAuction.js`:
```js
// ...
  const auction = {
    // ...
    highestBid: {
      amount: 0,
    },
  };
// ...
```

`serverless.yml`:
```yaml
# ...
functions:
  createAuction:
    # ...
  getAuctions:
    # ...
  getAuction:
    # ...
  placeBid:
    handler: src/handlers/placeBid.handler
    events:
      - http:
          method: PATCH
          path: /auction/{id}/bid
# ...
```

`handlers/placeBid.js`:
```js
import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware'
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context){
  const { id } = event.pathParameters;
  const { amount } = event.body;

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set highestBid.amount = :amount',
    ExpressionAttributeValues: {
      ':amount': amount,
    },
    ReturnValues: 'ALL_NEW',
  };

  let updatedAuction;

  try {
    const result = await dynamodb.update(params).promise();
    updatedAuction = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = commonMiddleware(placeBid);
```

- DynamoDB has expression language

`iam/AuctionsTableIAM.yml`:
```yaml
AuctionsTableIAM:
  Effect: Allow
  Action:
    - dynamodb:PutItem
    - dynamodb:Scan
    - dynamodb:GetItem
    - dynamodb:UpdateItem
  Resource:
    - ${self:custom.AuctionsTable.arn}
```

```sh
sls deploy -v
```

Delete the old auctions from DynamoDB on AWS Console

Postman:
```sh
# body: raw/json
{
  "amount": 40
}
PATCH {{AUCTIONS_HOST}}/auction/<id>/bid
# bid has been updated
```

**Note:** for unknown reason the returned message for placing a bid was:
```json
{
  "message": "Missing Authentication Token"
}
```

### S04/E34 Validation: Placing a Bid

**src/handlers/getAuction.js**  
**src/handlers/placeBid.js**  

`getAuction.js`:
```js
import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware'
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getAuctionById(id) {
  let auction;

  try {
    const result = await dynamodb.get({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: { id },
    }).promise();
    auction = result.Item;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!auction) {
    throw new createError.NotFound(`Auction with ID "${id}" not found!`);
  }

  return auction;
}

async function getAuction(event, context){
  const { id } = event.pathParameters;
  const auction = await getAuctionById(id);

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(getAuction);
```

`handlers/placeBid.js`:
```js
import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware'
import createError from 'http-errors';
import { getAuctionById } from './getAuction';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context){
  const { id } = event.pathParameters;
  const { amount } = event.body;

  const auction = await getAuctionById(id);

  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(`Your bib must be higher than ${auction.highestBid.amount}!`);
  }

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set highestBid.amount = :amount',
    ExpressionAttributeValues: {
      ':amount': amount,
    },
    ReturnValues: 'ALL_NEW',
  };

  let updatedAuction;

  try {
    const result = await dynamodb.update(params).promise();
    updatedAuction = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = commonMiddleware(placeBid);
```

```sh
sls deploy -f placeBid -v
```

Postman:
```sh
# body: raw/json
{
  "amount": 21
}
PATCH {{AUCTIONS_HOST}}/auction/<id>/bid
# not working

# body: raw/json
{
  "amount": 22
}
PATCH {{AUCTIONS_HOST}}/auction/<wrong_id>/bid
# not working

# body: raw/json
{
  "amount": 22
}
PATCH {{AUCTIONS_HOST}}/auction/<id>/bid
# working
```

**Note:** for unknown reason the returned message for placing a bid was:
```json
{
  "message": "Missing Authentication Token"
}
```

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
