# CMPE 272 - Assignment

# Serverless Web Application with AWS Lambda and DynamoDB

This project is a serverless web application that demonstrates the use of AWS Lambda and DynamoDB to handle basic CRUD operations for student records. The application is triggered via API Gateway and performs operations like Create, Read, Update, and Delete on a DynamoDB table.

## Table of Contents
- [Setup](#setup)
  - [DynamoDB Setup](#dynamodb-setup)
  - [AWS Lambda Setup](#aws-lambda-setup)
  - [API Gateway Setup](#api-gateway-setup)
- [Testing the Application](#testing-the-application)
- [Reflection](#reflection)

---

## Setup

### DynamoDB Setup
1. Navigate to the AWS Management Console and go to **DynamoDB**.
2. Create a new table:
   - **Table Name:** `StudentRecords`
   - **Primary Key:** `student_id` (String)
3. Save the table name for future reference.

### AWS Lambda Setup
1. Go to **AWS Lambda** in the AWS Management Console.
2. Create a new Lambda function with the following settings:
   - **Function Name:** `StudentRecordHandler`
   - **Runtime:** Node.js
   - **Permissions:** Attach an appropriate IAM role to allow read/write access to DynamoDB.
3. Add the logic for handling CRUD operations:
   - **POST (Create):** Adds a new student record.
   - **GET (Read):** Fetches student details using `student_id`.
   - **PUT (Update):** Updates an existing student record.
   - **DELETE (Delete):** Deletes a student record.

### API Gateway Setup
1. Go to **API Gateway** in the AWS Management Console.
2. Create a new REST API:
   - **API Name:** `StudentAPI`
3. Set up the following resources and methods:
   - **POST /students:** For adding a new student record.
   - **GET /students:** For retrieving student details by `student_id`.
4. Deploy the API and note the **Invoke URL**.

---

## Testing the Application

You can test the application using `curl` commands or Postman. Below are examples of each CRUD operation.

### Create a Student Record (POST)
```bash
curl -X POST \
  https://<your-api-id>.execute-api.<region>.amazonaws.com/dev/students \
  -H 'Content-Type: application/json' \
  -d '{ "student_id": "student_007", "name": "sunil", "course": "SE" }'
