// Example Node.js AWS Polly Script that saves an mp3 file to S3
const AWS = require("aws-sdk");
AWS.config.loadFromPath(
  "/Users/BILL/gt/sandbox/projects/eLibrary/app/AWS/config.json"
);

const Polly = new AWS.Polly({
  signatureVersion: "v4",
  region: "us-east-1"
});

const s3 = new AWS.S3();
// Manejar try catch y esas cosas
exports.uploadAudio = function(bookData) {
  let string = Buffer.from(bookData.file.buffer, "hex").toString("utf8");
  string = "<speak>" + string + "</speak>";

  let pollyparams = {
    Text: string,
    TextType: "ssml",
    OutputFormat: "mp3",
    VoiceId: "Amy"
  };
  return Polly.synthesizeSpeech(pollyparams)
    .promise(
      audiodata => {
        let s3params = {
          Body: audiodata.AudioStream,
          Bucket: "elibraryt",
          Key: bookData.body.title + "_" + bookData.body.author + ".mp3",
          ACL: "public-read"
        };
        resolve(s3params);
      },
      err => {
        console.log(err.message);
      }
    )
    .then(params => {
      let audioUrl;
      s3.upload(params).promise(
        uploadData => {
          audioUrl = uploadData.Location;
          resolve(uploadData.Location);
        },
        err => {
          console.log(err.message);
        }
      );
      console.log(audioUrl)
      resolve(audioUrl);
    });
};

exports.uploadText = function(BookData) {
  let s3params = {
    Body: BookData.file.buffer,
    Bucket: "elibraryt",
    Key: BookData.body.title + "_" + BookData.body.author + ".txt",
    ACL: "public-read"
  };
  return s3.upload(s3params).promise(uploadUrl => {
    resolve(uploadUrl.Location);
  });
};
