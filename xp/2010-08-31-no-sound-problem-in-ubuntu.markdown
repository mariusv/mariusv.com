---
date: '2010-08-31 08:01:30'
layout: post
slug: no-sound-problem-in-ubuntu
status: publish
title: No sound problem in Ubuntu
wordpress_id: '373'
categories:
- Tutorials
tags:
- alsa
- ubuntu
---

One after another 17 days have passed.. till today my laptop was completely silent when i booted into Ubuntu. But now, just 10 mins back, after a lot of hit and trial with driver model, I could make my laptop speak. Here's what I did.
Though I specified this as ubuntu problem in title, it the problem of alsa; it's not recognizing your device.

I completely forgot what I did to mess up my laptop-sound-system, so i thought to start afresh.
I removed the alsa and pulseaudio completely. And One thing I would like to mention: I am completely unfamiliar about the interaction of alsa and pulseaudio with the sound system. This is my first deal with sound system of linux to this depth.


    
    sudo apt-get --purge remove linux-sound-base alsa-base alsa-utils \
           "pulseaudio-*"



Then I did a quick Reboot; just playing safe. (Karmic boots on/off so fast, I am fan of it.)
Next I reinstalled the alsa with pulseaudio.


    
    sudo apt-get install linux-sound-base alsa-base alsa-utils \
           libasound2-plugins "pulseaudio-*" paman padevchooser \
           paprefs pavucontrol pavumeter 



Then, I appended following lines to the file /etc/modprobe.d/alsa-base.conf
`alias snd-card-0 snd-hda-intel
alias sound-slot-0 snd-hda-intel
options snd-hda-intel model=dell-m6
options snd-hda-intel enable_msi=1`

The bold faced "model=dell-m6" was the main hack for the system to work.

Then after another quick boot, I got the sound.
