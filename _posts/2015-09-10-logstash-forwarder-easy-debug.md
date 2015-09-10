---
date: '2015-09-10 12:30:50'
layout: post
slug: logstash-forwarder-easy-debug
title: How to debug TIME_WAIT in logstash-forwarder
categories:
- Freelance
- Cloud
tags:
- logstash
- elasticsearch
- Freelance
- logging

---

Howdy peeps :-) I know is a long time since my last post here and that the site looks more like deserted island but I want to assure you dear reader that I'm not dead just yet just that I'm covered with work :-P .

So for the past 2 hours I was bashing my head on pretty much everything which came in front of me because of [logstash-forwarder](https://github.com/elastic/logstash-forwarder) and a `TIME_WAIT` issue. It looks like there is no way to have some kind of logging enabled on the `logstash-forwarder` (or at least I wasn't able to find any way of doing it) so I tried pretty much every possible way of debugging why my [logstash](https://logstash.net) server is not getting any logs and why I see crap loads of `TIME_WAIT`.

After my [Googling](http://www.urbandictionary.com/define.php?term=Googling) skills failed it finally hit me "Why not just start the client manually and for sure I'll be able to see any kind of errors it occurs?" .
So here it goes what you need to do to debug the [logstash-forwarder](https://github.com/elastic/logstash-forwarder) ***please be aware that the paths for you might be different*** :

{%highlight bash%}
$ /opt/logstash-forwarder/bin/logstash-forwarder.sh  -config /etc/logstash-forwarder
{%endhighlight%}

and that's pretty much it.
If you curious my issue was caused by a rogue SSL certificate!

BTW..this was supposed to be a short rant so I don't forget the "solution" for the next time :-)