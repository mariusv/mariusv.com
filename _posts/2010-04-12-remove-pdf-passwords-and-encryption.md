---
date: '2010-04-12 07:47:06'
layout: post
slug: remove-pdf-passwords-and-encryption
status: publish
title: Remove PDF passwords and encryption
wordpress_id: '134'
categories:
- Tutorials
tags:
- decrypt
- password
- pdf
---

Have you ever gotten a pdf with one of those annoying passwords? A while back I bought an e-book and it came with a password. Its really annoying especially if I want to read it on a mobile device. Anyway if you are annoyed as much as I am fear no more.

Install qpdf

    
    aptitude install qpdf



Decrypt your pdf


    
    qpdf --password=password --decrypt input.pdf output.pdf
