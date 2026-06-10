## Before running
- Change IP in _helpers.js on line 18 to match your devices ip
- Create .env file with: ROBOFLOW_API_KEY="add-your-api-key-here"
  (note: you need a roboflow account to get your own api key)
- Run React and backend on same local network
- Create and activate a python virtual environment
- Run backend/app.py 
- Run npx expo start

## Overview
This is an accessibility rating app developed in React Expo for
my final year project in my third year of uni.

The user can pick from predetermined locations and see either 
reviews that other users have given and give their own, or 
see the AI rating based on the features the object detection
has identified. It is mostly a suggestion on how AI can be 
implemented into access mapping tools to give some funcitonality
to the app even with a low userbase, and therefore low user
reviews. The app pulls all location and review data from a
firebase realtime database. App developed and tested using a
Genymotion emulator.

## What I learnt
- Further improved upon working with React
- How to implement a backend (that isn't firebase)
- How to use APIs in a project

## Improvements
- More engaging and appealing UI 
- More sophisticated object detection (with better and larger datasets)
- A map showing all local public spaces that the user can click on 
  to go into the rating view instead of a list of predetermined locations
