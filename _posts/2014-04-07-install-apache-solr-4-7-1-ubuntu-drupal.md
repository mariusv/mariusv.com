---
date: '2014-04-07 19:26:46'
layout: post
slug: install-apache-solr-4-7-1-on-ubuntu-drupal 
title: Install Apache Solr 4.7.1 on Ubuntu
categories:
- Personal
tags:
- solr
- ubuntu
- work
- Freelance
- tomcat7
---

So the task of the day was to install latest version of [Solr](https://lucene.apache.org/solr/) (4.7.1) and to be sincere I was struggling a bit due to the fact that there is no .deb or repository from where you can install it out of the box. After finishing the installation I decided to write this article just in case some other people will have the same "challenge" and not to forget :-) (planing to write a [ansible playbook](http://www.ansible.com/home) with this).

Here we go with the steps which you need to follow so you can get it working:

1. We install Apache Tomcat7 which is easy because we find it in the repo:

`apt-get install -y tomcat7 tomcat7-admin openjdk-7-jre-headless`

2. We download and configure the Solr instance:

{% highlight bash %}
$ wget http://apache.crihan.fr/dist/lucene/solr/4.7.1/solr-4.7.1.tgz
$ tar zxf solr-4.7.1.tgz
$ cp -R solr-4.7.1/ /opt/solr
$ cp solr-4.7.1/example/webapps/solr.war /opt/solr/
$ cp -r solr-4.7.1/example/lib/ext/* /var/lib/tomcat7/shared/
$ mv /opt/solr/example /opt/solr/$Name_Of_Your_Project
$ rm -r /opt/solr/$Name_Of_Your_Project/example-DIH/
$ rm -r /opt/solr/$Name_Of_Your_Project/exampledocs/
$ rm -r /opt/solr/$Name_Of_Your_Project/solr-webapp/
{% endhighlight %}

3. We configure context in tomcat pointing to our Solr files:

`vim /etc/tomcat7/Catalina/localhost/solr.xml`

and add this:
{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<Context docBase="/opt/solr/solr.war" debug="0" crossContext="true">
  <Environment name="solr/home" type="java.lang.String" value="/opt/solr/$Name_Of_Your_Project/multicore" override="true"/>
</Context>
{% endhighlight %}

4. Now edit `/opt/solr/$Name_Of_Your_Project/multicore/solr.xml` and change to look like this:

{% highlight bash %}
<solr persistent="true">
{% endhighlight %}

If you don't do this, all changes (cores creations) made in the SOLR web admin interface will be lost when you restart tomcat.

5. Giving Tomcat permissions to the Solr directory and restart tomcat :

{% highlight bash %}
$ chown -R tomcat7:tomcat7 /opt/solr
$ service tomcat7 restart
{% endhighlight %}

Now as an extra because I had to configure this for a [Drupal](https://drupal.org/) project I had to configure Solr for it but this is fairly easy :-) . 
We download the [config files](http://ftp.drupal.org/files/projects/search_api_solr-7.x-1.4.zip)

`wget http://ftp.drupal.org/files/projects/search_api_solr-7.x-1.4.zip`

Unzip them and replace the configs with the ones recommended by Drupal :

{% highlight bash %}
$ unzip search_api_solr-7.x-1.4.zip
$ cp -R search_api_solr/solr-conf/4.x/* /opt/solr/$Name_Of_Your_Project/solr/collection1/conf/
{% endhighlight %}
