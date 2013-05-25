---
date: '2010-04-02 16:43:48'
layout: post
slug: shrink-or-resize-logical-volumes-lvm-on-rhel
status: publish
title: Shrink or resize logical volumes LVM on RHEL
wordpress_id: '114'
categories:
- Tutorials
tags:
- centos
- fedora
- redhat
- RHEL
---

By default RHEL, CentOS, Fedora use all available space for the LV â€œLogVol00â€³, which means that to shrink the partition you must first boot from the CenOS CD enter rescue mode then check the file system, resize the file system and then finally resize the LV. Worth noting this guide should work for just about any distro using LVM2, however the LV name will most likely be different, this guide also assumes you want to resize you LV to 10G, if you donâ€™t obviously change the size.

Before carrying out any of this guide DO A BACKUP, if you mess up the chances are your box will be hosed! Also follow this guide in order, if you resize the LV before you resize the file system, then your system is going to be fubarâ€¦

This is how we do that:

Boot the first CentOS 5 CD and Press F5 and the boot prompt, then type â€œlinux rescueâ€ at the prompt.

Select your language and other relevent settings as the setup asks you, it will then display a message about auto detecting your CentOS installation, select skip.

This should now drop you to a prompt, type the following commands:

    
    lvm vgchange -a -y


Check the file system to make sure itâ€™s clean before we resize any thing:

    
    e2fsck -f /dev/VolGroup00/LogVol00


Resize the file system using:

    
    resize2fs /dev/VolGroup00/LogVol00 10G


Finally itâ€™s time to resize the LV:

    
    lvm lvreduce -L10G /dev/VolGroup00/LogVol00


You will get a warning message when you run the above command, I accepted this.

Reboot and you should be done!

You can thank me by linking to my Blog :)
