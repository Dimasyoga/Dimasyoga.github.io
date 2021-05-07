---
layout: post
title:  Surveillance Camera With ESP32
author: Dimas Yoga
categories: [esp32]
---

A few months ago, I develop a surveillance camera for my undergraduate thesis project. The surveillance camera I developed will be used to take pictures of parking lots, and here I will tell you how the development process take place.

First, I will tell you about my undergraduate thesis project. So I'm develop a smart parking outdoor system for car parking lot inside my campus. What this system can do is it can tell visitor and parking management officers how many parking slots are still available at each parking lot inside my campus, I also add parking slot recommendation feature where user can get available parking slot location closest to the destination. To determine how many parking slots available in each parking lot, I used visual based method where I take a picture of the parking lot and using convolutional neural network model to determine status of each parking slot.

## Specification

There are some constraint in developing this surveillance camera:

1. Cost under IDR 1,000,000

2. No more than 1 Kilograms in weight

3. No more than 16 cm × 16 cm × 16 cm in size

4. Use WiFi for transfer images

5. Has a way to configure the camera without accessing the hardware

6. Use solar panel for power source

7. Has protection for outdoor conditions

## Design Process

![camera block diagram](/images/camera-esp32Cam-blogdiagram.png)

The image above is a block diagram of the camera. The camera consists of a power supply block to provide power, a voltage regulator block to adjust the voltage value to match the input voltage required by the microcontroller, a camera block to take pictures, and a WiFi block for wireless communication.

### Choosing electronic module

It's quite complicated to choosing camera components considering the many options available and the constraint that exists. The first thing that I consider the most is that these components must be available in Indonesia or in other words, they are not imported. This is because the covid pandemic has begun to spread throughout the world and there is news of prohibiting imports of goods at that time, so buying goods from abroad is quite risky.

I originally thought of buying a camera, microcontroller, and wireless communication module separately. Luckily I found the ESP32 CAM AI-Thinker which already provides all the features I need. It has wireless communication (WiFi and Bluetooth), 2 MP camera with maximum UXGA image resolution (1600 × 1200 pixel), low power consumption, and it just cost you about IDR 130,000.

### Communication protocol



### PCB design

### Casing design

## Testing

## Conclusion
