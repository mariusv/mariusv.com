---
date: '2010-10-20 10:56:29'
layout: post
slug: optimize-all-tables-from-all-databases
status: publish
title: Optimize all tables from all databases
wordpress_id: '565'
categories:
- Personal
- Tutorials
tags:
- mysql
- optimize
- root
---

The following command will optimize all of your databases' tables within MySQL.
It is important to optimize tables to reduce data fragmentation.

    
    mysqlcheck -Aop -uroot


If you are not using **root** replace it with your username.





**-A** : Check all tables in all databases. This is the same as using the --databases option and naming all the databases on the command line.  

**-o** : optimize the tables.  

**-p** : Prompts for a password to use when connecting to the MySQL server.  

**-u** : The MySQL user name to use when connecting to the server.
