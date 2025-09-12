---
title: "Home Lab: Log Analysis"
description: "Log analysis: clean logs or errors?"
publishDate: "2025-08-31"
tags: ["homelab", "automation", "logs", "log-analysis"]
seriesId: "multi-tier-home-lab"
orderInSeries: 6
---

Let's pause for a moment. Now is the time to look at each service's logs. What will we observe? Are the logs clean? How should they look like?

Let's check them one by one.

## Zima-01

### Docker Socket Proxy

Healthy logs should look like something like this:

```text
::ffff:172.20.0.4:41732 [31/Aug/2025:07:50:07.019] dockerfrontend dockerbackend/dockersocket 0/0/0/5/5 200 14558 - - ---- 2/2/0/0/0 0/0 "GET /containers/json?all=true HTTP/1.1"
::ffff:172.20.0.4:41728 [31/Aug/2025:07:50:07.032] dockerfrontend dockerbackend/dockersocket 0/0/0/2/2 200 10791 - - ---- 2/2/0/0/0 0/0 "GET /containers/portainer/json HTTP/1.1"
::ffff:172.20.0.4:41732 [31/Aug/2025:07:50:07.050] dockerfrontend dockerbackend/dockersocket 0/0/0/2/2 200 8417 - - ---- 3/3/0/0/0 0/0 "GET /containers/traefik/json HTTP/1.1"
::ffff:172.20.0.4:41746 [31/Aug/2025:07:50:07.079] dockerfrontend dockerbackend/dockersocket 0/0/0/4/4 200 14558 - - ---- 3/3/0/0/0 0/0 "GET /containers/json?all=true HTTP/1.1"
::ffff:172.20.0.4:41746 [31/Aug/2025:07:50:07.107] dockerfrontend dockerbackend/dockersocket 0/0/0/2/2 200 8963 - - ---- 3/3/0/0/0 0/0 "GET /containers/homepage/json HTTP/1.1"
::ffff:172.20.0.4:41746 [31/Aug/2025:07:50:07.135] dockerfrontend dockerbackend/dockersocket 0/0/0/5/5 200 14558 - - ---- 3/3/0/0/0 0/0 "GET /containers/json?all=true HTTP/1.1"
::ffff:172.20.0.4:41746 [31/Aug/2025:07:50:07.158] dockerfrontend dockerbackend/dockersocket 0/0/0/5/5 200 14558 - - ---- 3/3/0/0/0 0/0 "GET /containers/json?all=true HTTP/1.1"
```

Status codes are all 200, we are good.

### Homepage

Ideally, you should not see anything else but the following in your logs - indicating a fully functional and working setup:

```text
/app/config already owned by correct UID/GID, skipping chown
/app/.next already owned by correct UID/GID or running as root, skipping chown
   ▲ Next.js 15.3.1
   - Local:        http://localhost:3000
   - Network:      http://0.0.0.0:3000
 ✓ Starting...
 ✓ Ready in 1062ms
```

### Portainer

Ideally, all entries should be just `INF` entries, something like this:

```text
2025/08/29 06:32AM INF github.com/portainer/portainer/api/cmd/portainer/main.go:310 > encryption key file not present | filename=portainer
2025/08/29 06:32AM INF github.com/portainer/portainer/api/cmd/portainer/main.go:334 > proceeding without encryption key |
2025/08/29 06:32AM INF github.com/portainer/portainer/api/database/boltdb/db.go:133 > loading PortainerDB | filename=portainer.db
2025/08/29 06:32AM INF github.com/portainer/portainer/api/chisel/service.go:200 > found Chisel private key file on disk | private-key=/data/chisel/private-key.pem
2025/08/29 06:32:50 server: Reverse tunnelling enabled
2025/08/29 06:32:50 server: Fingerprint NOp8CLA7YmbcBVLAEfbfZEArTilLpewjj3QokUL9UZM=
2025/08/29 06:32:50 server: Listening on http://0.0.0.0:8000
2025/08/29 06:32AM INF github.com/portainer/portainer/api/datastore/postinit/migrate_post_init.go:101 > Executing post init migration for environment 3 |
2025/08/29 06:32AM INF github.com/portainer/portainer/api/datastore/postinit/migrate_post_init.go:101 > Executing post init migration for environment 4 |
2025/08/29 06:32AM INF github.com/portainer/portainer/api/datastore/postinit/migrate_post_init.go:101 > Executing post init migration for environment 5 |
2025/08/29 06:32AM INF github.com/portainer/portainer/api/datastore/postinit/migrate_post_init.go:101 > Executing post init migration for environment 6 |
2025/08/29 06:32AM INF github.com/portainer/portainer/api/cmd/portainer/main.go:602 > starting Portainer | build_number=187 go_version=1.23.8 image_tag=2.27.6-linux-amd64 nodejs_version=18.20.8 version=2.27.6 webpack_version=5.88.2 yarn_version=1.22.22
2025/08/29 06:32AM INF github.com/portainer/portainer/api/http/server.go:365 > starting HTTPS server | bind_address=:9443
2025/08/29 06:32AM INF github.com/portainer/portainer/api/http/server.go:349 > starting HTTP server | bind_address=:9000
```

