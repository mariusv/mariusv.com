---
date: '2011-10-13 14:04:01'
layout: post
slug: python-interface-for-aws-route53
status: publish
title: Python Interface for AWS Route53
wordpress_id: '1026'
categories:
- Personal
- Python scripts
tags:
- amazon
- boto
- name servers
- python
---

After taking a quick look at [Boto's](http://code.google.com/p/boto/) [Route53](http://aws.amazon.com/route53/) interface, I realized that it was just way too cumbersome and awkward to be useful. I decided to make it a little more user-friendly, so without further ado, I introduce [Area53](https://github.com/mariusv/Area53). Now you can write code like the following:


    
    >>> from area53 import route53
    
    >>> # Creates the zone, example.com.
    ... zone = route53.create_zone('example.com')                 
    
    >>> # Adds A record to the zone.
    ... zone.add_a('example.com', '182.12.142.12')               
    
    >>> # Adds CNAME record to the zone.  
    ... zone.add_cname('www.example.com', 'example.com')         
    
    >>> # Adds MX records to the zone.
    ... zone.add_mx(['10 mx1.example.com', '20 mx2.example.com'])




Now what just happended.

On line two we create the zone. Then we create an A record for the naked domain, followed by a cname for the 'www' subdomain which points back to the naked domain. Then we also added two MX records for our mail exchangers. Also, you don't need to worry about trailing dots and fully qualified domain names, because that is handled automatically.

By the way, you can go grab the code on [github](https://github.com/mariusv/Area53) anytime you want. There is a little bit more information there about how to install and dependencies, but it is pretty simple.

Now, we can grab a list of all zones like this:


    
    >>>  route53.get_zones() # Get all hosted zones.
    [<zone:example.com.>, <zone:mariusv.com.>]



Or we can grab our individual zone by name:


    
    >>> for record in zone.get_records():
    ...     print record
    ...
    <Record:A:example.com.:[u'182.12.142.12']>
    <Record:CNAME:www.example.com.:['example.com.']>
    <Record:MX:example.com.:[u'10 mx1.example.com.', u'20 mx2.ex'...>
    <Record:NS:example.com.:[u'ns-1249.awsdns-28.org.', u'ns-902'...>
    <Record:SOA:example.com.[u'ns-1249.awsdns-28.org. awsdns-hos'...>



And here is how you grab just the nameservers for your zone:


    
    >>> zone.get_nameservers() # Get nameservers for the zone.
    [u'ns-1249.awsdns-28.org.', u'ns-902.awsdns-48.net.']



You add the nameservers to your domain registrar to actually switch to Amazon's DNS service. I would recommend migrating a non-critical domain to start to make sure that you understand the process before moving your big domain with hundreds of records over to Route53.

Now we can remove all these records and the zone itself like so:


    
    >>> # Get the zone.
    ... zone = route53.get_zone('example.com') 
    
    >>> # Delete A record from the zone.
    ... zone.delete_a('example.com')           
    
    >>> # Delete CNAME record from the zone.
    ... zone.delete_cname('www.example.com') 
    
    >>> # Delete MX records from the zone.
    ... zone.delete_mx()                       
    
    >>> # Delete the zone itself.
    ... zone.delete()




If anyone has any questions, bugs or issues then feel free to ask. Hopefully, this will make your life with [Route53](http://aws.amazon.com/route53/) significantly easier.
