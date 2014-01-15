---
date: '2010-06-24 08:32:15'
layout: post
slug: install-latest-kernel-in-ubuntu-10-04
status: publish
title: Install latest kernel in Ubuntu 10.04
wordpress_id: '207'
categories:
- Tutorials
tags:
- kernel
- linux
- nVidia
- ubuntu
---

This short walkthrough describes how to get the latest linux kernel working under Ubuntu Linux without having to compile it yourself.

This tutorial should work with the latest version of Ubuntu Linux (10.04 ) and all distributions based on these versions of Ubuntu Linux like Mint.

The included kernel files have been compiled using the generic ubuntu configuration. 
**Note**: nVIDIA ForceWare drivers are automatically installed using DKMS

**Installation Guide**

1. Download [linux-headers-2.6.34-020634_2.6.34-020634_all.deb](http://kernel.ubuntu.com/~kernel-ppa/mainline/v2.6.34-lucid/linux-headers-2.6.34-020634_2.6.34-020634_all.deb)

2. Download your kernel headers package;
**I386**:  [linux-headers-2.6.34-020634-generic_2.6.34-020634_i386.deb](http://kernel.ubuntu.com/~kernel-ppa/mainline/v2.6.34-lucid/linux-headers-2.6.34-020634-generic_2.6.34-020634_i386.deb)
**AMD64**: [linux-headers-2.6.34-020634-generic_2.6.34-020634_amd64.deb](http://kernel.ubuntu.com/~kernel-ppa/mainline/v2.6.34-lucid/linux-headers-2.6.34-020634-generic_2.6.34-020634_amd64.deb)

3. Download your kernel compile;
**I386**:  [linux-image-2.6.34-020634-generic_2.6.34-020634_i386.deb](http://kernel.ubuntu.com/~kernel-ppa/mainline/v2.6.34-lucid/linux-image-2.6.34-020634-generic_2.6.34-020634_i386.deb)
**AMD64**: [linux-image-2.6.34-020634-generic_2.6.34-020634_amd64.deb](http://kernel.ubuntu.com/~kernel-ppa/mainline/v2.6.34-lucid/linux-image-2.6.34-020634-generic_2.6.34-020634_amd64.deb)

4. Install the files in the same order (else it won`t work!)

5. In the terminal run:

    
    sudo update-grub



6. Reboot and select the kernel from the bootloader menu
For those who want to do their â€œownâ€ compiles, the source is also available; [linux-source-2.6.34_2.6.34-020634_all.deb](http://kernel.ubuntu.com/~kernel-ppa/mainline/v2.6.34-lucid/linux-source-2.6.34_2.6.34-020634_all.deb)

