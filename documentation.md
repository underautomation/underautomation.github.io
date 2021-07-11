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

This SDK has the following features:

- Receive a data stream from the robot (positions, IOs, status, ...): [see below](#data-streaming)
- Send and execute script on the remote robot : [see below](#remote-execute-urscript)
- Send commands to the robot (Power on, Show popup message, Realease brake, ...) : [see below](#send-remote-commands)
- Host an XML-RPC server allowing the robot to query your application (with arguments) and get an answer (number, string, pose, array, ...) : [see below](#xml-rpc--remote-procedure-call)
- Manipulate and convert robot poses (RPY / Rotation Vector) : [see below](#tools)

This SDK is licensed and *must* be purchased for use in your application.

The SDK can be downloaded on the download page. The main DLL is available in many versions of .NET. Examples are also provided for Winforms, Console Windows, Linux and Mac as well as integration in LabView, Node.JS and Python.

All C# examples below assume that the assembly ```UnderAutomation.UniversalRobots.dll``` is referenced in your project, and that the directive ```using UnderAutomation.UniversalRobots;``` is present. 

# Connection
## Connect to a UR robot
Initialize a TCP communication with a robot. The ```Connect()``` method take the hostname (ur-xxx) of the robot or its IP address that you can find in the "About Dialog-Box" in PolyScope.

If this method is called with only the IP as parameter the XML-RPC server is started on port 50000 and the data streaming is enabled on Primary Port.
```c#
using UnderAutomation.UniversalRobots;

///...

// Create a new UR instance
var ur = new UR();
ur.Connect("192.168.0.1");
```

The ```Connect()``` method can throw a ```InvalidLicenseException``` if your trial period is over or if your license key is invalid.


## Connection parameters

The ```Connect()``` method has optionnal parameters that can be used to set up the connection. If none of the optional parameters are used, the data streaming takes place on the ```Primary Port```, the XML-RPC server starts on port ```50000``` and the robot is pinged at the connection.

{% include ur.html method="Connect" %}

```c#
// Create a new UR instance
var ur = new UR();

ur.Connect("192.168.0.1" // IP of the robot
  ,true // Enable Data Streaming
  ,DataStreamingPorts.SecondaryClient // Use secondary port for data streaming
  ,true // Enable XML-RPC
  ,40000 // Use local port 40000 instead of 50000 to host the XML-RPC server
  ,false // Do not ping the robot
  );
```

{% include properties.html class="DataStreamingPorts" %}

## Disconnect

The ```Disconnect()``` method stops all services including the data streaming and the XML-RPC server.

```c#
// Create a new UR instance
var ur = new UR();
ur.Connect("192.168.0.1");

// ...

// Stop connection
ur.Disconnect();
```

## Start/Stop streaming and XML-RPC
You can enable or disable data streaming and XML-RPC server at any time with the following methods:

{% include ur.html method="EnableDataStreaming" %}

{% include ur.html method="DisableDataStreaming" %}

{% include ur.html method="EnableXmlRpcServer" %}

{% include ur.html method="DisableXmlRpcServer" %}


You can then check if these services are enabled with the following properties :

{% include ur.html method="DataStreamingEnabled" %}

{% include ur.html method="XmlRpcServerEnabled" %}

If you want to know with which of your local IP addresses you are connected to the robot, you can use the ```DataStreamingLocalEndPoint``` property. This property also allows to know which IP address to use in the robot's ```rpc_factory("xmlrpc", "http://????:50000")``` function.

{% include ur.html method="DataStreamingLocalEndPoint" %}

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

# Send remote commands

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


# Data streaming
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


# XML-RPC : Remote Procedure Call

## Overview

This feature allows a robot to request or transmit information to the PC.

The [XML-RPC protocol](http://xmlrpc.com/) is used. Via this SDK, the PC is a server and opens a TCP Listener on port 50000.
This port can be changed either by calling ```ur.Connect("ip_robot", xmlRpcServerPort: 50001)``` or by calling ```ur.EnableXmlRpcServer(50001)```.


When a request from the robot arrives, the SDK raises the event ``XmlRpcServerRequest`` which contains the name of the method called, its arguments, the IP of the robot and an ```Answer``` property which you can set and which contains the value returned to the robot.

To communicate with the SDK, you should execute the following script on your robot. If you don't know your PC IP, you can check the property ```ur.DataStreamingLocalEndPoint```.

```ruby
# Connect to the SDK and specifie the IP and port of the PC
rpc:=rpc_factory("xmlrpc","http://192.168.0.10:50000")

# Call method get_answer and wait for the reply. The reply will be assigned in variable "answer"
answer:=rpc.get_answer("Hello", True, False, 12, 12.2, p[100,100,120,0.1,0,0], [12,1.2,123])
```


## Example
This script can be downloaded here : [xml_rpc_sample.urp](https://github.com/underautomation/UniversalRobots/blob/master/Examples/WindowsDesktop/Samples/xml_rpc_sample.urp)

![](/assets/xml_rpc_sample.jpg)

You can try it with this sample below or with the downloadable Winforms and console examples.


```c#
private ur = new UR();

private void Example()
{
  // Connection to the robot with default parameters : XML-RPC server is started on port 50000
  ur.Connect("192.168.0.1");

  // Handle XML-RPC event
  ur.XmlRpcServerRequest += Ur_XmlRpcServerRequest;
}

// Method called when the robot sends a request
// You shoud execute on your robot : rpc:=rpc_factory("xmlrpc","http://192.168.0.10:50000")
// Replace the IP address 192.168.0.10 with the IP of the machine running this .NET code
// If you don't know your IP, you can find it in your interface properties or in with this SDK in the property : ur.DataStreamingLocalEndPoint
private void Ur_XmlRpcServerRequest(object sender, XmlRpcEventArg request)
{
    Console.WriteLine("Robot IP : " + request.EndPoint.Address);
    // Prints :
    // Robot IP : 192.168.0.1

    // Set the returned answer according to the method and its arguments
    switch (request.MethodName)
    {
        case "get_answer":
            // Robot script : answer1:=rpc.get_answer("Hello", True, False, 12, 12.2, p[100,100,120,0.1,0,0], [12,1.2,123])
            // Reply : answer1:=TRUE    

            foreach (var argument in request.Arguments)
            {
                Console.WriteLine(argument.ToString()); // Prints argument value : "Hello", "true", "false", "12", ...
            }

            request.Answer = true;
            break;

        case "GetPose":
            // Robot script : answer2:=rpc.GetPose()
            // Reply : answer2:=p[100,200,100,0,0,0]                    
            request.Answer = new Pose(100, 200, 100, 0, 0, 0);
            break;

        case "HowAreYou":
            // Robot script : answer3:=rpc.HowAreYou("Alfred")
            // Reply : answer3:="Fine thx Alfred"                    
            request.Answer = "Fine thx " + request.Arguments[0];
            break;

        case "SumFirstArray":
            // Robot script : answer4:=rpc.SumFirstArray([1,3.5,-2])
            // Reply : answer4:=2.5                    
            double[] argument1 = request.Arguments[0];

            double sum1 = 0;
            for (int i = 0; i < argument1.Length; i++) sum1 += argument1[i];

            request.Answer = sum1;

            break;

        case "SumMyArguments":
            // Robot script : answer5:=rpc.SumMyArguments(1,3.5,-2)
            // Reply : answer5:=2.5                    
            double sum = 0;
            for (int i = 0; i < request.Arguments.Length; i++)
            {
                double argValue = request.Arguments[i];
                sum += argValue;
            }

            request.Answer = sum;
            break;

        default:
            // Do not reply and the answer variable is not assigned
            break;
    }
}
```

In the Winforms example, a popup is displayed and contains all information about the request and allows you to return a typed object to the robot with buttons.

![](/assets/xml_rpc_winforms.jpg)


## XML-RPC types

{% include ur.html method="XmlRpcServerRequest" %}

{% include properties.html class="XmlRpcEventArg" %}


The class ``XmlRpcValue`` has implicit operators that allow it to be implicitly casted in native types (int, double, string, Pose, array). This is why it is for example possible to write ```request.Answer = 12``` instead of ```request.Answer = new XmlRpcIntegerValue(12)```.

{% include properties.html class="XmlRpcValue" %}

The classes ```XmlRpcIntegerValue```, ```XmlRpcDoubleValue```, ```XmlRpcBooleanValue```, ```XmlRpcStringValue```, ```XmlRpcPoseValue```, ```XmlRpcArrayValue```, ```XmlRpcStructValue``` inherits from ```XmlRpcValue``` and have a ```Type``` field that contains the value in the right type.


If an unknown object is received, a ```XmlRpcUnknownValue``` value is returned that contains a ```AdditionalInformation``` explaining why it is not supported.


# Tools

## Poses and conversions

The class ```Pose``` contains the 6 coordinates of a cartesian position : 3 translations X, Y, Z in millimeters and 3 rotation RX, RY, RZ in radians. It also contains 3 rotations properties that exposes the 3 rotations in degrees, but it's not a storage, only a conversion of RX, RY and RZ.

The methods ```FromRotationVectorToRPY()``` and ```FromRPYToRotationVector()``` transform the position in a new position with same translations X, Y, Z but different rotations.

A ```Pose``` instance can be returned in a XML-RPC answer. It will be interpreted as a robot pose. 

{% include properties.html class="Pose" %}



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
