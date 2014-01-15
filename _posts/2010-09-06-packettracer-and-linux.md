---
date: '2010-09-06 07:43:44'
layout: post
slug: packettracer-and-linux
status: publish
title: PacketTracer and Linux
wordpress_id: '425'
categories:
- Tutorials
tags:
- CISCO
- packetracer
---

There is a bug with PacketTracer which seems relatively minor but can cause a lot of frustration to users.




**Take me for example:** The first day in class we were given a review packet tracer file to work on. I forgot to save and when I finally remembered it bit me in the but! I went to save my work and PacketTracer crashed! I lost everything.




**Issue:** PacketTracer 5.2.1 crashes / segfaults on linux when saving files.




**Reason:** PacketTracer 5.2.1 is built against Qt 4.4.3. However, it is using the system version of Qt which is likely newer. In my case, I’m using Qt 4.5.3. Many other distributions also use 4.5.3. It appears that there has been a code change between Qt 4.4.3 and 4.4.5; therefore, making 4.4.5 incompatible with PT 5.2.1.





**Solution:** Have PacketTracer use the qt libs that it ships with.  

This can be accomplished with the use of LD_LIBRARY_PATH and a shell script.




    
    #!/bin/sh
    export LD_LIBRARY_PATH="/opt/pt/lib"
    /opt/pt/bin/PacketTracer5



Adjust the paths as necessary, save the file, and make it executable.
PT might not look as nice and pretty, but it won’t crash!
