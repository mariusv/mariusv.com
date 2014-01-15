---
date: '2010-04-22 11:29:02'
layout: post
slug: how-to-encrypt-and-decrypt-a-password-protected-file
status: publish
title: How to encrypt and decrypt a password protected file
wordpress_id: '157'
categories:
- Tutorials
tags:
- data
- encyption
- gpg
---

The files can be password protected, so you can carry them in a flash memory, and if you loose the flash, you do not have to worry about your info, as it will not be readable.

To encrypt a file in Linux we will use, gpg which is parte of the GnuPG.

Syntax of gpg


    
    gpg -c filename.ext


Let's imagine we have a file called my-personal-info.txt

I want to encrypt with a password to protect the file, run this command.


    
    gpg -c my-personal-info.txt



The output of the command is:


    
    $ gpg -c my-personal-info.txt 
    Enter passphrase: 



Enter a good passphrase, be sure to remember it, and do not use an easy one.

Then you will get:


    
    Repeat passphrase: 



Now gpg has created an encrypted file called my-personal-info.txt.gpg, the original file is still there, so you may want to erase it, or only transport the encrypted one, or send by email the encrypted one.

To decrypt a file just enter this command:


    
    gpg my-personal-info.txt.gpg



You will be asked for the password or passphrase, and the file will be recreated.
