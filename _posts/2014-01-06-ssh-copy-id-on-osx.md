---
date: '2014-01-06 19:13:46'
layout: post
slug: ssh-copy-id-on-osx
title: SSH copy id on OSX
categories:
- Personal
tags:
- ssh
- OSX
- work
- Rackspace
---

One of my challenges with using a mac was the lack of ssh-copy-id and in the beginning I wasn’t missing it that much because I was playing with my own Cloud servers in which I inject the SSH Key on build but once I needed to connect on other servers I started missing this neat tool so I started searching to see if there is an alternative for OSX because running this `cat ~/.ssh/id_rsa.pub | ssh user@machine "mkdir ~/.ssh; cat >> ~/.ssh/authorized_keys”` every time wasn’t quite an option I managed to find out that there actually exists the same tool for OSX [ssh-copy-id](https://github.com/beautifulcode/ssh-copy-id-for-OSX) .

There are 3 options on how to install it:

First one and my favourite because I use macports is:

`sudo port install openssh +ssh_copy_id`

Second option is using brew:

`brew install ssh-copy-id`

 And the last one is the curl way:

{% highlight bash %}
sudo curl https://raw.github.com/beautifulcode/ssh-copy-id-for-OSX/master/ssh-copy-id.sh -o /usr/local/bin/ssh-copy-id 
sudo chmod +x /usr/local/bin/ssh-copy-id
{% endhighlight %}
