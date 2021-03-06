---
date: '2010-02-17 16:47:07'
layout: post
slug: resume-partial-file-transfers
status: publish
title: Resume partial file transfers
wordpress_id: '24'
categories:
- Technology
- Tutorials
tags:
- ftp
- rsync
- scp
- unix. linux
---

I work primarily with UNIX and Linux machines and scp is my main choice to transfer files with. It is both convenient, short and secure.

Example:


    
    scp localfile user@remotecomputer:/path/to/target/dir



Recently I was transferring an 8GB file and due to a network issue, the transfer was interrupted at nearly 40%.


    
    rsync --partial --progress --rsh=ssh host:remote_file local_file



Now we can improve this slightly by shortening the above command. We can substitute â€“rsh=ssh with -e ssh, and use -P instead of â€“partial â€“progress. Also, you can add user@host if you need to specify a different remote shell user:


    
    rsync -P -e ssh user@host:remote_file local_file



This above example will work with any file that was partially transfered. How the transfer was started does not really matter. It could be through scp, nc or even ftp. After you execute the above command it will take rsync a little time to verify the previously downloaded part before it continues with the rest. Be patient, depending on your network speed rsync could take some time to go through what you have already transfered. Of course this is much faster than if you were to start the download all over again and it shows you the progress in percentages.

Keep in mind that there have to be a couple of requirements in place in order to resume the file transfer with rsync:

1. You should have remote shell access.
2. The remote machine should have rsync installed. Since rsync is by default on most Linux distributions that generally should not be an issue.
