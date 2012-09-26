---
date: '2010-07-05 13:28:11'
layout: post
slug: backup-and-restore-mysql-from-shell
status: publish
title: Backup and restore MySQL from shell
wordpress_id: '272'
categories:
- Tutorials
tags:
- backup
- mysql
---

Backup is a **VERY** important thing. I’m unfortunately not the best to remember it myself and it’s been costly.. But it is also very nice to dump all tables to a file and move it to another server and restore it with a simple command (after you have created the database of course).

To back up your database use the following command:


    
    mysqldump -u [Username] -p[password] [databasename] > [backupfile.sql]



And to restore it again use this:


    
    mysql -u [Username] -p[password] [databasename] < [backupfile.sql]



And then it’s done! Just remember to store your backups a safe place.
