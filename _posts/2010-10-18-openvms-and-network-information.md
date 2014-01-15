---
date: '2010-10-18 07:24:52'
layout: post
slug: openvms-and-network-information
status: publish
title: OpenVMS and network information
wordpress_id: '531'
categories:
- Personal
- Tutorials
tags:
- network information
- openvms
---

              
                    

If you don’t know where to look, OpenVMS networking information can seem to be confined inside a mysterious black box.  It doesn’t have to be.




The _ANALYZE_ command can provide a lot of good information.  Be sure to have a large enough scroll-back buffer on your terminal when you do this:




`  

$ ANALYZE /SYSTEM  

SDA> SHOW LAN /FULL  

`





You can also find out a lot of good information in a hurry with the LANCP command:




`  

$ RUN SYS$SYSTEM:LANCP  

LANCP> SHOW CONFIGURATION  

`




You can also look up information using the _TCPIP_ command:




`  

$ TCPIP  

TCPIP> ifconfig -a  

`




However, while this information is all good, it isn't complete without marking the back of the computer in some way so that you know which port is which.  If you have to, you can hook up a laptop with a network cable and watch the traffic: the DECNet clustering traffic is such that you'll see it on every active interface - which provides you with the MAC address for that port.

