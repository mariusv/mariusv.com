---
date: '2010-03-25 14:40:57'
layout: post
slug: how-to-create-ramdisk-in-ubuntulinux
status: publish
title: How to create ramdisk in Ubuntu/Linux
wordpress_id: '75'
categories:
- Technology
- Tutorials
tags:
- disk
- ram
- ubuntu
- VRD
---

I hope many of you will agree that sometimes itâ€™s really good idea to have some small amount of RAM mounted as a filesystem. It may be necessary when running some bash or perl script that handles, say, thousands of small files so itâ€™s much more effective not to waste computer resources on reading/writing data on hard disk but keep those files directly in memory. This idea is known as [Virtual RAM Drive](http://en.wikipedia.org/wiki/RAM_disk) or **ramdisk** and can be setup in **Ubuntu** or almost any other **Linux** distribution using the following commands under root (to become root in Ubuntu use `"**sudo -s**`â€œ):




    
    # <strong>mkdir /tmp/ramdisk; chmod 777 /tmp/ramdisk</strong><br>
    # <strong>mount -t tmpfs -o size=256M tmpfs /tmp/ramdisk/</strong>




where 256M is amount of RAM you wish to allocate for ramdisk. Itâ€™s clear that this value should be **less than amount of free memory** (use â€œ`free -m`â€œ). BTW, if you specify too many MBs for ramdisk Linux will try to allocate it from RAM and then from swap so resulting performance would be very poor.
