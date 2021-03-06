---
date: '2010-09-30 09:20:44'
layout: post
slug: asterisk-%e2%80%93-setting-the-caller-id-through-an-ldap-lookup
status: publish
title: Asterisk – setting the caller id through an ldap lookup
wordpress_id: '494'
categories:
- Personal
- Tutorials
tags:
- asterisk
- ldap
---

Having just upgraded to asterisk 1.6, I was faced with the problem of callerid lookup no longer working.
We’d previously used the external LDAPGet module to lookup against our internal LDAP directory – but the module doesn’t compile in 1.6, so here’s a quick and dirty workaround which requires you have ldap-utils installed on your server.

In my extensions.conf :
`exten => _[a-zA-Z0-9].,9,Set(CALLERID(name)=${SHELL(ldapsearch -w thepassword -D “cn=admin,dc=mydomain,dc=com” -h ldapserver -b “ou=addressbook,dc=mydomain,dc=com” -s children “(&(objectClass=person)(telephoneNumber=${CALLERID(num)}))” cn | grep ^cn | cut -d: -f2 | xargs echo -n)})`
Where I used to have :
`exten => _[a-zA-Z0-9].,9,LDAPget(CALLERID(name)=cidname)`
