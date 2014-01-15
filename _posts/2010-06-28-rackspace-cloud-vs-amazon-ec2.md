---
date: '2010-06-28 07:31:33'
layout: post
slug: rackspace-cloud-vs-amazon-ec2
status: publish
title: Rackspace Cloud vs. Amazon EC2
wordpress_id: '227'
categories:
- Personal
- Technology
tags:
- amazon ec2
- cloud
- rackspace
- sysbench
- ubuntu
---

[Rackspace Cloud](http://www.rackspacecloud.com/), or [Amazon EC2](http://aws.amazon.com/ec2/), which is best? This is just a quick performance comparison using [SysBench](http://sysbench.sourceforge.net/). The following products where tested.










**Product**


**CPU**


**Memory**



**Disk**


**Price**






EC2 Small Instance


1 virtual core


1,7GB


160GB


$0.085 per hour







Rackspace 256MB


4 virtual cores


256MB


10GB


$0.015 per hour






Rackspace 1024MB


4 virtual cores



1GB


40GB


$0.065 per hour






Servers where running Ubuntu 9.10 i386, tests where performed on two different occasions, average scores where used. Hereâ€™s the results, less is good.










**Product**


**SysBench CPU**



**Sysbench Memory**


**Sysbench File I/O**






EC2 Small Instance


29.7s


491.3s


28.6s






Rackspace 256MB



5.6s


219.1s


26.4s






Rackspace 1024MB


4.1s


196.1s


17.8s







The following commands where used to do the benching, interesting values was the total time to run the test.




    
    sysbench --num-threads=4 --test=cpu run
    sysbench --num-threads=4 --test=memory run
    sysbench --num-threads=4 --test=fileio --file-test-mode=rndrw prepare
    sysbench --num-threads=4 --test=fileio --file-test-mode=rndrw run



**Conclusion**

According to SysBench, Rackspace Cloud is much faster then EC2 in general, and cheaper as well. EC2 however comes with more memory and disk.
