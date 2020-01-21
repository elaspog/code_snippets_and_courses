
# Managing Secrets with Hashicorp Vault

https://www.udemy.com/course/managing-secrets-with-hashicorp-vault/

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

## S04 Deeper Dive on Vault Fundamentals

### S04/E12 Vault Fundamentals

Architecture:

* HTTP API
* Barrier
  * Core
    * Path Routing
      * System Backend
      * Secret Backend
      * AuthN Backend
  * Token Store
  * Rollback Manager
  * Policy Store
  * Expiration Manager
  * Audit Broker
  * Audit Backend
* Storage Backend

Accessing Resources within Vault:

* Resources include:
  * Authentication backends
  * Storage backends
  * Secrets
  * Policies
  * Configurations
* Resources are accessed using virtual file system paths
  * aws/deploy
  * auth/github/config
  * kv/foo

Interfacing with Vault

* Full REST HTTP API
```
curl -X POST -H "X-Vault-Token:<VAULT_TOKEN>" \
    -d '{"somekey":"somesectret"}' \
    http:/127.0.0.1:8200/v1/secret/dev
```
* Vault CLI
  * Simplified interface for humans
  * Wraps HTTP API

### S04/E13 Lab Part 1 - Using Path Help

```
vault path-help sys
vault read sys/auth
```

### S04/E14 Using the Vault CLI

**input.json**

Use key-value input from CLI:
```
vault write secret/foo value=bar
```

Start a new console:
```
export VAULT_ADDR=https://127.0.0.1:8200

# export VAULT_TOKEN=<ROOT_TOKEN>
export VAULT_TOKEN=1d40656b-6f99-d160-32cc-0b38dbbcb8fa

vault status

echo -n "bar" | vault write secret/foo value=-
```

* the `-` tells the Vault to read from STDIN

Use value from STD input:
```
vault write secret/foo value=-
# CTRL + D
```

Use key-value pair, JSON input from CLI:
```
echo -n '{"value":"bar"}' | vault write secret/foo -
```

Read key-value JSON input from file:
```
vault write secret/foo @input.json
```

* `@` symbol is for files

### S04/E15 Using the HTTP API

```
curl
curl --help
```

```
# curl -X POST -H "X-Vault-Token:<VAULT_TOKEN>" -d '{"somekey":"somesecret"}' http://127.0.0.1:8200/v1/secret/dev
curl -X POST -H "X-Vault-Token:1d40656b-6f99-d160-32cc-0b38dbbcb8fa" -d '{"somekey":"somesecret"}' http://127.0.0.1:8200/v1/secret/dev
# no output
vault read secret/dev

```

```
# curl -X GET -H "X-Vault-Token:<VAULT_TOKEN>" http://127.0.0.1:8200/v1/secret/dev
curl -X GET -H "X-Vault-Token:1d40656b-6f99-d160-32cc-0b38dbbcb8fa" http://127.0.0.1:8200/v1/secret/dev
# output
vault read secret/dev
```

```
# curl -X DELETE -H "X-Vault-Token:<VAULT_TOKEN>" http://127.0.0.1:8200/v1/secret/dev
curl -X DELETE -H "X-Vault-Token:1d40656b-6f99-d160-32cc-0b38dbbcb8fa" http://127.0.0.1:8200/v1/secret/dev
# no output
vault read secret/dev
```

## S05 Authentication in Vault

### S05/E16 Authentication

#### Authentication Backend
* Authenticates users or machines against an authentication provider
* Generates authentication tokens
* Users use tokens after initial call (Similar to a session cookie)
* Backends are mounted in Vault
  * $ vault mount <backend>
  * Can be found under `auth/<backend>`
  * Use vault path-help

```
vault mount <BACKEND>
```

#### Authentication Process

Vault verifies an identity against an authentication backend

0. Configure Vault to use Github
1. User submits Github credentials
2. Verifies credentials
3. Returns Vault token

Auth tokens have a TTL requiring user to re-authenticate

Example
* initial authentication:
```
$vault auth --method=github token=<github personal access token>
```
* subsequent authentication:
```
vault auth <token>
```

#### Supported Authentication Backends

