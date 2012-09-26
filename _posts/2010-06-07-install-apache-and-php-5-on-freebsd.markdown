---
date: '2010-06-07 15:07:42'
layout: post
slug: install-apache-and-php-5-on-freebsd
status: publish
title: Install Apache and PHP 5 on FreeBSD
wordpress_id: '174'
categories:
- Tutorials
tags:
- apache2
- freeBSD
- how to
- php5
---

Install Apache with PHP5 support on FreeBSD is easy when you use the port system. First you must install PHP 5 with _mod_php_ support for Apache:

    
    # cd /usr/ports/lang/php5
    # make config



Inside the dialog box you must to select this option:


    
    APACHE Build Apache module



To install Apache:


    
    # cd /usr/ports/www/apache22
    # make; make install; make clean



The /usr/local/etc/apache22/httpd.conf must contains these lines:


    
    # PHP configuration
    AddType application/x-httpd-php .php
    AddType application/x-httpd-php-source .phps
    LoadModule php5_module libexec/apache22/libphp5.so




