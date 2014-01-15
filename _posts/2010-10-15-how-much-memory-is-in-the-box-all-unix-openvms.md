---
date: '2010-10-15 08:05:25'
layout: post
slug: how-much-memory-is-in-the-box-all-unix-openvms
status: publish
title: How much memory is in the box? (all UNIX, OpenVMS)
wordpress_id: '523'
categories:
- Personal
- Tutorials
tags:
- freeBSD
- linux
- memory
---

How much memory is in this machine?
It would seem that answering this question ought to be easy; it is – but every system has the answer in a different place. Most put an answer of some sort into kernel messages reported by dmesg (AIX apparently does not).
Most systems have a program for system inventory which reports a variety of things, including memory.
Rather than go into great detail about each one, we’ll just put these out there for all of you to reference. Each environment has multiple commands that give available memory; each command is listed below.
Without further ado, here are a few answers to this burning question:

**Solaris**
`dmesg | grep mem
prtdiag | grep Memory
prtconf -v | grep Memory`
**AIX**
`bootinfo -r
lsattr -E1 sys0 -a realmem
getconf REAL_MEMORY`
**HPUX**
`dmesg | grep Physical
/opt/ignite/bin/print_manifest | grep Memory
machinfo | grep Memory`
**Linux**
`dmesg | grep Memory
grep -i memtotal /proc/meminfo
free`
**OpenVMS**
`show mem /page`
**FreeBSD**
`dmesg | grep memory
grep memory /var/run/dmesg.boot
sysctl -a | grep mem`
