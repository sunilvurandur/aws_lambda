const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = 'StudentRecords'
exports.handler = async (event) => {
    let resp;
  const params = {
    TableName: tableName
  };

  try {


    console.log(event)
    switch(event.httpMethod){
        case 'GET':
            resp = await getRecord(event);
            break;
        case 'POST':
            resp = await createRecord(event);
            break;
        case 'PUT':
            resp = await updateRecord(event);
            break;
        case 'DELETE':
            resp = await deleteRecord(event);
            break;
        default:
            console.log('unknown');
            break;

    }
    console.log("resp", resp);
    let response = buildResponse(200, resp)
    return response;
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve data' }),
    };
  }
};

const getRecord = async (event)=>{
    const params = {
        TableName: tableName,
        Key: { student_id: event.queryStringParameters?.student_id },
    };
    try {
        const result = await dynamoDb.get(params).promise();
        if (result.Item) {
            return {
                statusCode: 200,
                body: JSON.stringify(result.Item),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Record not found' }),
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            body: 'something went wrong'
        }
    }
}

const createRecord = async(event)=>{
    let data = JSON.parse(event.body);
    //forming the params
    let params = {
        TableName: tableName,
        Item: {
            'student_id': data.key,
            'name': data.name,
            'course': data.course
        }
    }

    try {
        await dynamoDb.put(params).promise();
        return {
            status: 201,
            data: "Record created successfully"
        }
    } catch (error) {
        console.log(error)
        return {
            status:500,
            data:"something went wrong"
        }
    }
}

const updateRecord = async(event)=>{

    const data = JSON.parse(event.body)
    const {name} = data;
    let params = {
        TableName: tableName,
        Key: { student_id: data.student_id },
        UpdateExpression: `set #name = :name`, 

        ExpressionAttributeNames: {
            "#name": "name",
        },
        ExpressionAttributeValues: {
            ":name": name, 
        },
        ReturnValues: "UPDATED_NEW",
        
    }
    try {
        const result = await dynamoDb.update(params).promise();
        return {
            status: 200,
            body: result.Attributes ,
        };
    } catch (err) {
        console.error('Error updating record:', err);
        return {
            status: 500,
            body: JSON.stringify({ error: 'Could not update record' }),
        };
    }
}

const deleteRecord = async(event)=>{
    const data = JSON.parse(event.body)
    const params = {
        TableName: tableName,
        Key: { student_id: data.student_id },
    };

    try {
        const result = await dynamoDb.delete(params).promise();
        if (result) {
            return {
                status: 200,
                body: JSON.stringify({ message: 'Record deleted successfully' }),
            };
        } else {
            return {
                status: 404,
                body: JSON.stringify({ error: 'Record not found' }),
            };
        }
    } catch (error) {
        console.error('Error updating record:', err);
        return {
            status: 500,
            body: JSON.stringify({ error: 'Could not update record' }),
        };
    }
}
const buildResponse = (statusCode, data) => {
    return {
        statusCode: statusCode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
};
