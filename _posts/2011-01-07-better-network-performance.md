---
date: '2011-01-07 11:26:24'
layout: post
slug: better-network-performance
status: publish
title: Better Network Performance
wordpress_id: '704'
categories:
- Tutorials
tags:
- centos
- fedora
- network
- ubuntu
---

As we all know a basic install of any OS is never tweaked out for performance but setup for general use.  One of the biggest problems in the Linux (CentOS, Ubuntu, Fedora, I have not tested other OS’s) is the network is never really tweaked up.

However running a few simple commands and updating a single file can produce a massive increase in performance.

** Please note that there are other issues that can cause poor performance **

Example Bad Network Cable, Cheap Switch, Overloaded Router, and others.

Run the following commands from the prompt:




> mv /etc/sysctl.conf sysctl.bak
cd /etc
wget http://www.mariusv.com/resources/sysctl.conf
/sbin/sysctl -p
/sbin/sysctl -w net.ipv4.route.flush=1





You should see a performance increase right away.  Please let me know if this helps you out or not.
