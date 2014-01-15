---
date: '2011-09-20 15:54:42'
layout: post
slug: connecting-to-amazon-ec2-server-using-ssh-config-file
status: publish
title: Connecting to Amazon EC2 server using ssh config file
wordpress_id: '970'
categories:
- Tutorials
tags:
- amazon
- config
- EC2
- ssh
---

I’ve recently moved my blog on the [Amazon EC2](http://aws.amazon.com/free/) cloud infrastructure which has been an interesting process (more posts coming !)

I’m also big biG bIG BIG fan of [SSH host shortnames](http://www.mariusv.com/setting-up-ssh-host-shortnames/). However, being used to a keypair from the servers to manage ssh login and sftp transfers, I couldn’t work out how to connect using the default .pem file supplied by [Amazon EC2](http://aws.amazon.com/ec2/). PEM – or privacy enhanced email – is another cert-based system see the ubiquitous Wikipedia article for more tech juice.

I downloaded my server .pem file to my local ssh directory (you can find this in your user directory called .ssh – notice that the prefix of . makes it invisible normally). I could then login via ssh using

ssh -i ~/.ssh/server.pem me@mariusv.com

but I'm to lazy to writte that long line :D . After some time of thinkig the solution hits me…

`Replace server.pem with your .pem file in the following instructions
    Copy your server.pem file to ~/.ssh
    Open terminal and you’ll be in your user directory
    Edit (or create) the file config with: vim ~/.ssh/config
    Hit “i” to go into insert mode
    Add: IdentityFile ~/.ssh/server.pem
    Hit: :wq! to quit and save`
    
Change the permissions on your pem file with chmod 400 ~/.ssh/server.pem and you're done!

Enjoy!
