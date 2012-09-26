---
date: '2010-09-17 14:19:15'
layout: post
slug: cisco-virtual-private-network-with-network-manager
status: publish
title: Cisco Virtual Private Network with Network Manager
wordpress_id: '456'
categories:
- Personal
- Tutorials
tags:
- CISCO
- debian
- xfce
---

NetworkManager has pluggable support for Virtual Private Network software, including Cisco compatible VPNs using [vpnc](http://www.unix-ag.uni-kl.de/%7Emassar/vpnc/).
In a terminal type:
`aptitude install network-manager-vpnc network-manager-vpnc-gnome`
After installing network-manager-vpnc and the gui (network-manager-vpnc-gnome) for xfce4 or gnome. Left click the NetworkManager panel icon and select VPN Connections>Configure VPN...
[![](http://www.mariusv.com/wp-content/uploads/2010/09/vpnc-configure_1.png)](http://www.mariusv.com/wp-content/uploads/2010/09/vpnc-configure_1.png)

From there, import the network's VPN's settings file. After connecting you will be prompted for your password.

[![](http://www.mariusv.com/wp-content/uploads/2010/09/vpn_configure.png)](http://www.mariusv.com/wp-content/uploads/2010/09/vpn_configure.png)
