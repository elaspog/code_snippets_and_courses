
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

## S04 Practice Examples

### S04/E12 Subnetting a Class A network - FLSM (Example 1)

- divide a Class A network `50.0.0.0` into two equal networks
  - binary format `00110010.00000000.00000000.00000000`
    - the 9th bit can be used for dividing, mask: `/9`

| Network # | Description          | Binary                              | Decimal        |
|-----------|----------------------|-------------------------------------|----------------|
| 1         | Network address      | 00110010.00000000.00000000.00000000 | 50.0.0.0       |
| 1         | First usable address | 00110010.00000000.00000000.00000001 | 50.0.0.1       |
| 1         | Last usable address  | 00110010.01111111.11111111.11111110 | 50.127.255.254 |
| 1         | Broadcast address    | 00110010.01111111.11111111.11111111 | 50.127.255.255 |
| 2         | Network address      | 00110010.10000000.00000000.00000000 | 50.128.0.0     |
| 2         | First usable address | 00110010.10000000.00000000.00000001 | 50.128.0.1     |
| 2         | Last usable address  | 00110010.11111111.11111111.11111110 | 50.255.255.254 |
| 2         | Broadcast address    | 00110010.11111111.11111111.11111111 | 50.255.255.255 |

### S04/E13 Subnetting a Class A network - FLSM (Example 2)

- how many Class C networks can be created in Class A network `21.0.0.0`?
  - binary address: `00010101.00000000.00000000.00000000`
  - Class A: only first octet represents the network portion: `21.X.X.X`
  - Class C: first three octets represents the network portion: `21.0.0.X`
  - 3 portions in the address:
    - network portion
    - subnet portion
    - host portion
  - first octet can't change because
    - it's in the above requirement
    - in a purchased Class A address the network portion can't change anyway
  - last octet can't change because
    - in a C network this is the host portion
  - 2 octets can change = 16 bits are for combining the network portion:
    - from `21.0.0.0` to `21.255.255.0`
    - from `00010101.00000000.00000000.00000000` to `00010101.11111111.11111111.00000000`
  - 2^16 = 65536 combinations for subnets

### S04/E14 Subnetting a Class B network - FLSM (Example 1)

- how many Class C networks can be created in Class B network `155.3.0.0`?
  - Class A: first two octets represents the network portion: `155.3.X.X`
  - Class C: first three octets represents the network portion: `155.3.0.X`
  - difference in this example is one octet what can change = 8 bits are for combining the network portion
    - from `155.3.0.0` to `155.3.255.0`
    - from `10011011.00000011.00000000.00000000` to `10011011.00000011.11111111.00000000`

### S04/E15 Subnetting a Class B network - FLSM (Example 2)

- in Class B network address of `189.2.0.0` create 9 subnets with 64 addresses, 5 subnets with 100 addresses, 13 subnets with 70 addresses
  - for FLSM
    1. find a common subnet mask that satisfies all requested subnets
    2. count the number of subnets needed
  - largest subnet: 100 addresses -> (host portion) fits 7 bits (2^7=128)
  - class B network fixes the first 16 bits (network portion)
  - 9 bits remained for the subnet portion
  - in total 9 + 5 + 13 = 27 subnets are needed
  - the required subnets fit into the available subnets 27 < 512 = 2^9
  - `10111101.00000010.|00000000.0|0000000`
  - with mask `189.2.0.0/25` we can create these subnets
- name the first, the 11th and the last subnet
  - 1st -> `189.2.0.0`
    - `10111101.00000010.|00000000.0|0000000`
  - 11th -> `189.2.5.0`
    - `10111101.00000010.|00000101.0|0000000`
    - the value 10 (for 11th value) is split between two octets
    - in the 3rd octet the bits give 5
  - last (27th) -> `189.2.13.0`
    - `10111101.00000010.|00001101.0|0000000`

### S04/E16 Subnetting a Class C network - FLSM

- how many subnets can fit into a Class C network if each subnet has at least 10 addresses?
  - in Class C address first 3 octets (24 bits) are used for network portion
    - mask: `/24`
  - 4 bits are needed for the host portion 2^4 = 16 > 10
  - `10.10.10.0/24`
    - `00001010.00001010.00001010.|0000|0000`
  - the remaining 4 bits can be used for subnetting portion
    - 16 different subnets can be created
- is `10.10.10.72` in the same subnet as `10.10.10.80`?
  - answer: no
- could be the address `10.10.10.96` allocated to a router interface?
  - router interface is just like any other endpoint device on the network
  - can be done if not a Network ID or a Broadcast IP address is allocated on to the `10.10.10.96` address
  - answer: no, because a Network ID is allocated onto that address
- what's the first address which can be allocated to a router (or any host) in that range (in the subnet from previous question)?
  - answer: `10.10.10.97`

