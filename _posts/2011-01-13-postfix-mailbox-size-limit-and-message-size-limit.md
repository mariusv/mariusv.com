---
date: '2011-01-13 09:55:32'
layout: post
slug: postfix-mailbox-size-limit-and-message-size-limit
status: publish
title: postfix - mailbox size limit and message size limit
wordpress_id: '714'
categories:
- Tutorials
tags:
- linux
- postfix
- squirrelmail
---

[Postfix](http://www.wikipedia.org/wiki/postfix) is my [MTA](http://en.wikipedia.org/wiki/Mail_transfer_agent) of choice. I use it for my mailserver because its simplicity , security and sendmail-compatible (the widely used smtp in the world but not as secure). It is also extensible by plugging other servers for various purposes (antispam, antivirus,database etc).

I had one problem with file attachment larger than 10MB. Users couldn't send it although I have setup squirrelmail (SM) to be able to attach files summed up more than 20MB and I had modified php settings as per [here](http://squirrelmail.org/wiki/AttachmentSize). The problem was not in SM setting. It was postfix. By default, attachment size that can be sent by postfix is _10MB ~ 10240000 byte_. How did I know it? I looked in log file (for my system it is in _/var/log/mail/errors_. For other system, the file to look is _/var/log/maillog_). The line looked like this:

_Jan 13 09:30:53 webmail postfix/sendmail[30775]: fatal: me@mymailserver.org(74): Message file too big_

**Solution**

Open _ /etc/postfix/main.cf_ with a text editor of choice and find **message_size_limit** directive and change accordingly. If it is not there, add the directive like this:

**message_size_limit = 20480000**

This sets limit to 20MB.

Some other parameters you need to change are in file php.ini which is usually located in dir _/etc_. Set their parameters as above or higher values as below:


    
    post_max_size = 20M
    upload_max_filesize = 20M



reload or restart postfix when you're done: 


    
    service postfix reload



or 


    
    service postfix restart



There's also _mailbox_size_limit_ directive. You need to change this if SM can not open mailbox sized more than 10 MB.

