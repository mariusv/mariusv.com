---
date: '2012-02-20 13:03:24'
layout: post
slug: check-if-your-server-is-about-to-run-fsck-soon
status: publish
title: Check if your server is about to run fsck soon
wordpress_id: '1181'
categories:
- Personal
- Tutorials
tags:
- aws
- debian
- fsck
---

Couple of weeks ago I updated my debian server. And when I restarted it, it didn’t came up. To make things worse, the EC2 Console interface didn't helped too much so I couldn’t see what’s really going on. I presumed that the system isn’t responding because of some kernel panic. After a while, I gave up for that night in hope the in the morning the EC2 Console would be sorted out. To my surprise, the EC2 Console was still out of work, but the server was up again. Apparently, the system wasn’t stuck on kernel panic, but on fsck'ing the hdd's. So in order to avoid such problems in the future I looked for a way to tell when the system is going to run fsck after the next reboot .


    
    root@thoraxe:~# tune2fs -l /dev/xvda2



In the output you will find the following lines:


    
    Mount count:              11
    Maximum mount count:      20
    Last checked:             Sat Jan 14 23:27:11 2012
    Check interval:           15552000 (6 months)



_Maximum mount count_ is the number of mounts after which the filesystem will be checked by fsck. _Check interval_ is the maximal time between two filesystem checks. The command also lets you see the actual mount count since the last check and when it took place.
