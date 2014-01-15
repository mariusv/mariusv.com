---
date: '2010-02-08 15:57:30'
layout: post
slug: linux-script-to-collect-system-statistics-and-send-to-your-email
status: publish
title: Linux script to collect system statistics and send to your email
wordpress_id: '13'
categories:
- Tutorials
tags:
- email
- linux
- sysinfo
---

This script I use to daily send me the system statistics on my gentoo server.
It will also reformat the output to replace tabs with 5 spaces so it will display nicely on your email client.
On mail.app the fonts Monaco and Inconsolata displays nicely, but the default font does not.

requirements:
- app-admin/sysstat
- net-mail/sendEmail
- app-admin/procinfo
- local postfix server able to deliver emails.
- perl


	emerge -va app-admin/sysstat net-mail/sendEmail app-admin/procinfo



Just put the script under /etc/cron.daily


{% highlight bash %}
#!/bin/bash

SERVER="mydomain.com"
EMAIL_TO="your_email@gmail.com"
EMAIL_FROM="stats@mydomain.com"


# logged in users and what are they running
WHO=`w`

# processor stats
MPSTAT=`mpstat`


# virtual memory stats
VMSTAT=`vmstat`

# Top 20 memory hog applications
PS_MEM=`ps -A -o pid,pcpu,pmem,start_time,state,time,comm | perl -e '($_ = join "",<>) =~ s/(\t)/     /g; print;' |sort -g -k 3 -r | head -20`


# Top 10 CPU usage applications
PS_CPU=`ps -A -o pid,pcpu,pmem,start_time,state,time,comm | perl -e '($_ = join "",<>) =~ s/(\t)/     /g; print;' | sort -g -k 2 -r | head -10`


#  memory usage in MB
FREE=`free -m`

PROCINFO=`procinfo`


# iptables status
IPTABLES=`iptables -nL`

# established connections
NETSTAT=`netstat -na |grep -i esta |grep -v 127.0.0.1 |sort -n -t. -k2`


# line divider
DL="=================================================================================="

FINAL="${DL} 
`date`
${DL}

${SERVER} 
${DL} 
${WHO} 
${DL}
${FREE}
${DL}
${MPSTAT}
${DL}
${VMSTAT} 

${DL}
${PROCINFO}
${DL} 
Top 10 CPU processes
${PS_CPU} 
${DL}
Top 20 Memory processes
${PS_MEM} 
${DL}
${IPTABLES}

${DL}
${NETSTAT}
${DL}
"

echo "${FINAL}" | 
  perl -e '($_ = join "",<>) =~ s/(\t)/     /g; print;' | 
  sendEmail -f "${EMAIL_FROM}" -u "${SERVER} comparator" -t ${EMAIL_TO}

{% endhighlight %}

