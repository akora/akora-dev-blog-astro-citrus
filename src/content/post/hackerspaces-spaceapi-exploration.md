---
title: "Exploring Hackerspaces with SpaceAPI"
description: "Discovering global hackerspaces using the SpaceAPI and Python"
publishDate: "2026-01-20"
tags: ["hackerspaces", "spaceapi", "python", "api", "exploration", "maker", "community", "open-source"]
---

## The urge to look for an ideal "third place"

As mentioned in my blog post on [andraskora.com](https://andraskora.com) in the recent piece "[In search of a third place](https://andraskora.com/in-search-of-a-third-place/)", I'm exploring the idea of finding an ideal "third place".

Let's make this search global.

## hackerspaces.org

The first thing that comes to mind is to look for a global organisation, very much like [hackerspaces.org](https://hackerspaces.org).

After signing up to some of their main mailing lists (<announce@lists.hackerspaces.org>, <discuss@lists.hackerspaces.org> and <hs_revitalize@lists.hackerspaces.org>) I started exploring their IRC channels, and Matrix.

And then I stumbled upon [SpaceAPI](https://spaceapi.io).

## SpaceAPI

AI agents and LLMs to the rescue, immediately jumped into Windsurf and started implementing an [API explorer](https://github.com/akora/spaceapi-explorer).

## spaceapi-explorer

A Python toolkit for exploring the global hackerspace ecosystem through the SpaceAPI directory.

Since the API can be utilised in various ways, my small project offers a few examples, possible ways to use it.

### The Directory

By executing

```bash
python examples/directory_stats.py
```

here is what we've got:

```bash
╭───────────────────────────────╮
│ SpaceAPI Directory Statistics │
╰───────────────────────────────╯
⠹ Directory fetched successfully!

Found 242 hackerspaces in the directory!
                                      Sample Hackerspaces                                       
┏━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Name                    ┃ URL                                                                ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ /dev/hack               │ https://devhack.net/spaceapi.json                                  │
│ /dev/tal                │ https://www.devtal.de/api/                                         │
│ /usr/space              │ https://www.usrspace.at/spaceapi.json                              │
│ 57North Hacklab         │ https://hub.57north.org.uk/spaceapi                                │
│ <name>space Gera        │ https://api.buergernetz-gera-greiz.de/spaceapi                     │
│ ACKspace                │ https://ackspace.nl/spaceAPI/                                      │
│ AFRA                    │ https://spaceapi.afra-berlin.de/v1/status.json                     │
│ Amman Valley MakerSpace │ https://raw.githubusercontent.com/AmmanVMS/space.api/main/api.json │
│ Apollo-NG               │ https://apollo.open-resource.org/status.php                        │
│ Arch Reactor            │ https://archreactor.org/status.php                                 │
│ Attraktor Makerspace    │ http://blog.attraktor.org/spaceapi/spaceapi.json                   │
│ AwesomeSpace            │ https://state.awesomespace.nl/                                     │
│ B4CKSP4CE               │ https://spaceapi.0x08.in/                                          │
│ Bastli                  │ http://bastli.ch/hackspace_api.php                                 │
│ Binary Kitchen          │ https://www.binary-kitchen.de/spaceapi.php                         │
│ Bitlair                 │ https://bitlair.nl/spaceapi.json                                   │
│ Breizh-Entropy          │ http://breizh-entropy.org/spaceapi.json                            │
│ Brisbane Makerspace     │ https://portal.brisbanemaker.space/api/spacedirectory/             │
│ Brixel                  │ https://status.brixel.space/api/status                             │
│ Bytespeicher            │ https://status.bytespeicher.org/status.json                        │
└─────────────────────────┴────────────────────────────────────────────────────────────────────┘

Directory Statistics:
• Total spaces: 242
• Last updated: 2026-01-20T07:53:14.764072

Search Examples:
• Spaces containing 'hack': 49
  - /dev/hack
  - 57North Hacklab
  - C-Hack Calw
• Spaces containing 'lab': 43
  - 57North Hacklab
  - Computer Deconstruction Lab
  - Créalab - FabLab B3
• Spaces containing 'space': 57
  - /usr/space
  - <name>space Gera
  - ACKspace
• Spaces containing 'maker': 18
  - Amman Valley MakerSpace
  - Attraktor Makerspace
  - Brisbane Makerspace

... and 15 more
╭────────────────────────────────╮
│ Directory statistics complete! │
╰────────────────────────────────╯
```

### The Health Monitor

By executing

```bash
python examples/health_monitor.py
```

we get the following:

```bash
╭─────────────────────────╮
│ SpaceAPI Health Monitor │
╰─────────────────────────╯
⠋ Directory fetched: 242 spaces
  Checking endpoint health...  

🏥 SpaceAPI Health Report

📊 Summary Statistics:
• Total endpoints checked: 50
• Successful: 44 (88.0%)
• Failed: 6 (12.0%)
• Average response time: 0.67s

🔢 API Version Distribution:
• v0.12: 1 spaces (2.3%)
• v0.13: 11 spaces (25.0%)
• v1,4: 1 spaces (2.3%)
• v13,14: 3 spaces (6.8%)
• v14: 19 spaces (43.2%)
• v14,15: 3 spaces (6.8%)
• v14,15,16: 1 spaces (2.3%)
• v14,15,16-draft: 1 spaces (2.3%)
• v15: 4 spaces (9.1%)

❌ Error Breakdown:
• http_error: 3 endpoints
• connection_error: 3 endpoints
                                                🔍 Detailed Issues                                                
┏━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━┓
┃ Space                  ┃ Status           ┃ Details                                            ┃ Response Time ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━┩
│ /usr/space             │ Http Error       │ HTTP 204                                           │         0.09s │
│ Arch Reactor           │ Http Error       │ HTTP 404                                           │         1.07s │
│ Chaostreff Ludwigsburg │ Http Error       │ HTTP 404                                           │         0.12s │
│ Attraktor Makerspace   │ Connection Error │ HTTPConnectionPool(host='blog.attraktor.org', port │         6.23s │
│ Bastli                 │ Connection Error │ HTTPSConnectionPool(host='bastli.ch', port=443): M │         6.51s │
│ Chaostreff Salzburg    │ Connection Error │ HTTPSConnectionPool(host='spaceapi.sbg.chaostreff. │         6.04s │
└────────────────────────┴──────────────────┴────────────────────────────────────────────────────┴───────────────┘

💡 Recommendations:
• Some endpoints need attention. Regular maintenance recommended.
• 3 spaces have connection issues - check if they're still active
• 3 spaces return HTTP errors - may need URL updates
• 11 spaces use older API versions - consider upgrades

📄 Report exported to health_report_20260120_075803.json
╭─────────────────────────────╮
│ Health monitoring complete! │
╰─────────────────────────────╯
```

### The Status Monitor

As a third take on the same available data, here is another view of the health of the directory:

```bash
python examples/status_monitor.py
```

The result:

```bash
╭────────────────────────────╮
│ Hackerspace Status Monitor │
╰────────────────────────────╯
Failed to fetch space status from https://www.usrspace.at/spaceapi.json: Expecting value: line 1 column 1 (char 0)
Invalid response from https://ackspace.nl/spaceAPI/: 1 validation error for SpaceStatus
spacefed.ext_spacephone_extension
  Input should be a valid boolean, unable to interpret input [type=bool_parsing, input_value=31979922, input_type=int]
    For further information visit https://errors.pydantic.dev/2.12/v/bool_parsing
Failed to fetch space status from https://archreactor.org/status.php: 404 Client Error: Not Found for url: https://archreactor.org/status.php
Failed to fetch space status from http://blog.attraktor.org/spaceapi/spaceapi.json: HTTPConnectionPool(host='blog.attraktor.org', port=80): Max retries exceeded with url: /spaceapi/spaceapi.json (Caused by ResponseError('too many 500 error responses'))
Failed to fetch space status from http://bastli.ch/hackspace_api.php: HTTPSConnectionPool(host='bastli.ch', port=443): Max retries exceeded with url: /hackspace_api.php (Caused by SSLError(CertificateError("hostname 'bastli.ch' doesn't match either of '*.amiv-dev.ethz.ch', 
'amiv-dev.ethz.ch'")))
⠇ Directory fetched: 242 spaces          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     
  Successfully fetched 25 space statuses ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100%

Successfully fetched data for 25 hackerspaces!

Status Summary:
• Total spaces with status: 23
• Currently open: 2
• Currently closed: 21
• Recent status changes (24h): 15

Currently Open Spaces (2):
  • /dev/hack
  • C3D2


                                                                                               Hackerspace Status Monitor                                                                                               
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━┓
┃ Space Name                ┃ Status  ┃ Location                                                                                                                                  ┃ Last Change ┃ Message              ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━┩
│ /dev/hack                 │ OPEN    │ 4534 1/2 University Way NE, Seattle, WA 98105, US                                                                                         │ 20:17 UTC   │                      │
│ /dev/tal                  │ CLOSED  │ Mirker Str. 48a, 42105 Wuppertal, Germany                                                                                                 │ N/A         │                      │
│ 57North Hacklab           │ CLOSED  │ 57North Hacklab, c/o Aberdeen Action on Disability, Suite H, Kettock Lodge, Innovation Park, Campus Two, Bridge of Don, Aberdeen AB22 8GU │ 20:55 UTC   │ Hacky hack hack      │
│ <name>space               │ CLOSED  │ An der Salzstraße 13-15, 07551 Gera, Germany                                                                                              │ 14:35 UTC   │                      │
│ AFRA                      │ CLOSED  │ Margaretenstr. 30, 10317 Berlin, Germany                                                                                                  │ N/A         │                      │
│ Amman Valley MakerSpace   │ CLOSED  │ Youth Resource Center/MakerSpace, Station Road, Glanamman, SA18 1LQ, Wales, United Kingdom                                                │ N/A         │                      │
│ Apollo-NG                 │ UNKNOWN │ N/A                                                                                                                                       │ N/A         │                      │
│ AwesomeSpace              │ CLOSED  │ Franciscusweg 18, 1216 SK, Hilversum, The Netherlands                                                                                     │ 00:45 UTC   │                      │
│ B4CKSP4CE                 │ UNKNOWN │ Lanskoe shosse, 14/1, 197343, Saint-Petersburg, Russia                                                                                    │ N/A         │                      │
│ Binary Kitchen            │ CLOSED  │ Binary Kitchen e.V., Walderdorffstr. 13b, 93053 Regensburg                                                                                │ 00:34 UTC   │                      │
│ Bitlair                   │ CLOSED  │ Nijverheidsweg-Noord 77, 3812 PK Amersfoort, The Netherlands                                                                              │ 22:54 UTC   │                      │
│ Breizh Entropy            │ CLOSED  │ 134 Avenue du Général Leclerc, 35000 Rennes                                                                                               │ N/A         │                      │
│ Brisbane Makerspace       │ CLOSED  │ 146 Wickham St, Fortitude Valley, QLD 4006 Australia                                                                                      │ 13:00 UTC   │ Welcome to BMS!      │
│ Brixel                    │ CLOSED  │ Spalbeekstraat 34, 3510 Spalbeek, Belgium                                                                                                 │ 13:24 UTC   │                      │
│ Bytespeicher              │ CLOSED  │ Liebknechtstrasse 8, 99085 Erfurt, Germany                                                                                                │ 19:02 UTC   │ No devices connected │
│ C-Hack                    │ CLOSED  │ Im Zwinger 4, 75365 Calw, Deutschland                                                                                                     │ N/A         │                      │
│ C3D2                      │ OPEN    │ Raum 1.04.01, Haus B, Zentralwerk, Riesaer Str. 32, 01127 Dresden, Germany                                                                │ 12:39 UTC   │ HQ is open           │
│ CCC Aachen                │ CLOSED  │ Chaos Computer Club Aachen e.V., Schützenstraße 11, 52062 Aachen                                                                          │ 00:06 UTC   │                      │
│ Chaos Computer Club Basel │ CLOSED  │ Birsfelderstrasse 6, 4132 Muttenz, Switzerland                                                                                            │ 00:59 UTC   │ Geschlossen / Closed │
│ CCC Cologne               │ CLOSED  │ Chaos Computer Club Cologne (c4) e.V., Heliosstr. 6a, 50825 Köln, Germany                                                                 │ 22:54 UTC   │                      │
│ CCC Darmstadt             │ CLOSED  │ Wilhelminenstraße 17, 64283 Darmstadt, Germany                                                                                            │ 23:10 UTC   │ Closed               │
│ CCC Frankfurt             │ CLOSED  │ Hohenstaufenstraße 8, 60327 Frankfurt, Germany                                                                                            │ 12:02 UTC   │ under construction   │
│ CCCHH                     │ CLOSED  │ Zeiseweg 9, 22765 Hamburg, Germany                                                                                                        │ 23:03 UTC   │                      │
│ CCC Mannheim              │ CLOSED  │ CCC Mannheim e.V, Neckarauer Straße 106-116, 68163 Mannheim                                                                               │ 07:00 UTC   │                      │
│ CCCFr                     │ CLOSED  │ Adlerstraße 12a, 79098 Freiburg im Breisgau, Germany, Planet Earth                                                                        │ 23:07 UTC   │ closed               │
└───────────────────────────┴─────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴─────────────┴──────────────────────┘

Contact Methods:
• email: 22 spaces (88.0%)
• irc: 11 spaces (44.0%)
• mastodon: 11 spaces (44.0%)
• phone: 16 spaces (64.0%)
• twitter: 10 spaces (40.0%)
• facebook: 5 spaces (20.0%)

Spaces with Sensors (11):
  • /dev/hack - 2 sensors
  • 57North Hacklab - 3 sensors
  • AwesomeSpace - 2 sensors
  • Binary Kitchen - 6 sensors
  • Brisbane Makerspace - 2 sensors
╭─────────────────────────────╮
│ Status monitoring complete! │
╰─────────────────────────────╯
```

### The World Map

Finally, the world map:

```bash
python examples/world_map.py
```

The output:

```bash
╭─────────────────────────────────╮
│ Hackerspace World Map Generator │
╰─────────────────────────────────╯

... (plenty of error messages here) ...

⠸ Directory fetched: 242 spaces          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     
  Successfully fetched 41 space statuses ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100%

Successfully fetched data for 41 hackerspaces!

Data Summary:
• Total spaces: 41
• Spaces with location: 40
• Spaces with status: 38
• Currently open: 2

Generating visualizations...
• Creating interactive world map...
  ✓ Saved as hackerspaces_world_map_20260120_080259.html
• Creating geographic distribution plot...
  ✓ Saved as geographic_distribution_20260120_080259.png
• Creating opening status chart...
  ✓ Saved as opening_status_20260120_080259.png
• Creating contact methods chart...
  ✓ Saved as contact_methods_20260120_080259.png
╭──────────────────────────────────────────────────────────────────────────────────────────────╮
│ All visualizations generated successfully!                                                   │
│                                                                                              │
│ Open hackerspaces_world_map_20260120_080259.html in your browser to see the interactive map. │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

...aaannnnddddd... here is the map:

![Hackerspaces World Map](/images/hackerspaces-world-map-1.png)

A zoomed in view around the greatest cluster:

![Hackerspaces World Map - zoomed in](/images/hackerspaces-world-map-2.png)

All this, of course, depends on the accuracy of the data provided by the actual spaces.
