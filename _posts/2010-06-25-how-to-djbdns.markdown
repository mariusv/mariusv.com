---
date: '2010-06-25 14:18:47'
layout: post
slug: how-to-djbdns
status: publish
title: How to djbdns
wordpress_id: '217'
categories:
- Tutorials
tags:
- djbdns
- name servers
- ns
- tinydns
- ubuntu
---

This is how to publish a simple zone with [djbdns](http://cr.yp.to/djbdns.html), I will be doing this on Ubunut 9.10. Start by installing djbdns.


    
    # aptitude install djbdns



Create system accounts.


    
    # useradd -d /etc/tinydns -s /bin/false tinydns
    # useradd -d /etc/tinydns -s /bin/false tinylog



Now create the configuration directory for tinydns.


    
    # tinydns-conf tinydns tinylog /etc/tinydns 10.0.0.10



_10.0.0.10_ is the IP Iâ€™ll be using in this example for my dns server.
Now create a symlink so that svscan will start tinydns. svscan is a part of daemontools, which is a part of the djbdns package, it is used to start and monitor services.


    
    # ln -s /etc/tinydns /etc/service/tinydns



Verify that the service has started.


    
    # ps aux |grep tinydns
    root      1126  0.0  0.0   1560   336 ?        S    17:41   0:00 supervise tinydns
    tinydns   1128  0.0  0.0   1684   364 ?        S    17:41   0:00 /usr/bin/tinydns



Good, now weâ€™ll need to edit our data file, located at /etc/tinydns/root/data. The following is a simple data file for poller.se.


    
    .mariusv.com:10.0.0.10:ns1.mariusv.com:86400
    &mariusv.com;:10.0.0.20:ns2.mariusv.com:86400
    +mariusv.com:10.0.0.100:3600
    +www.mariusv.com:10.0.0.100:3600
    @mariusv.com::aspmx.l.google.com:10:3600
    @mariusv.com::alt1.aspmx.l.google.com:20:3600
    @mariusv.com::alt2.aspmx.l.google.com:20:3600
    @mariusv.com::aspmx2.googlemail.com:30:3600
    @mariusv.com::aspmx3.googlemail.com:30:3600
    @mariusv.com::aspmx4.googlemail.com:30:3600
    @mariusv.com::aspmx5.googlemail.com:30:3600



Each line starts with a character, the characters above does the following.

. creates a NS record for mariusv.com (ns1.mariusv.com) and also creates a A record for ns1.mariusv.com. A SOA record is also created.
& creates another NS record for mariusv.com (ns2.mariusv.com) and also creates a A record for ns2.mariusv.com.
+ creates A records
@ creates MX records, second argument can contain a IP address (a A record is then created), not needed in our example since I use gmail.

You can find more info in this [here.](http://cr.yp.to/djbdns/tinydns-data.html)

Now create the data.cdb file, this is a read optimized file that tinydns uses.


    
    # cd /etc/tinydns/root/
    # make



Verify that your server answers requests.


    
    # dig @10.0.0.10 soa mariusv.com
    
    ; <<>> DiG 9.6.1-P1 <<>> @10.0.0.10 soa mariusv.com
    ; (1 server found)
    ;; global options: +cmd
    ;; Got answer:
    ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 63331
    ;; flags: qr aa rd; QUERY: 1, ANSWER: 1, AUTHORITY: 2, ADDITIONAL: 2
    ;; WARNING: recursion requested but not available
    
    ;; QUESTION SECTION:
    ;mariusv.com.			IN	SOA
    
    ;; ANSWER SECTION:
    mariusv.com.		2560	IN	SOA	ns1.mariusv.com. hostmaster.mariusv.com. 1263665910 16384 2048 1048576 2560
    
    ;; AUTHORITY SECTION:
    mariusv.com.		86400	IN	NS	ns1.mariusv.com.
    mariusv.com.		86400	IN	NS	ns2.mariusv.com.
    
    ;; ADDITIONAL SECTION:
    ns1.mariusv.com.		86400	IN	A	10.0.0.10
    ns2.mariusv.com.		86400	IN	A	10.0.0.20
    
    ;; Query time: 0 msec
    ;; SERVER: 10.0.0.10#53(10.0.0.10)
    ;; WHEN: Sat Jan 16 18:28:35 2010
    ;; MSG SIZE  rcvd: 142




