---
date: '2014-11-23 12:53:10'
layout: post
slug: openstack-and-dnsmasq-config
title: OpenStack and dnsmasq config
categories:
- Personal
- DevOps
tags:
- DNS
- work
- Freelance
- Ubuntu
- OpenStack
---

So today I was fighting with an [OpenStack](http://www.openstack.org/) environment where for some reason it would not read the [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) config and apply the rules I specified in there. After few hors of fight and glancing at the logs and googling I could not find the issue..everything looked ok just that the DNS server would not be applied to the VMs.

The config was pretty straight forward so nothing fancy in `dnsmasq-nova.conf` :

{% highlight bash %}

dhcp-option=6,10.12.0.45
dhcp-lease-max=15000
cache-size=0

{% endhighlight %}

So you would expect that now in when a VM renew its DHCP will have in `resolv.conf` this entry `nameserver 10.12.0.45` but for some reason it didn't had that but the IP of the compute node (default behaviour as dnsmasq will use `--listen-address` for its DNS ) but no. 

And after few frustrating hours spent glazing at the logs and google I decided to kill dnsmasq and restart `nova-compute & nova-network` and for my surprise this did the trick as it seems like when you just restart `nova-compute` & `nova-network` is not killing dnsmasq so the confing will never be read.

Solution:

{% highlight bash %}

$ killall -9 dnsmasq
$ service nova-network restart ; service nova-compute restart

{% endhighlight %}

And you are good to go   ♪┏(・o･)┛♪┗ ( ･o･) ┓♪

##Conclusion:

When nothing works use a bigger hammer :-)

