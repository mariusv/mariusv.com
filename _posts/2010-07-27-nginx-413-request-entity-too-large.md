---
date: '2010-07-27 09:29:10'
layout: post
slug: nginx-413-request-entity-too-large
status: publish
title: (nginx) 413 Request Entity Too Large
wordpress_id: '346'
categories:
- Tutorials
tags:
- errors
- Nginx
---

If you’re getting 413 Request Entity Too Large errors trying to upload with [Nginx](http://wiki.nginx.org/Main) , you need to increase the size limit in nginx.conf . Add _client_max_body_size xxM_ inside the server section, where xx is the size (in megabytes) that you want to allow.


    
    http {
        include       mime.types;
        default_type  application/octet-stream;
        sendfile        on;
        keepalive_timeout  65;
     
        server {
            client_max_body_size 20M;
            listen       80;
            server_name  localhost;
     
            # Main location
            location / {
                proxy_pass         http://127.0.0.1:8000/;
            }
        }
    }
