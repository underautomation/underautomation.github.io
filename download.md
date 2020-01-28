---
layout: page
title: Download and Get Started
permalink: /download/
---

# Download (30 days trial)

The archive is made of 2 folders :
- _Libraries_ : Contains DLL binaries for each supported architectures (.NET Framework 2.0 to 4.7.2, .NET Core 2.0 to 3.0, .NET Standard 2.0 and 2.1)
- _Examples_ : A list of ready to use compiled examples for Windows, Linux ans MacOS. Visual Studio 2012, 2015, 2017 or 2019 is needed to run them.

By downloading, you hereby agree to the [terms and conditions](/eula){:target="_blank"}

<center>
<div class="btn-container">
      <button title="Download it now !" onclick="window.open('https://github.com/underautomation/UniversalRobots/releases/latest/download/UniversalRobotsSDK_UnderAutomation.zip', '_blank')" class="btn-pill">
        <span><img src="/assets/download.png" style="margin-right:20px;" />Try latest version</span>
      </button>
</div>
</center>

[See all versions](https://github.com/underautomation/UniversalRobots/releases){:target="_blank"}

# Get started
Please first extract file ```UniversalRobotsSDK_UnderAutomation.zip```.


## Windows Forms .NET Framework example

Windows Forms .NET Framework example is located in : ```UniversalRobotsSDK_UnderAutomation\Examples\WindowsDesktop\bin\Release\WindowsDesktopURExample.exe```.

This example contains all features of UnderAutomation Universal Robots SDK.

[![Winforms example](/assets/winforms-example.gif)](/assets/winforms-example.gif){:target="_blank"}

[![Winforms example streaming data](/assets/windows-forms-example-streaming-annotated.png)](/assets/windows-forms-example-streaming-annotated.png){:target="_blank"}

[![Winforms example commands](/assets/windows-forms-example-commands-annotated.png)](/assets/windows-forms-example-commands-annotated.png){:target="_blank"}

## Console example

Console example is located in : ```UniversalRobotsSDK_UnderAutomation\Examples\ConsoleWindowsLinuxMac```.
It is a .NET Core 3.0 console application that prints cartesian position of the tool center point of the robot. It could be compiled for all plateforms.

[![Console example](/assets/console-example.gif)](/assets/console-example.gif){:target="_blank"}


## Try it with offline simulator
If you don't have a real robot but want to test this library, please follow the instructions.

* Download the simulator from UR website : [Download offline simulator](https://s3-eu-west-1.amazonaws.com/ur-support-site/61543/URSim_VIRTUAL-5.6.0.90886.rar){:target="_blank"}.
If the link does not work, download it from : [https://www.universal-robots.com/download/?option=61542#section41570](https://www.universal-robots.com/download/?option=61542#section41570)
You also can test with another UR firmware version, the library is compatible.

* Extract the archive (with [7Zip](https://www.7-zip.org/a/7z1900-x64.exe) for example)

* Download latest version of Virtual Box : [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads).

* Install VirtualBox and ensure that you checked all network features in the installer, as shown here :

![VirtualBox installer](/assets/virtualbox-installer.PNG)

* Change your VirtualBox Host-Only Network IP address to a static IP like 192.168.0.10
![local network configuration](/assets/local-network-configuration.PNG)

* Open Oracle VM Virtualbox, press CTRL+A (or Machine menu / Add...) and select the downloaded ```URSim_VIRTUAL-x.x.x.xxxxx.vbox``` file.

* Open Configuration, go to network and attach to ```Host only Adapter``` (```Réseau privé hôte``` in french) named ```Virtualbox Host-only Ethernet Adapter``` and press OK.
![VirtualBox network configuration](/assets/virtualbox-network.PNG)

* Start the virtual machine and Lubuntu should boot.

* Change Lubuntu IP Address
Click Start menu / Run and execute command ```sudo leafpad /etc/network/interfaces``` to edit interfaces file.
![VirtualBox network configuration](/assets/edit-interfaces-command.PNG)

Change the content of interfaces file to assign static IP 192.168.0.56 with the following configuration :

```
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto eth0
iface eth0 inet static
  address 192.168.0.56
  network 192.168.0.0
  netmask 255.255.255.0
  gateway 192.168.0.1
```

![VirtualBox network configuration](/assets/edit-interfaces-static-ip.png)

* Restart Lubuntu by clicking Start menu / Logout / Reboot

* When VM is restarted, launch the URSim version of your choice (UR3, UR5, UR10 or UR16)

* The first time you launch URSim you should click on "Confirm Safety" popup button. 

* You can then enjoy the Windows Forms Example by connecting to 192.168.0.56