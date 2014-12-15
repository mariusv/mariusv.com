---
date: '2014-12-15 16:20:10'
layout: post
slug: flapjack-add-contact-and-all-script
title: Flapjack add contact and all script
categories:
- Personal
- DevOps
tags:
- Flapjack
- work
- Freelance
- ruby

---

As [I said](https://www.mariusv.com/sensu-flapjack/) before, here at [Odobo](https://www.odobo.com) we implemented [Flapjack](http://flapjack.io) with [Sensu](http://sensuapp.org/) as monitoring notification routing & event processing system. Everything went nice and well till the point when I had to add more then just one person (myself) :-) . So because I strongly believe that if a task needs to be done more then once then you should automate/script it, I put together this small ruby script which basically creates an [Contact](http://flapjack.io/docs/1.0/jsonapi/?ruby#contacts) if doesn't already exists, assigns a [Media](http://flapjack.io/docs/1.0/jsonapi/?ruby#media) (email) and also assigns ALL the [Entities](http://flapjack.io/docs/1.0/jsonapi/?ruby#entities) enlisted in Flapjack.

***Usage :***

{%highlight bash%}
root@sensu:/etc/flapjack# ./contact.rb -h
Usage: contact [options]
    -i, --id ID                      Contact ID
    -n, --name Name                  First Name
    -s, --surname Surname            Surname
    -m, --mail me@example.com        Email address
    -h, --help                       Display this screen
{%endhighlight%}

***Example :***

{%highlight bash%}
$ ./contact.rb -i 1 -n Marius -s Voila -m myself@mariusv.com
{%endhighlight%}

{% highlight ruby %}

#!/usr/bin/env ruby
require 'flapjack-diner'
require 'optparse'
Flapjack::Diner.base_uri('localhost:3081')

options = {}

optparse = OptionParser.new do |opts|
  opts.on('-i', '--id ID', 'Contact ID') do |i|
    options[:id] = i
  end

  opts.on('-n', '--name Name', 'First Name') do |f|
    options[:name] = f
  end

  opts.on('-s', '--surname Surname', 'Surname') do |s|
    options[:surname] = s
  end

  opts.on('-m', '--mail me@example.com', 'Email address') do |m|
    options[:mail] = m
  end

  opts.on('-h', '--help', 'Display this screen') do
    puts opts
  end
end
  optparse.parse!

# Create contact if the user doesn't already exist
user_data = {
  :id         => "#{options[:id]}",
  :first_name => "#{options[:name]}",
  :last_name  => "#{options[:surname]}" ,
  :email      => "#{options[:mail]}"
}

unless Flapjack::Diner.contacts(user_data[:id])
  puts "Creating contact: #{user_data[:first_name]}"
  Flapjack::Diner.create_contacts([user_data])
end

# Assign Media (email) to the created contact

medium = {
  :type => 'email',
  :address => "#{user_data[:email]}",
  :interval => 7200,
  :rollup_threshold => 10
}
user = Flapjack::Diner.contacts(user_data[:id]).first
if user[:links][:media].empty?
  puts "Creating #{user_data[:first_name]}'s media"
  Flapjack::Diner.create_contact_media(user_data[:id], [medium])
end
user = Flapjack::Diner.contacts(user_data[:id]).first

# Add contact to the ALL entity

entity_all_data = {
  :id   => 'ALL',
  :name => 'ALL'
}

entity_all = Flapjack::Diner.entities(entity_all_data[:id]).first
unless entity_all[:links][:contacts].include?(user_data[:id])
  puts "Adding #{user_data[:first_name]} to the ALL entity"
  Flapjack::Diner.update_entities(entity_all_data[:id], :add_contact => user_data[:id])
end


{% endhighlight %}

##Note:

###This is work in progress and soon I will move it on Github because I'm planing to improve it more