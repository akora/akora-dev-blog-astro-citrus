---
title: "Home Lab: Twingate"
description: "It's time to ditch your VPN: a central, Zero Trust orchestration layer"
publishDate: "2025-09-11"
tags: ["homelab", "automation", "twingate", "self-hosted"]
seriesId: "multi-tier-home-lab"
orderInSeries: 10
---

[Twingate](https://twingate.com/) is a central, Zero Trust orchestration layer. What it means is that it allows you to connect to your internal network - your entire homelab - from anywhere.

There are multiple competitors in this space, like [Tailscale](https://tailscale.com/), [Netbird](https://netbird.io/), [ZeroTier](https://www.zerotier.com/), or simply [WireGuard](https://www.wireguard.com/).

## Installation

For Twingate to work, first you need to sign up on their website and set up a network, initially with a URL ending with `.twingate.com`.

Next, you need to create a resource. In my case it's a wildcard domain for my homelab - `*.l4n.io`.

![Twingate resource](/images/HomeLab-Twingate-Resource.png)

Next, you need to have so called `connectors` - ideally more than one - which are essentially the clients that keep the connectivity up and running on the Twingate network.

![Twingate connector](/images/HomeLab-Twingate-Connectors.png)

Twingate will provide some random names, don't worry too much about them.

For each connector you need to have a corresponding access token and a refresh token. You can generate them on the Twingate website.

You need to decide on which two servers will each Twingate connector run on. Install them the usual way, let Ansible do the heavy lifting, these are usual Docker containers.

Finally, don't forget to add the resources to the `vault.yml` file.

```yaml
# =============================================================================
# TWINGATE CREDENTIALS
# =============================================================================
vault_twingate_connector_url: "https://<YOUR-TWINGATE-NETWORK-NAME>.twingate.com"
vault_twingate_network_key: ""  # Network key not required for connector deployment
vault_twingate_connectors:
  - name: "twingate-rpi4-01"
    host: "rpi4-01"
    log_level: 5
    enabled: true
    access_token: "<YOUR-ACCESS-TOKEN>"
    refresh_token: "<YOUR-REFRESH-TOKEN>"
  - name: "twingate-rpi4-02"
    host: "rpi4-02"
    log_level: 5
    enabled: true
    access_token: "<YOUR-ACCESS-TOKEN>"
    refresh_token: "<YOUR-REFRESH-TOKEN>"
```

Once all this is done, let Ansible run. If all goes well, you should see the Twingate connectors running on both servers.

![Twingate connectors](/images/HomeLab-Twingate.png)

## Traffic

One thing I noticed is that these connectors will generate quite a bit of traffic, even when they just simply run by themselves.

In the logs you will see something like this:

```log
[INFO] [connector] processing "health" request
[INFO] [connector] processing "health" request
[INFO] [connector] processing "health" request
[INFO] [connector] processing "health" request
[INFO] [connector] processing "health" request
[INFO] [connector] processing "health" request
[INFO] [connector] processing "health" request
...
```

As you can see, it's the second most popular entry in my top domains list:

![Twingate traffic](/images/HomeLab-Twingate-Traffic.png)

...and that's it.

From now on, you can access your home lab from anywhere, by just simply connecting to your Twingate network.

---

_**To follow along, please regularly check the [akora/homelab](https://github.com/akora/homelab) repository on GitHub for the latest updates.**_
