---
title: "Getting Started with Fabric: Installation and Setup"
description: "Complete guide to installing and configuring Fabric - the open-source framework for augmenting humans using AI"
publishDate: "2025-08-19T20:00:00.000Z"
tags: ["fabric", "ai", "setup", "installation", "documentation", "go", "golang"]
seriesId: "fabric-setup"
orderInSeries: 1
---

## Getting Started with Fabric: Installation and Setup

Fabric is an open-source framework for augmenting humans using AI. This guide covers the complete setup process from installing Go to configuring Fabric with the necessary API keys.

### Install Go

First, install Go using Homebrew:

```bash
brew install go
```

### Configure Go Environment

Add the following to your `~/.zshrc`:

```bash
# Golang environment variables
export GOROOT=$(brew --prefix go)/libexec
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$HOME/.local/bin:$PATH
```

Then reload your shell configuration:

```bash
source ~/.zshrc
```

### Install Fabric

For macOS (arm64), download and install Fabric:

```bash
curl -L https://github.com/danielmiessler/fabric/releases/latest/download/fabric-darwin-arm64 > fabric && chmod +x fabric && ./fabric --version
```

### Setup Fabric

Run the setup command to configure Fabric:

```bash
./fabric --setup
```

During setup, ensure all these components are configured:

- **OpenAI** (configured)
- **Default AI Vendor and Model** [required] (configured)
- **Patterns** - Downloads patterns [required] (configured)
- **YouTube** - to grab video transcripts and comments (configured)

### Required API Keys

You'll need two API keys for full functionality:

#### OpenAI API Key

1. Go to OpenAI API Keys: this is usually under Platform > Settings
2. Create a new key named: `<your-naming-convention>-Fabric`

#### YouTube API Key (Google Cloud)

1. Create a project called `YouTube-API-Fabric`
2. Go to `Google Cloud Console`
3. Navigate to `API Credentials`
4. Create a new API key for YouTube Data API

### Verification

After setup, verify everything is working:

```bash
./fabric --version
./fabric --list-patterns
```

### Resources

- [Official Fabric Repository](https://github.com/danielmiessler/fabric)

This setup provides you with a fully functional Fabric installation ready for AI-powered content processing and analysis.
