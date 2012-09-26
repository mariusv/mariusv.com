---
date: '2010-02-25 14:52:36'
layout: post
slug: monitoring-mysql-replication-with-munin-and-mk-heartbeat
status: publish
title: Monitoring MySQL Replication with Munin and mk-heartbeat
wordpress_id: '63'
categories:
- Technology
- Tutorials
tags:
- maatkit
- plugin
- scripts
- sql
---

We use [Munin](http://munin.projects.linpro.no/) and MySQL Replication from our production systems for hot standby purposes. But how to know if replication breaks?




Using components of the excellent [MySQL Toolkit](http://www.maatkit.org/), I wrote a Munin plug-in to monitor replication delay and alert with an email if the delay gets above a certain level. This requires running [mk-heartbeat](http://www.maatkit.org/doc/mk-heartbeat.html) as a daemon.




Hereâ€™s the plugin code:




    
    
    #!/bin/bash
    
    ## Plug-in to Monitor MySQL Replication Delay.
    
    #
    
    #$Author: mariusv $
    
    #$Date: 2010-02-25 13:29:21 $
    
    #$RCSfile: mysql_rep_delay,v $
    
    #$Revision: 1.1 $
    
    case $1 in
    
            config)
    
                    cat <<'EOM'
    
    graph_title MySQL Replication Delay
    
    graph_vlabel seconds
    
    mysql_rep_delay.label delay
    
    mysql_rep_delay.warning 60
    
    mysql_rep_delay.critical 3600
    
    graph_category mysql
    
    EOM
    
                    exit 0;;
    
    esac
    
    echo -n "mysql_rep_delay.value "
    
    mk-heartbeat -D test --check -h localhost





