---
date: '2010-02-19 13:41:52'
layout: post
slug: regenerate-the-apache-ssl-key-and-certificate-on-debian-lenny
status: publish
title: Regenerate the Apache SSL key and certificate on Debian Lenny
wordpress_id: '47'
categories:
- Technology
- Tutorials
tags:
- apache2
- debian
- how to
- ubuntu
---

The default, self-signed certificate used by Apache 2 is called snakeoil, it's generated based on the hostname (as reported by **hostname -f**) to files **/etc/ssl/certs/ssl-cert-snakeoil.pem** and **/etc/ssl/private/ssl-cert-snakeoil.key** when the ssl-cert package is installed. Here is how to regenerate the key and the certificate in case the hostname is changed:


    
    # hostname -f
    # make-ssl-cert generate-default-snakeoil --force-overwrite
    # ls -l /etc/ssl/certs/ssl-cert-snakeoil.pem /etc/ssl/private/ssl-cert-snakeoil.key
    ... (check the last-modified-time)
    # /etc/init.d/apache2 restart




