
# Managing Secrets with Hashicorp Vault

https://www.udemy.com/course/managing-secrets-with-hashicorp-vault/4

## S01 Introduction to Managing Secrets

### S01/E01 Introduction and Lab Guide

## S02 Quick Intro to Hashicorp Vault

### S02/E02 Vault Overview

Vault:

* Manages (generates, stores, revokes) static and dynamic secrets
* Provides data encryption service
* Auditing
* Pluggable storage and secret backend architecture
* Declarative authorization framework
* Full HTTP API

Secrets:

* Passwords
* Tokens (Oauth)
* API Keys
* Time-based Tokens
* PKI Certificates
* Symmetric Keys
* Everything else

### S02/E03 Use Cases for Vault

* General secrets management - Creation, Storage, Rolling, Revocation
* On-demand dynamic secrets
* Machine authentication
* API keys for scripts
* Data-in-transit encryption
* PKI

### S02/E04 Why is Secrets Management Important?

Vault:

* Enables best practice patterns for cloud native applications
* Facilitates key rotation
* Provides robust AuthN and AuthZ operational control
* Audit capability

## S03 Managing Your First Secret

### S03/E05 Managing your first secret

Development Mode
* Easiest and fastest was to get started - no configuration required!
* Can be used for dev, experimentation, demo purposes
* Never use for production
* Features
  * Initialized and Unsealed
  * In-memory storage
  * Automatic authentication with CLI
  * Single unseal key

### S03/E06 Lab Part 1 - Installing Vault

https://vaultproject.io/

download: vault 0.9.0

https://github.com/learnwlonline/managing-secrets

```
git clone https://github.com/learnwlonline/managing-secrets
cd ./managing-secrets
```

### S03/E07 Lab Part 2 - Development Mode

```
vault server -dev
```

* **VAULT_ADDR** environment variable will be used by the vault CLI to connect to the vault server

* Unseal Key
  * is used to unseal the vault
  * in PROD: multiple keys
  * in DEV: only one
* Root Token
  * is essentially the root password for accessing Vault
  * the Vault CLI defaults to using the Root Token when authenticating against a development server

### S03/E08 Lab Part 3 - Configuring your Environment

```
set VAULT_ADDR=http://127.0.0.1:8200
# OR
export VAULT_ADDR=http://127.0.0.1:8200

vault status
```

### S03/E09 Lab Part 4 - Using the Command Line Interface

```
vault
vault path-help
vault path-help secret
```

### S03/E10 Lab Part 5 - Creating your First Secret

```
vault write secret/cookie recipe=sugar
vault read secret/cookie
vault read -format json secret/cookie
vault write secret/cookie recipe="sugar,flour"
vault read secret/cookie
```

### S03/E11 Lab Part 6 - Deleting a Secret

```
vault delete secret/cookie
vault read secret/cookie
```
