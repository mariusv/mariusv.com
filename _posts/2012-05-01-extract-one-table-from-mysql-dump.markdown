---
layout: post
title: Extract one table from MySQL dump
categories:
- Perl scripts
- Personal
tags:
- export
- mysql
- mysqldump
- perl
---

Few days ago a friend of mine asked for help to extract a specific table from a very big DB and so I reminded that 5 years ago I wrote a perl script with that purpose. [Here](https://github.com/mariusv/scripts) you can find the script(the name is export.pl) and a bunch of other tools for sysadmins and not only(I'll update the repo daily so keep an eye on it) [here](https://raw.github.com/mariusv/scripts/master/extract.pl) is a direct link so you can _wget_ it :-) .  I’ve tested it on Linux, but it should work from Windows as well if you have Perl installed.

Extract.pl will parse a full mysqldump file and extract the necessary portions required to restore a single table.  The output is printed to STDOUT, so you’ll want to redirect to a file from the command line, like so: extract.pl > somefile.sql

So, to extract the info needed to restore table ‘_mytable_’ from the mysqldump file ‘mydumpfile’, you’d run:


    
    extract.pl -t mytable -r mydumpfile > mytable.sql



or, if your dump file is gzipped, you could save a little time and space by doing:

    
    cat mydumpfile.gz | gunzip | extract.pl -t mytable > mytable.sql



To see what table names are within your mysqldump file, run:


    
    extract.pl −−listTables -r mydumpfile



The script has a lot of extra functions in it for logging and command line parsing, but the center of what it does is here (NOTE! This is not the entire script, just an excerpt of it, use the download link near the beginning of this file to obtain the entire script to use it yourself):


{% highlight perl %}     
if ($conf{'restoreFile'}) {
## open the mysqldump file
open(STDIN, "< $conf{'restoreFile'}") || quit("ERROR => Couldn't open file $conf{'restoreFile'}: $!", 3);
}
   
my $flag = 0;
     
## go through the file one line at a time
while (my $line = <stdin>) {
     
if ($conf{'listTables'}) {
if ($line =~ /^-- Table structure for table `(.*)`/) {
print $1 . "\n";
}
}
else {
   
## if we're not ignoring extra lines, and we haven't set the flag, and if it's not a 40000 code, then print
if (!$conf{'noExtras'} &amp;amp;&amp;amp; !$flag) {
if ($line =~ /^\/\*!(.....).*\*\//) { print $line unless ($1 == 40000); }
}
    
## set a flag when we encounter the table we want
if ($line =~ /^-- Table structure for table `$conf{'tableName'}`/) {
$flag = 1;
printmsg("Turning flag on", 1);
}
## turn flag off as soon as we encounter next table definition
elsif ($line =~ /^-- Table structure for table/) {
$flag = 0;
printmsg("Turning flag off", 1);
}
    
## if flag is set, then print to STDOUT, otherwise just move on
if ($flag) {
print $line;
}
}
}
{% endhighlight %}


 
