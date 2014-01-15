---
date: '2013-12-10 21:43:25'
layout: post
slug: install-chef-on-osx-maverick
title: How to install chef on OSX Maverick
categories:
- Personal
tags:
- ruby
- OSX
- work
- chef
- Rackspace
---

  Few days ago I was tempted to update my work Mac to OSX Maverick (10.9) so I went ahead and upgraded even if I got lots of co-workers saying that my laptop will not boot up anymore because of the amount of Corporate Security software we have installed on it.
 Well the upgrade went pretty much fine (few glitches but nothing which I could not hack my way around) but for some reason the upgrade removed [Chef](http://www.getchef.com/chef/) from it so I had to re-install but for my surprise the `curl -L https://www.opscode.com/chef/install.sh | sudo bash` command failed to install because of Unknown OS :-)
and asking me to open a ticket with [OpsCode](http://tickets.opscode.com) which is not quite my view on fixing issues. After few minutes of Googling I found out that there is already a [ticket](https://tickets.opscode.com/browse/CHEF-3327) open regarding this issue for OSX 10.8 Mountain Lion and one of the comments already has a small workaround for OSX 10.8 so I went ahead and applied the solution provided for 10.8 but changing to 10.9 and it worked.

Here are the steps needed to follow to install Chef on OSX 10.9 Maverick:

First, download the install script from https://www.opscode.com/chef/install.sh by invoking: `curl https://www.opscode.com/chef/install.sh -o install.sh`

Then edit the `install.sh`:
{% highlight bash %}
"10.6") platform_version="10.6" ;;
"10.7") platform_version="10.7" ;;
"10.8") platform_version="10.7" ;;
{%endhighlight%}
    
and change it to:
{% highlight bash %}
"10.6") platform_version="10.6" ;;
"10.7") platform_version="10.7" ;;
"10.8") platform_version="10.7" ;;
"10.9") platform_version="10.7" ;;
{%endhighlight%}    
next step will be to make the script executable and run it ;-)

