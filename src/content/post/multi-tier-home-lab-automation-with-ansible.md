---
title: "Home Lab: Automation with Ansible"
description: "Setting up the `baseline`, a common configuration for all servers"
publishDate: "2025-08-28"
tags: ["homelab", "automation", "ansible", "inventory", "playbooks"]
seriesId: "multi-tier-home-lab"
orderInSeries: 3
---

## Automation: Ansible to the rescue

Now, that we have the low level specs (IP addresses, SSH, etc.) and high level specs (domain name, naming conventions, etc.) sorted out, let's move on to automation.

We'll be using Ansible to automate the deployment of our home lab.

The benefits are numerous:

- Everything is codified (and version controlled)
- Reproducability
- Idempotency
- Consistency
- Observability

### The inventory

First, we need a definition of our hosts.

```bash
# Homelab Inventory

[raspberry_pi]
rpi4-01 ansible_host=192.168.0.41
rpi4-02 ansible_host=192.168.0.42
rpi5-01 ansible_host=192.168.0.51

[raspberry_pi4]
rpi4-01
rpi4-02

[raspberry_pi5]
rpi5-01

[zimaboard]
zima-01 ansible_host=192.168.0.91

[homelab:children]
raspberry_pi
zimaboard

[arm_servers:children]
raspberry_pi

[x86_servers:children]
zimaboard
```

Nothing too complicated but still providing the ability to "target" various machines, specific groups or all of them.

### The baseline playbook

The very first Ansible playbook is what I call the `baseline`, which covers "Tier ONE".

It applies:

- baseline configuration to all servers (aka the "common" settings and packages applicable to all servers)
- hardware specific configuration to each server (for example the Argon40 case specific script)

```yaml
---
# Baseline configuration playbook for all homelab servers
# This playbook sets up:
# - Common packages and configurations
# - Raspberry Pi-specific settings (WiFi/BT disabled)
# - Argon40 case setup for Raspberry Pi 4 devices

- name: Apply baseline configuration to all servers
  hosts: homelab
  become: true
  roles:
    - common

- name: Configure Raspberry Pi specific settings
  hosts: raspberry_pi
  become: true
  roles:
    - raspberry_pi

- name: Setup Argon40 case on Raspberry Pi 4 devices
  hosts: raspberry_pi4
  become: true
  roles:
    - argon40
```

### The "site" playbook

Next is the "site" playbook, which covers "Tier TWO". In essence it's `baseline` + Docker.

It applies:

- Docker installation and configuration to all servers
- Docker Compose installation and configuration to all servers
- Docker proxy network creation to all servers
- Docker service directory creation to all servers

```yaml
---
# Main playbook that includes all other playbooks
# This is the "run everything" playbook

- import_playbook: baseline.yml
- import_playbook: docker.yml
```

Let's not forget that as part of the `docker.yml` playbook we have to consider multiple architectures, under the docker role we will have two tasks:

- setup_docker_arm.yml
- setup_docker_x86.yml

---

At this point I have a clean home lab ready to be used, with all the basic services installed and configured.

At any given time I can reset all servers to this state.

Let's not forget that we still don't have Portainer and its agents set up, no domain name management, no HTTPS, no proper routing.

That's all coming in the next chapter.
