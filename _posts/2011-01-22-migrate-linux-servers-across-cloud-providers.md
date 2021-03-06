---
date: '2011-01-22 02:45:08'
layout: post
slug: migrate-linux-servers-across-cloud-providers
title: Migrate Linux Servers Across Cloud Providers
categories:
- Bash scripts
- Tutorials
tags:
- bash
- cloud
- migrate server
- rackspace
---

I wrote a shell script to assist in migrating an entire Linux <a href="http://www.centos.org/">CentOS 5.X</a> server. The script should work with most Red Hat based Linux distributions such as Fedora, but I have not officially tested it. I only tested with CentOS and Ubuntu. The shell script can be used to move a server instance to a different physical server, or even move a server to a completely new data center or provider. I recently tested the script by moving a server instance of <a href="http://www.centos.org/">CentOS 5.5 x64</a> on <a href="http://www.slicehost.com/">Slicehost</a> to <a href="http://rackspace.com">Rackspace Cloud Servers</a> successfully. It should also work migrating to <a href="http://www.linode.com/">Linode</a> or <a href="http://aws.amazon.com/ec2/">Amazon Elastic Compute Cloud</a>. 
The script takes the entire source server and rsyncs everything that is important, to a destination server, excluding certain naughty directories such as `/boot, /proc, /sys, /tmp,` and `/dev` which should not be transferred. <strong>Make sure the destination server is a completely fresh install of the exact same operating system as the source. Also, the source and destination servers should be running the exact same kernel version, or else you may experience strange things like “Could not load /lib/modules/SOME-KERNEL-VERSION/SOME-MODULE-NAME”. </strong>The script automatically handles housekeeping such as installing rsync on both the source and destination servers. It also attempts to stop services on the source that should not be running when rsyncing to provide a consistent snapshot. You may modify the services the script stops on the source, currently it handles all the major popular services; Lighttpd, Apache, Nginx, MySQL, PostgreSQL, ProFTP, and Postfix.

The script tries its best to not copy any of the network configuration, but I found that one file must be modified on the destination once the rsync has completed. You must modify the gateway address in the file `/etc/sysconfig/network` on the destination server to the proper default gateway <strong>BEFORE REBOOTING</strong>. Once that is complete, simply reboot the destination server, and you should be completely migrated successfully.

Here is the script for everybody to use and enjoy. Simply copy it to your source server and run it with: sh migrateMe.sh. Let me know in the comments or shoot me  an <a href="mailto:myself@mariusv.com">E-mail</a> if you have any questions/comments or if you discover any bugs or weirdness. 

{% highlight bash %}
#!/bin/bash
# @Description MigrateME
# @Usage Copy to the source server and run with: sh migrateMe.sh
# @Version 1.0.2
# @Date Last Modified 22/01/2011
# @Author Marius Voila <http://www.mariusv.com>
# @Copyright (c) 2011 mariusv under GNU GPL v2.0+
 
# @Returns success or failure
function is_root_user() {
	[ $(id -u) -eq 0 ] && return 0 || return 1
}
 
# @Returns text and if not root user exits with code 1 (error)
function require_root_user() {	
	if is_root_user
	then
		echo "Are We Runnning As Root? [ Yes ]"
	else
		echo "Are We Running As Root? [ No ]"
		echo "Fatal Error: You must be logged in as root to execute this shell script."
		exit 1
	fi	
}
 
require_root_user
 
read -p "Provide the destination server IP address or hostname: " destination_ip_address
 
echo -e "\n"
echo "##########################################################################"
echo "###   WHEN PROMPTED, PROVIDE THE DESTINATION SERVERS ROOT PASSWORD.    ###"
echo "##########################################################################"
echo -e "\n"
 
#Install rsync on the destination
ssh root@$destination_ip_address yum -y install rsync
 
#Make sure we were able to ssh successfully
rc=$?
[ "$rc" = "255" ] && exit 1
 
#Install rsync on the source
yum -y install rsync
 
#Yum clean all on the source, to free up some disk space
yum clean all
 
#Create the rsync_excludes file on the source
echo -e "/boot\n/proc\n/sys\n/tmp\n/dev\n/etc/fstab\n/etc/resolv.conf\n/etc/conf.d/net\n/etc/network/interfaces\n/etc/sysconfig/network-scripts/ifcfg-eth*" > /rsync_excludes.txt
 
#Stop critical services on source
for i in lighttpd httpd nginx mysqld postgresql proftpd postfix
do
	#Set rc equal to status code
	service $i status 2>/dev/null
	rc=$?
 
	#If status equals 0, we know its running, and can stop it
	[ "$rc" == "0" ] && service $i stop
done
 
echo -e "\n"
echo "##########################################################################"
echo "###   WHEN PROMPTED, PROVIDE THE DESTINATION SERVERS ROOT PASSWORD.    ###"
echo "##########################################################################"
echo -e "\n"
 
#Do the rsync
rsync -avz --delete --exclude-from=/rsync_excludes.txt / root@${destination_ip_address}:/
 
#Make sure we were able to login successfully
rc=$?
[ "$rc" = "255" ] && exit 1
 
echo -e "\n"
echo "##########################################################################"
echo "###   WHEN PROMPTED, PROVIDE THE DESTINATION SERVERS ROOT PASSWORD.    ###"
echo "##########################################################################"
echo -e "\n"
 
#First we have to clear the source known_hosts file
echo > ~/.ssh/known_hosts
 
#Delete the rsync_excludes.txt file on the destination
ssh root@$destination_ip_address rm -f /rsync_excludes.txt
 
#Complete
echo -e "\n"
echo "########################################################################"
echo "#                          ! VERY IMPORTANT !                          #"
echo "# You MUST go into the destination server and modify the network file. #"
echo "#  The destination GATEWAY ADDRESS must be updated before you reboot.  #"
echo "#                                                                      #"
echo "#                     Modify /etc/sysconfig/network                    #"
echo "#                                                                      #"
echo "# Update the gateway address to the proper destination server address. #"
echo "#                                                                      #"
echo "#  AGAIN, THE DESTINATION GATEWAY ADDRESS MUST BE UPDATED BEFORE YOU   #"
echo "#  REBOOT. FAILURE TO DO THIS, MAY RESULT IN THE DESTINATION SERVER    #"
echo "#  BEING INACCESSIBLE.                                                 #"
echo "########################################################################"
echo -e "\n"
echo "########################################################################"
echo "### PLEASE --REBOOT-- THE DESTINATION SERVER TO FINALIZE MIGRATION.  ###"
echo "########################################################################"
echo -e "\n"
 
exit 0
{% endhighlight %}
Download for <a href="http://www.ubuntu.com">Ubuntu</a> <a href="http://www.mariusv.com/x/migrateMe.sh">migrateME.sh</a>
Download for <a href="http://www.centos.org">CentOS 5+</a><a href="http://www.mariusv.com/x/migrateMeC.sh">migrateMeC.sh</a>
