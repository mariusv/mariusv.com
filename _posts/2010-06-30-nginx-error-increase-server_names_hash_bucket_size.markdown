---
date: '2010-06-30 08:08:49'
layout: post
slug: nginx-error-increase-server_names_hash_bucket_size
status: publish
title: 'Nginx Error: Increase server_names_hash_bucket_size'
wordpress_id: '231'
categories:
- Personal
tags:
- debian
- error
- linux
- Nginx
---

During an initial server build with Nginx, I was having trouble starting the web server. Testing the Nginx configuration, the reported error was:


    
    $ nginx -t
    2010/06/30 17:18:23 [emerg] 12299#0: could not build the server_names_hash, you should increase server_names_hash_bucket_size: 32
    2010/06/30 17:18:23 [emerg] 12299#0: the configuration file /etc/nginx/nginx.conf test failed



The _server_names_hash_bucket_size_ is one of the directives in the core HTTP module for Nginx. This directive assigns the size of basket in the hash-tables of the names of servers. The hash bucket size is always equal to, or in multiples of, the size of the line of processor cache. As you can see from the error, the default on my Debian Lenny virtual machine was 32. After checking out the [**official documentation**](http://wiki.nginx.org/), I found that I simply had to increase the default bucket size from 32 to 128 in the nginx.conf. Test the configuration again and make sure the output is clean:


    
    $ nginx -t
    2010/06/30 17:22:57 [info] 21732#0: the configuration file /etc/nginx/nginx.conf syntax is ok
    2010/06/30 17:22:57 [info] 21732#0: the configuration file /etc/nginx/nginx.conf was tested successfully




