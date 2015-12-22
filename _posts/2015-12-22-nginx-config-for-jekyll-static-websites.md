---
layout: post
title: "Nginx config for jekyll static websites"
date: "2015-12-22"
categories:
- Personal
tags:
- Nginx
- jekyll
---

Because [jekyll](http://jekyllrb.com) doesn't have a specific `index.html` file and each blog post will look something like [fix-atom-linter-puppet-lint-path-error.html](https://www.mariusv.com/fix-atom-linter-puppet-lint-path-error) we will need to instruct [Nginx](http://nginx.org/en/) to look for this kind of files too and not only for `index.html`.

Without any further ado this is how your site config should look like:

```bash
server {
       listen         80;
       server_name    www.example.com example.com;
       return         301 https://www.example.com$request_uri;

}

server {
    listen 443 ssl;
    server_name www.example.com example.com;
    access_log /var/log/nginx/example.com_access.log;
    error_log /var/log/nginx/example.com_error.log;

    ## Root and index files.
    root /var/www/example.com/;
    default_type "text/html";
    try_files  $uri $uri.html $uri/index.html index.html;
    autoindex off;

    ## See the blacklist.conf file at the parent dir: /etc/nginx.
    ## Deny access based on the User-Agent header.
    if ($bad_bot) {
        return 444;
    }
    ## Deny access based on the Referer header.
    if ($bad_referer) {
        return 444;
    }

    ## If no favicon exists return a 204 (no content error).
    location = /favicon.ico {
        try_files $uri =204;
        log_not_found off;
        access_log off;
    }

    ## Don't log robots.txt requests.
    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

        ## All files/directories that are protected and unaccessible from
        ## the web.
        location ~* ^.*(\.(?:git|svn|htaccess|pot?))$ {
            return 404;
        }

        ## Static files are served directly.
        location ~* \.(?:css|gif|htc|ico|js|jpe?g|png|swf)$ {
            expires max;
            log_not_found off;
            ## No need to bleed constant updates. Send the all shebang in one
            ## fell swoop.
            tcp_nodelay off;
            ## Set the OS file cache.
            open_file_cache max=1000 inactive=120s;
            open_file_cache_valid 45s;
            open_file_cache_min_uses 2;
            open_file_cache_errors off;
        }

        ## Keep a tab on the 'big' static files.
        location ~* ^.+\.(?:ogg|pdf|pptx?)$ {
            expires 30d;
            ## No need to bleed constant updates. Send the all shebang in one
            ## fell swoop.
            tcp_nodelay off;
        }
        } # / location
```
Please bare in mind that `$bad_bot` and `$bad_referer` are defined in `/etc/nginx/nginx.conf` and you can find them [here](https://github.com/mariusv/nginx-badbot-blocker). Also this config assumes you have an SSL cert and if you don't please use [Let's encrypt](https://letsencrypt.org/howitworks/) and get one as they are free.
