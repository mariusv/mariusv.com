---
date: '2013-02-11 21:00:52'
layout: post
slug: bandwidth-monitoring-script
title: Bandwidth Monitoring Script
categories:
- Bash scripts
- Technology
- Personal
tags:
- Ubuntu
- Debian
- Rackspace
- bash
- bandwidth
- monitoring
---

If you want to monitorize your bandwidth on your [Rackspace Cloud Server](http://www.rackspace.co.uk/cloud-hosting/cloud-products/) or any other server all you have to do is to run this [script](https://github.com/mariusv/bandwidth-monitoring) and the script will automagically send you notifications when you will reach the limit you established.

Requirements :

* postfix (or any other MTA)
* screen (the script is running in a screen. This is a MUST)
* vnstat (is used to check the bandwidth)

Installing dependencies :

Ubuntu / Debian Distro :
	apt-get install postfix vnstat screen
CentOS / RedHat / Fedora & Co :
	yum install -y postfix vnstat screen
	
Usage :

* wget https://raw.github.com/mariusv/bandwidth-monitoring/master/bandwidth.sh
* edit bandwidth.sh and go to MAX ='10' line and just replace 10 with the maximum value you want(the value MUST be in MB)
* chmod +x bandwidth.sh
* ./bandwidth.sh (the script will start a new screen session and as soon as you reached the limit you established will send you an alert email)
