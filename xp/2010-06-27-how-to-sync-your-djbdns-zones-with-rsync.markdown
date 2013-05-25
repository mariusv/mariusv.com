---
date: '2010-06-27 10:21:08'
layout: post
slug: how-to-sync-your-djbdns-zones-with-rsync
status: publish
title: How to sync your djbdns zones with rsync
wordpress_id: '221'
categories:
- Tutorials
tags:
- djbdns
- rsync
- ssh
- zones
---

I [wrote earlier](http://www.mariusv.com/how-to-djbdns/) about publishing zones with [djbdns](http://cr.yp.to/djbdns.html). That post didnâ€™t cover zone sync between djbdns servers. This small guide assumes weâ€™ll be syncing all zones between two servers, s01 and s02.

Doing this by using ssh keys instead of regular login has the benefit of not asking for your password when syncing the zones. You can skip this step if you want.

On s01, do the following.


    
    # ssh-keygen -t dsa
    # scp ~/.ssh/id_dsa.pub s02:.ssh/authorized_keys



The edit the Makefile file in the root folder of djbdns on s01 and make it look like this.


    
    remote: data.cdb
            /usr/bin/rsync -az -e ssh data.cdb s02:/etc/tinydns/root/data.cdb
    
    data.cdb: data
            /usr/bin/tinydns-data



Adjust all paths according to your own setup.

Running make will now sync your zones to s02.


    
    # make
    /usr/bin/tinydns-data
    /usr/bin/rsync -az -e ssh data.cdb s02:/etc/tinydns/root/data.cdb
    #
