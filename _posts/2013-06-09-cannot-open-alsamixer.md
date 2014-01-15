---
date: '2013-06-07 18:50:06'
layout: post
slug: cannot-open-alsamixer
title: Cannot open AlsaMixer
categories:
- Technology
- Personal
tags:
- Debian
- sound
- AlsaMixer
- CrunchBang
---

If you use [CrunchBang Linux](http://crunchbang.org/) or upgraded from [Debian Wheezy](http://www.debian.org/News/2013/20130504) (now stable) to [Debian Jessie](http://www.debian.org/releases/testing/) (testing) for sure you got problems with *pnmixer*, *alsamixer* , *aplay* etc.

The error :
      ALSA lib control_ext.c:664:(snd_ctl_ext_create) ctl_ext: Plugin version   mismatch

       Mixer attach default error: No such device or addressSegmentation fault

The solution :

Update `alsa-utils` to `1.0.27.1-1` ([Debian sid](http://www.debian.org/releases/sid/)). There are two ways of doing this:

1. Download the package from [Debian Packages Page](http://packages.debian.org/sid/alsa-utils) and then: `dpkg -i /path/to/the/deb` (you will have to solve the dependencies manually

2. The easy way:

Edit the `sources.list` by `vi /etc/apt/sources.list` and replace testing with unstable. Once this is done run *apt-get update* (**DO NOT RUN** *dist-upgrade or upgrade* because this will update the whole system) and then install the package by `apt-get install alsa-utils=1.0.27.1-1` .

Next step is to revert back the source.lst to point to testing and you are good to go! :-)