### Traefik

Here, some warnings are expected, in case a new version of Traefik is released:

```text
2025-08-29T06:41:08Z WRN A new release of Traefik has been found: 3.5.1. Please consider updating.
2025-08-30T06:31:07Z INF Testing certificate renew... acmeCA=https://acme-v02.api.letsencrypt.org/directory providerName=cloudflare.acme
2025-08-30T06:31:07Z WRN A new release of Traefik has been found: 3.5.1. Please consider updating.
2025-08-31T06:31:07Z INF Testing certificate renew... acmeCA=https://acme-v02.api.letsencrypt.org/directory providerName=cloudflare.acme
2025-08-31T06:31:08Z WRN A new release of Traefik has been found: 3.5.1. Please consider updating.
```

---

On all the other servers at this stage we have nothing but Docker Socket Proxy and the Portainer Agent running, their logs should look like this:

## All other servers

### Docker Socket Proxy on all other servers

Expected, ideal log entries:

```text
::ffff:192.168.0.91:43166 [31/Aug/2025:07:50:06.876] dockerfrontend dockerbackend/dockersocket 0/0/0/6/6 200 4681 - - ---- 2/2/0/0/0 0/0 "GET /containers/json?all=true HTTP/1.1"
::ffff:192.168.0.91:43166 [31/Aug/2025:07:50:06.895] dockerfrontend dockerbackend/dockersocket 0/0/0/2/2 200 8328 - - ---- 2/2/0/0/0 0/0 "GET /containers/docker-socket-proxy/json HTTP/1.1"
::ffff:192.168.0.91:43166 [31/Aug/2025:07:50:06.965] dockerfrontend dockerbackend/dockersocket 0/0/0/6/6 200 4681 - - ---- 2/2/0/0/0 0/0 "GET /containers/json?all=true HTTP/1.1"
::ffff:192.168.0.91:43166 [31/Aug/2025:07:50:07.009] dockerfrontend dockerbackend/dockersocket 0/0/0/4/4 200 6500 - - ---- 2/2/0/0/0 0/0 "GET /containers/portainer-agent/json HTTP/1.1"
::ffff:192.168.0.91:43166 [31/Aug/2025:07:50:07.134] dockerfrontend dockerbackend/dockersocket 0/0/0/6/6 200 4681 - - ---- 2/2/0/0/0 0/0 "GET /containers/json?all=true HTTP/1.1"
::ffff:192.168.0.91:43166 [31/Aug/2025:07:50:07.157] dockerfrontend dockerbackend/dockersocket 0/0/0/6/6 200 4681 - - ---- 2/2/0/0/0 0/0 "GET /containers/json?all=true HTTP/1.1"
```

### Portainer Agent

Nothing else but the following:

```text
2025/08/28 07:00:34.702PM INF github.com/portainer/agent/cmd/agent/main.go:89 > agent running on Docker platform |
2025/08/28 07:00:35.896PM INF github.com/portainer/agent/edge/registry/server.go:104 > starting registry credential server |
2025/08/28 07:00:35.898PM INF github.com/portainer/agent/http/server.go:96 > starting Agent API server | api_version=2.33.1 server_addr=0.0.0.0 server_port=9001 use_tls=true
```

With all this said, this is an ideal, stable and "starter" stage.

The real fun begins from here ;)

---

_**To follow along, please regularly check the [akora/homelab](https://github.com/akora/homelab) repository on GitHub for the latest updates.**_
