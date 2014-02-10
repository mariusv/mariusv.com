---
date: '2014-02-07 19:30:02'
layout: post
slug: bash-auto-completion-in-iTerm2-osx
title: Bash auto completion in iTerm2 OSX
categories:
- Personal
tags:
- OSX
- bash
- work
---
After trying every solution suggested by other mac users out there on how to get auto completion in iTerm2 I almost give up because nothing worked for me due to the new version of [Bash](http://en.wikipedia.org/wiki/Bash_%28Unix_shell%29) I managed to find on the [MacPorts Wiki](https://trac.macports.org/wiki/howto/bash-completion) the only solution who worked for me.

This are the steps I followed to get my iTerm2 use bash completion:

Step is to install bash completion:
	`sudo port install bash-completion`
Step add in your .bashrc or .bash_profile or .profile :
{% highlight bash %}
# bash-completion
if [ -f /opt/local/etc/profile.d/bash_completion.sh ]; then
    . /opt/local/etc/profile.d/bash_completion.sh
fi
{% endhighlight %}
Install +bash_completion variant automatically with all ports:
Open with your favorite text editor(mine is VIM so I will use it in this example) `vim /opt/local/etc/macports/variants.conf` and add this line at the end of the file:
`+bash_completion`

In your iTerm2 press `⌘ + ,` (this will open the Preferences menu) then select Profiles > Your_Default_Profile and on the right side you have <strong>Command</strong>. Thick the Command and add in the box this `/opt/local/bin/bash -l` re-open iTerm2 and tadaaa you can haz bash completion working.

For example now you can type:

`sudo port install git(and press twice TAB)`

This is the result of what you should see:

{% highlight bash %}
marius@delirium:~$ sudo port install git-
git-core          git-extras        git-flow          git-ftp           git-sweep_select
{% endhighlight %}
