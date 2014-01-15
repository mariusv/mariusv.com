---
date: '2010-12-21 10:18:35'
layout: post
slug: backup-and-synchronize-your-bookmarks-with-dropbox
status: publish
title: Backup and Synchronize your Bookmarks with Dropbox
wordpress_id: '688'
categories:
- Tutorials
tags:
- dropbox
- firefox
- iceweasel
---

[Dropbox](https://www.dropbox.com/referrals/NTQxNDE3MDA5?src=global0) is a great application for keeping your bookmarks of iceweasel ( or firefox ) at a safe spot.
Type in your [URL bar](http://en.wikipedia.org/wiki/Address_bar) _about:config_ and search for _browser.bookmarks.autoExportHTML_ . Doubleclick it so that the Value will become _true_. Now close iceweasel ( firefox ) and go to your profile folder ( check ~/.mozilla/firefox ). The profile folder xxxxxxxx.default  is the profile folder name for the default profile, where xxxxxxxx represents a random strung of characters. Their you will find a file bookmarks.html. Move this file to your Dropbox folder and create a softlink back to your profile folder. Everytime iceweasel ( firefox ) is closed the most recent bookmarks.html will be written to your Dropbox folder...
