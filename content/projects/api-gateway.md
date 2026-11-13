---
title: "Distributed API Gateway"
summary: "A distributed API gateway and rate limiter written in Go."
status: "finished"
date: "2025-12"
tags: ["Go", "Distributed Systems", "Backend", "Redis", "Docker", "Docker Compose"]
github: "https://github.com/dabete/Reverse_Proxy"
---

## The problem

I made this project after I finished my Fridge social media app. As I learned more about system design I realised that it would be a good idea for Fridge to be rate-limited as well. I wanted to learn more about how it works so that I could better understand how all the pieces fit together, so I ended up building this project.

## Metrics

- Enforced a single shared per-client rate limit across 3 gateway instances within 2.9% of theoretical bounds (34 of 35 allowed) under constant load, incorporating an atomic Redis Lua token bucket that fails open upon Redis unavailability.
- Sustained 1000 req/s with 100% availability and a 7.1ms p95 latency across 3 gateways by building a round-robin load balancer in Go with connection-pooled reverse proxying
- Maintained 99.94% availability during abrupt node failures by engineering passive circuit breaking and active polling, containing dropped traffic to 8 of 12,000 requests (0.06%) with automated failover under 0.1s

## How it works

There is one point of entry, the user doesn't see anything else. This is a Reverse proxy. The user's request goes through the reverse proxy and the proxy uses a round-robin algorithm to select an instance of an API gateway to send it to. 

I used a round-robin technique as I was building this with Fridge in mind, and made the decision that a complex algorithm wouldn't be needed as the user count for such an application wouldn't be hitting massive spikes. 

Every gateway instance shares one source of truth - a Redis database. Using mutexes I can guarantee that different gateways won't overwrite a value while another is working on it. 

The redis database stores the user's IP address and the number of tokens they have left. To calculate token value I used a lua script in Redis that calculates them based on the time since the last request and current time, choosing a suitable number of tokens to replenish based on that.

While I used three instances of API gateways during my testing, you could in theory use as many as you want, as when docker creates a new instance of one, the gateway sends a request to an endpoint in the reverse proxy letting it know it is alive. Gateway failures are also accounted for, as they have a 'health' and once they hit a certain number of requests in a row that have failed they are taken offline. Once they come back online, they send the '/health' endpoint a request letting know they are back online.

## What I learned

I gained insight on the different types of load balancing algorithms and how they work, and also with making a decision on which one to implement. 

I discovered what Redis is and utilised it as a single source of truth for distributed systems, particularly with how when one system is using the lua script to replenish tokens nothing else can run - which is handy when it comes to distributed systems.

This project was my first look into distributed systems and it taught me a great deal on them, particularly how mutexes work and when you should use them. 
This project also taught me more about HTTP headers and how they can be exploited via IP spoofing, which I overcame by writing my own IP address each time that I received a request. 
