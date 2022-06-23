import fs from 'fs';
import {S3} from "aws-sdk";

export default class ContentUploadService {
    static async uploadContent(files,
    ) {
        const lists = [];
        const accessKeyId = process.env.AWS_ACCESS_KEY;
        const secretAccessKey = process.env.AWS_SECRET_KEY;
        const bucketName = "contents-1";

        const s3 = new S3({
            accessKeyId,
            secretAccessKey
        });

        files.map(async image => {
            const fileContent = fs.createReadStream(image.path);
            const params = {
                Bucket: bucketName,
                Key: image.originalname,
                Body: fileContent
            };

            const link = await s3.upload(params).promise();
            lists.push(link);
        });
        return lists;
    }
}
