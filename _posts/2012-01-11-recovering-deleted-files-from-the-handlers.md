---
date: '2012-01-11 15:29:05'
layout: post
slug: recovering-deleted-files-from-the-handlers
status: publish
title: Recovering deleted files from the handlers
wordpress_id: '1162'
categories:
- Technology
- Tutorials
tags:
- compromised servers
- logs
---

On compromised servers it is very common for the exploit to delete its self/logs to hide its presence.

Even though the executable may be removed from the filesystem as the process is forked from apache2 the parent process will still have file handlers open.

This will allow you to recover log files/executables as long as you do not kill the process.

To recover the files use the following steps:




  * Find the PID of the process with the open file handlers (use lsof)


  * _cd /proc/ /fd_ where is what you found using lsof above


  * _ls -lra_ and you should see a load of broken symlinks (red)


  * Copy the file using _cp_ into another directory




