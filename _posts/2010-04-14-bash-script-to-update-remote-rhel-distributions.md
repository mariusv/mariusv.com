---
date: '2010-04-14 18:01:35'
layout: post
slug: bash-script-to-update-remote-rhel-distributions
status: publish
title: Bash script to update remote RHEL distributions
wordpress_id: '138'
categories:
- Bash scripts
- Tutorials
tags:
- bash
- centos
- RHEL
- update
---

This bash script will help you to update all servers if you have more then 2 ;) it is very handy



    
    #!/bin/bash
    # A shell script to update all remote Redhat Enterprise Linux 5 / CentOS Linux 5 servers
    # You must have ssh public and private key installed. This will save a lot of time if you
    # have 5-7 servers. 
    # an array to store all ssh commands
    hosts=(
    	"ssh root@server1.mariusv.com -p222 yum update -y"
    	"ssh root@server2.mariusv.com -p333 yum update -y"
    	"ssh root@server3.mariusv.com yum update -y"
    	"ssh user1@192.168.1.254 -t sudo  '/usr/bin/yum update -y' "
          )
    # simply run array item
    for c in "${hosts[@]}"
    do
    	$c
    done
