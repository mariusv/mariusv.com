---
date: '2010-11-12 07:12:17'
layout: post
slug: back-up-your-important-files
status: publish
title: Back up your important files
wordpress_id: '659'
categories:
- Personal
- Tutorials
tags:
- backup
---

Once you have got your distro setup all nicely, backup all your important config files !!




Why ?




Because you just know that sooner or later you are going to mess with something, or try to install something that you are going to wish you hadn’t touched, and completely bork your system, aren’t you?




yes sir!




Ok,


**Open the terminal and copy and paste these commands:**



> marius@valhalla:~$ su -c "mkdir backups"  

marius@valhalla:~$ su  

root@valhalla:/home/marius# cp -f /etc/modules backups/  

root@valhalla:/home/marius# cp -f /etc/apt/sources.list backups/  

root@valhalla:/home/marius# cp -f /etc/X11/xorg.conf backups/  

root@valhalla:/home/marius# cp -f /etc/X11/xorg.conf.* backups/  

root@valhalla:/home/marius# cp -f /etc/fstab backups/  

root@valhalla:/home/marius# cp -f /etc/resolv.conf backups/  

root@valhalla:/home/marius# cp -f /etc/hosts backups/  

root@valhalla:/home/marius# cp -f /boot/grub/menu.lst backups/  

root@valhalla:/home/marius# cp -f /etc/network/interfaces backups/  

root@valhalla/home/marius# dpkg –get-selections >> backups/packagelist


**Now do a quick ls (list) of the Backups directory**


> root@valhalla:/home/marius# ls backups  

fstab menu.lst packagelist sources.list xorg.conf.20080119182617  

hosts modules resolv.conf xorg.conf xorg.conf.failsafe  

root@valhalla:/home/marius#





Yup! all there




Now burn them to a CD, put them on a USB pendrive, write them on the wall with lipstick…. I don’t care, just keep them safe ;)




