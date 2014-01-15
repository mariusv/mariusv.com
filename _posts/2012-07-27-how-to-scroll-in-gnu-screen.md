---
date: '2012-07-27 01:38:43'
layout: post
slug: how-to-scroll-in-gnu-screen
title: How to scroll in GNU screen
categories:
- Technology
tags:
- GNU screen
- linux
- MacOSX
---

Today a friend of mine and future colleague asked me how to use scroll(mouse wheel or synaptic touchpad) in GNU screen and because I was busy fixing other things I told him is doable but I didn't told him ho to do it :-) The fix does not work well when you are using mul­ti­ple win­dows inside a sin­gle screen espe­cially when using split mode but for the times you use one win­dow per screen its pretty handy.

Add the fol­low­ing to your .screenrc :


    
    termcapinfo xterm|xterms|xs|rxvt ti@:te@



And for MacOSX Terminal app, I found that the above fix doesn't work and after few minutes of reading I come up with this fix :


    
    term­cap­info xterm* ti@:te@




