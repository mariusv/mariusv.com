---
date: '2010-10-25 09:00:49'
layout: post
slug: take-a-screenshot-and-make-it-public-using-dropbox-3
status: publish
title: Take a Screenshot and Make it Public using Dropbox
wordpress_id: '554'
categories:
- Bash scripts
- Personal
- Tutorials
tags:
- bash
- dropbox
- screenshot
---

If you already have Dropbox you already know that it has a Public folder where you can save files for everyone to download.  If you are using the GUI version of Dropbox you can even right click on the file and get a public link to hand out.  Although this works great, we can automate this process and make it easier.




#### Requirements:






  * [Dropbox](http://www.getdropbox.com/)


  * scrot – Screenshot utility



  * gqview – To optionally preview the screenshot


  * xclip – To automatically copy the url into the clipboard


**Installing:**

You know the drill, grab your package manager and install a few things.
`aptitude install scrot gqview xclip`
Create a file named, ‘**screenshot.sh**‘ and add the following:

    
    #! /bin/sh
    
    # Run this and it will take a screenshot of your desktop and optionally show it to you for confirmation
    # Make sure you set the shotsdir to your dropbox public dir
    
    shotsdir=$HOME/Dropbox/Public/shots
    dropboxid="INSERTYOURIDHERE"
    dropboxURL="http://dl.getdropbox.com/u/$dropboxid"
    delay=5 # set to 0 for no delay
    
    file=$shotsdir/shot-`date +%Y-%m-%d-%H-%M-%S`.png
    mkdir -p $shotsdir
    scrot -d $delay $* $file
    if xmessage -buttons "Yes:0,Nah:1" -default "upload" "Want to preview your image?"
    then
        gqview $file
    fi
        echo -n "$dropboxURL/shots/"`basename $file` | xclip -i


_Note: This script is based on a similar one by [micah](http://www.reddit.com/user/micah) on [reddit](http://www.reddit.com)._



If your Dropbox folder is not in the default path you will need to change ‘**shotsdir**‘.  Also, change the dropboxid variable to match your Dropbox id.  You can find your id buy right clicking on a file in the public folder and selecting **Copy Public Link**.




You can also change the ‘**delay**‘ variable if you want to have a delay before the screenshot is taken.  This will allow you to move windows around before the shot is taken.





The real beauty lies in the fact that the script will automatically put the public url in your clipboard.  To paste it to a friend simply middle click!




## Make an alias




Now it would be nice not to have to change directories and type in ‘**sh screenshot.sh**‘ all the time.




We can set up a bash alias by editing, ‘**~/.bashrc**‘ and add the following line:


`alias ds=’sh /path/to/screenshot.sh’`


Now you can drop screenshots simply by typing ‘**ds**‘ and hitting enter.





Of course you can pick any alias that fits your fancy. 
