---
date: '2010-09-01 07:45:50'
layout: post
slug: difference-between-sigterm-sigkill
status: publish
title: 'Difference between SIGTERM & SIGKILL '
wordpress_id: '402'
categories:
- Personal
- Tutorials
tags:
- sigkill
- sigterm
---

Sending signals to processes using [kill](http://en.wikipedia.org/wiki/Kill_(command)) on a Unix system is not a new topic for most systems administrators, but I've been asked many times about the difference between _kill_ and _kill -9_.

Anytime you use _kill_ on a process, you're actually sending the process a signal (in almost all situations - I'll get into that soon). Standard C applications have a [header file](http://en.wikipedia.org/wiki/Signal.h) that contains the steps that the process should follow if it receives a particular signal. You can get an entire list of the available signals on your system by checking the man page for _kill_.

Consider a command like this:


    
    kill 2563



This would send a signal called [SIGTERM](http://en.wikipedia.org/wiki/SIGTERM) to the process.  Once the process receives the notice, a few different things can happen:

  * the process may stop immediately
  * the process may stop after a short delay after cleaning up resources
  * the process may keep running indefinitely

The application can determine what it wants to do once a SIGTERM is received.  While most applications will clean up their resources and stop, some may not.  An application may be configured to do something completely different when a SIGTERM is received.  Also, if the application is in a bad state, such as waiting for disk I/O, it may not be able to act on the signal that was sent.

Most system administrators will usually resort to the more abrupt signal when an application doesn't respond to a SIGTERM:




    
    kill -9 2563



The _-9_ tells the _kill_ command that you want to send signal #9, which is called [SIGKILL](http://en.wikipedia.org/wiki/SIGKILL). With a name like that, it's obvious that this signal carries a little more weight.

Although SIGKILL is defined in the same signal header file as SIGTERM, it cannot be ignored by the process.  In fact, the process isn't even made aware of the SIGKILL signal since the signal goes straight to <del>the kernel</del> init.  At that point, init will stop the process.  The process never gets the opportunity to catch the signal and act on it.

However, the kernel may not be able to successfully kill the process in some situations.  If the process is waiting for network or disk I/O, the kernel won't be able to stop it. [Zombie processes](http://en.wikipedia.org/wiki/Zombie_process) and processes caught in an [uninterruptible sleep](http://en.wikipedia.org/wiki/Uninterruptible_sleep) cannot be stopped by the kernel, either.  A reboot is required to clear those processes from the system.
