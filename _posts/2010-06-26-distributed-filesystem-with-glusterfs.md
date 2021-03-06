---
date: '2010-06-26 09:11:01'
layout: post
slug: distributed-filesystem-with-glusterfs
status: publish
title: Distributed filesystem with GlusterFS
wordpress_id: '224'
categories:
- Tutorials
tags:
- filesystem
- glusterfs
- ubuntu
---

This setup contains two [GlusterFS-servers](http://www.gluster.org/) and one client, named _s01_, _s02_ and _c01_ in the examples below. Data stored in the mount point on _c01_ will be destributed to _s01_ and _s02_.

The [Ubuntu](http://ubuntu.com) APT repository doesnâ€™t have the latest GlusterFS version, which we want. So weâ€™ll have to build it ourself. Do this on all 3 nodes.

Install packages required to build GlusterFS.



    
    # aptitude install build-essential flex bison




Download and install GlusterFS. As of date, 3.0.2 is the latest version.


    
    # wget http://ftp.gluster.com/pub/gluster/glusterfs/3.0/LATEST/glusterfs-3.0.2.tar.gz
    # tar zxf glusterfs-3.0.2.tar.gz
    # cd glusterfs-3.0.2
    # ./configure
    # make
    # make install
    # ldconfig



Make sure /export/sda2 exists on both servers, this folder will contain the data stored on the volume.

On _s01_, do this.


    
    # mkdir /etc/glusterfs
    # cd /etc/glusterfs
    # glusterfs-volgen --name storage01 s01:/export/sda2 s02:/export/sda2
    # ln -s s01-storage01-export.vol glusterfsd.vol
    # /etc/init.d/glusterfsd start



On _s02_, do this.


    
    # mkdir /etc/glusterfs
    # cd /etc/glusterfs
    # glusterfs-volgen --name storage01 s01:/export/sda2 s02:/export/sda2
    # ln -s s02-storage01-export.vol glusterfsd.vol
    # /etc/init.d/glusterfsd start



On _c01_, do this.


    
    # mkdir /etc/glusterfs
    # cd /etc/glusterfs
    # glusterfs-volgen --name storage01 s01:/export/sda2 s02:/export/sda2



Edit /etc/fstab on c01 and add the following line.


    
    /etc/glusterfs/storage01-tcp.vol        /storage        glusterfs defaults,_netdev      0       0



The share can now be mounted on the client.


    
    # mount /storage
    # mount
    ...
    /etc/glusterfs/storage01-tcp.vol on /storage type fuse.glusterfs (rw,allow_other,default_permissions,max_read=131072)



Thatâ€™s it, for more failsafe setup, consider using â€“raid for the glusterfs-volgen command.



