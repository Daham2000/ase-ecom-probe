import fs from 'fs';
import S3 from 'aws-sdk/clients/s3.js';

//Upload files to aws sdk
export const uploadContent = async (files) => {
    const lists = [];
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_KEY;
    const bucketName = "contents-1";

    const s3 = new S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    });
    await Promise.all(
        await files.map(async image => {
            const fileContent = fs.createReadStream(image.path);
            const params = {
                Bucket: bucketName,
                Key: image.originalname,
                Body: fileContent
            };

            const link = await s3.upload(params).promise();
            lists.push(link.Location);
        })
    );
    return lists;
}

