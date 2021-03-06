---
date: '2010-02-18 09:26:21'
layout: post
slug: linux-and-windows-openvpn-howto-and-tutorial-including-vpn-routing
status: publish
title: Linux and Windows OpenVPN HOWTO and tutorial, including VPN routing
wordpress_id: '29'
categories:
- Technology
- Tutorials
tags:
- compression
- daemon
- daemonize
- debian
- default gateway
- distro
- established
- forward
- generate
- interface
- IP address
- iptables
- ip_forward
- keepalive
- linux
- linux server
- masquerade
- nat
- openvpn
- package manager
- ping
- related
- remote
- route
- route add
- route delete
- route print
- routing
- secret key
- server
- source
- tap
- tcp
- tcpdump
- traffic
- tun
- udp
- VPN
- vpn client
- vpn server
- windows
- windows client
---

OpenVPN is a popular Windows/Linux VPN Server/Client pair. I think thereâ€™s a separate GUI available for it if youâ€™re so minded. This howto will cover command line usage only.

Iâ€™ll provide example configuration based on a Linux server and a Windows client, however the same applies pretty easily if you wanted to mix and match.

On debian, apt-get install openvpn. On any other linux distro, use your own package manager or alternatively download from source and compile.

I create my config /etc/openvpn/myvpn.conf and enter the following:


    
    dev tun
    proto udp
    ifconfig 10.8.0.1 10.8.0.2
    secret /etc/openvpn/static.key
    comp-lzo
    keepalive 10 60
    daemon



In short, Iâ€™m specifying that weâ€™ll use the â€˜tunâ€™ interface as opposed to â€˜tapâ€™, and that weâ€™ll communicate over UDP. Next I specify that this machineâ€™s tun0 interface will have IP 10.8.0.1 and the client will be given 10.8.0.2. My secret key is stored in /etc/openvpn/static.key which you can generate with openvpn â€“genkey â€“secret static.key. Iâ€™d like to use comp-lzo for compression and also specify a keepalive time to prevent problems on those networks that terminate idle connections. Weâ€™ll also have openvpn daemonize.
For the client:


    
    remote XX.XXX.124.95 ;server IP address
    dev tun
    ifconfig 10.8.0.2 10.8.0.1
    secret static.key
    comp-lzo
    keepalive 10 60



This configure is mostly identical to the serverâ€™s above.

Now copy the static.key that you generated on the server, to the client. Then just run â€˜openvpn config.confâ€™ itâ€™ll print the relevant debug messages and youâ€™ll be there. At this point, you should be able to ping 10.8.0.1from your client and 10.8.0.2 from your server. If you can, all is good.

On your server, youâ€™ll now need to allow routing so your client is able to route itâ€™s traffic through the VPN:


    
    iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE
    iptables -A FORWARD -i tun0 -s 10.8.0.0/24 -o eth0 -j ACCEPT
    iptables -A FORWARD -i eth0 -o tun0 -m state â€“state ESTABLISHED,RELATED -j ACCEPT
    echo 1 > /proc/sys/net/ipv4/ip_forward



â€¦Or similar to suit your needs.

On your windows client, youâ€™ll now need to change your default gateway:

Use route print and find out your current default gateway, then, assuming your current local default gateway is: 192.168.1.1 and serverâ€™s IP address is XX.XXX.124.95, issue the following commands:


    
    route DELETE 0.0.0.0
    route ADD XX.XXX.124.95 MASK 255.255.255.255 192.168.1.1
    route ADD 0.0.0.0 MASK 0.0.0.0 10.8.0.1



The first ADD command is used to tell your client how to access the â€˜new default gatewayâ€™. Without specifying your real default gateway, the client machine would have no idea how to reach your VPN server. You can specify 10.8.0.1 as your default gateway, as it is now virtually on the same LAN as your 10.8.0.2 adapter, but without the additional route to XX.XXX.124.95, your connection to the server would have to terminate and youâ€™d lose your tun interface.

Now try and ping something â€“ it should be successful. If not, get onto the server and run tcpdump -n tun0. If the server is seeing your traffic but not forwarding it to the outside world, chances are your iptables and masquerading is set up incorrectly. If the server isnâ€™t even seeing any traffic from you, then chances are your windows routing setup is incorrect.

Hope this was useful! Comments and feedback are welcome as always.
