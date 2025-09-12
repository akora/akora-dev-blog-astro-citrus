---
title: "Home Lab: n8n"
description: "n8n: a workflow automation tool"
publishDate: "2025-09-12"
tags: ["homelab", "automation", "n8n", "self-hosted"]
seriesId: "multi-tier-home-lab"
orderInSeries: 11
---

[n8n](https://n8n.io/) is a workflow automation tool. It allows you to create workflows that can be triggered by events, or simply run on a schedule.

## Installation

The installation process is the same as for Gitea or Syncthing - and for any other future service. What’s required is:

- an Ansible playbook
- a corresponding Ansible role (which generates the docker compose file)
- an entry in the `vault.yml` file for the service domain
- and finally, a routing configuration for Traefik

The DNS and HTTPS configuration happens automatically, since we are utilising a wildcard domain setup (*.l4n.io).

Add a new entry to the service domain list:

```yaml
# Service domains
vault_service_domains:
  traefik: "traefik.l4n.io"
  portainer: "portainer.l4n.io"
  homepage: "home.l4n.io"
  gitea: "git.l4n.io"
  syncthing: "sync.l4n.io"
  n8n: "n8n.l4n.io"
```

n8n requires a few initial configuration settings, also in the `vault.yml` file:

```yaml
# HTTP Basic Auth credentials for n8n web interface
vault_n8n_basic_auth_user: "<YOUR-USERNAME>"
vault_n8n_basic_auth_password: "<YOUR-PASSWORD>"
# Encryption key for n8n credential storage (must be exactly 32 characters)
vault_n8n_encryption_key: "<YOUR-ENCRYPTION-KEY>"
```

Once you have added the entries to the `vault.yml` file, let Ansible run. If all goes well, you should see the n8n container running on the server.

![n8n](/images/HomeLab-n8n.png)

## Initial configuration

What I recommend is to get an activation key from n8n. It's free, and it will unlock features like workflow history, advanced debugging, and execution search.

![n8n activation key](/images/HomeLab-n8n-activation-key.png)

...and that's it!

## Where to go from here?

Well, at this point you have a pretty solid foundation to do almost anything in your homelab:

- access the homelab from anywhere: Twingate
- keep personal code repositories nearby: Gitea
- sync files between devices: Syncthing
- automate workflows: n8n

The extension possibilities are endless - I'm planning to go with the following services:

- Vaultwarden
- Uptime Kuma
- Pi-hole

---

_**To follow along, please regularly check the [akora/homelab](https://github.com/akora/homelab) repository on GitHub for the latest updates.**_
