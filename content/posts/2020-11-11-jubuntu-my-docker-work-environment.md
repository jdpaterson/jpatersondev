---
template: post
title: "Jubuntu: My Docker Work Environment"
slug: jubuntu-my-docker-work-environment
draft: true
date: 2020-11-11T21:11:13.244Z
description: "A detailed look at my custom Docker image that I use as a work
  environment: Jubuntu"
category: Docker
tags:
  - docker
  - ubuntu
  - linux
  - containers
  - ""
---
Some time ago I came across [a Reddit post](https://www.reddit.com/r/rubyonrails/comments/gc82fn/how_to_set_up_ruby_on_rails_on_windows/fp9rnn1/) about how best to run Ruby on Rails in a Windows environment. While the "OP" I'm sure did a fine job of the steps to installing Ruby or setting up VirtualBox etc etc... I was more interested in one the the [comments in the thread](https://www.reddit.com/r/rubyonrails/comments/gc82fn/how_to_set_up_ruby_on_rails_on_windows/fp9rnn1/?context=8&depth=9) where one user suggests to use Docker, another user calls Docker "the most unintuitive thing" (paraphrasing a deleted comment) and then I chime in with some jargon about how Docker is now an industry standard, and another user says "are you going to rebuild your container with every code change?" and another user says "just mount a volume"! 

![back and forth reddit thread about using Docker to run Rails on a Windows machine](/media/reddit-rails-docker-thread.png "Reddit Thread Docker Rails")

What a constructive dialogue!

Anyway there are a couple fun things that come of such a conversation, most obviously, how would one run Rails in a Docker container, second, what did the last comment mean when they said mount a volume? Well this post doesn't look to explicitly describe how to set up a Docker container with Rails, but I want to go over my personal Docker work container, and in the process we will see how I did set up Rails, as well how we would mount a volume when we run a container. Sounds fun? Good.

My Docker image is called Jubuntu, that stands for "J" which is the first letter of my name, "ubuntu" the very popular Linux distro and base image of my image. You can see it on [Docker hub](https://hub.docker.com/r/jaydp123/jubuntu), [Github](https://github.com/jdpaterson/jubuntu), or if you have Docker installed you can pull it right now with: 

`docker pull jaydp123/jubuntu`

Right now it supports Python3, Ruby, Node, and some other fun stuff. Ok so I just want to open up [the main Dockerfile](https://github.com/jdpaterson/jubuntu/blob/master/Dockerfile) and explain all what's going on so, here is the first bit:

(now keep in mind this is just a personal project! It's not optimized and I'm sure there are some things I could be doing better)

(also my home PC is a Windows, so I normally run this on Windows Subsystem Linux 2 (WSL2) but I have also run it on my Mac laptop)

```
FROM ubuntu:18.04
ARG DEBIAN_FRONTEND=noninteractive
ARG TIMEZONE=Canada/Pacific
ARG USER_ID=1000
ARG GROUP_ID=1001

```

From the top we set our base image as ubuntu v18.04, then we set this DEBIAN_FRONTEND variable to \`noninteractive\`, this just avoids some issues where installations might ask for user input. We set a TIMEZONE, that's arbitrary but I do think it fixed an issue for me at some point, and we set the USER_ID and GROUP_ID variables. 

Notice I chose to hardcode the USER_ID and GROUP_ID variables. This is because at some point I was experiencing issues with user permissions when running this container on a Mac vs. Windows WSL2. Because the USER_ID on my WSL2 was not the same as the USER_ID on my Mac, and so any file changes made from within the container, would use whichever USER_ID ran the container (either the Mac one or the WSL2 user), and so then if I tried editing those same files on a different computer, I was getting user permissions issues, because the USER_ID would be different from a different operating system. Crazy right!? If you know of a better way around this let me know but I fixed this issue by hard-coding the IDs. 

Ok next up we run some base installations, mostly Python related stuff + git, vim (let's hear it for vim!) and zsh (sweet sweet zsh)...fun stuff! Other stuff like curl, unzip, sudo, make, I actually need those for later in the Dockerfile so I installed them at the top.

```
RUN apt update && apt install -y \
    ansible \
    build-essential \
    curl \
    git \
    libncurses5-dev \
    libncursesw5-dev \
    libreadline-dev \
    libssl-dev \
    libffi-dev \
    libsqlite3-dev \
    make \
    python3.8 \
    python3-pip \
    python3-dev \
    python3-venv \
    software-properties-common \
    sudo \
    unzip \
    vim \
    wget \
    zlib1g-dev \
    zsh
```
Ok next up I install yarn and postgres, not in any particular order, I could move these installs down a bit in the file, probably I'll do that someday. Mostly I just followed the instructions for the respective websites, minimally translated into Docker friendly syntax.

```
# Postgres
RUN echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
    && apt update \
    && apt install -y postgresql libpq-dev

# Prep for yarn install
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
```
