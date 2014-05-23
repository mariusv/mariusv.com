---
date: '2014-05-23 18:32:20'
layout: post
slug: openvas6-omp-issues-on-centos 
title: OpenVas6 OMP issues on CentOS
categories:
- Personal
tags:
- security
- centos
- work
- Freelance
- OpenVas
---

The [OpenVAS](http://www.openvas.org/) folks have provided install instructions for installation on a variety of Red Hat flavors that can be found [here](http://www.openvas.org/install-packages-v5.html#openvas_centos_atomic).  I know they released a [virtual appliance](http://www.openvas.org/vm.html) with everything up and running. However I wanted to try out the new release on my own Cloud Server.
The install instructions for [CentOS](http://www.centos.org/) did not quite get me there. After I followed the instructions on the OpenVAS site I hit the Greenbone UI at https://IP:9392. When I tried to log in a red error message came up that said the OMP service was down. OMP stands for OpenVAS Management Protocol. It is for doing things like starting / stopping scans and creating / deleting users. After fixing the error and getting the service up and running I decide to write this blog so I don't forget and also maybe this helps somebody else to spare some time when they hit the same issue. Also working on writing a small [Ansible playbook](http://docs.ansible.com/playbooks.html) just to make it easier to deploy.

{% highlight bash %}

$ wget -q -O - http://www.atomicorp.com/installers/atomic |sh
$ yum install openvas
$ openvas-setup
$ openvas-certdata-sync
$ openvas-nvt-sync
$ openvasmd
$ openvasmd --rebuild
$ service openvas-manager restart

{% endhighlight %}
