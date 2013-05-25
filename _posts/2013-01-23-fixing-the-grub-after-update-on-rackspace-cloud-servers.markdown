---
date: '2013-01-23 21:00:52'
layout: post
slug: fixing-the-grub-after-update-on-rackspace-cloud-servers
title: Fixing the GRUB after update on Rackspace Cloud servers
categories:
- Bash scripts
- Technology
tags:
- Ubuntu
- Rackspace
- bash
- GRUB2
---

Everybody knows by now the fact that if you upgraded your Ubuntu GRUB to version 2 you are asked if you want to keep the local version of the menu.lst or if you want to replace it with the developer version. If by any chance you choose to replace it with the developer version on [Rackspace Cloud](http://www.rackspace.co.uk/cloud-servers/) then after reboot your server will not boot up anymore because GRUB2 is using UUID to avoid unreliable BIOS mappings then you will have to put your server in [rescue mode](http://www.rackspace.com/knowledge_center/article/managing-your-server-4-rescue-mode) and then:

	wget https://gist.github.com/raw/4605792/c044aa4d6d73bebab8e2bdc5b1a1a10f07358d21/fixUUID.sh

and then just run it by invoking :

	sh fixUUID.sh
	
This will mount your disk and edit the */mnt/boot/grub/menu.lst* and */mnt/boot/grub/menu.lst~* and remove the UUID. Once this is done you can unrescue the server and you are good to go.
