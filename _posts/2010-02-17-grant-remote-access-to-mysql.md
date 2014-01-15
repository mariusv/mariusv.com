---
date: '2010-02-17 16:46:55'
layout: post
slug: grant-remote-access-to-mysql
status: publish
title: Grant remote access to MySQL
wordpress_id: '26'
categories:
- Technology
- Tutorials
tags:
- mysql
- remote
---

Here is a small tutorial if you want to grant remote access to a DB on your server.

First login trough SSH on your server and get access to you mysql




    
    $mysqladmin -u XXX password  XXX



Note: that db_user and db_passwd are your database username and database password



    
    GRANT ALL PRIVILEGES ON db_base.* TO db_user @â€™%â€™ IDENTIFIED BY â€˜db_passwdâ€™;



You can also grant accesss to a specific IP adress


    
    GRANT ALL PRIVILEGES ON failserv_example.* TO failserver@â€™XX.XX.XX.XXâ€™ IDENTIFIED BY â€˜db_passwdâ€™;
    
        (where X is your own remote IP)



After that to activate your setting type


    
    FLUSH PRIVILEGES;



And exit your mysql


    
    $mysql>quit



