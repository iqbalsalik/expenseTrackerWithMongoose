require("dotenv").config();

const AWS = require("aws-sdk");



exports.uploadToAws = async (data,name)=>{
    try{
        const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
        const IAM_USER_KEY = process.env.AWS_USER_KEY;
        const IAM_USER_SECRET = process.env.AWS_USER_SECRET;
    
        let s2Bucket = new AWS.S3({
            accessKeyId:IAM_USER_KEY,
            secretAccessKey:IAM_USER_SECRET,
            Bucket:BUCKET_NAME
        })
    
        var params = {
            Bucket:BUCKET_NAME,
            Key:name,
            Body:data,
            ACL:"public-read"
        }
    
        return new Promise((resolve,reject)=>{
            s2Bucket.upload(params,(err,response)=>{
                if(err){
                    reject(err)
                }else{
                    resolve (response.Location)
                }
            })
        })
    }catch(err){
        return err
    }
    }