---
date: '2014-11-03 17:15:20'
layout: post
slug: sensu-postgres 
title: Sensu monitoring PostgreSQL
categories:
- Personal
tags:
- Sensu
- Monitoring
- work
- Freelance
- Ubuntu
- PostrgreSQL
---

Today I was working on implementing [Sensu](http://sensuapp.org/) in one of my clients infrastructure to monitor [OpenStack](http://openstack.org) infrastructure and the production one and because of the awesomeness of the automation was pretty much just a matter of minutes to deploy and implement it and the only issue I had was with the PostgreSQL plugin because I was not able to install the `pg` gem due some dependencies issues in Ubuntu 14.04 (pretty sure this issue is replicable in older versions of Ubuntu but this customer is using Ubuntu 14.04 for most of the infrastructure).
After looking around on how to fix this issue I came up with this solution:


{% highlight bash %}

$ apt-get install libpq-dev && gem install pq

{% endhighlight %}

After installing `libpq-dev` everything worked like a charm :-)
