---
layout: post
title:  Surveillance Camera With ESP32
author: Dimas Yoga
categories: [esp32, parking system]
image: '/images/esp32cam/cover-image.jpg'
---

A few months ago, I develop a surveillance camera for my undergraduate thesis project. The surveillance camera I developed will be used to take pictures of parking lots, and here I will tell you how the development process take place.

First, I will tell you about my undergraduate thesis project. So I'm develop a smart parking outdoor system for car parking lot inside my campus. What this system can do is it can tell visitor and parking management officers how many parking slots are still available at each parking lot inside my campus, I also add parking slot recommendation feature where user can get available parking slot location closest to the destination. To determine how many parking slots available in each parking lot, I used visual based method where I take a picture of the parking lot and using convolutional neural network model to determine status of each parking slot.

## Specification

There are some constraint in developing this surveillance camera:

1. Cost under IDR 1,000,000

2. No more than 1 Kilograms in weight

3. No more than 16×16×16 cm in size

4. Use WiFi for transfer images

5. Has a way to configure the camera without accessing the hardware

6. Use solar panel for power source

7. Has protection for outdoor conditions

## Design Process

![camera block diagram](/images/esp32cam/blogdiagram.png)

The image above is a block diagram of the camera. The camera consists of a power supply block to provide power, a voltage regulator block to adjust the voltage value to match the input voltage required by the microcontroller, a camera block to take pictures, and a WiFi block for wireless communication.

### Choosing electronic module

It's quite complicated to choosing camera components considering the many options available and the constraint that exists. The first thing that I consider the most is that these components must be available in Indonesia or in other words, they are not imported. This is because the covid pandemic has begun to spread throughout the world and there is news of prohibiting imports of goods at that time, so buying goods from abroad is quite risky.

I originally thought of buying a camera, microcontroller, and wireless communication module separately. Luckily I found the ESP32 CAM AI-Thinker which already provides all the features I need. It has wireless communication (WiFi and Bluetooth), 2 MP camera with maximum UXGA image resolution (1600×1200 pixel), low power consumption, and it just cost you about IDR 130,000. For the voltage regulator I used Micro Step Down Mini-360, it's small (18×11×5 mm) and cost about IDR 10,000. I also added an external antenna for the esp32 to increase the communication range.

For power supply, I used a 20 WP solar panel with a 7 AH VRLA gel cell battery. With a full charge battery, the camera can run for 2 days, and the battery can be fully recharged for a day in sunny weather.

### Communication protocol

There are 3 communication protocol that I consider to use: RTSP, HTTP, and MQTT. RTSP (Real Time Streaming Protocol) is common protocol to use in IP camera, HTTP (Hypertext Transfer Protocol) is used everywhere in internet, MQTT (Message Queuing Telemetry Transport) is usually used for Internet of Things application.

As far as I know, MQTT is designed for low bandwidth usage, and it is very rare to find examples of projects that use MQTT to transfer images continuously, it can be done by modifying the packet size limit of the library but since it is not common, so I dropped this option.

Whereas for RTSP and HTTP, I tend to choose HTTP because it's more versatile and reliable than RTSP. Then after that in the development process it turned out that a user interface was needed to change the camera settings, I decided to use a web page that was accessed from the camera. By choosing to use HTTP for sending images, I only need to create one HTTP server on the camera instead of having 2 different servers (HTTP and RTSP).

### Firmware

I use PlatformIO IDE to develop this camera firmware. The main library that I use is [ESPAsyncWebServer](https://github.com/me-no-dev/ESPAsyncWebServer) to create an HTTP server. This server will be used to receive image capture requests and also to present the settings webpage.

The way to take pictures from the camera is quite simple, the client sends an HTTP request to the URL: http: // $ {Camera IP Addr} / capture, then the server will respond with a 1600×1200 pixel RGB image. Then to access the configuration webpage, you can go to the root address of the camera: http: // $ {Camera IP Addr} /, the display of the configuration webpage can be seen in the image below.

![Configuration Webpage 1](/images/esp32cam/setting-webpage-1.png)

![Configuration Webpage 2](/images/esp32cam/setting-webpage-2.png)

You can get my firmware code for this camera project in [this repository](https://github.com/Dimasyoga/OutdoorParkingSystem-ESP32Firmware).

### PCB design

The PCB is used for assembly the other electronic component like voltage regulator, LED for indicator, power input, and header for FTDI (you need FTDI for uploading program to ESP32 CAM). I used KiCad to design this PCB. The schematic of this PCB and the results of its implementation can be seen in the image below.

![PCB Schematic](/images/esp32cam/PCBSchematic.png)

![PCB 3D Layout](/images/esp32cam/PCB-layout-3d.png)

![Final result](/images/esp32cam/implementation.jpg)

### Casing design

I use Solidworks to design this casing and use 3d print PLA to manufacture this casing. Designing this case is a bit tricky because I have to waterproof it on a budget, so the solution I use is to use cheap silicone glue and rubber seals in every gap. The solution resolved the waterproof problem but after a few uses, there were still some leaks. Next is the see-through section for the camera lens section, for this section using glass is the best solution but (again) for cost savings I chose to use clear acrylic, it is cheaper and lighter than glass but easier to scratch. I also gave this acrylic a hydrophobic coating to solve the moisture problem on the surface after being exposed to water. The complete design of this casing and the results of its implementation can be seen in the image below.

![Casing Design](/images/esp32cam/Casing-design.png)

![Casing Implementation Result](/images/esp32cam/Casing-implementation.jpg)

## Conclusion

The finished camera has dimensions of 7.78 x 2.90 x 4.55 cm and weighs 78 grams and can withstand water spray. The power consumption of this camera in standby conditions is around 0.85 W and can reach 1.5 mW when shooting. The total cost to build a camera set is around IDR 905,000.

I really enjoyed the process of working on this camera project. I learned many new things, especially in the development of the casing design of the camera. The final result of this camera can be seen in the image below.

![Final Result](/images/esp32cam/Final-1.jpg)

![Final Result](/images/esp32cam/Final-2.jpg)

If you have input for the development process of this project, feel free write in the comments. Thank you.
