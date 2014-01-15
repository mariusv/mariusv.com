---
date: '2010-09-05 00:26:36'
layout: post
slug: who%e2%80%99s-abusing-your-wordpress-website
status: publish
title: Who’s abusing your Wordpress website?
wordpress_id: '421'
categories:
- Personal
tags:
- abuse
- wordpress
---

I wanted to know what IP addresses were hitting my website. I’d done this before and it only took a moment or two to recreate the following commands. Still, here it is for future reference:

`grep -v "wp-content" access.log|grep -v wp-includes|cut -f 1 -d " "|sort|uniq -c|sort -nr|less`



This code:






  * Excludes “wp-content” and “wp-includes” requests.


  * Uses “cut” to cut out the IP address.


  * Sorts the list of IP addresses.



  * Uses “uniq” to count the occurrence of each IP.


  * And finally reverse sorts the list again, by number of occurrences, with the largest number at the top.




You’ll probably find Google and Yahoo! bots near the top of the list, but I also found the “Jyxobot/1? bot was quite busy today.
