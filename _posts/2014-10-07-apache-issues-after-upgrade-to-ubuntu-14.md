---
date: '2014-10-07 19:09:20'
layout: post
slug: apache-issues-after-upgrade-to-ubuntu-14 
title: Apache2 issues after upgrade to Ubuntu 14.04
categories:
- Personal
tags:
- Apache2
- vhost
- work
- Freelance
- Ubuntu
---

So few days ago I decided to start the upgrade of all my [Freelance](http://www.mariusv.com/rent-me.html) customers servers from Ubuntu 12.04 to Ubuntu 14.04 not just for security reasons but mostly because most of them are running [Docker](https://www.docker.com/) and everybody knows that docker runs much better on Ubuntu 14.04.

After finishing the upgrade everything went smoothly but few servers who weren't running Docker but just Apache2 stopped working so I decided to start digging. After few hours of frustrations and cursing I managed to identify that Apache changed the way how it looks at a Vhost also PHP-5.5.9 changed the path for its modules so instead of looking after modules in `/etc/php5/conf.d` now is looking after them in `/etc/php5/mods-available` which caused many website to die slowly. Now the easy part was to identify the new path for the modules in PHP because during the upgrade PHP took care to actually move all the modules in the new path but forgot to enable them, so all you have to do after you made sure that everything is in place just type `php5enmod mcrypt` for example and then restart apache and you are good to go.

As for apache this how the new config looks like:

**This:**

{% highlight bash %}

Order allow,deny
Allow from all

{% endhighlight %}

**Becomes this:**

{% highlight bash %}

Require all granted 

{% endhighlight %}

**Also this:**

{% highlight bash %}

Order allow,deny
Deny from all 

{% endhighlight %}


**Becomes this:**

{% highlight bash %}

Require all denied

{% endhighlight %}