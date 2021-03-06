---
date: '2010-07-06 14:27:16'
layout: post
slug: quick-pf-sync
status: publish
title: Quick PF sync
wordpress_id: '281'
categories:
- Tutorials
tags:
- bash
- firewall
- pf
- ssh
---

This is a small bash script for syncing PF rules ant tables from one firewall to another (if changes are made to fw1, this script is running on fw2). The script requires ssh keys to be generated and configured for autologin. The script also saves backups of old configs when replacing them.

Create the folders _/root/pf_ and _/root/pf/backup_ on fw2 and save this script as _/root/pf/sync.sh_. The script assumes that PF rules are in _/etc/pf.conf_ and that tables are stored in _/etc/tables_ (every file in this folder is synced).


    
    #!/usr/local/bin/bash
    
    PATH="/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin"
    TIME=`date +"%Y%m%d%H%M"`
    
    cd /root/pf/
    
    ping -c1 fw1 > /dev/null 2>&1
    if [ "$?" -eq "0" ]; then
            mkdir files
            scp fw1:/etc/pf.conf files/
            scp -r fw1:/etc/tables files/
    
            if [ -f files/pf.conf ]; then
                    md5 -q files/pf.conf > md5_new.txt
                    md5 -q files/tables/* >> md5_new.txt
                    NEW=`md5 -q md5_new.txt`
    
                    md5 -q /etc/pf.conf > md5_running.txt
                    md5 -q /etc/tables/* >> md5_running.txt
                    RUNNING=`md5 -q md5_running.txt`
    
                    rm md5_new.txt
                    rm md5_running.txt
    
                    if [ "$NEW" != "$RUNNING" ]; then
                            echo $TIME Loading new PF >> log.txt
    
                            # Backing up old PF
                            mkdir backup/$TIME
                            cp /etc/pf.conf backup/$TIME/
                            cp -R /etc/tables backup/$TIME/
                            tar -zcf backup/$TIME.tar.gz backup/$TIME/*
                            rm -rf backup/$TIME
    
                            # Activating new PF
                            mv files/pf.conf /etc/pf.conf
                            rm /etc/tables/*
                            mv files/tables/* /etc/tables/
                            pfctl -f /etc/pf.conf
                    fi
            fi
    
            rm -rf files
    else
            echo $TIME FW1 is down, dont sync >> log.txt
    fi