| Subnet # | Mask | Network ID  | Broadcast   | Network ID (binary)                 | Broadcast (binary)                  |
|----------|------|-------------|-------------|-------------------------------------|-------------------------------------|
| 1        | /28  | 10.10.10.0  | 10.10.10.15 | 00001010.00001010.00001010.00000000 | 00001010.00001010.00001010.00001111 |
| 2        | /28  | 10.10.10.16 | 10.10.10.31 | 00001010.00001010.00001010.00010000 | 00001010.00001010.00001010.00011111 |
| 3        | /28  | 10.10.10.32 | 10.10.10.47 | 00001010.00001010.00001010.00100000 | 00001010.00001010.00001010.00101111 |
| 4        | /28  | 10.10.10.48 | 10.10.10.63 | 00001010.00001010.00001010.00110000 | 00001010.00001010.00001010.00111111 |
| 5        | /28  | 10.10.10.64 | 10.10.10.79 | 00001010.00001010.00001010.01000000 | 00001010.00001010.00001010.01001111 |
| 6        | /28  | 10.10.10.80 | 10.10.10.95 | 00001010.00001010.00001010.01010000 | 00001010.00001010.00001010.01011111 |

### S04/E17 Subnetting with VLSM (Example 1)

- in the address range `10.0.0.0/8` the following subnets should be created:
  - 2 subnets with 500 host each
  - 1 subnet with 220 host each
  - 4 subnets with 50 host each
  - 3 subnets with 10 host each
  - 2 point-to-point subnets
- each of the above networks require a Network ID and a Broadcast IP
- the subnet for
  - 500+2 address requires 9 bits, the mask is 23
  - 220+2 address requires 8 bits, the mask is 24
  - 50+2 address requires 6 bits, the mask is 26
  - 10+2 address requires 4 bits, the mask is 28
  - 2+2 address requires 2 bits, the mask is 30
- while router configuration the CIDR format can't be used
  - `/28` = `255.255.255.240` = `11111111.11111111.11111111.11110000`

  | # of IPs | Network ID | Mask | Broadcast IP | Range of usable IP addresses | Network ID (binary)                     | Broadcast IP (binary)                   |
  |----------|------------|------|--------------|-----------------------------|-----------------------------------------|-----------------------------------------|
  | 500+2    | 10.0.0.0   | /23  | 10.0.1.255   | 10.0.0.1-10.0.1.254         | 00001010.\|00000000.0000000\|0.00000000 | 00001010.\|00000000.0000000\|1.11111111 |
  | 500+2    | 10.0.2.0   | /23  | 10.0.3.255   | 10.0.2.1-10.0.3.254         | 00001010.\|00000000.0000001\|0.00000000 | 00001010.\|00000000.0000001\|1.11111111 |
  | 220+2    | 10.0.4.0   | /24  | 10.0.4.255   | 10.0.4.1-10.0.4.254         | 00001010.\|00000000.00000100.\|00000000 | 00001010.\|00000000.00000101.\|11111111 |
  | 50+2     | 10.0.5.0   | /26  | 10.0.5.63    | 10.0.5.1-10.0.5.62          | 00001010.\|00000000.00000101.00\|000000 | 00001010.\|00000000.00000101.00\|111111 |
  | 50+2     | 10.0.5.64  | /26  | 10.0.5.127   | 10.0.5.65-10.0.5.126        | 00001010.\|00000000.00000101.01\|000000 | 00001010.\|00000000.00000101.01\|111111 |
  | 50+2     | 10.0.5.128 | /26  | 10.0.5.191   | 10.0.5.129-10.0.5.190       | 00001010.\|00000000.00000101.10\|000000 | 00001010.\|00000000.00000101.10\|111111 |
  | 50+2     | 10.0.5.192 | /26  | 10.0.5.255   | 10.0.5.193-10.0.5.254       | 00001010.\|00000000.00000101.11\|000000 | 00001010.\|00000000.00000101.11\|111111 |
  | 10+2     | 10.0.6.0   | /28  | 10.0.6.15    | 10.0.6.1-10.0.6.14          | 00001010.\|00000000.00000110.0000\|0000 | 00001010.\|00000000.00000110.0000\|1111 |
  | 10+2     | 10.0.6.16  | /28  | 10.0.6.31    | 10.0.6.17-10.0.6.30         | 00001010.\|00000000.00000110.0001\|0000 | 00001010.\|00000000.00000110.0001\|1111 |
  | 10+2     | 10.0.6.32  | /28  | 10.0.6.47    | 10.0.6.33-10.0.6.46         | 00001010.\|00000000.00000110.0010\|0000 | 00001010.\|00000000.00000110.0010\|1111 |
  | 2+2      | 10.0.6.48  | /30  | 10.0.6.51    | 10.0.6.49-10.0.5.50         | 00001010.\|00000000.00000110.001100\|00 | 00001010.\|00000000.00000110.001100\|11 |
  | 2+2      | 10.0.6.52  | /30  | 10.0.6.55    | 10.0.6.53-10.0.6.54         | 00001010.\|00000000.00000110.001101\|00 | 00001010.\|00000000.00000110.001101\|11 |

