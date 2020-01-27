---
layout: page
title: Documentation
permalink: /documentation/
---


<nav>
  * table of contents
  {:toc}
</nav>

# Introduction
All C# examples below assume that the assembly ```UnderAutomation.UniversalRobots.dll``` is referenced in your project, and that the directive ```using UnderAutomation.UniversalRobots;``` is present. 

# Connection
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

# Licensing
## Register a license
You have 30 days free trial. For a long term use, you need to buy a license ([See pricing](/pricing)). Then, we will send you a license key and you will just have to specify it with your company name with the static method ```RegisterLicense()``` of class ```UR```.
```c#
// Register your license
UnderAutomation.UniversalRobots.UR.RegisterLicense("YourCompanyName", "YOUR_LICENSE_KEY");
```

## Get current license information
You can get full information about current license with the static property ```LicenseInfo``` of class ```UR```.
```c#
var info = UnderAutomation.UniversalRobots.UR.LicenseInfo;
```

{% include properties.html class="LicenseInfo" %}

{% include properties.html class="LicenseState" %}

# Remote execute URScript

When calling ```Send()``` method, URScript (the programming language that controls the robot) is directly executed. If a program is running, it is immediately stopped to execute this script.
Script can only be executed if you are connected to port ```UniversalRobotPorts.PrimaryClient``` (default if not specified) or ```UniversalRobotPorts.SecondaryClient```.

```c#
// Create a new UR instance
var ur = new UR();
ur.Connect("192.168.0.1");

// ...

// Remote execute a movej
ur.Send("movej([-1.5,-1.5,-2,-0.5,1.8,0],a=1.4, v=1.05, t=0, r=0)");

// Set digital output 2 to true
ur.Send(“set_digital_out(7,True)”);
```

Please refer to the **Script Manual** to see all the functions you can remotely call : <a href="https://www.universal-robots.com/download/?option=61790#section61549" target="_blank">Download PDF Script Manual</a>.

# Commands

## Generality
All commands described below use the TCP/IP Dashboard server protocol to remote control the robot.
Every command returns a ```CommandResponse``` object that describes the success of the request. 

{% include properties.html class="CommandResponse" %}

In particular, for request that have a returned value, a ```CommandResponse<t>``` object is returned with an additional ```public T Value``` member that contains the returned value.


## Power commands

### Get robot mode
{% include command.html method="GetRobotMode" value="RobotModes robotMode" %}

{% include properties.html class="RobotModes" %}


### Power on
{% include command.html method="PowerOn" %}

### Power off
{% include command.html method="PowerOff" %}


### Release brake
{% include command.html method="ReleaseBrake" %}

### Unlock protective stop
{% include command.html method="UnlockProtectiveStop" %}


### Shutdown robot
{% include command.html method="Shutdown" %}


## Program commands

### Load program
{% include command.html method="LoadProgram" arg1="\"prg1.urp\"" %}

### Get loaded program
{% include command.html method="GetLoadedProgram" value="string loadedProgram" %}

### Play
{% include command.html method="Play" %}

### Stop
{% include command.html method="Stop" %}

### Pause
{% include command.html method="Pause" %}

### Is program running
{% include command.html method="IsProgramRunning" value="bool isProgramRunning" %}

### Get program state
{% include command.html method="GetProgramState" value="ProgramState state" %}

{% include properties.html class="ProgramState" %}

### Is program saved
{% include command.html method="IsProgramSaved" value="ProgramSaveState state" %}

{% include properties.html class="ProgramSaveState" %}

## Information commands

### Show popup
{% include command.html method="ShowPopup" arg1="\"This is a popup message !\"" %}

### Close popup
{% include command.html method="ClosePopup" %}

### Add message to log
{% include command.html method="AddToLog" arg1="\"This is a log message !\"" %}

### Get Polyscope version
{% include command.html method="GetPolyscopeVersion" %}

### Load installation file
{% include command.html method="LoadInstallation" arg1="\"default.installation\"" %}

### Get serial number
{% include command.html method="GetSerialNumber" %}

### Get robot model
{% include command.html method="GetRobotModel" value="RobotModels model" %}

{% include properties.html class="RobotModels" %}

## Operational mode commands

### Get operational mode
{% include command.html method="GetOperationalMode" value="OperationalModes mode" %}

{% include properties.html class="OperationalModes" %}

### Clear operational mode
{% include command.html method="ClearOperationalMode" %}

### Set operational mode
{% include command.html method="SetOperationalMode" arg1="OperationalModes.Manual" %}

{% include properties.html class="OperationalModes" %}

### Is robot in remote control
{% include command.html method="IsInRemoteControl" value="bool isRemoteControl" %}


## Safety commands

### Get safety status
{% include command.html method="GetSafetyStatus" value="SafetyStatus status" %}

{% include properties.html class="SafetyStatus" %}

### Close safety popup
{% include command.html method="CloseSafetyPopup" %}

### Restart safety
{% include command.html method="RestartSafety" %}


# Robot data
Data described below are sent by the robot controller at 10Hz by the TCP/IP Client Interface protocol.

## Robot mode
{% include package.html package="RobotModeData" %}

{% include properties.html class="ControlModes" %}

{% include properties.html class="RobotModes" %}

## Joint data
{% include package.html package="JointData" %}
![](/assets/joints.png)

{% include properties.html class="JointData" %}

{% include properties.html class="JointModes" %}

## Tool data
{% include package.html package="ToolData" %}

{% include properties.html class="AnalogRanges" %}

{% include properties.html class="ToolModes" %}

## Masterboard data
{% include package.html package="MasterboardData" %}

{% include properties.html class="AnalogRanges" %}

{% include properties.html class="MasterboardDigitalIO" %}

{% include properties.html class="SafetyModes" %}


## Cartesian information
{% include package.html package="CartesianInfo" %}
![](/assets/flange-frame-3d.png)
![](/assets/flange-frame-projection.png)


## Kinematics information
{% include package.html package="KinematicsInfo" %}
![](/assets/joints.png)

{% include properties.html class="JointKinematicsInfo" %}

For more information about DH (Denavit-Hartenberg) parameters, please refer the following links :
* [https://www.youtube.com/watch?v=rA9tm0gTln8](https://www.youtube.com/watch?v=rA9tm0gTln8){:target="_blank"}
* [https://en.wikipedia.org/wiki/Denavit%E2%80%93Hartenberg_parameters](https://en.wikipedia.org/wiki/Denavit%E2%80%93Hartenberg_parameters){:target="_blank"}
 
## Configuration data
{% include package.html package="ConfigurationData" %}

{% include properties.html class="ControllerBoxTypes" %}

{% include properties.html class="JointConfiguration" %}
 
{% include properties.html class="RobotSubTypes" %}
 
{% include properties.html class="RobotModels" %}
 
## Force mode data
{% include package.html package="ForceModeData" %}

## Additional information
{% include package.html package="AdditionalInfo" %}

## Calibration data
{% include package.html package="CalibrationData" %}

## Safety data
{% include package.html package="SafetyData" %}

## Tool communication information
{% include package.html package="ToolCommunicationInfo" %}

## Tool mode
{% include package.html package="ToolModeInfo" %}

{% include properties.html class="DigitalOutputConfigurations" %}

{% include properties.html class="OutputModes" %}

