---
date: '2010-11-09 12:58:11'
layout: post
slug: count-from-one-to-ten-in-binary
status: publish
title: Count from one to ten in binary
wordpress_id: '639'
categories:
- Personal
tags:
- binary
- wiki
---

**Counting in binary:**  

Counting in binary is similar to counting in any other number system. Beginning with a single digit, counting proceeds through each symbol, in increasing order. Decimal counting uses the symbols 0 through 9, while binary only uses the symbols 0 and 1.  

  

**Decimal and Binary jump to the left:**  

When the symbols for the first digit are exhausted, the next-higher digit (to the left) is incremented, and counting starts over at 0.  

  

**In decimal, counting proceeds like so:**  

000, 001, 002, … 007, 008, 009, (rightmost digit starts over, and next digit is incremented)  

010, 011, 012, … …  

090, 091, 092, … 097, 098, 099, (rightmost two digits start over, and next digit is incremented)  

100, 101, 102, …  

  

**Decimal from 0-9 then left Binary from 0-1 then left:**  

After a digit reaches 9, an increment resets it to 0 but also causes an increment of the next digit to the left. In binary, counting is the same except that only the two symbols 0 and 1 are used.  

  

**After a digit reaches 1 in binary, an increment resets it to 0 but also causes an increment of the next digit to the left:**  

0000,  

0001, (rightmost digit starts over, and next digit is incremented)  

0010, 0011, (rightmost two digits start over, and next digit is incremented)  

0100, 0101, 0110, 0111, (rightmost three digits start over, and the next digit is incremented)  

1000, 1001, …  

  

**Count from 1 to 10 in Binary**  

`**Dec**	**Bin**  

0 =	0  

1 =	1  

2 =	10  

3 =	11  

4 =	100  

5 =	101  

6 =	110  

7 =	111  

8 =	1000  

9 =	1001  

10 =	1010  

11 =	1011  

12 =	1100  

13 =	1101  

14 =	1110  

15 =	1111  

16 =	10000`  

  

**Base 2 System:**  

Since binary is a base-2 system, each digit represents an increasing power of 2, with the rightmost digit representing 20, the next representing 21, then 22, and so on. To determine the decimal representation of a binary number simply take the sum of the products of the binary digits and the powers of 2 which they represent.  

  

**For example, the binary number:100101 is converted to decimal form by:**  


[(1) × 25] + [(0) × 24] + [(0) × 23] + [(1) × 22] + [(0) × 21] + [(1) × 20] =  

[1 × 32] + [0 × 16] + [0 × 8] + [1 × 4] + [0 × 2] + [1 × 1] = 37  

To create higher numbers, additional digits are simply added to the left side of the binary representation.  

  

**Gratuitously stolen from** [http://en.wikipedia.org/wiki/Binary_numeral_system](http://en.wikipedia.org/wiki/Binary_numeral_system)
