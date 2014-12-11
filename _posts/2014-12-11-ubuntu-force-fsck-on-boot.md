---
date: '2014-12-11 19:44:10'
layout: post
slug: ubuntu-force-fsck-on-boot
title: Ubuntu force fsck on boot
categories:
- Personal
- Short Rant
tags:
- fsck
- work
- Freelance
- Ubuntu

---

This is a small rant because I deal with this every single day of my [sysadmin](https://en.wikipedia.org/wiki/System_administrator) life :-) .

I guess everyone of you saw this message in the console when they logged in their servers `*** /dev/xvda1 should be checked for errors ***` and of course the first fix which comes in ones mind is `touch /forcefsck` and reboot. This is great just that once the server boots up you will again be greeted with the same message because on boot [fsck](https://en.wikipedia.org/wiki/Fsck) did only a dry run so the actual fix did not happened.

To get rid of the not so welcoming message `*** /dev/xvda1 should be checked for errors ***` follow the following steps:

{% highlight bash %}

$ vim /etc/default/rcS

{% endhighlight %}

and make sure that it looks like this:

{% highlight bash %}

# automatically repair filesystems with inconsistencies during boot
FSCKFIX=yes
HWCLOCKACCESS=no

{% endhighlight %}