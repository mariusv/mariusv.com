---
date: '2011-01-12 09:03:58'
layout: post
slug: mounting-nfs-volumes-from-a-solaris-server-on-a-linux-client-with-root-access
status: publish
title: Mounting NFS volumes from a Solaris server on a Linux Client with root access
wordpress_id: '709'
categories:
- Tutorials
tags:
- linux
- nfs
- solaris
---

If you are having trouble mounting nfs volumes on a Solaris 10/11 server from a linux client, here is the secret voodo chant:


    
    solarishost# sharemgr set -P nfs -S sys -p “rw=linux_hostname,root=linux_hostname” servers



This presumes you have defined the group ’servers’. If not, use:


    
    sharemgr create -P nfs servers



and add your shares to it:


    
    sharemgr add-share -s /path/to/share -d “Your Description” servers



Simple, eh? :-P
