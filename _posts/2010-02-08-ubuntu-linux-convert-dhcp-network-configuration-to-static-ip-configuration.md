---
date: '2010-02-08 08:16:32'
layout: post
slug: ubuntu-linux-convert-dhcp-network-configuration-to-static-ip-configuration
status: publish
title: Ubuntu Linux convert DHCP network configuration to static IP configuration
wordpress_id: '6'
categories:
- Tutorials
tags:
- dhcp
- ip
- network
- ubuntu
---

My friend wanted to know how to change or convert DHCP network configuration to static configuration. After initial installation, he wanted to change network settings. Further, his system is w/o GUI system aka X Windows. Here is quick way to accomplish the same:

Your main network configuration file is /etc/network/interfaces

Desired new sample settings:
=> Host IP address 192.168.1.100
=> Netmask: 255.255.255.0
=> Network ID: 192.168.1.0
=> Broadcast IP: 192.168.1.255
=> Gateway/Router IP: 192.168.1.254
=> DNS Server: 192.168.1.254

Open network configuration file


    
    $ sudo vi /etc/network/interfaces



OR


    
    $ sudo nano /etc/network/interfaces



Find and remove dhcp entry:


    
    iface eth0 inet dhcp



Append new network settings:


    
    iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    network 192.168.1.0
    broadcast 192.168.1.255
    gateway 192.168.1.254



Save and close the file. Restart the network:


    
    $ sudo /etc/init.d/networking restart



**Task: Define new DNS servers
**
Open /etc/resolv.conf file


    
    $ sudo vi /etc/resolv.conf 



You need to remove old DNS server assigned by DHCP server:


    
    search myisp.com
    nameserver 192.168.1.254
    nameserver 202.54.1.20
    nameserver 202.54.1.30



Save and close the file.

**Task: Test DNS server**


    
    $ host mariusv.com



**Network command line cheat sheet**

You can also use commands to change settings. Please note that these settings are temporary and not the permanent. Use above method to make network changes permanent or GUI tool as described below.

**Task: Display network interface information**


    
    $ ifconfig



**Take down network interface eth0 / take a network interface down**


    
    $ sudo ifconfig eth0 down



OR


    
    $ sudo ifdown eth0 



**Bring a network interface eth0 up **


    
    $ sudo ifconfig eth0 up



OR


    
    $ sudo ifup eth0 



**Change IP address and netmask from command line**

Activate network interface eth0 with a new IP (192.168.1.50) / netmask:


    
    $ sudo ifconfig eth0 192.168.1.50 netmask 255.255.255.0 up



**Display the routing table**


    
    $ /sbin/route 



OR


    
    $ /sbin/route -n



Output:


    
    Kernel IP routing table
    Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
    localnet        *               255.255.255.0   U     0      0        0 ra0
    172.16.114.0    *               255.255.255.0   U     0      0        0 eth0
    172.16.236.0    *               255.255.255.0   U     0      0        0 eth1
    default         192.168.1.254   0.0.0.0         UG    0      0        0 ra0
    



**Add a new gateway**


    
    $ sudo route add default gw 172.16.236.0



**Display current active Internet connections (servers and established connection)**


    
    $ netstat -nat



**Display open ports**


    
    $ sudo netstat -tulp



OR


    
    $ sudo netstat -tulpn



**Display network interfaces stats (RX/TX etc)** 


    
    $ netstat -i



**Display output for active/established connections only**


    
    $ netstat -e
    $ netstat -te
    $ netstat -tue





Where,






  * -t : TCP connections 


  * -u : UDP connections


  * -e : Established 

**Test network connectivity**

Send ICMP ECHO_REQUEST to network hosts, routers, servers etc with ping command. This verifies connectivity exists between local host and remote network system:




    
    $ ping router
    $ ping 192.168.1.254
    $ ping mariusv.com