* AppRole
  * for non-human clients
* AWS
  * IAM
* Google Cloud
* Kubernetes
* Github
* LDAP
* MFA - Multi Factor Authentication
  * supports time-based tokens
* TLS Certificates
* Tokens
* Username/password
  * where is no corporate infrastructure
* Others

### S05/E17 Lab - User/Password Authentication

pluggable authentication architecture

```
vault status

# enable authentication backend
vault auth-enable userpass

# lists all enabled authentication methods
vault auth -methods

vault write auth/userpass/users/bgood password=badpassword

vault auth -method=userpass username=bgood

vault auth
# <token>
```

```
vault path-help auth/userpass
vault path-help auth/userpass/users
```

```
vault auth
# <token>

vault revoke login/bgood
vault delete auth/userpass/users/bgood

vault path-help auth/userpass/users
vault read auth/userpass/users
# unsupported on this endpoint

vault help list
vault list auth/userpass/users
```

### S05/E18 Lab - Github Authentication

1. create an account on Github
2. create a Team Organization within the personal account
  * Settings/Organizations/New Organization
3. Create a Personal Access Token
  * Settings/Developer settings/Personal access tokens/Generate new token
4. Enable Github authentication Backend
```
vault auth-enable github
```
5. Configure Vault where to look up for users
  * supports multiple organizations
```
# vault write auth/github/config organization=<name_of_the_created_organization>
vault write auth/github/config organization=vaultcourse
```
6. Assign default access policy
  * will be applied to every user that is authenticated against github
  * policy determines what users can do once they are authenticated
```
vault write auth/github/map/teams/default value=default
```
7. Authenticate
```
vault auth -method-github token=<GITHUB_PERSONAL_ACCESS_TOKEN>
```

### S05/E19 Lab - LDAP Authentication Part 1 - LDAP Server

```
docker run -p 389:389 --env LDAP_TLS=false --name ldap-service --hostname ldap-service --detach osixia/openldap:1.1.8
docker ps
```

### S05/E20 Lab - LDAP Authentication Part 2 - Install phpLDAPAdmin

**bootstrap.ldif**

```
docker run -p 6443:443 --name phpldapadmin-service --hostname phpldapadmin-server --link ldap-service:ldap-host --env PHPLDAPADMIN_LDAP_HOSTS=ldap-host --detach osixia/phpldapadmin:0.7.0
docker ps
```

https://localhost:6443/

user: cn=admin,dc=example,dc=org
pass: admin

Import **bootstrap.ldif**

### S05/E21 Lab - LDAP Authentication Part 3 - Enable LDAP in Vault

**vault_openldap_auth.txt**

```
vault auth-enable ldap
vault path-help auth/ldap/config

vault write auth/ldap/config url="ldap://localhost" binddn="cn=admin,dc=example,dc=org" userattr="uid" bindpass='admin' userdn="ou=Users,dc=example,dc=org" groupdn="ou=Groups,dc=example,dc=org" insecure_tls=true
```

* the url might be different

### S05/E22 Lab - LDAP Authentication Part 4 - authorization through Policy

**vault_basic_developer_policy.hcl**  
**vault_basic_admin_policy.hcl**

```
# vault policy-write dev_policy <PATH_TO_POLICY>

vault policy-write dev_policy managing-secrets/vault_basic_developer_policy.hcl
vault policy-write admin_policy managing-secrets/vault_basic_admin_policy.hcl

vault policies

vault write auth/ldap/groups/dev policies=dev_policy
vault write auth/ldap/groups/admin policies=admin_policy
```

### S05/E23 Lab - LDAP Authentication Part 5 - Logging in

User policy:
```
vault auth -method=ldap username=juser

vault write secret/dev/foo value=bar
# OK

vault read secret/dev/foo
# OK

vault write secret/admin/foo value=bar
# Permission Denied

vault write secret/asdfasdf/foo value=bar
# Permission Denied
```

Admin policy:
```
vault auth -method=ldap username=jlynch

vault read secret/dev/foo
# OK

vault write secret/dev/foo value=bar
# Permission Denied

vault write secret/admin/foo value=bar
# OK
```
