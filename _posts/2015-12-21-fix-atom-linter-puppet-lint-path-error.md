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

Heya, this is just a short rant as I was thinking to give a try to [Atom](https://atom.io) to see if is worth moving to it.

First issue I had with it was configuring [linter-puppet-lint](https://atom.io/packages/linter-puppet-lint) because for some reasons ([1st](https://github.com/AtomLinter/linter-puppet-lint/issues/17), [2nd](https://github.com/AtomLinter/linter-puppet-lint/issues/13)) is not able to find [puppet-lint](http://puppet-lint.com) in the path and because I find my self doing lots of Puppet this days this was crucial for me so instead of just removing Atom I decided to just [RTFM](https://en.wikipedia.org/wiki/RTFM). Where I saw there is a option to specify the path but sadly the example given on the [page](https://atom.io/packages/linter-puppet-lint) which is:

{%highlight json%}
'linter-puppet-lint':
  'executablePath': /usr/bin/puppet-lint # puppet-lint path.
{%endhighlight%}
is not working and needs to be:

{%highlight json%}
"linter-puppet-lint":
  executablePath: "/opt/local/bin/puppet-lint"
{%endhighlight%}
So all you have to do is go go ahead and edit this file `~/.atom/config.cson` and add the working code above and you are good to go. :-)

##Conclusion:

Atom is not bad at all and I'll keep it in testing for the next few weeks.

PS: this post is written in Atom and published directly from it using [jekyll](https://atom.io/packages/jekyll) "plugin"
