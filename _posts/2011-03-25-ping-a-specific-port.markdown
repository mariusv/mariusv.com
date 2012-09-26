---
date: '2011-03-25 22:31:03'
layout: post
slug: ping-a-specific-port
status: publish
title: Ping a Specific Port
wordpress_id: '835'
categories:
- Personal
- Tutorials
tags:
- nmap
- ping
- ports
---

In the last 2 days I often heard the question: „_Can you ping a specific port of a machine, and if so, can you provide an example?_” and now I will answer to this question here.

The answer is: 

You can't ping ports, as Ping is using ICMP which doesn't have the concept of ports itself. Ports belong to the IP family of protocols (with TCP and UDP being its famous transport layer protocols). However, you could use nmap to see whether ports are open or not by nmap using this command:


    
    nmap -p 80 example.com or IP adress



[Nmap](http://nmap.org/) is more than just a ping-for-ports-thingy. It's the security auditers and hackers best friend and comes with tons of cool options. Check the **man** for all possible flags.
