---
layout: page
title: Documentation
permalink: /documentation/
---

<nav>
  * table of contents
  {:toc}
</nav>

# API features
All C# examples below assume that the assembly ```UnderAutomation.UniversalRobots.dll``` is referenced in your project, and that the directive ```using UnderAutomation.UniversalRobots;``` is present. 


## Connect to a UR robot
Initialize a TCP communication with a robot. The ```Connect()``` method take the hostname (ur-xxx) of the robot or its IP address that you can find in the "About Dialog-Box" in PolyScope.
```c#
using UnderAutomation.UniversalRobots;

///...

// Create a new UR instance
var ur = new UR();
ur.Connect("192.168.0.1");
```

The ```Connect()``` method can throw a ```InvalidLicenseException``` if your trial period is over or if your license key is invalid.

## Check if robot is still connected
```c#
// Create a new UR instance
var ur = new UR();
ur.Connect("192.168.0.1");

// ...

// Ask if the robot is still connected
bool isConnected = ur.Connected;
```

## Connect to a specific TCP port
```c#
// Create a new UR instance
var ur = new UR();

var port = UniversalRobotPorts.SecondaryClient;
ur.Connect("192.168.0.1", port);
```

When port is not specified,  ```UniversalRobotPorts.PrimaryClient``` is used.

| **Port name** | **TCP port** | **Description** |
|:---:|:---:|:---:|
|PrimaryClient (default) | 30001 || 
|SecondaryClient | 30002 | |
|PrimaryClientReadOnly | 30011 ||
|SecondaryClientReadOnly | 30012 ||

## Disconnect
```c#
// Create a new UR instance
var ur = new UR();
ur.Connect("192.168.0.1");

// ...

// Stop connection
ur.Disconnect();
```

## Register a license
You have 30 days free trial. For a long term use, you need to buy a license ([See pricing](/pricing)). Then, we will send you a license key and you will just have to specify it with your company name with the static method ```RegisterLicense()``` of class ```UR```.
```c#
// Register your license
UnderAutomation.UniversalRobots.UR.RegisterLicense("YourCompanyName", "YOUR_LICENSE_KEY");
```

## Remote execute URScript

When calling ```Send()``` method, URScript (the programming language that controls the robot) is directly executed. If a program is running, it is immediately stopped to execute this script.
Script can only be executed if you are connected to port ```UniversalRobotPorts.PrimaryClient``` (default if not specified) or ```UniversalRobotPorts.SecondaryClient```.

```c#
// Create a new UR instance
var ur = new UR();
ur.Connect("192.168.0.1");

// ...

// Remote execute a movej
ur.Send("movej([0,1.57,-1.57,3.14,-1.57,1.57],a=1.4, v=1.05, t=0, r=0)");
```

Please refer to the **Script Manual** to see all the functions you can remotely call : <a href="https://www.universal-robots.com/download/?option=61790#section61549" target="_blank">Download PDF Script Manual</a>.

## Robot data

### Robot mode

### Joint data

### Tool data

### Masterboard data

### Cartesian information

### Kinematics information

### Configuration data

### Force mode data

### Additional information

### Calibration data

### Safety data

### Tool communication information

### Tool mode

https://www.youtube.com/watch?v=rA9tm0gTln8
