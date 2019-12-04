// Example Node.js AWS Polly Script that saves an mp3 file to S3
const AWS = require('aws-sdk')

AWS.config.loadFromPath('C:/Users/GRADO/Desktop/PRA_4/eLibrary/app/AWS/awscreds.json');


const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

const s3 = new AWS.S3();

exports.uploadAudio = async function (req, res, next) {
let string = Buffer.from(req.file.buffer, 'hex').toString('utf8')
string ='<speak>'+ string +'</speak>';

console.log(string);

let pollyparams = {
    'Text': string,
    'TextType': "ssml", 
    'OutputFormat': 'mp3',
    'VoiceId': 'Amy'
}
    Polly.synthesizeSpeech(pollyparams, (err, data) => {
    if (err) {
        console.log(err.message)
    } else if (data) {
        let s3params = {
            Body: data.AudioStream, 
            Bucket: "elibraryt", 
            Key: "prue.mp3",
            ACL: "public-read"
        };

        s3.upload(s3params, function(err, data) {
            if (err) {
                console.log(err.message);
            } else {    
                console.log(data.Location);
                next();
            }
        });

        
    }
})}