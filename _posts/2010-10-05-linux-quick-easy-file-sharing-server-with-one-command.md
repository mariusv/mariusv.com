---
date: '2010-10-05 13:27:06'
layout: post
slug: linux-quick-easy-file-sharing-server-with-one-command
status: publish
title: Linux quick, easy, file sharing server with one command
wordpress_id: '503'
categories:
- Tutorials
tags:
- python
- share
---

**Don’t install a server, just issue one command!**

So, you want to share a file with a friend. It could be a document, a song, a directory of photos, anything.

Do you want to install and set up a server? NO!

Do you want to go to a directory and issue one command? YES!

**Open your terminal and cd to the directory where you want to share the file(s) from:**

    `cd /home/YOUR_USER/some_folder`

**Now start the Python Simple HTTP Server:**

    `python -m SimpleHTTPServer`

**That’s it! Open your browser and go to this url:**

    `http://localhost:8000 or http://127.0.0.1:8000`

Now you will see the files that you want to share. All you need to do is send a message to your friend with your IP address and port :8000 and he/she can download anything from your /shared directory.

You can get your external IP address by going to:

    [What Is My IP](http://www.whatsmyip.org)

Once you have finished, go back to your terminal and hit Ctrl+C and the server will stop.
Liked this article? Read another similar article.
