---
date: '2010-09-02 07:40:50'
layout: post
slug: basic-configuration-of-cisco-ios-with-ssh
status: publish
title: Basic configuration of Cisco IOS with SSH
wordpress_id: '413'
categories:
- Technology
- Tutorials
tags:
- CISCO
- IOS
- ssh
---

Here is _my _very_ basic_ configuration of a Cisco router running IOS. Just remember to change all {VARIABLE} to the correct value including the {} part.

This will result in an all basic configured router, running SSH and with a user you can use to log in through SSH.


    
    Router> enable
    
    Router# configure terminal
    
    Router(config)# hostname {ROUTER_NAME}
    
    Router(config)# enable secret 0 {ENABLE_PASSWORD}
    
    Router(config)# interface fastEthernet 0/0
    
    Router(config-if)# ip address {IP_ADDRESS} {SUBNET_MASK}
    
    Router(config-if)# full-duplex
    
    Router(config-if)# speed 100
    
    Router(config-if)# no shutdown
    
    Router(config-if)# exit
    
    Router(config)# username {USERNAME} privilege {PRIVILEGE_LEVEL} secret 0 {USER_PASSWORD}
    
    Router(config)# ip domain name {DOMAIN_NAME}
    
    Router(config)# crypto key generate rsa
    How many bits in the modulus [512]: 2048
    
    Router(config)# line vty 0 4
    
    Router(config-line)# login local
    
    Router(config-line)# transport input ssh
    
    Router(config-line)# exit
    
    Router(config)# ip routing
    
    Router(config)# exit
    
    Router# show running-config
    
    Router# copy running-config startup-config
    Destination filename [startup-config]? [PRESS_ENTER]
    
    Router# exit
