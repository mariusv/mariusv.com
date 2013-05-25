---
date: '2010-07-01 08:21:47'
layout: post
slug: wordpress-cache-and-nginx
status: publish
title: Wordpress cache and Nginx
wordpress_id: '268'
categories:
- Technology
tags:
- Nginx
- wordpress
---

[WP Super Cache](http://wordpress.org/extend/plugins/wp-super-cache/) is a very good tool for speeding up your WordPress installation while at the same time reducing server load. However, WP Super Cache uses _mod_rewrite_ to handle requests, which is not compatible with [Nginx](http://wiki.nginx.org/Main). For it to work with Nginx we need to create a few rewrite rules in the server config file.




In my example I have Nginx installed with php5 running as FastCGI, configured [like this](http://wiki.nginx.org/PHPFcgiExample).




This requires permalinks to be used, request containing query strings will not be served cached content. The following rules are added to the location / { } block in the Nginx config file for that virtual host. This assumes WordPress is not installed in a sub folder.




    
    # Return existing files
    if (-f $request_filename) {
            break;
    }
    
    set $supercache_file '';
    set $supercache_uri $request_uri;
    
    if ($request_method = POST) {
            set $supercache_uri '';
    }
    
    # Bypass cache for requests containing a query string
    if ($query_string) {
            set $supercache_uri '';
    }
    
    if ($http_cookie ~* "comment_author_|wordpress|wp-postpass_" ) {
            set $supercache_uri '';
    }
    
    # Specify the cache file
    if ($supercache_uri ~ ^(.+)$) {
            set $supercache_file /wp-content/cache/supercache/$http_host/$1index.html;
    }
    
    # Serve the cache file, if it exists
    if (-f $document_root$supercache_file) {
            rewrite ^(.*)$ $supercache_file break;
    }
    
    # Everything else goes to index.php
    if (!-e $request_filename) {
            rewrite . /index.php last;
    }
