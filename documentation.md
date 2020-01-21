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

{% include properties.html class="UniversalRobotPorts" %}

## Disconnect
```c#
// Create a new UR instance
var ur = new UR();
ur.Connect("192.168.0.1");

// ...

// Stop connection
ur.Disconnect();
```

## Licensing
### Register a license
You have 30 days free trial. For a long term use, you need to buy a license ([See pricing](/pricing)). Then, we will send you a license key and you will just have to specify it with your company name with the static method ```RegisterLicense()``` of class ```UR```.
```c#
// Register your license
UnderAutomation.UniversalRobots.UR.RegisterLicense("YourCompanyName", "YOUR_LICENSE_KEY");
```

### Get current license information
You can get full information about current license with the static property ```LicenseInfo``` of class ```UR```.
```c#
var info = UnderAutomation.UniversalRobots.UR.LicenseInfo;
```

{% include properties.html class="LicenseInfo" %}

{% include properties.html class="LicenseState" %}

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
{% include package.html package="RobotModeData" %}

{% include properties.html class="ControlModes" %}

{% include properties.html class="RobotModes" %}

### Joint data
{% include package.html package="JointData" %}
![](/assets/joints.png)

{% include properties.html class="JointData" %}

{% include properties.html class="JointModes" %}

### Tool data
{% include package.html package="ToolData" %}

{% include properties.html class="AnalogRanges" %}

{% include properties.html class="ToolModes" %}

### Masterboard data
{% include package.html package="MasterboardData" %}

{% include properties.html class="AnalogRanges" %}

{% include properties.html class="MasterboardDigitalIO" %}

{% include properties.html class="SafetyModes" %}


### Cartesian information
{% include package.html package="CartesianInfo" %}
![](/assets/flange-frame-3d.png)
![](/assets/flange-frame-projection.png)


### Kinematics information
{% include package.html package="KinematicsInfo" %}
![](/assets/joints.png)

{% include properties.html class="JointKinematicsInfo" %}

For more information about DH (Denavit-Hartenberg) parameters, please refer the following links :
* [https://www.youtube.com/watch?v=rA9tm0gTln8](https://www.youtube.com/watch?v=rA9tm0gTln8){:target="_blank"}
* [https://en.wikipedia.org/wiki/Denavit%E2%80%93Hartenberg_parameters](https://en.wikipedia.org/wiki/Denavit%E2%80%93Hartenberg_parameters){:target="_blank"}
 
### Configuration data
{% include package.html package="ConfigurationData" %}

{% include properties.html class="ControllerBoxTypes" %}

{% include properties.html class="JointConfiguration" %}
 
{% include properties.html class="RobotSubTypes" %}
 
{% include properties.html class="RobotTypes" %}
 
### Force mode data
{% include package.html package="ForceModeData" %}

### Additional information
{% include package.html package="AdditionalInfo" %}

### Calibration data
{% include package.html package="CalibrationData" %}

### Safety data
{% include package.html package="SafetyData" %}

### Tool communication information
{% include package.html package="ToolCommunicationInfo" %}

### Tool mode
{% include package.html package="ToolModeInfo" %}

{% include properties.html class="DigitalOutputConfigurations" %}

{% include properties.html class="OutputModes" %}

