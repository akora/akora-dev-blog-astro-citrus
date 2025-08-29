---
title: "Building a Multi-Tier Home Lab"
description: "A tiered approach to managing a multi-device homelab environment with consistent configuration across different hardware architectures."
publishDate: "2025-08-26"
tags: ["homelab", "self-hosting", "infrastructure", "networking"]
seriesId: "multi-tier-home-lab"
orderInSeries: 1
---

## Building a Multi-Tier Home Lab

Let me start with the definition of what I call a "tier": a tier in the context of my home lab means "**levels of a structure**".

Since I have a variety of hardware ([Raspberry Pis](https://www.raspberrypi.com/), a [ZimaBoard](https://www.zimaspace.com/products/single-board-server), a [Synology NAS](https://global.download.synology.com/download/Document/Hardware/DataSheet/DiskStation/18-year/DS718+/enu/Synology_DS718_Plus_Data_Sheet_enu.pdf)) it is important that I can handle them the same way, regardless of their architecture (ARM vs x86).

I need to be able to access them remotely using the same set of software, protocols and tools, moreover I need to be able to manage them the same way.

## Tier ONE

The most basic tier. At this level I want to make sure that each server is set up using the same defaults:

- the Operating System should be the same, or as close to the same distro and version as possible
- all servers and services must use UTC as the time zone
- all servers must be set to the locale: "en_US.UTF-8"
- all servers must have a user (that is not root) as the admin user, this user must be used to install docker and all related services on top of docker
- all servers must have password-less sudo configured
- the following common packages must be installed on all servers: vim, htop, btop, git, curl, wget, unzip, net-tools, ntp, tree, nmap
- the SSH servers are secured

In addition, any hardware specific configuration and scripts must be run in this tier. For example:

- For Raspberry Pi devices: disable Bluetooth and WiFi, optimize system settings
- For Raspberry Pi 4 devices (in [Argon cases](https://argon40.com/products/argon-one-v3-m-2-nvme-case)): install and configure [Argon ONE script](https://download.argon40.com/argon1.sh) for fan control
- For Zimaboard: configure thermal management and system optimizations

At any given time I should be able to reset all servers to this default state, and have them ready to be reinstalled again.

## Tier TWO

Based on top of Tier ONE, I want to have:

- Docker installed and configured
- Docker Compose installed and configured
- The Docker service directory is created on each server
- The Docker proxy network is created on each server

Again, at any given time I should be able to reset all servers to this state, and have them ready to be reinstalled again - at the Docker level.

## Tier THREE

Based on top of Tier TWO, I want to have:

- [Portainer](https://github.com/portainer/portainer) installed and configured on one of the servers
- The [Portainer agent](https://docs.portainer.io/admin/environments/add/docker/agent) installed and configured on all the other servers

In order to make Portainer work seamlessly, in this tier I also need to have:

- Local HTTPS and proper routing with [Traefik](https://traefik.io/)

This tier ensures that the home lab is extensible, and there is a UI to manage all Docker containers.

At any given time... ...you get the idea.

## Tier FOUR

Based on top of Tier THREE, things are getting more specific here.

In order to be able to build a `home page` for the lab, I need to have a service auto-discovery mechanism in place. This is where Docker Socket Proxy comes in. The requirement here is to have:

- [Docker Socket Proxy](https://github.com/Tecnativa/docker-socket-proxy) installed and configured on all servers
- [Homepage](https://gethomepage.dev/) installed and configured on one of the servers

This is the tier where it finally feels like something is finally working.

## The basis for additional services

At this point I have a pretty solid setup:

- SSH access to all servers
- Can easily use [Ansible](https://docs.ansible.com/) to manage all servers
- Can easily use [Portainer](https://github.com/portainer/portainer) to manage all Docker containers
- Can easily use [Docker Compose](https://github.com/docker/compose) to manage all Docker services
- Can easily use [Docker Socket Proxy](https://github.com/Tecnativa/docker-socket-proxy) to access special functions of the servers
- [Homepage](https://gethomepage.dev/), to have a single point of UI to access all services

## Services

Here is where the real fun begins. At this point, I can finally start adding useful services to the lab.

- [Watchtower](https://github.com/containrrr/watchtower), for automatically updating Docker containers
- [Twingate](https://www.twingate.com/) Connectors, for remote access to the lab
- [Pi-hole](https://pi-hole.net/), for ad-blocking
- [Nutify](https://github.com/DartSteven/Nutify), for monitoring the UPSes
- [Uptime Kuma](https://github.com/louislam/uptime-kuma), for uptime monitoring
- [Gitea](https://gitea.io/), for Git hosting
- [n8n](https://n8n.io/), for automating workflows
- [Vaultwarden](https://github.com/dani-garcia/vaultwarden), for password management
- [Syncthing](https://syncthing.net/), for file synchronization

...the list is endless.

---

In the next chapter I will go through the exact configuration of each tier and service, plus the naming convention I use for my containers and services.
