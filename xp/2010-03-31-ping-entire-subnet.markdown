---
date: '2010-03-31 10:19:42'
layout: post
slug: ping-entire-subnet
status: publish
title: Ping entire subnet
wordpress_id: '86'
categories:
- Tutorials
tags:
- linux
- ping
- subnet
---

Wrote a quick bash script to find which ipâ€™s on our subnet return a ping.  


    
    
    #!/bin/bash
    for ((i=1;i<=255;i+=1)); do
    echo "Pinging 192.168.1.$i"
    ping -c 5 -W 20 192.168.1.$i >> ping_log.txt
    done
    
    




Or I just couldâ€™ve used nmap:  

`**nmap -sP 192.168.1.0/24**`





[
