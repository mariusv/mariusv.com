---
date: '2012-06-22 21:00:58'
layout: post
slug: boot-is-full
title: Boot is full

categories:
- Tutorials
tags:
- boot
- kernel
- ubuntu
---

Did you ever tried to upgrade your Ubunu server and got this error _The upgrade needs a total of 15.7M free space on disk '/boot'. Please free at least an additional 9324k of disk space on '/boot'. Empty your trash and remove temporary packages of former installations using 'sudo apt-get clean'._ but sadly apt-get clean didn't worked? I had the same problem on 145 of my Ubuntu servers and this is how I solve it:

First of all we need to find out how many kernel versions we have installed and we do this using this command:


    
    marius@valhalla:/boot$ dpkg -l | grep linux-image



And this is **MY** output:


    
    ii  linux-image-2.6.32-30-server  2.6.32-30.59  Linux kernel image for version 2.6.32 on x86
    ii  linux-image-2.6.32-31-server  2.6.32-31.61  Linux kernel image for version 2.6.32 on x86
    ii  linux-image-2.6.32-32-server  2.6.32-32.62  Linux kernel image for version 2.6.32 on x86
    ii  linux-image-2.6.32-33-server  2.6.32-33.72  Linux kernel image for version 2.6.32 on x86
    ii  linux-image-2.6.32-34-server  2.6.32-34.77  Linux kernel image for version 2.6.32 on x86
    iF  linux-image-2.6.32-35-server  2.6.32-35.78  Linux kernel image for version 2.6.32 on x86
    iU  linux-image-server            2.6.32.36.42  Linux kernel image on Server Equipment.



so the solution is easy...just get rid of your old kernels by using(I'm using _dpkg_ just because in my case _apt-get purge --remove_ didn't worked:


    
    sudo dpkg --remove linux-image-2.6.32-30-serverlinux-image-2.6.32-32-server



Now all you have to do is `apt-get -f install` and your server will start the upgrade.
