
# AWS Cheatsheet

## Configure AWS CLI via environment variables

```
export AWS_ACCESS_KEY_ID=<aws_access_key_id>
export AWS_SECRET_ACCESS_KEY=<aws_secret_access_key>
```

## S3

```
# aws s3 cp <local_file_path> s3://<bucket_name>/<file_name_or_path>
aws s3 cp /tmp/db.sql s3://jenkins-mysql-backup/db.sql
```
