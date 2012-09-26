---
date: '2010-09-06 10:05:28'
layout: post
slug: convert-vob-to-avi-using-ffmpeg
status: publish
title: Convert VOB to AVI using ffmpeg
wordpress_id: '434'
categories:
- Tutorials
tags:
- avi
- ffmpeg
- vob
---

Suppose you have a myVideo.vob and you want to convert to avi format.
Open a terminal and execute the following command
`$ ffmpeg -i myVideo.vob myvideo.avi`
Possible errors:
1 "**ffmpeg: symbol lookup error: ffmpeg: undefined symbol: avcodec_channel_layout_num_channels**"
Solution:
`$ export LD_LIBRARY_PATH=/usr/local/lib/ && ffmpeg -i myVideo.vob myvideo.avi`
If this doesnt solve the problem then retry that after installing the libavcodec52 and libavutil49 packages:
`$ aptitude install libavcodec52  libavutil49`
