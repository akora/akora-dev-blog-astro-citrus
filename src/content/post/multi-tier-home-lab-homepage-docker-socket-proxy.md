---
title: "Home Lab: Homepage & Docker Socket Proxy"
description: "Setting up Homepage and Docker Socket Proxy for a single page dashboard"
publishDate: "2025-08-30"
tags: ["homelab", "automation", "gethomepage", "docker-socket-proxy"]
seriesId: "multi-tier-home-lab"
orderInSeries: 5
---

At this point we have proper and extensible routing and local HTTPS management in place, plus we have visibility on all the services running on all of our servers.

Portainer even allows us to check each container's logs.

One thing we are still missing to take our lab even further is a single page UI, a dashboard where we can see which service is running on which server and what's their status is. On top, services with UIs and distinct URLs are accessible by just a single click.

Yes, I know, in the world of Kubernetes all this is not important, even with Docker swarm, it does not matter where a certain service is running. In our setup though - since this is for learning purposes - it's good to know where to check a log and in general how to navigate the system.

## Homepage

[Homepage](https://gethomepage.dev/) is a great project. I particularly like it because of it's way on how it can auto-discover new services.

### Service auto-discovery

But is it _REALLY_ auto-discovery?

Not exactly.

You have to apply certain labels in your docker compose files to make it work. Plus, if you are dealing with multiple servers then you need to make sure that Homepage "sees" the other services too.

This is where [Docker Socket Proxy](https://github.com/Tecnativa/docker-socket-proxy) comes in.

## Docker Socket Proxy

This is an interesting and also dangerous beast.

You have to install it on each server - basically as a "sidecar" - and you need to configure it to allow access to the Docker socket and some functionality.

Inside I believe it's an instance of [HAProxy](https://www.haproxy.org/).

Here is an example setup. This goes beyond what's required for Homepage to work.

```yaml
# Security settings - enable what's needed for Dozzle and Watchtower
docker_socket_proxy_allow_containers: "1"  # Required to list containers
docker_socket_proxy_allow_info: "1"        # Required for system info
docker_socket_proxy_allow_networks: "1"    # Required for network info
docker_socket_proxy_allow_logs: "1"        # Required for container logs
docker_socket_proxy_allow_images: "1"      # Required for Watchtower to check images
docker_socket_proxy_allow_volumes: "1"     # Required for Watchtower container management
docker_socket_proxy_allow_post: "1"        # Required for Watchtower to start/stop containers
```

Once this is installed and configured on all servers, then Homepage will be able to auto-discover all services.

Here is the screenshot of the current state of the home lab:

![Homepage](/images/Screenshot-Tier-ONE-TWO-THREE-FOUR-Homepage.png)

You see, all these services, just to make your homelab up and running, to make it extesible and to have visibility.

We'll continue from here.

---

_**To follow along, please regularly check the [akora/homelab](https://github.com/akora/homelab) repository on GitHub for the latest updates.**_
