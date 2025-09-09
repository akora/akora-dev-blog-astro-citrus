---
title: "Home Lab: Gitea"
description: "Gitea: Git with a cup of tea"
publishDate: "2025-09-09"
tags: ["homelab", "automation", "git", "gitea", "self-hosted"]
seriesId: "multi-tier-home-lab"
orderInSeries: 7
---

The next tier - you can call it Tier FIVE if you like - is where we start adding some really useful services to our homelab. Until this point we simply made sure that we have a solid base that's extensible and secure.

## Gitea

Gitea is a self-hosted Git service. It's a great alternative to GitHub and GitLab. I'm using it for two main reasons:

- to keep an extra copy of my code somewhere local
- since I only have public repositories on Github, there are some early stage projects that I don't want to publish yet

If you follow along with the code base (<https://github.com/akora/homelab>), the homapage nicely gets populated withthe service details, all we need to do is to include the labels in the code.

![Gitea on the Homepage](/images/HomeLab-Gitea.png)

Once installed you are greeted with the following screen:

![Gitea frontpage](/images/HomeLab-Gitea-Frontpage.png)

### Creating the admin user

There is a catch though: first you have to enable registration to be able to create your own user.

Later on you may want to restrict it. Though, it's your locally running instance, who knows, maybe one day you want to expose it to the world. It's safer to just disable the registration option and redeploy the service.

1. Enable Registration: Open the `ansible/playbooks/gitea-with-backup.yml` file and comment out the `gitea_disable_registration` variable:

```yaml
# In ansible/playbooks/gitea-with-backup.yml
...
vars:
  ...
  # Disable user registration
  # gitea_disable_registration: "true"
```

Once you created your own user, disable the registration function.

2. Disable Registration: Once you have created your account, uncomment the `gitea_disable_registration` line in `ansible/playbooks/gitea-with-backup.yml` to secure your instance:

```yaml
# In ansible/playbooks/gitea-with-backup.yml
...
vars:
  ...
  # Disable user registration
  gitea_disable_registration: "true"
```

### Backup and restore

In addition to the core functionality, I added a few scripts that allow you to create a fully functional backup of the entire setup as a manual step. Later on you can restore a previous state from the backup.

The backup does not only include the code repositories, but also the database and the configuration files.

Everything is inside the `./scripts/manage-gitea.sh` script.

```bash
Commands:
  deploy              Deploy Gitea with backup system
  backup              Create immediate backup
  restore [file]      Restore from backup (latest if no file specified)
  verify [file]       Verify backup integrity (latest if no file specified)
  status              Show Gitea status
  logs                Show Gitea logs
  list-backups        List available backups
  update              Update Gitea to latest version
  reset-password      Reset the admin user's password
  help                Show this help message
```

Let's start adding some code repos there!

Check out: <https://github.com/akora/homelab>
