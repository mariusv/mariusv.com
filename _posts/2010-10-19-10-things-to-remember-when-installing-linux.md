---
date: '2010-10-19 08:29:39'
layout: post
slug: 10-things-to-remember-when-installing-linux
status: publish
title: 10 Things to Remember When Installing Linux
wordpress_id: '540'
categories:
- Personal
- Tutorials
tags:
- bash
- linux
- usb
---

              
                    

Not the usual bunch!






  1. Always check twice before blindly pressing Return through the Key Board selection and the Country screens. Although I haven’t practically gone through one, one can’t simply risk having the key board respond in the most foolish manner ever.


  2. If the installation seems to take a while, don’t leave the screen. There might be intermediate screens asking for stuff like, network mirrors etc. It is not pleasant to come back after half an hour to find out that the installation had been paused just for you to select the option “Yes” to install GRUB the minute you left.


  3. Have separate /boot, /home and / (root) partitions if possible. This is common practice. Just to make sure that a 100Mb porn clip download would not keep the machine from booting.


  4. Format the /boot partition as Ext2. Ext3 onwards introduce Journaling, and thus takes extra space to store the Journal. For the /boot partition, this feature is almost useless, as it is only needed to load the kernel and the ramdisk to the memory. Ext2 on a 200Mb partition will be more than enough.


  5. Make sure to flag the boot partition as “Bootable” in the disk partitioning step. Although the Graphical Install option might just do this automatically, normal installations require you to specify the boot partition manually.



  6. Skip the network information section if possible. You don’t want the installation to start downloading the latest packages and updates from the Internet, during the peak hours of the day.


  7. Enter a strong root password in the installation. Chances are that after finishing the installation, you would most probably forget the root account (especially if you are a fan of sudo). And if you had entered an easy password, the people targeting the root account will have no hard time cracking it.


  8. Remove any USB drives and portable storage devices before the installation starting step, in case you had plugged them into load drivers during the pre-installation steps. There is a good chance that the installer might use the portable drive to install the GRUB.


  9. Learn Vi! The default text editor for the terminal in Linux is Vi and not Vim. Vi is designed considering only the QWERTY key board and not the arrow keys and the End, Home etc key set. [Here](http://www.eng.hawaii.edu/Tutor/vi.html) is a good starting point.


  10. Enable bash completion for your account. Bash Completion is the functionality which allows bash to complete the words on Tab press. This is particularly useful when using Apt (haven’t tried on Yum, but should work theoretically). This can be done by un-commenting the following lines in your $HOME/.bashrc file (or in some systems .bash_profile)




`if [ -f /etc/bash_completion ] && ! shopt -oq posix; then  

. /etc/bash_completion  

fi`
