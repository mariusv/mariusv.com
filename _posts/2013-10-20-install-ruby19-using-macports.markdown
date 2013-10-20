---
date: '2013-10-20 10:35:25'
layout: post
slug: install-ruby19-using-macports
title: How to install ruby19 using MacPorts
categories:
- Personal
tags:
- ruby
- OSX
- work
---

I got as a work laptop a MacBook Pro and after configuring the whole environment exactly with what I need and make it work/look as close to my [CrunchBang](http://crunchbang.org/) without nuking OSX from it. I encountered many challenges and one of them was installing Ruby 1.9+ and make it the default version using MacPorts. Looking on internet I saw many people had this issue and most of them decided to go with the hackish way of doing things (by creating a symlink to the new installed version of ruby), I was tempted to choose the same path but as many of you know I'm pretty stubborn so I like things working the proper way :-)

If you occurred the same issues with installing and making default ruby1.9 and read this probably you will feel like me when you see how easy it is :-)
After reading few forums/blogs regarding solutions to this "issue" I decided to read the manual and I found out this (quote from 'man port'):

> For a given group, selects a version to be the default by creating appropriate symbolic links.  For instance, python might be linked to python2.6.  Available select groups are installed as subdirectories of ${prefix}/etc/select/.  To list the available versions in a group, use --list.  To see which version is currently selected for a group, use > --show.
>    To change the selected version for a group, use --set.

>     For example:

  >         port select --list python
  >         port select --show gcc
  >         __port select --set gcc mp-gcc44__


As you can see the easiest way to make ruby1.9 default is:

`sudo port select --set ruby ruby19` and tadaaa…I can haz ruby1.9 :-)


PS:

If you feel lazy and don't want to read the whole manual (which is not so big) you can run `port help select` to get a very limited description. This functionality replaces the `+nosuffix` "variant" style of setting the default version
