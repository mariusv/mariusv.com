---
date: '2010-02-23 08:41:22'
layout: post
slug: automatic-zombie-processes-killing-shell-script
status: publish
title: Automatic "zombie" processes killing (shell script)
wordpress_id: '51'
categories:
- Technology
- Tutorials
tags:
- linux. zombie
- script
- shell
---

Here is a shell script example that can be run by cron for automatic killing of â€œzombieâ€ processes in Linux system:




    
    #!/bin/bash
    # Zombie processes killing script.
    # Must be run under root.
    case "$1" in
    --admin)
            stat=`ps ax | awk '{print $1}' | grep -v "PID" | xargs -n 1 ps lOp | grep -v "UID" | awk '{print"pid: "$3" *** parent_pid: "$4" *** status: "$10" *** process: "$13}' | grep ": Z"`
    
            if ((${#stat} > 0));then
        	    echo zombie processes found:
    	    echo .
    	    ps ax | awk '{print $1}' | grep -v "PID" | xargs -n 1 ps lOp | grep -v "UID" | awk '{print"pid: "$3" *** parent_pid: "$4" *** status: "$10" *** process: "$13}' | grep ": Z"
    	    echo -n "Kill zombies? [y/n]: "
    	    read keyb
    	    if [ $keyb == 'y' ];then
    		echo killing zombies..
    		ps ax | awk '{print $1}' | grep -v "PID" | xargs -n 1 ps lOp | grep -v "UID" | awk '{print$4" status:"$10}' | grep "status:Z" | awk '{print $1}' | xargs -n 1 kill -9
    	    fi
    	else
    	    echo no zombies found!
    	fi
    ;;
    --cron)
    	stat=`ps ax | awk '{print $1}' | grep -v "PID" | xargs -n 1 ps lOp | grep -v "UID" | awk '{print"pid: "$3" *** parent_pid: "$4" *** status: "$10" *** process: "$13}' | grep ": Z"`
            if ((${#stat} > 0));then
            ps ax | awk '{print $1}' | grep -v "PID" | xargs -n 1 ps lOp | grep -v "UID" | awk '{print$4" status:"$10}' | grep "status:Z" | awk '{print $1}' | xargs -n 1 kill -9
    	echo `date`": killed some zombie proceses!" >> /var/log/zombies.log
    	fi
    ;;
    *)	echo 'usage: zombies {--cron|--admin}'
    ;;
    esac
    exit 0
    



or

Download: [zombies.sh](http://mariusv.com/zombies.sh)


