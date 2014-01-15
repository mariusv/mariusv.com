---
date: '2010-02-08 11:06:51'
layout: post
slug: root-login-email-notification
status: publish
title: Root Login Email Notification
wordpress_id: '11'
categories:
- Tutorials
tags:
- email
- linux
- root login
- sudo
- ubuntu
---

Configuring your server so that when someone logs in with root or su, your server will notify you via email.

Please use an email address that is **NOT** hosted on your server as a hacker could merely delete the emails right off the server.

Login to your server with root

Use any editor to edit .bash_profile

At the end of the file, place the following lines:




    
    echo 'ALERT - Root Shell Access on:' `date` `who` | mail -s "Alert: 
    Root Access from `who | cut -d"(" -f2 | cut -d")" -f1`" user@example.com

*Note that the code is one line



Now anytime someone gains root access you will be notified via email.

