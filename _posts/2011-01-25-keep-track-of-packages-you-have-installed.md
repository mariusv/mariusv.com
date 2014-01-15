---
date: '2011-01-25 15:03:04'
layout: post
slug: keep-track-of-packages-you-have-installed
status: publish
title: Keep track of packages you have installed
wordpress_id: '742'
categories:
- Tutorials
tags:
- centos
- debian
- pakages
---

During development on a linux system, you probably install many packages using your favorite package manager. When you have to use a new system, or reimage your current one, it can be a pain to remember all the packages you had setup. One solution is to keep a list of the packages installed after the OS load, and then periodically generate a list of what has been added since.

On a freshly installed system, create the starting baseline list of packages:


    
    # On Debian based systems(Ubuntu):
    dpkg --get-selections > packages.txt
     
    # Or CentOS/Fedora:
    yum list installed > packages.txt



You can run the command again at a later time, concatenating the output into a different file so you can view what has changed since the original system setup. Use a diff tool like diff3, vimdiff, or meld:

    
    meld packages-old.txt packages.txt



On Debian systems, once you have that file you can use it in a new or different system to mark packages to install using the **–set-selection parameter**:


    
    dpkg --set-selections < packages.txt
    sudo apt-get upgrade
