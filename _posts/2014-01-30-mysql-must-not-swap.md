---
date: '2014-01-30 22:27:02'
layout: post
slug: mysql-must-not-swap
title: MySQL must not swap
categories:
- Personal
tags:
- open source
- linux
- work
- MySQL
- SWAP
---

MySQL **must not** swap. This can be managed via /proc/sys/vm/swappiness, this value determines how aggressive is the system in term of swapping. Default is 60, for MySQL server 0 is recommended. Setting 0 does not mean that you never swap, the system will only swap to prevent out of memory.

{% highlight bash %}
$ sudo sysctl -w vm.swappiness=0
$ sudo echo "vm.swappiness=0" >> /etc/sysctl.conf
$ sudo swapoff -a && sudo swapon -a
{% endhighlight %}
