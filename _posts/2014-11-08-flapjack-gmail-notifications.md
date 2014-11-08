---
date: '2014-11-08 18:50:20'
layout: post
slug: flapjack-gmail-notifications 
title: Using Gmail with Flapjack to send notifications
categories:
- Personal
- DevOps
tags:
- Monitoring
- work
- Freelance
- Ubuntu
- Flapjack
---

One of the biggest pains in monitoring is the alerting & routing system. Now as you saw yesterday the routing issue was fixed by introducing [Flapjack](http://flapjack.io) but the alerting issue was still in place as for some reason [Gmail SMTP](https://support.google.com/a/answer/176600?hl=en) doesn't like Flapjack so is refusing to send any emails and in my case I had to use Gmail as a relay. After trying to make Flapjack work with Gmail I decided to take a different route and implement Gmail SMTP in [Postfix](http://www.postfix.org/) and in Flapjack use the localhost settings for postfix.

Here is the workaround just in case somebody else will have the same issue:

{% highlight bash %}

$ apt-get install postfix mailutils libsasl2-2 ca-certificates libsasl2-modules

{% endhighlight %}


If you do not have postfix installed before, postfix configuration wizard will ask you some questions. Just select your server as *Internet Site* and for FQDN use something like *mail.example.com*

Then open your postfix config file:

{% highlight bash %}

$ vim /etc/postfix/main.cf

{% endhighlight %}

and add the following lines to it:

{% highlight bash %}

relayhost = [smtp.gmail.com]:587
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_tls_CAfile = /etc/postfix/cacert.pem
smtp_use_tls = yes

{% endhighlight %}

You might have noticed that we haven’t specified our Gmail username and password in above lines. They will go into a different file. 

Create:

{% highlight bash %}

$ vim /etc/postfix/sasl_passwd

{% endhighlight %}

And add the following line:

{% highlight bash %}

[smtp.gmail.com]:587    USERNAME@gmail.com:PASSWORD

{% endhighlight %}

If you want to use your Google App’s domain, please replace `@gmail.com` with your `@domain.com`

Fix permission and update postfix config to use sasl_passwd file:

{% highlight bash %}

$ chmod 400 /etc/postfix/sasl_passwd
$ postmap /etc/postfix/sasl_passwd

{% endhighlight %}

Next, validate certificates to avoid running into error and restart postfix for changes to take effect. Just run following command:

{% highlight bash %}

$ cat /etc/ssl/certs/Thawte_Premium_Server_CA.pem | sudo tee -a /etc/postfix/cacert.pem
$ service postfix restart

{% endhighlight %}


