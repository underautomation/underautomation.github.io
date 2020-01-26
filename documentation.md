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

## Power commands

### Get robot mode

### Power on

### Power off

### Release brake

### Unlock protective stop


### Shutdown robot


## Program commands

### Load program

### Get loaded program

### Play

### Stop

### Pause

### Is program running

### Get program state

### Is program saved

## Information commands

### Show popup

### Close popup

### Add message to log

### Get Polyscope version

### Load installation file

### Get serial number

### Get robot model


## Operational mode commands

### Get operational mode

### Clear operational mode

### Set operational mode

### Is robot in remote control


## Safety commands

### Get safety status

### Close safety popup

### Restart safety

    Private Sub btnProgrammRunning_Click(sender As Object, e As EventArgs) Handles btnProgrammRunning.Click
        LogCommand(Function()

                       Return _ur.IsProgramRunning()

                   End Function,
                   "IsProgramRunning")
    End Sub

    Private Sub btnGetRobotMode_Click(sender As Object, e As EventArgs) Handles btnGetRobotMode.Click
        LogCommand(Function()

                       Return _ur.GetRobotMode()

                   End Function,
                   "GetRobotMode")
    End Sub

    Private Sub btnLoadProgram_Click(sender As Object, e As EventArgs) Handles btnLoadProgram.Click
        LogCommand(Function()

                       Return _ur.LoadProgram(txtProgram.Text)

                   End Function,
                   "LoadProgram")
    End Sub

    Private Sub btnPlay_Click(sender As Object, e As EventArgs) Handles btnPlay.Click
        LogCommand(Function()

                       Return _ur.Play()

                   End Function,
                   "Play")
    End Sub

    Private Sub btnStop_Click(sender As Object, e As EventArgs) Handles btnStop.Click
        LogCommand(Function()

                       Return _ur.Stop()

                   End Function,
                   "Stop")

    End Sub

    Private Sub btnPause_Click(sender As Object, e As EventArgs) Handles btnPause.Click
        LogCommand(Function()

                       Return _ur.Pause()

                   End Function,
                   "Pause")

    End Sub

    Private Sub btnShutdown_Click(sender As Object, e As EventArgs) Handles btnShutdown.Click
        LogCommand(Function()

                       Return _ur.Shutdown()

                   End Function,
                   "Shutdown")

    End Sub

    Private Sub btnGetLoadedProgram_Click(sender As Object, e As EventArgs) Handles btnGetLoadedProgram.Click
        LogCommand(Function()

                       Return _ur.GetLoadedProgram()

                   End Function,
                   "GetLoadedProgram")

    End Sub

    Private Sub btnShowPopup_Click(sender As Object, e As EventArgs) Handles btnShowPopup.Click
        LogCommand(Function()

                       Return _ur.ShowPopup(txtPopup.Text)

                   End Function,
                   "ShowPopup")

    End Sub

    Private Sub btnClosePopup_Click(sender As Object, e As EventArgs) Handles btnClosePopup.Click
        LogCommand(Function()

                       Return _ur.ClosePopup()

                   End Function,
                   "ClosePopup")

    End Sub

    Private Sub btnAddToLog_Click(sender As Object, e As EventArgs) Handles btnAddToLog.Click
        LogCommand(Function()

                       Return _ur.AddToLog(txtLog.Text)

                   End Function,
                   "AddToLog")

    End Sub

    Private Sub btnIsProgramSaved_Click(sender As Object, e As EventArgs) Handles btnIsProgramSaved.Click
        LogCommand(Function()

                       Return _ur.IsProgramSaved()

                   End Function,
                   "IsProgramSaved")

    End Sub

    Private Sub btnGetProgramState_Click(sender As Object, e As EventArgs) Handles btnGetProgramState.Click
        LogCommand(Function()

                       Return _ur.GetProgramState()

                   End Function,
                   "GetProgramState")

    End Sub

    Private Sub btnPolyscopeVersion_Click(sender As Object, e As EventArgs) Handles btnPolyscopeVersion.Click
        LogCommand(Function()

                       Return _ur.GetPolyscopeVersion()

                   End Function,
                   "GetPolyscopeVersion")

    End Sub

    Private Sub btnSetUserRole_Click(sender As Object, e As EventArgs) Handles btnSetUserRole.Click
        LogCommand(Function()

                       Return _ur.SetUserRole(CType(cbUserRoles.SelectedItem, UserRoles))

                   End Function,
                   "LoadProgram")

    End Sub

    Private Sub btnPowerOn_Click(sender As Object, e As EventArgs) Handles btnPowerOn.Click
        LogCommand(Function()

                       Return _ur.PowerOn()

                   End Function,
                   "PowerOn")

    End Sub

    Private Sub btnPowerOff_Click(sender As Object, e As EventArgs) Handles btnPowerOff.Click
        LogCommand(Function()

                       Return _ur.PowerOff()

                   End Function,
                   "PowerOff")

    End Sub

    Private Sub ReaseBrake_Click(sender As Object, e As EventArgs) Handles ReaseBrake.Click
        LogCommand(Function()

                       Return _ur.ReleaseBrake()

                   End Function,
                   "ReleaseBrake")

    End Sub

    Private Sub btnUnlockProtectiveStop_Click(sender As Object, e As EventArgs) Handles btnUnlockProtectiveStop.Click
        LogCommand(Function()

                       Return _ur.UnlockProtectiveStop()

                   End Function,
                   "UnlockProtectiveStop")

    End Sub

    Private Sub btnCloseSafetyPopup_Click(sender As Object, e As EventArgs) Handles btnCloseSafetyPopup.Click
        LogCommand(Function()

                       Return _ur.CloseSafetyPopup()

                   End Function,
                   "CloseSafetyPopup")

    End Sub

    Private Sub btnLoadInstallation_Click(sender As Object, e As EventArgs) Handles btnLoadInstallation.Click
        LogCommand(Function()

                       Return _ur.LoadInstallation(txtInstallation.Text)

                   End Function,
                   "LoadInstallation")

    End Sub

    Private Sub btnRestartSafety_Click(sender As Object, e As EventArgs) Handles btnRestartSafety.Click
        LogCommand(Function()

                       Return _ur.RestartSafety()
                   End Function,
                   "RestartSafety")

    End Sub

    Private Sub btnSafetyStatus_Click(sender As Object, e As EventArgs) Handles btnSafetyStatus.Click
        LogCommand(Function()

                       Return _ur.GetSafetyStatus()

                   End Function,
                   "GetSafetyStatus")

    End Sub

    Private Sub btnGetSerialNumber_Click(sender As Object, e As EventArgs) Handles btnGetSerialNumber.Click
        LogCommand(Function()

                       Return _ur.GetSerialNumber()

                   End Function,
                   "GetSerialNumber")

    End Sub

    Private Sub btnGetRobotModel_Click(sender As Object, e As EventArgs) Handles btnGetRobotModel.Click
        LogCommand(Function()

                       Return _ur.GetRobotModel()

                   End Function,
                   "GetRobotModel")

    End Sub

    Private Sub btnIsInRemoteControl_Click(sender As Object, e As EventArgs) Handles btnIsInRemoteControl.Click
        LogCommand(Function()

                       Return _ur.IsInRemoteControl()

                   End Function,
                   "IsInRemoteControl")

    End Sub

    Private Sub btnGetOperationalMode_Click(sender As Object, e As EventArgs) Handles btnGetOperationalMode.Click
        LogCommand(Function()

                       Return _ur.GetOperationalMode()

                   End Function,
                   "GetOperationalMode")

    End Sub

    Private Sub btnClearOIperationalMode_Click(sender As Object, e As EventArgs) Handles btnClearOIperationalMode.Click
        LogCommand(Function()

                       Return _ur.ClearOperationalMode()

                   End Function,
                   "ClearOperationalMode")

    End Sub

    Private Sub btnSetOperationalMode_Click(sender As Object, e As EventArgs) Handles btnSetOperationalMode.Click
        LogCommand(Function()

                       Return _ur.SetOperationalMode(CType(cbOperationalMode.SelectedItem, OperationalModes))

                   End Function,
                   "SetOperationalMode")

    End Sub

# Robot data
Data described below are sent by the robot controller at 10Hz.

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
 
{% include properties.html class="RobotTypes" %}
 
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

