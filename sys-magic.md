---
layout: default
title: Sys magic
---
***A single command to kill a list of processes*** :
{% highlight bash %}

$ kill -9 `ps -ef | grep apache | grep -v grep | awk '{print $2}'`

{% endhighlight %}

***Or as bash script*** :

{% highlight bash %}

#!/usr/bin/env bash
kill -9 `ps -ef | grep $1 | grep -v grep | awk '{print $2}'`

{% endhighlight %}

***Delete an IPtable rules based on row number*** :

{% highlight bash %}
$ sudo iptables -L -vnx --line-numbers
$ sudo iptables -t nat -D <chain-name> <number>
{% endhighlight %}

***Show header HTTP with tcpdump*** :

{% highlight bash %}
$ tcpdump -s 1024 -l -A src 10.0.12.23 or dst 10.0.12.54
{% endhighlight %}

***Random passwords with openssl*** :
{% highlight bash %}
$ openssl rand -base64 12
{% endhighlight %}

***Don’t log your last session in bash history*** :
{% highlight bash %}
$ kill -9 $$
{% endhighlight %}

***nova list only the IPs of the servers*** :
{% highlight bash %}
$ nova list |awk '{print $12}' |grep -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'
{% endhighlight %}

***Flush DNS cache OSX*** :

{%highlight bash%}
$ dscacheutil -flushcache
{% endhighlight %}
