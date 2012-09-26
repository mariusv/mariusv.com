---
date: '2012-08-02 20:41:52'
layout: post
slug: kill-idle-linux-users
title: Kill Idle Linux Users
categories:
- Tutorials
tags:
- kill
- PID
- ssh
---

Every once in awhile somebody asks me how to log off a dead user. This is how you discover the inactive session using the `w` command:

	21:00:01 up 78 days,  2:41,  2 users,  load average: 0.08, 0.02, 0.75
	USER     TTY      FROM              LOGIN@   IDLE   JCPU   PCPU WHAT
	root     pts/0    213-142-142-014. 20:55    0.00s  0.03s  0.00s w
	root     pts/1    91.151.91.19     Mon11    3days  2days  0.03s -bash

You can easily spot the idle user by looking at the IDLE column; the user in the first row has been idle for 3 days. There are many ways of killing idle users, but here I’ll show you my favorite one. The bottom line is, you need to kill the parent process created by the idle user when he logged in. 

Looking at the output from the `w` command above, we can see that the idle users’ TTY is pts/1 so now all we need is the PID for the parent process. We can find that by running 
    
    who -all | grep root


Here we can see that 31472 is the PID for the parent process of pts/1, so once we issue `kill -1 31472` that idle session will be gone!

	root     + pts/0        2012-08-02 20:55   .         17366 (213-142-142-014.reverse.adeox.com)
	root     + pts/1        2012-07-30 11:49  old        31472 (91.151.91.19)


