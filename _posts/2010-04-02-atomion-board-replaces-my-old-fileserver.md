---
date: '2010-04-02 16:59:38'
layout: post
slug: atomion-board-replaces-my-old-fileserver
status: publish
title: 'Atom&ION board replaces my old fileserver '
wordpress_id: '122'
categories:
- Personal
---


I've got myself a [Zotac ION ITX A](http://pden.zotac.com/index.php?page=shop.product_details&flypage=flypage_images.tpl&product_id=169&category_id=15&option=com_virtuemart&Itemid=1) board (with an Atom 330) to replace my old home fileserver's hardware (P4). This worked out well, but there are some traps:

Old 533 MHz memory does not work - but does not fail completely. Instead, the system does not boot on some attempts. Holding down the reset switch eventually makes it boot. After replacing the memory with fresh 667MHz DIMMs, this was resolved. (The board is actually spec'd for 667/800 DIMMs only, but I didn't notice this at first.)

The shipped CPU fan is - as you'd expect - crap. It's so noisy that even the old system was quieter. I've removed the CPU fan and instead hooked up an 80mm Noctua fan which indirectly cools the CPU cooler. This is now as quiet as it gets (within the time and money I'm willing to spend on this).

BIOS flashing only works from a (emulated) DOS boot disk. The flasher definitively is scary.

The WLAN card (it's actually a card, so I guess I could replace it) is an ath9k - AP mode doesn't really seem to work with the current Linux drivers. I was hoping to get rid of my AP, but this has to wait...
