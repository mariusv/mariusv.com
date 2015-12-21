---
layout: post
title: "Fix atom linter puppet lint path error"
date: "2015-12-21"
categories:
- Personal
tags:
- Puppet
- Atom
---

Heya, this is a shortish rant as I am giving a try to [Atom](https://atom.io) and see if is worth dropping `vim` and [Sublime Text 2](http://www.sublimetext.com/2) for it.

First issue I had with it was configuring [linter-puppet-lint](https://atom.io/packages/linter-puppet-lint) because for some reasons ([1st](https://github.com/AtomLinter/linter-puppet-lint/issues/17), [2nd](https://github.com/AtomLinter/linter-puppet-lint/issues/13)) is not able to find [puppet-lint](http://puppet-lint.com) in the path and because I find my self doing lots of Puppet this days this was crucial for me so instead of just uninstalling Atom I decided to [RTFM](https://en.wikipedia.org/wiki/RTFM) first. So I  found out that there is a option to specify the full path to the binary, sadly the example given on the [page](https://atom.io/packages/linter-puppet-lint):

{%highlight json%}
'linter-puppet-lint':
  'executablePath': /usr/bin/puppet-lint # puppet-lint path.
{%endhighlight%}
is not working and needs to be:

{%highlight json%}
"linter-puppet-lint":
  executablePath: "/opt/local/bin/puppet-lint"
{%endhighlight%}
So all you have to do is go ahead and edit this file `~/.atom/config.cson` and add the working code above and you are good to go. :-)

##Conclusion:

Atom is not bad at all but if you want something to just work then keep using whatever you are using now. I will play with Atom for a bit more because I like hacking my way around stuff :-)

RAM usage is okish with one project loaded + 8 plugins ([packages](https://atom.io/packages)) is using 255MB of memory while Sublime Text 2 is using 102MB with the same project open but with no plugins.

PS: this post is written in Atom and published directly from it using [jekyll](https://atom.io/packages/jekyll) "plugin"
