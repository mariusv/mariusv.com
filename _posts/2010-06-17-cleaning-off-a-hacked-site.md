---
date: '2010-06-17 08:34:54'
layout: post
slug: cleaning-off-a-hacked-site
status: publish
title: Cleaning off a Hacked Site
wordpress_id: '186'
categories:
- Technology
- Tutorials
tags:
- php
- security
- server
- sysadmin
---

It seems people underestimate the value of security. Most sites that I check on are running old versions of popular web applications (WordPress, Joomla, Drupal, vBulletin, phpBB, etc.) and itâ€™s downright scary. These applications, due to their extreme popularity, are huge targets for hackers. Many succeed, too. They have such large codebases that sometimes the developers slip up and leave security holes open.

These companies have been pretty good with promptly releasing patches, so it becomes a race between the hackers and the millions of sites out there to get patched. Most donâ€™t though, sadly.

I was working with a high profile site this weekend which was targeted, and here is an outline of some of that steps that we took to fight backâ€¦

**Bring site back to a usable state.**

This particular attacker targeted vBulletinâ€™s plugin system, and injected some code there, so that was the first to go. At this point, you should ask yourself whether you want to take the site down and finish the work in a private state, or if you want to continue running the site while you deal with it. It will entirely depend on your site, your users, and your goals.

**Cut off any current access they may have gained.**

These web application hacking scripts do two important things: they point out all writable directories, and they point out all configuration files. The most immediate threat will be your passwords. You should change every password you can think of (server, database, application, mail, etc.) because you do not know what has been compromised.

**Find out how they got in.**

This is the scariest part. You need to be able to find out how they get in. If you are simply running one application, and have fairly strong passwords, odds are they got in through an exploit. This particular case was due to vBSEO (quite a recent find!). The owner was one version behind. I ended up updating vBulletin (he updated vBSEO just after it happened, by fluke it was this). Upon some research, we decided that was the cause. Once you are confident you removed their initial access point, you need to check to make sure they didnâ€™t create any more. They usually do.

**Seek and destroy more backdoors.**

Check all your writable directories for newly created PHP scripts. They are often out of place or named differently, so they are easy to spot. We got rid of a few, but I decided to try something. I only found one other backdoor that matched the original, but I found several other files. These files were all identical.

I opened up my shell terminal, and tried to find files based on the contents that I found. One string I tried was â€œeval(gzinflateâ€ â€“ because the backdoor operated upon this. Itâ€™s extremely uncommon in standard files, though when you do search, you can see how common i t is. I also did a search for â€˜base64_decode(â€œâ€˜ becasue this is also uncommon. Usually itâ€™s done with variables; itâ€™s rarely done with a hardcoded string. Again, it may exist in your application, so proceed with caution.

Here is what I did, originally.


    
    find . | xargs grep 'eval(gzinflate' -sl | xargs md5sum



This finds all files in the current working directory (public_html), passes the results to grep, and then returns a list of files containing that string. It then passes that to md5sum, so the results will also contain a md5 hash for each file. What this does, is gives you an overview of which files were found and also which are identical. I got about 5000 files found, all with the same hash. This means they are all files created by the attacker to do more damage. Most were in the attachments folderâ€¦ some in profile pic folder, etc.

Since we now can verify that these files should all be removed, I swapped the md5sum command with the rm (remove) command.


    
    find . | xargs grep 'eval(gzinflate' -sl | xargs rm -fv



This will remove all the found files instantly, and cut off any future access they may have otherwise been granted.

**Sanity Check**

Since all of these created scripts were PHP scripts â€“ I also did a few checks to make sure we didnâ€™t miss any files that perhaps did not contain the right contents. Since they can only create files in writable directories, I scanned them for PHP files (you should not allow PHP to any uploadable / writable folders!)


    
    cd attachments
    find . -name "*.php*" | xargs md5sum



This would return back a list of files found in the attachments directory, and also hashes for them. Luckily, none were found. However, this raises another point.

**Blocking PHP files in writable directories**

Just to future proof this concept, I created a .htaccess for each of these writable directories:


    
    php_flag engine off



This turns off PHP for these directories. Make sure you donâ€™t actually have any PHP files in these scripts, because they will obviously break, and may even download. Shouldnâ€™t be a big concern for hackers, but just make sure you donâ€™t have any sensitive info in there.
