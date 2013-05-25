---
date: '2012-10-05 20:41:52'
layout: post
slug: date-when-a-package-was-installed
title: Date when a package was installed
categories:
- Tutorials
- Personal
tags:
- Debian
- packages
- dpkg
---

Howdy...I know is a long time since I wrote something in here but I was really busy with some personal projects and relocating in U.K so I have a good excuse :-P . If some of you are asking why the heck did I chose to move in London the answer is pretty simple...I came here because from 1st of October 2012 I started working for Rackspace U.K and I'm really proud to be one of the over 900 rackers here in London. I didn't even started work yet because I'm still accommodating in the company(and for this I have to say thank you to everybody from the onboarding team and all the AWESOME rackers who helped us to understand what is Rackspace and why Rackspace is different then other companies out there) I could write thousands of pages about how great company Rackspace is and how proud I am to be part of this big Family of Fanatical Supporters but then some of you will think that I moved in Marketing and everybody knows my opinion about Marketing(sorry if there are some from Marketing who reads my blog(I doubt that)) so all I'm gonna say is just that Rackspace IS F*cking AWESOME(please excuse my language but this is the truth) :-D .

Today I was asked by a future racker how can he see the date when a package was installed in Debian or any other Debian based systems and the answer is really simple but I figured out that is not that easy to find out by reading the manual so that's why I decided to write this blog post about how to do it.

Basically is just a simple *ls* command :

	marius@valkyrie:~# ls /var/lib/dpkg/info/*.list -lha

and for a specific package :

	marius@valkyrie:~# ls /var/lib/dpkg/info/iceweasel.list -lha
    -rw-r--r-- 1 root root 15K Oct  4 23:18 /var/lib/dpkg/info/iceweasel.list



