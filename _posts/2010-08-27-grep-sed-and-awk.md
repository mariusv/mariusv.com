---
date: '2010-08-27 12:37:30'
layout: post
slug: grep-sed-and-awk
status: publish
title: Grep Sed and Awk
wordpress_id: '377'
categories:
- Tutorials
tags:
- awk
- grep
- sed
---

In this post I will list commands that I use and include at least one of grep,sed or awk.
`cat filename | grep "phrase"`
Search line containing phrase in file

`cat filename | grep -v "phrase"`
Search line not containing phrase in file
`cat filename | grep "phrase1\|phrase2"`
Search lines containing phrase1 or phrase2 in file.
`sed -i "s/phrase1/phrase2/g" ./filename`
Replace phrase1 with phrase2 in file.
`sed -i "s/[ ]*\(.*\)[ ]*/\1/g" ./filename`
Trim spaces of each line of the file.
`awk '{if($7=="2") $7="5"; print;}' file`
Conditional modification. Field no.7 is is replaced by "5" if it is "2". The default field seperator is .
`uptime | awk 'BEGIN {FS=" "} { gsub(",",""); if (index($0,"day")) {gsub(":"," hours, ",$5);print $3" "$4", "$5" minutes"} else {gsub(":"," hours, ",$3); print $3" minutes"}}'`
Get the Uptime in a proper and clear format.
`ls | grep -v 'file or folder or regex' | xargs -I{} mv {} /target/folder/`
Move all but one to /target/folder. You can also use it to move all the files/directories in current directory to another directory in the same path.Be Aware: The Target directory should exist. Just to be at the safe side, I suggest not to miss the slash (/) at the end. This will give you warning/error if you messed up something. 

For now I have just listed few that came in my mind; just thought to prepare a seed.
I'll promise to grow this list as soon as they come to my mind.

Note: If you have some commands in your mind, that you regularly use, you can post it as comment.

