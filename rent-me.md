---
layout: default
title: Rent me
description: My name is Marius Voila. I grew up in Sibiu, Romania and I've been living in Horsens
  City, Denmark since July 2011. I'm a Linux system administrator, a photographer, a technologist, and
  a hacker.
---
<p id="breadcrumbs">
<a href="/">Home</a>
&rsaquo; Rent me
</p>
## Rent me ##


I'm specialised in Linux server and network administration with ofer [14 years of experience](/experience.html), and can:

 *   Provision Linux servers for you from whatever provider you prefer. I recommend and use [Linode](http://linode.com), [Amazon Cloud](http://aws.amazon.com) and the [Rackspace Cloud](http://rackspace.com).
 *   Provide and perform regular security upgrades as they are released, to keep your system up to date and secure.
 *   Install and configure applications or services on your server
 *   Make optimisations to your server if required
 *   Troubleshoot problems and respond to incidents/outages and get things working for you again.
 *   Set up Nagios monitoring and Munin graphs to cover very low-level diagnostics of your system.

***I'm not a hosting provider. Virtual server hosting in the 21^st century is already an affordable commodity that you ought to enjoy without me marking up the price from other providers.***

**Nagios and Munin**

Whether you run your own server or I provision and manage it for you, I can help you monitor your system and the services running on it using using the industry standard sysadmin monitoring tool [Nagios](http://www.nagios.org/). This tool constantly performs checks to retrieve low-level statistics about your system.

Depending on whether the result of the check is OK or CRITICAL, Nagios can even send you alerts that there's a problem. Alerts can come in the form of Push notifications to your iPhone/Android, SMS, and / or e-mail, and often several of these at once.

Prefer a graphical representation of your system? I recommend using the popular tool [Munin](http://munin-monitoring.org/) to poll your server and generate graphs of your system regularly, which can be useful to identify slowly growing issues, or even troubleshoot a situation that occurred 5 minutes ago but has recovered.

**Secure Offsite backups**

I can build tools for you that use the excellent program [Duplicity](http://duplicity.nongnu.org/) to take backups of your server, encrypt them to prevent unauthorised reading, and store them in the Amazon S3 cloud or Rackspace cloud.

Because the backups are encrypted, they are safe in the cloud. Duplicity runs full and incremental backups, allowing you to restore your server back to ***any point in time***!

Duplicity is the perfect backup system for the Cloud, because the costs are low, there is no need to purchase additional hardware, and your backups are stored offsite from the server you're backing up in the first place.

Your backup crons will send you a report every time they are run, stating whether the backup was a success and what changed.

**Offsite backup tests**

In conjunction with our Offsite Backup service, I offer state-of-the-art tools that will automatically create new servers in the Cloud on demand, restore your backups to them and send you a report. You'll have SSH access to the new server for 48 hours to sift through your backups or restore if needed. This entire process is automated thanks to Cloud-based technology!

**Firewalls and security hardening**

You should always have a firewall running on your server to prevent unauthorised access or exploitation by malicious parties. I can write custom iptables firewall rules tailored to your needs. You'll get a copy of the script plus documentation outlining what it does, in our excellent Support system.

In some cases it may not be possible for you to lock down SSH access to specific source IP addresses. I can still help you by

*    locking down SSH to use public SSH key authentication only (no clear text passwords),
*    run '3-strike' IP blocking systems such as DenyHosts or Fail2Ban,
*    configuring SSH to run on non-standard ports,
*    preventing root user logins, and
*    allowing SSH access to only specific system users.

Other InfoSec services are on offer such as penetration testing and auditing.
