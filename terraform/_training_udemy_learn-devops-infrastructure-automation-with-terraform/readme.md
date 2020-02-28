# Learn DevOps: Infrastructure Automation With Terraform

https://www.udemy.com/course/learn-devops-infrastructure-automation-with-terraform/

## S01 Course Introduction

### S01/E01 Course Introduction

### S01/E02 Discussions and Support

### S01/E03 Procedure Document

#### Github repository

https://github.com/wardviaene/terraform-course

#### Questions & Support

https://www.facebook.com/groups/840062592768074

#### AWS Setup

https://aws.amazon.com/cli/

```
apt-get install python-pip

sudo pip install --upgrade awscli

aws configure
```

http://www.cloudping.info/

```
aws iam get-user
```

#### Useful Commands

```
$ terraform plan                       # plan
$ terraform apply                      # shortcut for plan & apply - avoid this in production
$ terraform plan -out out.terraform    # terraform plan and write the plan to out file
$ terraform apply out.terraform        # apply terraform plan using out file
$ terraform show                       # show current state
$ cat terraform.tfstate                # show state in JSON format
```

#### Using putty instead of the ssh command

http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html

#### Reference Documentation

https://www.terraform.io/downloads.html  
https://www.terraform.io/docs/providers/aws/  
https://www.terraform.io/docs/providers/index.html  

## S02 Introduction to terraform

### S02/E04 Introduction

- Infrastructure as Code
- Automation of infrastructure
- Keeps an infrastructure in certain state (compliant)
- Auditable infrastructure
- Change history in version control
- Ansible, Chef, Puppet, Saltstack
  - provisioning of the machines
  - keeping machines in compliance, in a certain state
  - installation and configuration
  - automating machines
- Terraform
  - can automate provisioning of the infrastructure
  - uses the API of the cloud services
  - works well with automation softwares to install softwares after the infrastructure is provisioned

### S02/E05 Terraform installation

https://www.terraform.io  
v0.7.4

Linux/MacOS:
```
mkdir terraform
cd terraform

export PATH=/path/to/terraform/:$PATH
terraform
```
Windows:
```
set PATH=%PATH%;C:\terraform
terraform
```

### S02/E06 Terraform Installation (on Windows)

https://www.terraform.io  
v.0.11.7

- extract to `C:\terraform`
- add `C:\terraform` to the Path variable

in cmd/power shell:
```
terraform
terraform --version
```
in linux shell (or sometimes in windows):
```
ssh-keygen
```
in windows:
- puttygen.exe
  - enter Key passphrase (optional)
  - Key / Generate new keypair
    - Save public key `mykey.pub`
    - Conversions / Export OpenSSH Key: `mykey`
    - Sace Private key (for putty): `mykey.ppk`
- putty.exe
  - Connections / SSH / Auth
    - Browse the `ppk` private key

### S02/E07 Terraform installation using Vagrant

https://www.virtualbox.com  
https://www.vagrantup.com  

```
git clone https://github.com/wardviaene/devops-box

cd devops-box
vagrant up

vagrant ssh-config
vagrant ssh
```

```
terraform
```

## S03 Terraform basics

### S03/E08 Understanding terraform HCL

### S03/E09 First steps in terraform - AWS Setup

### S03/E10 First steps in terraform - Spinning up an instance

### S03/E11 First steps in terraform - summary

### S03/E12 Terraform Variable Types

## S04 Terraform basics

### S04/E13 Variables

### S04/E14 Demo: variables

### S04/E15 Software Provisioning

### S04/E16 Demo: Software provisioning

### S04/E17 Demo: Windows Server Provisioning

### S04/E18 Outputting attributes

### S04/E19 Demo: Outputting Attributes

### S04/E20 Remote state

### S04/E21 Demo: Remote state

### S04/E22 Data Sources

### S04/E23 Demo: Data Sources

### S04/E24 Templates

### S04/E25 Other Providers

### S04/E26 Modules

### S04/E27 Demo: An external Module

### S04/E28 Terraform Commands Overview

### S04/E29 Demo: Terraform Commands

## S05 Terraform with AWS

### S05/E30 Introduction to VPCs

### S05/E31 Introduction to VPCs - Part II

### S05/E32 Introduction to terraform - Part III

### S05/E33 Demo: VPCs and NAT

### S05/E34 Launching EC2 instances in the VPC

### S05/E35 Demo: Launching instances in a VPC

### S05/E36 EBS Volumes

### S05/E37 Demo: EBS volumes

### S05/E38 Userdata

### S05/E39 Demo: Userdata

### S05/E40 Static IPs, EIPs, and Route53

### S05/E41 Demo: Route53

### S05/E42 RDS

### S05/E43 Demo: RDS

### S05/E44 IAM

### S05/E45 Demo: IAM users and groups

### S05/E46 IAM Roles

### S05/E47 Demo: IAM Roles

### S05/E48 Autoscaling

### S05/E49 Demo: Autoscaling

### S05/E50 Introduction to Elastic Load Balancers (ELB)

### S05/E51 ELBs in terraform

### S05/E52 Demo: ELB with autoscaling

### S05/E53 Application Load Balancer (ALB)

### S05/E54 Elastic Beanstalk

### S05/E55 Demo: Elastic Beanstalk

## S06 Advanced Terraform Usage

### S06/E56 Introduction to Interpolation

### S06/E57 Conditionals

### S06/E58 Demo: Interpolation and Conditionals

### S06/E59 Built-in Functions

### S06/E60 Demo: Built-in Functions

### S06/E61 For and For Each Loops

### S06/E62 Demo: For loops

### S06/E63 Demo: For each loops

### S06/E64 Terraform Project Structure

### S06/E65 Demo: Project Structure in Terraform

## S07 Packer

### S07/E66 Packer introduction

### S07/E67 Demo: Packer with terraform

### S07/E68 Terraform with Packer and Jenkins

### S07/E69 Demo: Jenkins with Terraform and Packer

## S08 Docker on AWS using ECS and ECR

### S08/E70 Introduction to Docker

### S08/E71 Docker on AWS

### S08/E72 Building Docker images

### S08/E73 Demo: Build NodeJS app and push to ECR

### S08/E74 ECS - Part I

### S08/E75 ECS - Part II

### S08/E76 Demo: Running a NodeJS app on ECS

### S08/E77 Demo: Terraform with Jenkins, ECR and ECS

## S09 Module Development

### S09/E78 Introduction to Module Development

### S09/E79 ECS + ALB Module Overview

### S09/E80 Demo: ECS + ALB Module (part I)

### S09/E81 Demo: ECS + ALB Module (Part II)

### S09/E82 Demo: ECS + ALB Module (Part III)

## S10 AWS EKS (hosted Kubernetes)

### S10/E83 Introduction to AWS EKS

### S10/E84 Demo: AWS EKS

## S11 Course Completion

### S11/E85 Congratulations

### S11/E86 Bonus Lecture: My Other Courses
