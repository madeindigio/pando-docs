---
title: Securing Your Project API Keys with Native AGE Encryption
date: 2026-05-20
tags: ["Security", "Encryption", "Privacy"]
---

Security is a crucial element of a professional software development workflow. We are thrilled to announce that Pando now features **Native AGE Encryption** to protect your local configuration files and external tool credentials from accidental exposure.

## The Threat: Plaintext Credentials in Git

In modern software projects, developers often store settings in a configuration file within their repository (such as `.pando.toml`). This file must sometimes contain sensitive information—like API keys for cloud services or access tokens for custom databases.

If you accidentally push this file to GitHub, your project credentials could be instantly compromised, leading to security breaches and unexpected API bills.

## The Shield: Simple, In-Memory Security

With Pando's new **AGE Security** integration, you can easily encrypt any sensitive string directly in your project configuration files. 

- **Git-Safe Configurations**: Paste secure, encrypted values directly into your `.pando.toml`. You can safely commit and share your settings with other team members or push them to public repositories.
- **Local Profile Keys**: The values are encrypted using your private, local developer key. Only your authorized development machine can read the actual values.
- **In-Memory Security**: When Pando starts up, it automatically and securely decrypts these values in memory. They are never written back to disk in plaintext, shielding them from unauthorized access.

## How to Secure Your API Keys in Two Steps

### 1. Encrypt Your Credentials

Use Pando's simple command-line tool to encrypt your secret:

```bash
pando encrypt --val "my-super-secret-api-key"
```

This returns a secure, encrypted token beginning with `age1...`.

### 2. Update Your Configuration File

Take that encrypted token and paste it directly into your `.pando.toml`:

```toml
[providers.openai]
apiKey = "age1y7g9w...encrypted-string-here..."
```

Pando will automatically recognize the encrypted format, decrypting it safely in memory only when a connection to OpenAI is requested. Your credentials are now fully secure, letting you focus on writing code with complete peace of mind!
