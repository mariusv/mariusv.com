---
date: '2010-08-26 09:07:58'
layout: post
slug: verify-ipv4-address-in-php-using-regex
status: publish
title: Verify IPv4 address in php using regex
wordpress_id: '370'
categories:
- Tutorials
tags:
- IPv4
- php
- regex
---

A simple function in php to verify IPV4 Address. It is completely based in regex and does full ip verifying.
It tests the ip for;
1. Need 4 numeric blocks separated by a dot.
2. Each numeric block must noot exceed 255.
3. Shouldn't contain space. So remember to trim before calling this function.


    
    function isINetAddress($ipaddr){
    if( preg_match( "/^((?:25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9]).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])$/m",$ipaddr) > 0)
    return true;
    }




This can't me more simpler. ;)
Enjoy!