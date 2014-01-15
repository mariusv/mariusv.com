---
date: '2010-10-16 17:58:45'
layout: post
slug: using-multiuser-sessions-in-gnu-screen
status: publish
title: Using multiuser sessions in GNU Screen
wordpress_id: '528'
categories:
- Tutorials
tags:
- GNU
- multiuser
- screen
---

[GNU Screen](http://www.gnu.org/software/screen/) is a fantastic utility; however, if you want to use multiuser sessions – that is to share your screen session with another user – you’ll have to set it up.




First, you have to make sure that multiuser capabilities are in the screen binary.  We’ll assume for purposes of this article that screen has already been compiled with multiuser capabilities – it appears that most prepackaged versions of GNU screen should have these capabilities already built in.




Make sure that the screen binary is properly configured to use the multiuser capabilities with these steps:






  * Make screen suid: `chmod u+s $(which screen)`.  This can be dangerous: you have to trust screen not to have anything in it (such as bugs) that will permit a user to take over as root.


  * Make sure that the directory /var/run/screen exists and has permissions of 755.





Now that screen is set up, run the initial screen session and prep it for multiuser access:






  * As a regular user, run GNU screen.


  * Start multiuser mode with the `multiuser on` screen command.


  * Allow a user to access the session by using the screen command `acladd user` with the appropriate _user_ name or names.





Finally, the user who wants to access your screen session needs to run screen on the same system thusly:




`screen -x shareduser/`




This assumes that you ran the initial screen session as _shareduser_ – and don’t leave off the final slash as that is necessary to make this work.




If you want to give this session a name (to separate it from your normal screen session perhaps), then use this command to start the session:




`screen -S shared`




Then let the other user use this command to connect:




`screen -x shareduser/shared`





That is, the user running the screen session is _shareduser_ and the session name is _shared_.




There are more screen commands that are useful in multiuser mode; they are described the manual in [section 8.4](http://www.gnu.org/software/screen/manual/screen.html#Multiuser-Session).  There is also another web [page](http://www.pixelbeat.org/docs/screen/) that provides some [tips](http://www.pixelbeat.org/docs/screen/) on using screen, mostly focusing on multiuser mode – including how to create read-only users.

