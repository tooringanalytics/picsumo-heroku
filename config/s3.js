// S3 config parameters
module.exports.s3 = {
    key: process.env.AWS_KEY_ID,            // for example: 'XXXXXXXXXXXXXXXXXXXX'
    secret: process.env.AWS_SECRET_KEY,     // 'YOUR AWS SECRETE KEY GOES HERE', for example: 'aBcDEFGhiJklMnOpQrstUVWxYzaBcDEFGhiJklMn'
    bucket: process.env.AWS_BUCKET_NAME,    // 'YOUR AWS BUCKET NAME GOES HERE', for example: 'ironyard'
    region: process.env.AWS_S3_REGION       // 'YOUR AWS S3 REGION GOES HERE' for example: 'us-west-2'
};
