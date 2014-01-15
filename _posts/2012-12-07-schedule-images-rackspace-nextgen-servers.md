---
date: '2012-12-07 21:00:52'
layout: post
slug: schedule-images-rackspace-nextgen-servers
title: Schedule Images Rackspace NextGen servers
categories:
- bash
- scripts
- Technology
tags:
- bash
- scripts
- Rackspace
---

I created a small script to help people out there to take schedule images after your NextGen servers using cron. Basicaly the script is using [python nova client](http://www.rackspace.com/knowledge_center/article/installing-python-novaclient-on-linux-and-mac-os) to take the images and it checks if the image was successful or not. If the image will be successful you will get an email that the image is done but if the image failed you will get an email with stating that you have to open a ticket so somebody can delete the failing image .

You can find the script [HERE](https://github.com/mariusv/rackspace-schedule-images)

Please bear in mind the fact that this scipt is NOT provided/maintaned or supported by Rackspace.

If experience any problems regarding the script or you have any feature request just let a comment and I will do my best to help you or to implement the feature.



