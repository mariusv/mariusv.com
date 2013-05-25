---
date: '2010-07-19 07:26:34'
layout: post
slug: creating-a-%e2%80%9cbash-alias%e2%80%9d-with-an-argument
status: publish
title: Creating a “bash alias” with an argument
wordpress_id: '315'
categories:
- Tutorials
tags:
- alias
- bash
- sendmail
---

While setting up and testing the anti virus/spam filter of a mail server I usually send a lot of “test spam” to myself and that involves a pretty long line that needs to be typed in every time, and changed for every mail account i test. I want to make an alias for this using an argument containing the email address, but bash makes it hard if not impossible to do so with an alias. Fortunately it allows you to create an function instead.

The command for sending a “GTUBE” test spam message is


    
    sendmail john@doe.com < /usr/share/doc/spamassassin/examples/sample-spam.txt



To make this easier I wanted to make an alias for it, so I can type _sendspam "email -address"_ to send it. And as I mentioned earlier bash don’t allow you to use arguments in aliases. But making a function is just as easy. Add the following line in **~/.bashrc**


    
    sendspam () { sendmail "$1"  < /usr/share/doc/spamassassin/examples/sample-spam.txt; }



After the next login you will now be able to use the following command to send a test spam message


    
    sendspam john@doe.com
