---
date: '2010-10-06 12:25:16'
layout: post
slug: find-duplicate-files
status: publish
title: Find duplicate files
wordpress_id: '491'
categories:
- Bash scripts
- Tutorials
tags:
- bash
- duplicates
- files
---

How to find those files that have different names but exactly the same content?

You could install the good [fdupes](http://packages.debian.org/etch/fdupes) or you could just reinvent the wheel with bash, md5sum and awk:

    
    find path/ -type f | xargs md5sum | awk '{
    	sub("[^/]*/","",$2);
    	if (cache[$1])
    		print "Found: "cache[$1],$2;
    	else
    		cache[$1]=$2
    }'


_path_ is where you want to search for duplicates. You can limit the search with the **find** maxdepth option.
