---
date: '2010-04-24 19:13:15'
layout: post
slug: compile-ffmpeg-on-ubuntu-karmic
status: publish
title: Compile FFmpeg on Ubuntu Karmic
wordpress_id: '167'
categories:
- Tutorials
tags:
- ffmpeg
- linux
- server
- sysadmin
- ubuntu
---

Install the following packages:


    
    $ sudo apt-get install faad libmp4v2-dev libfaac0 libfaac-dev libxvidcore4 libxvidcore4-dev liba52-0.7.4 liba52-0.7.4-dev libx264-dev libgsm-tools libogg-dev libtheora-bin libfaad-dev libvorbis-dev libtheora-dev libdts-dev git-core yasm texi2html checkinstall



Then:


    
    apt-get purge ffmpeg (in case you have any pre-installed stuff from the standard repo)



Latest version of Yasm


    
    $ wget http://www.tortall.net/projects/yasm/releases/yasm-0.7.2.tar.gz
    $ cd yasm
    $ ./configure;make;
    $ sudo make install
