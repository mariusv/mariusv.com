---
date: '2010-09-22 12:30:07'
layout: post
slug: openvzsetting-timezones-across-all-vpss
status: publish
title: (OpenVZ) Setting timezones across all VPS`S
wordpress_id: '466'
categories:
- Bash scripts
- Tutorials
tags:
- bash
- OpenVZ
---

All of servers that I manage are currently based off of the Phoenix, Arizona, USA Timezone. This script allows this conversion from each HN (Host Node):


    
    #!/bin/bash
    for f in `ls /vz/private`
    do
      vzctl exec $f rm -f /etc/localtime 2>/dev/null
      vzctl exec $f ln -s /usr/share/zoneinfo/America/Phoenix /etc/localtime
    done



or : 


    
    for i in `vzlist | awk ‘{print $1} | grep -v CTID’`
    do
    vzctl exec $i rm -f /etc/localtime 2>/dev/null
    vzctl exec $i ln -s /usr/share/zoneinfo/America/Phoenix /etc/localtime
    done



Because _/vz/private_ may hold disabled/suspended/shutdown containers or even random directories.
