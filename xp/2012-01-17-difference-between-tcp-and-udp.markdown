---
date: '2012-01-17 13:10:51'
layout: post
slug: difference-between-tcp-and-udp
status: publish
title: Difference between TCP and UDP
wordpress_id: '1171'
categories:
- Tutorials
tags:
- networking
- sysadmin
- tcp
- udp
---

I wrote this article because I see a lot of sysadmins who don't know there is a difference between TCP and UDP protocols.

Ex: Transmission Control Protocol (TCP) and User Datagram Protocol (UDP)is a transportation protocol that is one of the core protocols of the Internet protocol suite. Both TCP and UDP work at transport layer TCP/IP model and both have very different usage.


    **_TCP(Transmission Control Protocol)_**. TCP is a connection-oriented protocol, a connection can be made from client to server, and from then on any data can be sent along that connection.
        **Reliable** - when you send a message along a TCP socket, you know it will get there unless the connection fails completely. If it gets lost along the way, the server will re-request the lost part. This means complete integrity, things don't get corrupted.
        **Ordered** - if you send two messages along a connection, one after the other, you know the first message will get there first. You don't have to worry about data arriving in the wrong order.
        **Heavyweight** - when the low level parts of the TCP "stream" arrive in the wrong order, resend requests have to be sent, and all the out of sequence parts have to be put back together, so requires a bit of work to piece together.
        **Examples** - World Wide Web (Apache/nginx TCP port 80), e-mail (SMTP TCP port 25 Postfix MTA), File Transfer Protocol (FTP port 21) and Secure Shell (OpenSSH port 22) etc.

    **_UDP(User Datagram Protocol)_**. A simpler message-based connectionless protocol. With UDP you send messages(packets) across the network in chunks.
        **Unreliable** - When you send a message, you don't know if it'll get there, it could get lost on the way.
        **Not ordered** - If you send two messages out, you don't know what order they'll arrive in.
        **Lightweight** - No ordering of messages, no tracking connections, etc. It's just fire and forget! This means it's a lot quicker, and the network card / OS have to do very little work to translate the data back from the packets.
       **Examples** - Domain Name System (DNS UDP port 53), streaming media applications such as IPTV or movies, Voice over IP (VoIP), Trivial File Transfer Protocol (TFTP) and online multiplayer games etc


