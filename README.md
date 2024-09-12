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

### 1. DynamoDB Setup
Created new table in dynamoDB leaving the setting as default:
Schema
   - **Table Name:** `StudentRecords`
   - **Primary Key:** `student_id` (String)
   - **Other keys:** `name` (string)
                     `course` (string)
     
<img width="1470" alt="Screenshot 2024-09-11 at 6 47 56 PM" src="https://github.com/user-attachments/assets/40f74b29-4931-4c25-8faa-3b9f2b1ce913">
     
     

### 2. AWS Lambda Setup
#### 2.1 Created a new Lambda function with the following settings:
   - **Function Name:** `StudentRecordHandler`
   - **Runtime:** Node.js 16
     
     <img width="1470" alt="Screenshot 2024-09-11 at 6 58 20 PM" src="https://github.com/user-attachments/assets/55538113-eafe-45fd-bafc-8fc7385af526">
     <img width="1469" alt="Screenshot 2024-09-11 at 6 58 33 PM" src="https://github.com/user-attachments/assets/e76de073-da05-4141-941c-5d547c9c9bde">

   - **Permissions:** Attach `AmazonDynamoDBFullAccess` IAM role to allow read/write access to DynamoDB.

     <img width="1470" alt="Screenshot 2024-09-11 at 6 57 37 PM" src="https://github.com/user-attachments/assets/e41fba74-a07e-4896-80eb-6ed3edae1f20">

### 3. API Gateway Setup
#### 3.1 Created a new REST API:
   - **API Name:** `StudentAPI`
     
     <img width="1467" alt="Screenshot 2024-09-11 at 7 01 08 PM" src="https://github.com/user-attachments/assets/cda3ccbd-6fe0-4d83-8495-d22e9b8137fa">

#### 3.2 Creating the following resources and methods:
   - **POST /students:** For adding a new student record.
   - **GET /students:** For retrieving student details by `student_id`.
   - **PUT /students:** For updating a student record by `student_id`.
   - **DELETE /students:** For deleting a student record by `student_id`.
     
    <img width="1469" alt="Screenshot 2024-09-11 at 7 01 40 PM" src="https://github.com/user-attachments/assets/e27fd47c-2362-4443-995e-f06e3994d13a">
     
#### 3.3 Making sure Integration Type is `Lambda Function`
   
    <img width="1470" alt="Screenshot 2024-09-11 at 7 10 16 PM" src="https://github.com/user-attachments/assets/bb857821-6bb7-400c-be0a-11f6ef9a6f9b">

#### 3.4 Deploying the API in dev ENV
  - **INVOKE URL** - [https://n9rtotemdl.execute-api.us-east-2.amazonaws.com/dev]
    
    <img width="1470" alt="Screenshot 2024-09-11 at 7 05 28 PM" src="https://github.com/user-attachments/assets/e9d45ee3-84a8-4104-8093-77d8c7aca498">

---

## Testing the Application

Testing the application using `curl` commands. Below are the commands for each CRUD operation.

### 1. Create a Student Record (POST)
```bash
  curl -X POST \ 
  https://n9rtotemdl.execute-api.us-east-2.amazonaws.com/dev/students \
  -H 'Content-Type: application/json' \ 
  -d '{ "key": "student_007", "name": "sunil", "course": "SE" }'

```
  <img width="621" alt="Screenshot 2024-09-11 at 6 27 19 PM" src="https://github.com/user-attachments/assets/6d0759bb-2e5e-463d-b0db-5589fe54fc51">

### 2. Get Student Records (GET)
```bash
  curl -X GET \
  'https://n9rtotemdl.execute-api.us-east-2.amazonaws.com/dev/students?student_id=student_007'

```
  <img width="712" alt="Screenshot 2024-09-11 at 6 27 49 PM" src="https://github.com/user-attachments/assets/8a9950f7-ccda-496e-813c-4541cf7f3e10">

### 3. Updating Student Record (PUT)
```bash
    curl -X PUT \
    https://n9rtotemdl.execute-api.us-east-2.amazonaws.com/dev/students \
    -H 'Content-Type: application/json' \
    -d '{ "student_id": "student_007", "name": "sunil_updated" }'
```
  <img width="523" alt="Screenshot 2024-09-11 at 6 21 04 PM" src="https://github.com/user-attachments/assets/61aa17b8-ce33-4599-b724-c9c40afe39e3">

### 4. Deleting Student Record (DELETE)
```bash
  curl -X DELETE \
    https://n9rtotemdl.execute-api.us-east-2.amazonaws.com/dev/students \
    -H 'Content-Type: application/json' \
    -d '{ "student_id": "student_007" }'
```
  <img width="588" alt="Screenshot 2024-09-11 at 6 28 24 PM" src="https://github.com/user-attachments/assets/b56c0f4c-46b2-4d02-923e-dabcaeced63d">