### S04/E18 Subnetting with VLSM (Example 2)

- in the address range `176.33.202.0/23` the following subnets should be created:
  - 2 point-to-point subnets
  - 1 subnet with 100 hosts each
  - 3 subnets with 4 hosts each
  - 2 subnets with 13 hosts each

  | # of IPs | Network ID     | Mask | Broadcast IP   | Range of usable IP addresses   | Network ID (binary)                     | Broadcast IP (binary)                   |
  |----------|----------------|------|----------------|-------------------------------|-----------------------------------------|-----------------------------------------|
  | 100+2    | 176.33.202.0   | /25  | 176.33.202.127 | 176.33.202.1-176.33.202.126   | 10110000.00100001.1100101\|0.0\|0000000 | 10110000.00100001.1100101\|0.0\|1111111 |
  | 13+2     | 176.33.202.128 | /28  | 176.33.202.143 | 176.33.202.129-176.33.202.142 | 10110000.00100001.1100101\|0.1000\|0000 | 10110000.00100001.1100101\|0.1000\|1111 |
  | 13+2     | 176.33.202.144 | /28  | 176.33.202.159 | 176.33.202.154-176.33.202.158 | 10110000.00100001.1100101\|0.1001\|0000 | 10110000.00100001.1100101\|0.1001\|1111 |
  | 4+2      | 176.33.202.160 | /29  | 176.33.202.167 | 176.33.202.161-176.33.202.166 | 10110000.00100001.1100101\|0.10100\|000 | 10110000.00100001.1100101\|0.10100\|111 |
  | 4+2      | 176.33.202.168 | /29  | 176.33.202.175 | 176.33.202.169-176.33.202.174 | 10110000.00100001.1100101\|0.10101\|000 | 10110000.00100001.1100101\|0.10101\|111 |
  | 4+2      | 176.33.202.176 | /29  | 176.33.202.183 | 176.33.202.177-176.33.202.182 | 10110000.00100001.1100101\|0.10110\|000 | 10110000.00100001.1100101\|0.10110\|111 |
  | 2+2      | 176.33.202.184 | /30  | 176.33.202.187 | 176.33.202.185-176.33.202.186 | 10110000.00100001.1100101\|0.101110\|00 | 10110000.00100001.1100101\|0.101110\|11 |
  | 2+2      | 176.33.202.188 | /30  | 176.33.202.191 | 176.33.202.189-176.33.202.190 | 10110000.00100001.1100101\|0.101110\|00 | 10110000.00100001.1100101\|0.101111\|11 |

### S04/E19 Summarization - Example

- when a lot of consecutive subnets are in one **area** a summary IP can be used
- subnet addresses:
  - `192.168.96.0/24`
  - `192.168.97.0/24`
  - `192.168.98.0/24`
  - `192.168.99.0/24`
  - `192.168.100.0/24`
  - `192.168.101.0/24`
  - `192.168.102.0/24`
- in the 3d octet
  - the first 5 bits always match
  - the last 3 bits varies
- this is the 21st bit (the new mask for summary IP)
  - the 3rd octet is always: `01100|XXX`
  - for the mask the changing bits will be `0`: `01100|000`
  - therefore the summary IP: `192.168.96.0/21`

|               | 128 | 64 | 32 | 16 | 8 |    | 4 | 2 | 1 |
|---------------|-----|----|----|----|---|----|---|---|---|
| 192.168.(96)  | 0   | 1  | 1  | 0  | 0 | \| | 0 | 0 | 0 |
| 192.168.(97)  | 0   | 1  | 1  | 0  | 0 | \| | 0 | 0 | 1 |
| 192.168.(98)  | 0   | 1  | 1  | 0  | 0 | \| | 0 | 1 | 0 |
| 192.168.(99)  | 0   | 1  | 1  | 0  | 0 | \| | 0 | 1 | 1 |
| 192.168.(100) | 0   | 1  | 1  | 0  | 0 | \| | 1 | 0 | 0 |
| 192.168.(101) | 0   | 1  | 1  | 0  | 0 | \| | 1 | 0 | 0 |
| 192.168.(102) | 0   | 1  | 1  | 0  | 0 | \| | 1 | 1 | 0 |

- one more IP address fits to the above summary IP: `192.168.103.0/24`
  - if the routers outside the area are configured with summary IP: `192.168.96.0/21` then it routes to the wrong destination
