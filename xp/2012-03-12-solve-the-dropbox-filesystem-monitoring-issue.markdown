---
date: '2012-03-12 02:16:56'
layout: post
slug: solve-the-dropbox-filesystem-monitoring-issue
status: publish
title: Solve the Dropbox filesystem monitoring issue
wordpress_id: '1187'
categories:
- Personal
- Tutorials
tags:
- dropbox
- filesystem
- limits
---

Once Dropbox throws you an error that says `Unable to monitor filesystem. Please run: echo 100000 | sudo tee /proc/sys/fs/inotify/maxuserwatches` and restart Dropbox to correct the problem." you'd better adjust settings in _sysctl.conf_ file, to keep changes after reboot.

Open system config (as superuser, of course) in your favorite text editor(mine is vi):


    
    vi /etc/sysctl.conf



Add this line to the end of the file:


    
    fs.inotify.max_user_watches = 100000


Save the file (Shift-ZZ, if you are new to Vi). 


    
    sysctl -p



To apply the settings and then just restart Dropbox.

If you, by any chance, spent the last couple of years living under a rock thus still don't use Dropbox, [create an account immidiately](http://db.tt/ql5EuYN). You will get a regular 2GB free online storage, plus 250MB extra free space if you register via my referral link.
