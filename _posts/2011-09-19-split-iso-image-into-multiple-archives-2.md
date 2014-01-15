---
date: '2011-09-19 09:36:56'
layout: post
slug: split-iso-image-into-multiple-archives-2
status: publish
title: Split ISO image into multiple archives
wordpress_id: '967'
categories:
- Personal
- Tutorials
tags:
- archive
- iso
- linux
- split
---

The best solution for you, and it's really easy! Just use the default GNU tools tar, split and cat. There is absolutely no need for any fancy gui tools or (god forbide!) software that you have to run in Wine!

Just type the following in a console :


    
    tar cvzf - filename.iso | split -d -b 700m - filename.iso.tar.gz.



This wil produce the following files:

`filename.iso.tar.gz.1
filename.iso.tar.gz.2
filename.iso.tar.gz.3`

Burn to CD with your favorite burner, one file per disk.

Then later if you want to restore the iso, first copy all te parts in one directory, and then type:


    
    cat filename.iso.tar.gz.* | tar xvzf -



That will give you back your original ISO.

I needed this a few days ago for a >10G backup that I wanted to put on a FAT32 external drive (maximum file size: 2G). Worked like a charm!

If you are concerned with space, replace the '_z_' option in tar with '_j_', and replace '_gz_' in the filenames with '_bz2_'. Bz2 compression is usually a bit better than gz compression, but it's slower.

And if you really want to save disk space, install the console version of 7-Zip, create a .7z archive, and pipe this trough split. I leave the exact syntax as an excercise to the reader. ;)
