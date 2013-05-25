---
date: '2011-10-19 16:51:46'
layout: post
slug: data-replication-using-lsyncd
status: publish
title: Data replication using lsyncd
wordpress_id: '1041'
categories:
- Personal
- Tutorials
tags:
- linux
- lsyncd
- sync
- unix
- wordpress
---

One of my favorite Linux utilities I've discovered recently is [lsyncd](http://code.google.com/p/lsyncd/), a live syncing (mirror) daemon. Following the traditional Unix philosophy, it does data replication simply and it does it very well. Using some fancy inotify magic, lsyncd will spawn one or more processes to synchronize the targets after changes have been made.

After determining that a client would need multiple web-servers running in sync, I evaluated a few different tools that perform data replication and live syncing. This is one of the larger problems I've encountered with scaling web applications horizontally -- storage management among multiple web services. In traditional deployments, it might make sense to use something like NFS or even DRBD, operating on the block device level. While this works for write-heavy systems under high load, it isn't practical mirroring a whole block device for a high-traffic WordPress site -- I just needed a basic client-server model.

This is where lsyncd really shines. The lsyncd configuration file is written in Lua and super easy to set up. Below is the _lsyncd.conf_ that duplicates _/var/www/mariusv_ on the master server to the 4 targets with the same path:


    
    settings = {
       delay        = 1,
       maxProcesses = 5,
       statusFile   = "/tmp/lsyncd.status",
       logfile      = "/var/log/lsyncd.log",
    }
    
    targetlist = {
     "10.0.1.10:/var/www/mariusv",
     "10.0.1.11:/var/www/mariusv",
     "10.0.1.12:/var/www/mariusv",
     "10.0.1.13:/var/www/mariusv"
    }
    
    for _, server in ipairs(targetlist) do
      sync{ default.rsync,
        source="/var/www/mariusv",
        rsyncOpts="-rltvupgo",
        target=server
      }
    end



To make the rsyncing seamless, you'll need to send the public key generated on the master server to all of the duplicated nodes for easy access. With the client I was working with, we were also using Nginx to load balance across the web nodes. Since we only wanted writes going to the primary master server, we redirected all requests to _/wp-admin_ to the primary node. Then, any changes made through the WordPress backend were synced over to the targets in less than 1 second. Here is the Nginx configuration:


    
    upstream backend  {
      server 10.0.1.10; #master
      server 10.0.1.11; #www-01
      server 10.0.1.12; #www-02
      server 10.0.1.13; #www-03
    }
    
    upstream admin {
      server 10.0.1.10;
    }
    
    server {
      server_name www.mariusv.com mariusv.com;
    
      location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass  http://backend;
      }
    
      location ~ /wp-admin/* {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass  http://admin;
      }
    }




You'll want to install [lsyncd](http://code.google.com/p/lsyncd/) from source on most distributions. Older versions (pre 2.x) contained gross XML style configuration; the most recent version, as of 8/30/2011, is 2.0.5.
