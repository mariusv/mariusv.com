---
date: '2011-01-20 11:47:14'
layout: post
slug: perl-script-to-hunt-and-kill-selected-pids
status: publish
title: Perl Script to hunt and kill selected PIDs

categories:
- Perl scripts
- Tutorials
tags:
- linux
- perl
- PID
---

If you ever run a selection of applications or processes and regularly get lock-ups due to a lack of processing power or RAM. This script allows you to add a selection of non-essential apps to a list which can be knocked-out if resources are running low.

Just copy and paste this script to a file called “killemall” in `/usr/local/bin`, make it executable, and then you can run it from the terminal if things start to get a bit “iffy” :) Just edit the line `“my $processes = “google-chrome mutt iceweasel conky volwheel”;”` and add any apps you can do without.

{% highlight perl %}
#!/usr/bin/perl -w
###########################################
#Written by Marius Voila <http://www.mariusv.com/>
# (c) 2011 mariusv under GNU GPL v2.0+
# #
# DESCRIPTION: #
# #
# This script will kill a bunch of #
# expendible processes if your system #
# gets frozen. #
# #
###########################################
# PERL MODULES TO USE #
###########################################
# NONE #
#use NOTHING #
###########################################
# Debugging: #
use strict; #
use warnings; #
###########################################
#Let's tell the user the carnage they are about to inflict
#
print "Hunting down enemy PIDs...\n";
#
#Then we need to find the PIDs of expendable apps
 
#for my $file (@ARGV) {
my $processes = "google-chrome mutt iceweasel conky volwheel";
my @processes = split (" ", $processes);
for my $process (@processes) {
open (PID, "pidof $process |");
while ($_ = ) {
my @list = split (" ", $_);
for my $pid (@list) {
print "Killing pid $pid ($process)\n";
system ("sudo kill -9 $pid");
}
}
close PID;
}
 
print "Like lambs to the slaughter!\n";
{% endhighlight %}

