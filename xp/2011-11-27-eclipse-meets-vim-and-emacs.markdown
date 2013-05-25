---
date: '2011-11-27 20:53:15'
layout: post
slug: eclipse-meets-vim-and-emacs
status: publish
title: Eclipse Meets Vim And Emacs
wordpress_id: '1077'
categories:
- Personal
- Tutorials
tags:
- Eclim
- eclipse
- emacs
- java
- vim
---

Here's a great tool named Eclim which brings Eclipse to vim and there's an emacs port as well. I've tested for both vim and emacs and I think vim version is better than the emacs version. Emacs version needs work. I'm jealous.

**Emacs Setup:**




  * Follow [these instructions](http://eclim.org/guides/install.html#guides-install) to install eclim.


  * Download emacs plugin from [here](https://github.com/senny/emacs-eclim).


  * Move downloaded emacs plugin to your .emacs.d/


  * Write the following to your _.emacs_;

    {% highlight bash %}
    (add-to-list 'load-path (expand-file-name "~/.emacs.d/eclim/vendor"))
            (require 'eclim)
    
            (setq eclim-auto-save t)
            (global-eclim-mode)
	{% endhighlight %}


        


Whenever you need to do Java development, first open a console and run the eclimd and then open emacs.
