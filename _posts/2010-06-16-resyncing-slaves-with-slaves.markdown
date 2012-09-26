---
date: '2010-06-16 08:53:30'
layout: post
slug: resyncing-slaves-with-slaves
status: publish
title: Resyncing slaves with slaves
wordpress_id: '184'
categories:
- Technology
tags:
- master
- mysql
- slave
- slaves
---

When dealing with replicated setups with two or more slaves sharing a master, it appears as if a **lot** of people overlook the obvious. You donâ€™t need to take your master down to resync a slave. I was hoping I wouldnâ€™t need to post about this, but I see people taking down their masters when they have perfectly healthy slaves way too often to let it slip.

Youâ€™ve got everything you need on the other slave(s). Provided that itâ€™s in good health, youâ€™ve got all the data, the masterâ€™s binlog file name and position. Run SHOW SLAVE STATUS\G on the slave, take note of Relay_Master_Log_File and Exec_Master_Log_Pos which are the same as what youâ€™d get from SHOW MASTER STATUS\G on the master instance, minus the lag which is irrelevant in this case. Then proceed to sync the data from the healthy slave and use the above values in the CHANGE MASTER TO statement (obviously setting MASTER_HOST to the real master, not the other slave).

Happy higher availability!

