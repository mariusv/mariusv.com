---
date: '2010-07-02 09:48:05'
layout: post
slug: nginx-vs-apache-1-0
status: publish
title: Nginx vs Apache = 1 - 0
wordpress_id: '262'
categories:
- Personal
- Technology
tags:
- apache
- Nginx
- vps
---

[![](http://www.mariusv.com/wp-content/uploads/2010/07/Absolut_nginx.jpg)](http://www.mariusv.com/wp-content/uploads/2010/07/Absolut_nginx.jpg)I spent the better part of the evening converting several sites belonging to a friend of mine from Apache to Nginx. Previously the front page of the biggest site (written in Joomla) took anywhere from 5 to 10 seconds to load. If request load got even moderately heavy, Apache would quickly exhaust the 256MB of memory available in the VPS and the site would become permanently unavailable as processes were killed by the kernel, requiring the VPS to be restarted.


After this happened three times over a period of a week, I decided to take some action. I tried the "easy method", tuning Apache by following guides I found that purported to make Apache suitable to a VPS, but nothing really helped. At best they made the site slower and delayed the inevitable crash. Finally I bit the bullet and converted them all to Nginx (I was reluctant to do so because I'm not terribly familiar with Joomla and there aren't many examples around for running Joomla on anything but Apache - and previous trials a few years ago with Nginx + Mambo turned out to be a huge pain).

At the end of it all, the Nginx configuration turned out to be [remarkably simple](http://wiki.nginx.org/NginxJoomla), and page loads are down to under 3 seconds (the site is very image-heavy and Joomla isn't terribly efficient). And of course, Nginx's memory utilization never exceeds a few megabytes, regardless of load.


Credit to [Enemy of the statement](http://www.enemyofthestatement.com)
