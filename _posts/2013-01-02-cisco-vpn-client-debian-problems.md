---
date: '2013-01-02 21:00:52'
layout: post
slug: cisco-vpn-client-debian-problems
title: Cisco VPN client Debian problems
categories:
- Personal
- Technology
tags:
- Debian
- Rackspace
- CISCO
- VPN
---

After installing [CISCO VPN Client](http://www.cisco.com/en/US/products/sw/secursw/ps2308/index.html) on my [Debian Wheezy](http://debian.org/) box I started having problems with updating the system . The problem is caused because CISCO VPN Client assumes that Debian has installed by default *chkconfig* which is not installed by default. Uninstalling the client and then installing it back and installing chkconfig will fix only the problem when your CISCO VPN Client GUI flickers on the screen for a moment, but vanishes before you can see the error. To fix the problem where you can't update your system or install any packages all you have to do is to edit *vpnagentd_init* located in */etc/init.d/vpnagentd_init*

	root@valkyrie:~# vim /etc/init.d/vpnagentd_init
	
and add :
	
	### BEGIN INIT INFO
    # Provides: vpnagentd_init
	# Required-Start: $remote_fs $syslog
	# Required-Stop: $remote_fs $syslog
	# Default-Start: 2 3 4 5
	# Default-Stop: 0 1 6
	# Short-Description: Start Cisco vpn agent daemon at boot time
	# Description: Cisco vpn agent daemon
	### END INIT INFO
