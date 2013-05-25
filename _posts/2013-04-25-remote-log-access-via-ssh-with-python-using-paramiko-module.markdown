---
date: '2013-04-25 21:00:52'
layout: post
slug: remote-log-access-via-ssh-with-python-using-paramiko-module
title: Remote log access via SSH with Python using Paramiko module
categories:
- Python scripts
- Technology
- Personal
tags:
- Ubuntu
- Debian
- Rackspace
- SSH
- logs
---

The problem - On my day to day job here at [Rackspace Cloud](http://www.rackspace.co.uk/) I need to view/download log files from remote servers on a regular basis. The task of having to SSH to multiple servers just for getting log files was aching for some automation. This led me to Paramiko module, it "implements the SSH2 protocol for secure (encrypted and authenticated) connections to remote machines", bravo! just what I needed. Download Paramiko module [here](http://www.lag.net/paramiko/) or just run `pip install paramiko` and then use this code to get the logs :

{% highlight python %}
import paramiko
import string
import webbrowser
import os

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('xxx.yyy.x.zz', username='username', password='password') 
    
print "1: get file \n2: print contents of file"
c=input(':')

if c==1:
    ftp = ssh.open_sftp()
    ftp.get('log.txt', 'log.txt')
    ftp.close()
    webbrowser.open_new(os.getcwd()+"/log.txt")
    print "FILE GOT!"
elif c==2:
    ftp = ssh.open_sftp()
    file=ftp.file('log.txt', "r", -1)
    data=file.read()
    L = string.split(data)
    for i in L:
        if string.find(i, '%')>-1:
            print i
    print ftp.stat("log.txt")        
    ftp.close()
    print "DONE!"   
else: 
    print "EXIT!"
ssh.close()
{% endhighlight %}
