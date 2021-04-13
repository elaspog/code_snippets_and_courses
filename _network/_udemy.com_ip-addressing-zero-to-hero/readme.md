
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

## S03 Subnetting

### S03/E08 Why do we need Subnetting

- when a switch receives a broadcast packet
  - it forwards the packet to all of it's ports
  - except to the port where it received the packet
- the router generally do not forward broadcast packets
- broadcast vs security
  - by default the computers drop the package if they are not the destination
  - with sniffing programs (e.g.: **wireshark**) the computer reads the content of the packages even if the computer wasn't meant to be the destination of that packet


- the issue from broadcast/security perspective: too big network, e.g.:
- solution 1: using logical subnets (which differ from physical network layout)
  - setup: on the router 1 private interfaces is used which connects to one switch
    - one switch connects to the router and to two other switches
    - there are tree networks, one for each switch
  - **VLAN - Virtual Local Area Network**
    - virtually separates different logical segments of the network
      - VLAN 1: `10.0.1.0/24`
      - VLAN 2: `10.0.2.0/24`
      - VLAN 3: `10.0.3.0/24`
- solution 2: physical separation, smaller segments
  - setup: on the router 3 private interfaces are used, each connect to one switch
    - can't have two or more interfaces on the router that belong in the same network
    - each private interface of the router should belong to a different subnet
      - therefore different IP addresses are needed
      - an extra IP address for the interface should be used e.g. (convention):
        - `10.0.1.1` or `10.0.1.10` or `10.0.1.254`
        - `10.0.2.1` or `10.0.2.10` or `10.0.2.254`
        - `10.0.3.1` or `10.0.3.10` or `10.0.3.254`
    - subnets (on separate interfaces of the router)
      - `10.0.1.0/24`
      - `10.0.2.0/24`
      - `10.0.3.0/24`
    - the broadcast packets are received only by one switch and one port of the router, which drops the package

### S03/E09 Fixed-Length Subnet Mask (FLSM)

- FLSM - **Fixed-Length Subnet Mask**
  - every subnet in the network has the same mask. e.g.
    - 15 computers should be on the subnets
    - 1 more address for router interface
    - 2 additional address for network and broadcast addresses
    - in total at least 18 IP addresses are needed
    - with the host portion 2^5=32 combination the network portion is 32-5 = 27
    - the mask is `10.0.0.0/27`


- if there e.g.:
  - are 4 subnets that require
    - 11, 5, 5, 5 IP addresses
    - the subnet mask is `/28` (for all subnets)
      - determined by the largest network
      - host portion: 4 bits = 16 combination which covers the largest network


| Subnet | Number of hosts | Mask | Network ID   | Range of 'useful' addresses |
|--------|-----------------|------|--------------|-----------------------------|
| #1     | 11              | /28  | 192.168.1.0  | 192.168.1.1-192.168.1.14    |
| #2     | 5               | /28  | 192.168.1.16 | 192.168.1.17-192.168.1.30   |
| #3     | 5               | /28  | 192.168.1.32 | 192.168.1.33-192.168.1.46   |
| #4     | 5               | /28  | 192.168.1.48 | 192.168.1.49-192.168.1.62   |

### S03/E10 Variable-Length Subnet Mask (VLSM)

- VLSM - **Variable-Length Subnet Mask**
  - goal is to save as many IP addresses as possible
  - creates hierarchical IP address space


- if there e.g.:
  - are 4 subnets that require
    - 11, 5, 5, 5 IP addresses


| Subnet | Number of hosts | Mask | Network ID   | Range of 'useful' addresses |
|--------|-----------------|------|--------------|-----------------------------|
| #1     | 11              | /28  | 192.168.1.0  | 192.168.1.1-192.168.1.14    |
| #2     | 5               | /29  | 192.168.1.16 | 192.168.1.17-192.168.1.22   |
| #3     | 5               | /29  | 192.168.1.24 | 192.168.1.25-192.168.1.30   |
| #4     | 5               | /29  | 192.168.1.32 | 192.168.1.33-192.168.1.38   |

### S03/E11 Summarization

- IP Summarization
  - reduces the number of entries in routing tables
- point to point network
  - requires only 2 usable IP Addresses
- assumptions for example
  - for the example forget about that the IP addresses are not routable on the internet
  - extra router in between the router and the internet
  - 4 existing subnets:
    - `192.168.1.0/28`
    - `192.168.1.16/29`
    - `192.168.1.24/29`
    - `192.168.1.32/29`
  - extra network between the assumed new router and the existing one:
    - `192.168.1.40/30`
      - the last IP address in our network is `192.168.1.43`
    - point to point network
  - public network
    - `7.7.7.7/30`
    - between the new router and internet
    - point to point network
- in the example
  - if summary IP address is `192.168.1.0/24`
    - there is problem if `192.168.1.128/30` network somewhere else on the internet
      - because assumed new router thinks that all of these addresses are in our network
      - routing would be incorrect
  - if summary IP address is `192.168.1.0/26` (2 extra bits from the 4th octet)
    - all of our IP addresses range from `192.168.1.1` - `192.168.1.63`
    - no problem if `192.168.1.128/30` network somewhere else on the internet
    - no problem if `192.168.1.64/26` network somewhere else on the internet
      - range: `192.168.1.65` - `192.168.1.127`
