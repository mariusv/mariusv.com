---
date: '2010-09-23 10:00:32'
layout: post
slug: sort-web-server-logs-to-find-top-users
status: publish
title: Sort web server logs to find top users
wordpress_id: '477'
categories:
- Tutorials
tags:
- apache
- logs
---

Sometimes there is a very quick need to determine what user(s) are causing high load to a particular page. Instead of tailing high-speed logs and giving yourself a headache, Throw in a one-lined piped cat command to give you the info you’re after without the foreplay.
`cat /path/to/access.log | awk '{print $1}' | sort | uniq -c | sort -n | tail`
