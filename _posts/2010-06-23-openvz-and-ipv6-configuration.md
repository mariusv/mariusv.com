---
date: '2010-06-23 08:24:20'
layout: post
slug: openvz-and-ipv6-configuration
status: publish
title: OpenVZ and IPv6 configuration
wordpress_id: '195'
categories:
- Tutorials
tags:
- debian
- ipv6
- OpenVZ
- ubuntu
---

I have not found any recommentation to configure IPv6 for Debian/Lenny/Ubuntu OpenVZ hosts. The OpenVZ project always lacks a bit of documentation when it comes to v6, so here is how you get it working with venet devices.

Add the following to your _/etc/sysctl.conf_ to enable IPv6 package forwarding and proxy neighbor discovery (RFC 4389).


    
    # IPv6 Packet Forwarding and Proxy NDP
    net.ipv6.conf.default.forwarding = 1
    net.ipv6.conf.all.forwarding = 1
    net.ipv6.conf.default.proxy_ndp = 1
    net.ipv6.conf.all.proxy_ndp = 1




Be sure to set a manual route to your default gateway. Once you enable IPv6 package forwarding on your interfaces, routes for auto discovered default gateways are removed from the routing table.

Enable IPv6 in your _/etc/vz/vz.conf_:


    
    IPV6="yes"



Now just add a new address to one of your containers and enjoy. ;)


    
    sudo vzctl set 101 --ipadd 2001:b30:5000:2:227:13ff:fe6a:cced --save





