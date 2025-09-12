---
title: "Home Lab: Syncthing"
description: "Syncing files between devices, automagically"
publishDate: "2025-09-10"
tags: ["homelab", "automation", "syncthing", "self-hosted"]
seriesId: "multi-tier-home-lab"
orderInSeries: 9
---

[Syncthing](https://syncthing.net/) is a continuous file synchronization software. It synchronizes files between two or more computers in real time.

The main use case for me - to have it as part of my homelab - is to sync my [Obsidian vaults](https://obsidian.md/) across devices, one device being my iPad.

## Installation

The installation process is the same as for Gitea - and for any other future service. What's required is:

- an Ansible playbook
- a corresponding Ansible role (which generates the docker compose file)
- an entry in the `vault.yml` file for the service domain
- and finally, a routing configuration for Traefik

The DNS and HTTPS configuration happens automatically, since we are utilising a wildcard domain setup (*.l4n.io).

At this point in time our list of service domains looks like this:

```yaml
# Service domains
vault_service_domains:
  traefik: "traefik.l4n.io"
  portainer: "portainer.l4n.io"
  homepage: "home.l4n.io"
  gitea: "git.l4n.io"
  syncthing: "sync.l4n.io"
```

Homepage should automagically pick up the new service and display it on the dashboard; this is thanks to the labels applied.

![Syncthing on the Homepage](/images/HomeLab-Syncthing.png)

## Configuration

There is only one trick that I want to share: if you are planning to use Syncthing internally only - meaning NOT exposing it to the internet - you should disable the following two settigns:

![Syncthing configuration settings](/images/HomeLab-Syncthing-Settings.png)

By doing this the complexity and also the network traffic gets significantly reduced.

## How does it work?

It works with `folders` and `remote devices`.

![Syncthing frontpage](/images/HomeLab-Syncthing-Frontpage.png)

What you just installed is the "server side". This is the component that's always running, doing the synchronization behind the scenes. It also keeps a copy of each shared folder.

The "client side" is an app you install on your devices.

I have one client running on my Macbook, and another one on my iPad. On iPad you should check out [Möbius Sync](https://apps.apple.com/us/app/m%C3%B6bius-sync/id1539203216).

Adding a new remote device is quite simple.

Next, you need to add a folder to sync.

In my case I've got an Obsidian vault with all of my notes on my laptop, and I want to sync it to my iPad. Plus, just in case I want to keep a copy elsewhere too, this is where Syncthing's server side "local" copy comes in.

Once the device(s) and folder(s) are added, Syncthing will start synchronizing.

...and, that's it!

---

_**To follow along, please regularly check the [akora/homelab](https://github.com/akora/homelab) repository on GitHub for the latest updates.**_
