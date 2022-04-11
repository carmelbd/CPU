'use strict'

const {
    GlobalAccelerator
} = require('aws-sdk');
var AWS = require('aws-sdk');
var uuid = require('uuid');
AWS.config.update({
    region: 'us-east-1'
});

let endTime = new Date()

let durationInMinutes = 5;
let startTime = new Date(endTime).setMinutes(endTime.getMinutes() - durationInMinutes);


startTime = new Date(startTime).toISOString();
endTime = endTime.toISOString();

let params = {
    EndTime: endTime,
    MetricName: 'CPUUtilization',
    Namespace: 'AWS/EC2',
    Period: '3600',
    StartTime: startTime,
    Statistics: [
        'Maximum'
    ],
    Dimensions: [{
        Name: "InstanceId",
        Value: '172.31.74.202'
    }]
};

// return data['Reservations'][0].Instances[0].InstanceId
// var ec2 = new AWS.EC2();
// ec2.describeInstances(function (err, data) {
//     if (err){
//         console.log(err, err.stack); // an error occurred
//     }
//     else{
//         return callback(data['Reservations'][0].Instances[0].InstanceId);
//     }
// }); 

// process.exit(1)


let ec2 = new AWS.EC2();
function getInstanceId(callback, params) {
    ec2.describeInstances(async function (err, data) {
        if (err) {
            console.log("error" + err, err.stack); // an error occurred
        } else {
            return await callback(data['Reservations'][0].Instances[0].InstanceId);

        }
    });
}

getInstanceId(function (data) {
    console.log(`line 63: ${data}`);
    return data
});

// function getPromise() {
//     return new Promise((callback) => {
//         ec2.describeInstances(function (err, data) {
//             if (err){
//                 console.log("error" + err, err.stack); // an error occurred
//             }
//             else{
//                 callback(data['Reservations'][0].Instances[0].InstanceId);
//             }
//         }); 
//     })
// }

// function getResults(){
//     getPromise()
//     .then(function(response) {
//         return response;
//     })
// }

// let result = getResults();
// console.log(result)

// console.log(a)
// // Sending a Request Using CloudWatch //
// let cloudwatch = new AWS.CloudWatch({
//     apiVersion: '2010-08-01'
// });
// cloudwatch.getMetricStatistics(params, function (err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log(data);
// });