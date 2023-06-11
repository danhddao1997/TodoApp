# To-do App

## Functions

1.  Create to-do item
2.  Update to-do item
3.  Delete to-do item
4.  Sort and filter items in list by status
5.  Quick switch status for item

## Packages

1.  React Navigation: for app navigation
2.  Redux: for managing state
3.  RealmDB: for storing and querying to-do database
4.  react-native-vector-icons: pre-packaged icon sets
5.  react-native-get-random-values: use for handling BSON id from RealmDB, recommended by [MongoDB themselves (see README.md)](https://github.com/mongodb/js-bson)
6.  react-hook-form: managing form creation and edit
7.  yup: validation schema

## Setting up

1.  Install / enable yarn (if you have not yet to do so)
2.  Run below command to install packages
    `yarn install`
3.  Setup react-native environment
    a. Android: [Setting up the development environment · React Native (Android)](https://reactnative.dev/docs/environment-setup?guide=native&platform=android)
    b. iOS: [Setting up the development environment · React Native (iOS)](https://reactnative.dev/docs/environment-setup?guide=native&platform=ios)
4.  Run command below to add ios packages (the `pod-install` library is developed by Expo team)
    `npx pod-install`
5.  Run below functions
    `yarn ios` to run on iOS simulator
    `yarn android` to run on Android emulator

## What's missing?

Testing function: N/A
