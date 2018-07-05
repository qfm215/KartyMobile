#!/bin/bash
sudo sysctl -w fs.inotify.max_user_instances=1024
sudo sysctl -w fs.inotify.max_user_watches=12288
npm run android
