---
date: '2011-12-04 18:51:44'
layout: post
slug: zombie-code
status: publish
title: Zombie Code
wordpress_id: '1087'
categories:
- Personal
tags:
- code
- zombie
---

[![](http://www.mariusv.com/wp-content/uploads/2011/12/code.jpg)](http://www.mariusv.com/wp-content/uploads/2011/12/code.jpg)
If there's anything I hate more than dead code, it's zombie code. Dead code is code that's remained in the system even though it's no longer really used.
It might be small, like unused imports, instance variables and methods. It can be whole classes that make up entire features no longer used.
The biggest PITA is when you're not really aware of the fact the code's dead and unused, sitting there and occupying precious bits, and stumble across it as part of a task, trying to understand how it influences what you want to do next.
Whenever I recognized something that looks like dead code but I'm not entirely sure, I find it pretty easy to delete it quickly, once I take a look in the version control logs and see when it became no longer in use and why.
Zombie code is code that was never alive, and so couldn't really become dead. It's the undead code – code that died right when it was committed. Code that never ran or never worked. The are two reasons I hate zombie code more than "plain" dead code.

The first reason is that it simply wastes more of my time. Looking back in version control won't help me see the commit in which the code was "decommissioned", it would just appear to always sit there. That means I have to take extra care to verify that it, in fact, never worked.
The second reason is that it's plainly someone saying he doesn't give a damn. I mean, let’s put aside TDD. Heck, let's put aside unit testing at all. It means the code never even ran the damn thing and saw in his own eyes it did what he claims it did.
Be kind to your teammates. If you're not a good enough coder to test it, at least see that it runs once in your own eyes.
