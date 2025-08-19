---
title: "Getting Started with Fabric: Introduction and Installation"
description: "Learn how to install and set up Fabric, the open-source framework for augmenting humans using AI patterns"
tags: ["fabric", "ai", "setup", "tutorial", "automation"]
publishDate: "2025-08-19T21:51:25+02:00"
seriesId: "fabric-setup"
orderInSeries: 1
---

# Getting Started with Fabric

[Fabric](https://github.com/danielmiessler/fabric) is an open-source framework designed to augment humans using AI. It provides a modular framework of chained prompts (called "patterns") that help you break down problems into components and apply AI to them.

## What is Fabric?

Fabric allows you to:
- Use AI patterns for common tasks like summarizing, extracting insights, and creating content
- Chain multiple AI operations together
- Work with various AI providers (OpenAI, Anthropic, etc.)
- Create custom patterns for your specific needs

## Prerequisites

Before installing Fabric, ensure you have:
- Python 3.10 or higher
- pip (Python package manager)
- Git
- An API key from your preferred AI provider (OpenAI, Anthropic, etc.)

## Installation

### Method 1: Install via pip (Recommended)

```bash
pip install fabric-ai
```

### Method 2: Install from source

```bash
git clone https://github.com/danielmiessler/fabric.git
cd fabric
pip install -e .
```

## Initial Setup

After installation, run the setup command:

```bash
fabric --setup
```

This will:
1. Create the necessary configuration directories
2. Download the latest patterns from the repository
3. Prompt you to configure your AI provider settings

## Configuration

### Setting up API Keys

You'll need to configure at least one AI provider. The most common options are:

**OpenAI:**
```bash
fabric --setup --openai
```

**Anthropic (Claude):**
```bash
fabric --setup --anthropic
```

### Verifying Installation

Test your installation with:

```bash
fabric --list-patterns
```

This should display all available patterns.

## Next Steps

In the next part of this series, we'll explore:
- Basic usage and common patterns
- Creating custom patterns
- Advanced configuration options
- Integration with other tools

Your Fabric installation is now ready to augment your workflow with AI!
