---
title: "Home Lab: IP addresses and naming conventions"
description: "IP addresses, domain names and naming conventions for the lab"
publishDate: "2025-08-27"
tags: ["homelab", "self-hosting", "networking", "domain"]
seriesId: "multi-tier-home-lab"
orderInSeries: 2
---

## IP addresses and server names

At the server level - in order to be able to SSH into the servers - super short, but also meaningful names are used.

Instead of setting up static IP addresses (one by one on each server), let's use our router's DHCP capabilities to assign IP addresses to the servers, and stick to them (aka "DHCP reservation"). I call it "pinning" a MAC address to an IP address.

Here is my setup:

| Server   | IP Address   | Architecture | OS                 |
|----------|--------------|--------------|--------------------|
| rpi4-01  | 192.168.0.41 | ARM          | Ubuntu 24.04.3 LTS |
| rpi4-02  | 192.168.0.42 | ARM          | Ubuntu 24.04.3 LTS |
| rpi5-01  | 192.168.0.51 | ARM          | Ubuntu 24.04.3 LTS |
| zima-01  | 192.168.0.91 | x86          | Ubuntu 24.04.3 LTS |

To make life easier, add these entries to your `~/.ssh/config` file:

```bash
# Global settings
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
    TCPKeepAlive yes
    Compression yes

# Server-specific settings
Host rpi4-01
    HostName 192.168.0.41
    User akora
    IdentityFile ~/.ssh/homelab_ed25519
    StrictHostKeyChecking accept-new
    ServerAliveInterval 60
    ServerAliveCountMax 3

Host rpi4-02
    HostName 192.168.0.42
    User akora
    IdentityFile ~/.ssh/homelab_ed25519
    StrictHostKeyChecking accept-new
    ServerAliveInterval 60
    ServerAliveCountMax 3

Host rpi5-01
    HostName 192.168.0.51
    User akora
    IdentityFile ~/.ssh/homelab_ed25519
    StrictHostKeyChecking accept-new
    ServerAliveInterval 60
    ServerAliveCountMax 3

Host zima-01
    HostName 192.168.0.91
    User akora
    IdentityFile ~/.ssh/homelab_ed25519
    StrictHostKeyChecking accept-new
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

This way, a simple SSH would look like:

```bash
ssh rpi4-01
```

## Domain names

Try to secure a short domain name for the lab. You will type it quite often.

For me this is `l4n.io`.

I have it configured on Cloudflare, and I use Cloudflare's DNS for the lab.

Over the past few weeks I went through two experiments: one with super short, abbreviated subdomain names and finally, I settled for a mostly non-abbreviated, but still short set of subdomain names.

### Iteration one: Abbreviated subdomain names

Super short names, the goal is to limit it to 2, maximum 3 characters if possible.

| Service | Host | URL |
|---------|------|-----|
| Portainer | rpi4-02 | [pt.l4n.io](https://pt.l4n.io) |
| Portainer Agent | rpi4-01, rpi5-01, zima-01 | N/A |
| Twingate Connector | rpi4-02, zima-01 | N/A |
| Nginx Proxy Manager | rpi4-02 | [npm.l4n.io](https://npm.l4n.io) |
| Uptime Kuma | rpi4-02 | [up.l4n.io](https://up.l4n.io) |
| Nutify (RPI4) | rpi4-02 | [ups-rpi4.l4n.io](https://ups-rpi4.l4n.io) |
| Nutify (Zima) | zima-01 | [ups-zima.l4n.io](https://ups-zima.l4n.io) |
| Homepage | zima-01 | [home.l4n.io](https://home.l4n.io) |
| Docker Socket Proxy | All | N/A |
| Watchtower | All | N/A |
| Gitea | zima-01 | [git.l4n.io](https://git.l4n.io) |
| Pi-hole | rpi5-01 | [ph.l4n.io](https://ph.l4n.io) |
| n8n | rpi5-01 | [n8n.l4n.io](https://n8n.l4n.io) |
| Vaultwarden | zima-01 | [vw.l4n.io](https://vw.l4n.io) |
| Syncthing | rpi5-01 | [sync.l4n.io](https://sync.l4n.io) |

### Iteration two: Non-abbreviated subdomain names

More human-readable names, but still not overwhelmingly long.

| Service | URL |
|---------|-----|
| Portainer | [portainer.l4n.io](https://portainer.l4n.io) |
| Traefik | [traefik.l4n.io](https://traefik.l4n.io) |
| Homepage | [home.l4n.io](https://home.l4n.io) |
| Gitea | [git.l4n.io](https://git.l4n.io) |
| n8n | [n8n.l4n.io](https://n8n.l4n.io) |
| Syncthing | [sync.l4n.io](https://sync.l4n.io) |
| Dozzle | [dozzle.l4n.io](https://dozzle.l4n.io) |
| SFTPGo | [sftpgo.l4n.io](https://sftpgo.l4n.io) |

...and even some network equipment got their names following this pattern:

| Device | URL |
|--------|-----|
| Router | [router.l4n.io](https://router.l4n.io) |
| NAS | [nas.l4n.io](https://nas.l4n.io) |

## Routing (& HTTPS)

Traefik is used for routing and HTTPS. The main benefit is, that I've got Traefik configured with a wildcard certificate (for `*.l4n.io`), any new services will automatically get set up properly.
