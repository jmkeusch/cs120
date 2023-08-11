//CSV Import & Parser
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const results = [];
const obj = null;
url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-fbpcd/endpoint/data/v1';

fs.createReadStream('companies.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);
    });




//DB Connection
// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "companies",
//     "database": "stocks",
//     "dataSource": "Cluster0",
//     "projection": objCos
// });

// var config = {
//     method: 'post',
//     url: 'https://us-east-1.aws.data.mongodb-api.com/app/data-fbpcd/endpoint/data/v1/action/findOne',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//       'api-key': 'Kxxq34i2ydGPqf0Uh3I3ZO9Ro62vU3vNpChXyRyUr85tj9NyTHi5k13x9F4uOwjC',
//     },
//     data: data
// };
            
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });


    // var data = JSON.stringify({
    //     "collection": "companies",
    //     "database": "stocks",
    //     "dataSource": "Cluster0",
    //     "projection": {
    //         "_id": 1
    //     }
    // });