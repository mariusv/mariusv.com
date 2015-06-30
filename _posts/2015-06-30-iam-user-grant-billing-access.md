---
date: '2015-06-30 22:07:40'
layout: post
slug: iam-user-grant-billing-access
title: AWS IAM user grant billing access
categories:
- Personal
- Cloud
tags:
- AWS
- IAM
- Freelance
- Amazon

---

For the first time in 8+ years of using [AWS](https://aws.amazon.com/) I had to give access to a IAM user to Billing on the [AWS Console](https://console.aws.amazon.com). At the beginning I though meh, this will be a easy peasy task so I went ahead and created the `Billing Group` to which I added the [Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies_overview.html)

***Policy :***

{%highlight json%}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "aws-portal:ViewBilling"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Deny",
            "Action": [
                "aws-portal:ViewPaymentMethods",
                "aws-portal:ModifyPaymentMethods",
                "aws-portal:ViewAccount",
                "aws-portal:ModifyAccount",
                "aws-portal:ModifyBilling"
            ],
            "Resource": "*"
        }
    ]
}{%endhighlight%}


If you look at it you see that the user which is part of the `Billing` group has pretty much a ***read-only*** access to the Billing part of the AWS Console Portal. So looking at AWS documentation everything is right and the user should be able to see the invoices/costs or at least this should happen in theory but the reality is different, my test user still doesn't have access to bills. After the ***ARGHHHHH*** moment passed I started looking around with the hope that I would finally find the freaking solution to my problem. After few minutes of [Googling](https://www.urbandictionary.com/define.php?term=Googling&defid=1306) I managed to find the so freaking easy solution :-)

***Solution :***

{%raw%}
The account owner needs to go to the [Account Settings](https://console.aws.amazon.com/billing/home#/account) page for the account using the root (account) password. (Note that IAM users, even with full permissions, cannot get to this page.) On the account settings page, there's a section titled ***IAM User Access to Billing Information***. The account owner should click ***Edit***, select the ***Activate IAM Access*** check box, and then click ***Update***
{%endraw%}

As [Porky Pig](https://en.wikipedia.org/wiki/Porky_Pig) said "[Yep Yep that's all folks!!!](http://www.youtube.com/watch?v=gBzJGckMYO4)"

