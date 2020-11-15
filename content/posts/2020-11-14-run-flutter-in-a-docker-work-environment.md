---
template: post
title: Run Flutter in a Docker Work Environment
slug: run-flutter-in-a-docker-work-environment
draft: true
date: 2020-11-14T16:12:06.319Z
description: How to develop Flutter apps without installing a whole load of
  dependencies on your desktop/laptop
category: Mobile-App Development
tags:
  - docker
  - flutter
  - mobile-app development
---
Start up my Docker work-horse Jubuntu (really is just a running ubuntu container for the purposes of this).
Download the tar file: `curl https://storage.googleapis.com/flutter_infra/releases/stable/linux/flutter_linux_1.22.4-stable.tar.xz -o flutter.tar.xz`
Extract the tar file to ~/: `tar -xf flutter.tar.xz -C /home/jubuntu`
Add flutter to the path: `export PATH="$PATH:/home/jubuntu/flutter/bin"`
Run flutter (from anywhere but ~/ because zsh shortcut will just cd into the dir): `flutter`
Get results like this:

```
Manage your Flutter app development.

Common commands:

  flutter create <output directory>
    Create a new Flutter project in the specified directory.

  flutter run [options]
    Run your Flutter application on an attached device or in an emulator.

Usage: flutter <command> [arguments]
```

Let's try the flutter doctor: `flutter doctor`

Get results like this:

```
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 1.22.4, on Linux, locale en_US)
[✗] Android toolchain - develop for Android devices
    ✗ Unable to locate Android SDK.
      Install Android Studio from: https://developer.android.com/studio/index.html
      On first launch it will assist you in installing the Android SDK components.
      (or visit https://flutter.dev/docs/get-started/install/linux#android-setup for detailed
      instructions).
      If the Android SDK has been installed to a custom location, set ANDROID_SDK_ROOT to that
      location.
      You may also want to add it to your PATH environment variable.

[!] Android Studio (not installed)
[!] Connected device
    ! No devices available

! Doctor found issues in 3 categories.
```

First I need to install the Android SDK, since I'm in a docker container I don't want Android Studio, instead I'll try the [android sdkmanager](https://developer.android.com/studio/command-line/sdkmanager). Pulling installation instructions for sdkmanager on Ubuntu [from here](https://linoxide.com/ubuntu-how-to/install-android-sdk-manager-linux-ubuntu-16-04/).

Let's update: `sudo apt-get update`

Install java: `apt-get install default-jdk`

The default sdkmanager settings expect the following directory structure: `~/Android/Sdk/cmdline-tools/latest/<cmd-linetools-unzip>`. So "mk" the "dirs" (`-p` flag creates parent directories if necessary): `mkdir -p ~/Android/Sdk/cmdline-tools/latest`

Download commandline tools (link taken from the Android Studio downloads page, under CommandLineTools): `curl https://dl.google.com/android/repository/commandlinetools-linux-6858069_latest.zip -o /home/jubuntu/android-cmdlinetools.zip`

Unzip cmdline tools: `unzip android-cmdline-tools.zip -d ~/andr-cmdline-tools`

Move the tools to the "latest" folder: `mv ~/andr-cmdline-tools/cmdline-tools ~/Android/Sdk/cmdline-tools/latest`

Add the following to .zshrc: `export PATH=$HOME/Android/Sdk/cmdline-tools/latest:$HOME/Android/Sdk/cmdline-tools/latest/bin:$PATH`

Source your zshrc: `source ~/.zshrc`
Now we should get some positive output from sdkmanager: `sdkmanager --list`

```
[=======================================] 100% Computing updates...
Available Packages:
  Path                                                                                     | Version      | Description
  -------                                                                                  | -------      | -------
  add-ons;addon-google_apis-google-15                                                      | 3            | Google APIs
  add-ons;addon-google_apis-google-16                                                      | 4            | Google APIs
...
```

Ok so let's install some sdk packages that we need, I'm currently using android-30: 
`sdkmanage "build-tools;30.0.2" "sources;android-30" "platform-tools" "platforms;android-30"`

