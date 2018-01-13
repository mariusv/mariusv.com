---
layout: post
title: "Fix DC/OS L4 Load Balancing / VIPs routing issue"
date: "2018-01-13"
categories:
- Personal
tags:
- DC/OS
- ansible
- VIP
- L4LB
---

WoW, it's been quite a long time since last time I wrote something in here. I will try to write more often.

This past week I was involved in a project working with [DC/OS](https://dcos.io/). The problem was that after the cluster was scaled up or down some services would not be able to connect to each other using the L4LB/VIP (Layer 4 loadbalancer).
After scratching my head a bit I found out that the problem was caused by zombie entries of the old service IP in the IPVS table (this is a known issue see: [DCOS-617](https://dcosjira.atlassian.net/browse/DCOS-617) & [DCOS_OSS-871](https://jira.mesosphere.com/browse/DCOS_OSS-871)). Now cleaning up is not really rocket science but it becomes time consuming when you have to do that on 20+ CoreOS servers as they don't have `ipvsadm` or any tool installed and we all know how "trivial" is to install new packages on CoreOS.
I know they have the [toolbox](https://github.com/coreos/toolbox) script which would basically spin up a Fedora container and then you can install whatever tool you need and do your troubleshooting but if you have to go manually trough all the servers and do this will take you most of the day and by now we all know how lazy I am and how much I like my [reddit](https://reddit.com) time .
Now while the fix for this issue is to upgrade [DC/OS](https://dcos.io/) to 1.9.1 or higher this is not always an option. Bellow you can find the steps to identify the issue and apply the workaround in a semiautomated way

Step 1 :
---

Identify the zombie IP by login on one of the nodes and run: `/usr/bin/toolbox` then run `dnf install -y ipvsadm`
Now we run `ipvsadm -ln` to list all the entries in IPVS table, you will see something like this:

```
  TCP  11.178.204.183:5672 wlc
-> 10.10.172.229:5672           Masq    1      0          0
-> 10.10.175.81:5672            Masq    1      0          0
```
For this exercise will use `11.178.204.183:5672` as the VIP and `10.10.175.81:5672` as the zombie node. Now you would ask how do we know that `10.10.175.81:5672` is the zombie? Well, simple..that IP/VM doesn't exists anymore

Step 2 :
---

Now that we know the offender we need to clear the `mnesia` database, restart `dcos-navstar` service and then remove the zombie IP. If you don't clear the mnesia database the zombie will come back and I'm sure you don't want that
Clearing the `mnesia` database is as simple as: `sudo rm -rf /var/lib/dcos/navstar/mnesia/*` and restarting the service: `sudo systemctl restart dcos-navstar`
Removing the zombie IP again is fairly easy and all we need to do is run: `ipvsadm -dt 11.178.204.183:5672 -r 10.10.175.81:5672`

And tadaa, your services are back up and reachable.

While this two steps are easy and not time consuming to be done when you have 1 - 2 servers this will become a pain when you have to do it on multiple servers.
I semiautomated the task of removing the offender so you don't have to do it

Clearing and restarting `mnesia` database and service:

```
---
- hosts: ec2

  tasks:
    - name: delete mnesia database
      shell: /bin/rm -rf /var/lib/dcos/navstar/mnesia/*
      become: true

    - name: restart navstar
      service: name=dcos-navstar state=restarted enabled=yes
      become: true


```

Removing the zombie IP script:

```bash
#!/bin/bash

echo "Usage: ./ssh_ipvsadm.sh <env octet (10,11,12)> <virtual ip with port> <real ip with port>"

test_remote(){
   ssh -n -o "StrictHostKeyChecking=no" core@$1 docker run --rm --net=host --privileged mariusv/ipvsadm -ln | grep -C 2 -e $2 -e $3
}

run_remote(){
   ssh -n -o "StrictHostKeyChecking=no" core@$1 docker run --rm --net=host --privileged mariusv/ipvsadm -d -t $2 -r $3
}

grep -e 10.$1 inventory | while read line
do
    test_remote $line $2 $3

    run_remote $line $2 $3
done
```

The above script would be ran: `./ssh_ipvsadm.sh 10 11.178.204.183:5672 10.10.175.81:5672` 
