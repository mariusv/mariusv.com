---
date: '2010-02-24 17:38:34'
layout: post
slug: enabling-ipv6-support-in-nginx
status: publish
title: Enabling IPv6 Support in nginx
wordpress_id: '57'
categories:
- Technology
- Tutorials
tags:
- internet
- ipv6
- network
- Nginx
- tips
---

This is going to be a really short post, but for someone it could save an hour of life.




So, youâ€™ve nothing to do and youâ€™ve decided to play around with [IPv6](http://en.wikipedia.org/wiki/IPv6) or maybe youâ€™re happened to be an administrator of a web service that needs to support IPv6 connectivity and you need to make your [nginx](http://nginx.org/) server work nicely with this protocol. 




First thing you need to do is to enable IPv6 in nginx by recompiling it with `--with-ipv6` configure option and reinstalling it. If you use some pre-built package, check if your nginx already has this key enabled by running `nginx -V`. 








The results should have `--with-ipv6` option in configure arguments:





    
    [root@node ~]# nginx -V<br>
    nginx version: nginx/0.7.64<br>
    built by gcc 4.1.2 20080704 (Red Hat 4.1.2-46)<br>
    TLS SNI support disabled<br>
    configure arguments: --with-ipv6 ... --prefix=/opt/nginx



After youâ€™ve got your nginx binary with IPv6 support, you need to enable it by changing `listen` directives in your configuration file. 




If your server binds to all interfaces/IPs, you already have `listen 80` or something like that in your file. Those lines should be changed to make sure you tell your nginx to bind on both IPv4 and IPv6 addresses:





    
    listen [::]:80;





For situations when you do not want to listen on IPv4 interfaces, there is `ipv6only=on` parameter:




    
    listen [::]:443 default ipv6only=on;



For configurations that need to bind to specific ip addresses you could use similar notation:


    
    listen [2607:f0d0:1004:2::2]:80;



After changing your configs and testing them you need to restart (not reload) your nginx process and then check your system port bindings to make sure it works as expected:


    
    [root@node ~]# netstat -nlp | grep nginx
    tcp   0    0 :::80        :::*         LISTEN    23817/nginx
    tcp   0    0 :::443       :::*         LISTEN    23817/nginx



This is it, now you can add [AAAA](http://en.wikipedia.org/wiki/IPv6_Addresses#IPv6_addresses_in_the_Domain_Name_System) records to your main domain name or just create a dedicated [ipv6](http://ipv6.scribd.com).[yourcompany](http://ipv6.google.com).[com](http://ipv6.netflix.com) sub-domain and show it to your friends :)
