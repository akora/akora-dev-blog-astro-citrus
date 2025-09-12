---
title: "Home Lab: Traefik & Portainer"
description: "Setting up Traefik and Portainer for routing, local HTTPS and service visibility"
publishDate: "2025-08-29"
tags: ["homelab", "automation", "ansible", "traefik", "portainer", "routing", "https"]
seriesId: "multi-tier-home-lab"
orderInSeries: 4
---

At this point we have a baseline installation where each server can be reached and they have the same set of packages installed.

On top, we also have Docker installed and running on each server.

This is considered a blank state, where there are no (useful) service running, just the barebones.

## Traefik

We need to break away from IP addresses!

While we can do that on the server level with hostnames and the local SSH config, that's not taking us very far. Nothing works beyond our local machine.

Our domain name is sitting in the cloud, pointing at an internal IP address. Nothing is working.

Traefik allows us to enable proper routing, local HTTPS and service visibility.

There are two ways how Traefik can be set up:

- to manage issued certificates for each service (e.g. one for router.l4n.io, another one for portainer.l4n.io etc.) individually, or
- have it configured to use a wildcard certificate for all subdomains (e.g. *.l4n.io)

I tried both, but had more success with the first option.

Please check out the code base for the exact Traefik setup at <https://github.com/akora/homelab?tab=readme-ov-file#tier-three-traefik--portainer-installation>.

The [playbook](https://github.com/akora/homelab/blob/main/ansible/playbooks/traefik.yml) is super simple, you learn more if you check the individual sections of the corresponding [role](https://github.com/akora/homelab/blob/main/ansible/roles/traefik).

### The Traefik Dashboard

Traefik has a UI - in my case it's <https://traefik.l4n.io/dashboard/>, in a local setup it's very useful, however on production I would disable it once everything is set up and running.

To begin with you need to focus on the HTTP routers; it comes with some pre-configured ones, but you need to add the ones for your services.

![Traefik Dashboard](/images/Screenshot-Tier-ONE-TWO-THREE-FOUR-Traefik.png)

## Portainer

Portainer is a fancy - but useful - UI to manage Docker. It's actually more than that, particularly in our case: it allows us to get visibility beyond the local Docker installation, and with agents we can link all the other servers to it.

![Portainer](/images/Screenshot-Tier-ONE-TWO-THREE-FOUR-Portainer.png)

---

_**To follow along, please regularly check the [akora/homelab](https://github.com/akora/homelab) repository on GitHub for the latest updates.**_
