---
date: '2014-11-07 23:23:20'
layout: post
slug: sensu-flapjack 
title: Sensu monitoring and Flapjack
categories:
- Personal
- DevOps
tags:
- Sensu
- Monitoring
- work
- Freelance
- Ubuntu
- Flapjack
---

While researching for a monitoring notification routing & event processing system, I came across [Flapjack](http://flapjack.io/), an alert notification router that works with check execution engines like [Nagios](http://www.nagios.org/) and [Sensu](http://sensuapp.org/). Despite Sensu having built in notification and rollup, using these features can have various drawbacks that aren't immediately apparent. The latest iteration(1.0) of Flapjack was built from the ground up to focus on alert routing. The Unix philosophy of doing one thing and doing it well really appeals to me, so I decided to look into this tool more and implement it in production.

In my case, I'm integrating Flapjack with Sensu instead of Nagios, so there is no need for the Nagios receiver. Instead, Sensu will be configured to feed check events directly into the Redis queue that is processed by Flapjack.

Installing Flapjack:

{% highlight bash %}

$ echo "deb http://packages.flapjack.io/deb/v1 precise main" > /etc/apt/sources.list.d/flapjack.list
$ apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 8406B0E3803709B6
$ apt-get update && apt-get install flapjack

{% endhighlight %}

The Flapjack omnibus package includes its own instance of Redis on port 6380 so will not interfere with your Sensu Redis so you can run Flapjack on the same server. You'll need to adjust `/etc/flapjack/flapjack_config.yaml` to fit your needs regarding `email, sms,  gateways, jabber` and the email templates.

On the Sensu server, we need to install the Flapjack handler:

{% highlight bash %}

$ git clone git://github.com/sensu/sensu-community-plugins.git
$ cp sensu-community-plugins/extensions/handlers/flapjack.rb /etc/sensu/extensions

{% endhighlight %}

Create `/etc/sensu/conf.d/flapjack.json` with the following contents. It should match the configuration used by Flapjack to connect to its own Redis.

{% highlight json %}

{
  "flapjack": {
    "host": "localhost",
    "port": 6380,
    "db": "0"
  }
}

{% endhighlight %}

Let's take the ActiveMQ check from example and add flapjack as `handler`.

{% highlight json %}

{
  "checks": {
    "activemq_watch_check": {
      "command": "/etc/sensu/plugins/active_mq.pl -w 1 -c 2 -q my.secret.swat.queue",
      "interval": 30,
      "subscribers": ["activemq_watch"],
      "handlers": ["hipchat", "flapjack"]
    }
 }
}

{% endhighlight %}

After restarting the Sensu server, you should be able to see check results flowing into the Flapjack web interface on port 3080 or via the API on port 3081. If you want to test out a failure, you can either use the `/opt/flapjack/bin/flapjack simulate` tool included with Flapjack, or create some havok yourself with `service activemq stop` (I would *NOT* recommend to stop a service if in Production).

Adding users can be done via the web interface or via the API (I prefer the API because is more fun and easier to automate :-) )

This is an example on how to add an user and a media contact via the API:

First we create a `user.json` file with the following content:

{% highlight json %}

{
    "contacts": [
      {
        "first_name": "Marius",
        "last_name": "Voila",
        "email": "myself@mariusv.com",
        "timezone": "Europe/London",
        "tags": [
          "legend",
          "doing DevOps before I even knew DevOps was a thing"
        ]
      }
    ]
  }
  
{% endhighlight %}

Then we run (this assumes you have [httpie](https://github.com/jakubroztocil/httpie) installed) :

{% highlight bash %}

$ http POST http://127.0.0.1:3081/contacts < contacts.json

{% endhighlight %}

## Wrap-up

In this post, I introduced Sensu service checks and integrating them with Flapjack. There is a lot more configuration that needs to be done to make Flapjack useful, but I won't get to in-depth on that topic. There is already a [Wiki](https://github.com/flapjack/flapjack/wiki) containing more instructions.


