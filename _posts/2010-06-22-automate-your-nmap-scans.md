---
date: '2010-06-22 07:55:28'
layout: post
slug: automate-your-nmap-scans
status: publish
title: Automate your nmap scans
wordpress_id: '200'
categories:
- Bash scripts
- Tutorials
tags:
- bash
- nmap
- scan. network
---

Whipped this up for work, figured I'd share with the world, since it's decently useful. Stick it in cron nightly, needs to run as root. It will run a diff on what it sees and email you if there are new ports/hosts that pop up on your networks. 


    
    #! /bin/sh
    
    DIR="/opt/nmap/scans"
    NETWORKS="192.168.1.0-255"
    TODAY=`date +%Y%m%d`
    YESTERDAY=`date -d yesterday +%Y%m%d`
    
    
    for network in $NETWORKS
    do
          nmap -n -sS $network -oG $DIR/$network.$TODAY.nmap
    done
    
    
    for network in $NETWORKS
    do
          diff -I "^#" $DIR/$network.$TODAY.nmap $DIR/$network.$YESTERDAY.nmap  > $DIR/$network.$TODAY.diff
    done
    
    for network in $NETWORKS
    do
          SIZE=`find $DIR/$network.$TODAY.diff -size +0b`
          if [ "$SIZE" = "$DIR/$network.$TODAY.diff" ]
          then
                  cat $DIR/$network.$TODAY.diff | mail -s "Change Detected for $network"  user@host.com
          fi
    done
