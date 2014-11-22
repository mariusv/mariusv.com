---
date: '2014-11-22 17:30:10'
layout: post
slug: firefox-history-audit-script 
title: Firefox History Audit with a simple bash script
categories:
- Personal
- Security
tags:
- Security
- work
- Freelance
- Ubuntu
- OSX
- Firefox
---

Today I was reading around and I came across this blog [Raymii.org](https://raymii.org/s/snippets/Firefox_History_Stats_with_Bash.html) where I found the script in the link sadly the script is not working as is expected due to some small misses in the script and the author doesn't have a comment function so I decided to modify a bit the script and use it for a small Security Audit I had to do.


{% highlight bash %}

#!/bin/bash
if [[ ! -d ${HOME}/.www ]]; then
mkdir ${HOME}/.www/
fi

cp "$(find "${HOME}/.mozilla/firefox/" -name "places.sqlite" | head -n 1)" "${HOME}/.www/places.sqlite"
sqlite3 "${HOME}/.www/places.sqlite" "SELECT url FROM moz_places, moz_historyvisits \
                       WHERE moz_places.id = moz_historyvisits.place_id \
                             and visit_date > strftime('%s','now','-3 month')*1000000 ORDER by \
                       visit_date;"  > "${HOME}/.www/urls-unsorted"
sort -u "${HOME}/.www/urls-unsorted" > "${HOME}/.www/urls"

awk -F/ '{print $3}' ${HOME}/.www/urls | sed -e 's/www\.//g' |sort | uniq -c | sort -n

echo 'Cleaning up...'

rm -rf ${HOME}/.www

{% endhighlight %}

As you an see reading the script this is copying the `places.sqlite` from the [Firefox](https://www.mozilla.org/en-GB/firefox/new/) home and places it in a `.www` directory where is sorting all the IPs/Websites/Ports you browsed to for the past 3 months, prints them on the screen and then deletes the `.www` folder which was created.


Now if you don't want to list IPs and you are interested just in websites then the script will look like this:

{% highlight bash %}

#!/bin/bash
if [[ ! -d ${HOME}/.www ]]; then
mkdir ${HOME}/.www/
fi

cp "$(find "${HOME}/.mozilla/firefox/" -name "places.sqlite" | head -n 1)" "${HOME}/.www/places.sqlite"
sqlite3 "${HOME}/.www/places.sqlite" "SELECT url FROM moz_places, moz_historyvisits \
                       WHERE moz_places.id = moz_historyvisits.place_id \
                             and visit_date > strftime('%s','now','-3 month')*1000000 ORDER by \
                       visit_date;"  > "${HOME}/.www/urls-unsorted"
sort -u "${HOME}/.www/urls-unsorted" > "${HOME}/.www/urls"

awk -F/ '{print $3}' ${HOME}/.www/urls | grep -v -E -e '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' -e ':.*' -e '^$'  | sed -e 's/www\.//g' |sort | uniq -c | sort -n

echo 'Cleaning up...'

rm -rf ${HOME}/.www

{% endhighlight %}


Also as a bonus here is a OSX version of the script:

{% highlight bash %}

!/bin/bash

if [[ ! -d ${HOME}/.www ]]; then
mkdir ${HOME}/.www/
fi

cp "$(find ${HOME}/Library/Application\ Support/Firefox/ -name places.sqlite | head -n 1)" "${HOME}/.www/places.sqlite"
sqlite3 "${HOME}/.www/places.sqlite" "SELECT url FROM moz_places, moz_historyvisits \
                       WHERE moz_places.id = moz_historyvisits.place_id \
                             and visit_date > strftime('%s','now','-3 month')*1000000 ORDER by \
                       visit_date;"  > "${HOME}/.www/urls-unsorted"
sort -u "${HOME}/.www/urls-unsorted" > "${HOME}/.www/urls"

awk -F/ '{print $3}' ${HOME}/.www/urls | sed -e 's/www\.//g' |sort | uniq -c | sort -n

echo 'Cleaning up...'

rm -rf ${HOME}/.www

{% endhighlight %}


##Credits goes to [Raymii.org](https://raymii.org/s/snippets/Firefox_History_Stats_with_Bash.html)

