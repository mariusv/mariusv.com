---
layout: post
title: "Vagrant bash autocomplete on OSX"
date: "2015-12-23"
categories:
- Personal
tags:
- Vagrant
- bash
- OSX
---

Toying with Vagrant without autocomplete is definitely not much fun as just for listing all the VMs you would have to type `vagrant global-status` (I know you can use the help menu or create aliases but I just prefer autocomplete).

After looking around a bit I found this [gem](https://github.com/kura/vagrant-bash-completion) but the only problem is the fact that I don't like `brew` and I prefer [macports](https://www.macports.org) so the "install" process is a bit different than installing using `brew`.

```bash
$ sudo wget https://raw.github.com/kura/vagrant-bash-completion/master/etc/bash_completion.d/vagrant -O /opt/local/share/bash-completion/completions/vagrant
```

then add the following lines to your `~/.bashrc` :

```bash
if [ -f /opt/local/etc/bash_completion ]; then
    . /opt/local/etc/bash_completion
fi
```
