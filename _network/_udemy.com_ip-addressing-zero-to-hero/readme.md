
# IP Addressing and Subnetting - Zero to Hero

https://www.udemy.com/course/ip-addressing-zero-to-hero

## S01 Introduction

### S01/E01 Introduction

## S02 IP Addressing

### S02/E02 Different Types of Addresses

- TCP/IP model:
  - Application
  - Transport -> **Port numbers**
  - Network -> **IP Address**
  - Physical -> **MAC Address**


- Public network
- Private network
  - Layer 2 Switch
    - uses MAC addresses (where a certain device is located on the network)
    - does not handle IP addresses
  - IP Address (**logical** identifier)
  - MAC Address (**physical** identifier)
    - unique - can't have two repeated MAC addresses on the same network
  - Port numbers
    - helps to distinguish between different services running on a certain host


- IPv4 - 4.3 billion addresses
- IPv6 - 3.4*10^38 addresses

### S02/E03 Binary Numbers

### S02/E04 IPv4 Addresses - Format

- an IPv4 address has 32 bits or 4 bytes (4 octets)
  - 2^32 combinations ~ 4.3 billion unique addresses


- portions
  - the portion order is fixed and can't be mixed
    - **network** portion (first portion)
    - **host** portion (last portion)
    - **subnet** portion
  - portion border can be between octets
    - /8, /16, /24
  - **CIDR** - when portion border is not necessarily between octets
    - /<any number 1-32>


- a network appliance can be a **router** or a **switch**
- can have multiple physical ports / interfaces
- each interface of a router has different IP address
- an interface is the gateway for the corresponding subnetwork
- DHCP - can reserve (exclude) IP addresses (the host portion) from the dynamic range
- the network part of the address is the same for all devices on the subnet and the gateway


- **Network ID/Address** - the first IP address in a subnet
  - host portion is filled with zeros
- **Broadcast Address** - the last IP address in a subnet
  - host portion is filled with ones
- usable network addresses - the rest of the address
  - can be given to devices (e.g. gateway, appliances, computers etc.)


- **Point to Point network**
  - simple network between two routers


- **Routing Table**
  - packages with IP addresses:
    - are routed to the corresponding interface by their network portion of IP address
    - not in routing table are dropped
- **Summary IP Address**
- Broadcast Addresses
  - packages sent to this address will be received by all the interfaces except the sender
  - switches forward broadcast packets
  - routers do not forward broadcast packets

### S02/E05 IPv4 Addresses - Classes

- IPv4 Classes:
  - **Class A** for large networks
    - N.H.H.H - 2^8=256 networks, 2^24 hosts
  - **Class B** for medium networks
    - N.N.H.H - 2^16 networks, 2^16 hosts
  - **Class C** for small networks
    - N.N.N.H - 2^24 networks, 2^8=256 hosts
  - **Class D** - reserved for multicasting
  - **Class E** - experimental, used for research and documentation
- class ranges:
  - the class is determined only by the first octet
    - **Class A**: `1.0.0.0` - `126.255.255.255`
    - **Class B**: `128.0.0.0` - `191.255.255.255`
    - **Class C**: `192.0.0.0` - `223.255.255.255`
    - **Class E**: `224.0.0.0` - `239.255.255.255`
    - **Class F**: `240.0.0.0` - `255.255.255.255`
  - **loopback**: `127.0.0.0` - `127.255.255.255`

### S02/E06 IPv4 Addresses - CIDR

- CIDR - Classless Inter-Domain Routing
- while configuring the mask should be given in IP address format:
  - /21
  - 11111111.11111111.11111000.00000000
  - `255.255.248.0`
- cisco router configuration
  - e.g.: `ip address 155.8.101.33 255.255.248.0`

### S02/E07 Public, Private, and Reserved IP Addresses

- **default route**: `0.0.0.0`
- **default broadcast**: `255.255.255.255`
- **loopback**: `127.0.0.0/8`
  - `127.0.0.0` - `127.255.255.255`
- **APIPA**: `169.254.0.0/16`
  - `169.254.0.0` - `169.254.255.255`
  - Automatic Private IP Addressing
  - used when the computer is configured to use DHCP but can't access DHCP server
- **3 private network ranges**: https://tools.ietf.org/html/rfc1928
  - ranges
    - `10.0.0.0/8`
    - `172.16.0.0/12`
    - `192.168.0.0/16`
  - not routable to internet
    - can't be in source or destination IP address field
    - functionality achieved by NAT


- LAN interface - private facing interface (on router)
- WAN interface - public facing interface (on router)
- NAT - **Network Address Translation**
  - a switch does not change the (source) private IP address
  - a router changes the (source) private IP address on the packages to public IP address while sending out the package (and notes the mapping)
  - the router translates back the (destination) public IP address (by the noted mapping) when receives a package from the internet
