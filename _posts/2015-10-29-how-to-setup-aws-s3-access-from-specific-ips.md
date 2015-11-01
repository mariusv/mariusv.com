---
date: '2015-10-29 13:08:50'
layout: post
slug: how-to-setup-aws-s3-access-from-specific-ips
title: How to Setup AWS S3 Access From Specific IPs
categories:
- Freelance
- Cloud
tags:
- AWS
- S3
- Freelance

---

Recently I had to setup some restricted permissions for some S3 buckets, and a requirement for the project was that we needed to grant (POST/DELETE) only from a specific IP and deny for a specific [IAM user](https://aws.amazon.com/documentation/iam/).

I started by reviewing the [AWS documentation](http://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html) but found that their example for restricting access to a specific IP didn’t seem to work for me. 	After some try and error and searching the internet and bashing my head on the wall I finally managed to nail it down to this config:

{%highlight json%}

{
  "Version": "2012-10-17",
  "Statement": [
          {
            "Sid": "IPAllow",
            "Effect": "Allow",
            "Action": ["s3:ListBucket", "s3:PutObject", "s3:DeleteObject", "s3:GetObject"],
            "Resource": "arn:aws:s3:::my-special-bucket/*",
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": "project_ip/32"
                }
            }
        }
    ]
}

{% endhighlight %}

Success!

This could be used as well for added layers of security with your existing applications that use/access S3 - not just nodes within a [VPC](https://aws.amazon.com/documentation/vpc/). I hope this helps someone out there from any undue stress when trying to securing your S3 access.
