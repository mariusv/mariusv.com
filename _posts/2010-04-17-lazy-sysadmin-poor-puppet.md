---
date: '2010-04-17 03:29:31'
layout: post
slug: lazy-sysadmin-poor-puppet
status: publish
title: Lazy sysadmin..poor puppet
wordpress_id: '146'
categories:
- Bash scripts
- Technology
- Tutorials
tags:
- bash
- puppet
- sysadmin
---

Iâ€™ve been lazy :D at maintaining my servers recently and decided to start playing with puppet reports. First I started with something simple that helps me to find on which machines my manifests have some failure.

So hereâ€™s a quick and dirty code that goes through Puppetâ€™s reportdir and points out neglected machines:


    
    #!/usr/bin/env ruby
     
    require 'puppet'
    require 'find'
    require 'yaml'
    require 'optparse'
     
    Puppet[:config] = "/etc/puppet/puppet.conf"
    Puppet.parse_config
     
    def most_recent_file(path)
    	reports = []
    	Find.find(path) { |file|
    		if File.file? file
    			reports << File.basename(file,".yaml")
    		end
    	}
    	reports.sort!.reverse!
    	return path+"/"+reports[0].to_s+".yaml"
    end
     
     
    def scan_dir(path, debug=false)
    	Find.find(path) { |entry|
    		if entry != path # don't scan the basedir
    			if File.directory? entry
    				report = most_recent_file(entry)
    				scan_file(report, debug)
    			end
    		end
    	}
    end
     
     
    def scan_file(filename, debug=false)
    	notify_on_field = [:failed]
     
    	# debug
    	if debug then  puts "scanning " + filename end
     
    	fp=open(filename,"r")
    	YAML::load_documents(fp) { |report|
    		report.metrics["resources"].values.each { |value|
    			if (notify_on_field.include? value[0]) and (value[2] > 0) then
    				puts "#{report.host} has #{value[2]} #{value[0]} resource(s)"
    				if debug then
    					puts "log message(s) :"
    					report.logs.each { |log|
    						puts log.message
    					}
    				end
    			end
    		}
    	}	
    end
     
    options = {}
    myargs = Array
     
    optparse = OptionParser.new { |opts|
    	opts.banner = "Usage : report_check.rb"
     
    	options[:show]=false
    	opts.on("-d", "--debug", "runs in debug mode") do |debug|
    		options[:debug]=true
    	end
     
    	opts.on("-h", "--help", "Displays this help") do
    		puts opts
    		exit
    	end
     
    }
     
    optparse.parse!
     
    scan_dir(Puppet[:reportdir], options[:debug])
