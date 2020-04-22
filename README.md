# WebAssignment
Prototype of web-tech assignment for WebTechnology in UoB.\

Members of the group: only Phoenix Yu, ho19002.

Introduction

This web aims at creating an atmosphertic environment for the users to relax after work or study.
The background of the webpage is fully dynamic which imports .mp4 format files.
The users may chose between the library provided(though not yet implemented), or files of their own.
The same goes with the sounds(in .mp3 format only), however added a central switch which is by default toggled off in case of bad webpage design.

User profiles, special effects and other implementations are still ongoing.

Database for the webpage stores the directory of users' previously used background, sounds, timer-configurations, etc.
This includes static file directory from internal library or external directories on user's PC.
If failed to find from external directory, the web would automatically switch to the content in the library while pop-up a warning.

Current achievements:
-Sidebar menu(contents may be adjusted)
-Modals for background and sound configuration

Ongoing tasks:
-Modals for other configurations.
-Clashes between modals.
-Internal timers, alarm sounds for end of relaxation.
-Effects like breath modulation, inspired from Bejewelled 3 from PopCap Games, Inc.
-Database settings.

Major breach:
Performance of this webpage has NOT been evaluated through node.js. May due to the abundant file formats the server.js should implement. 
ONLY BASIC HTML WITHOUT CSS EFFECTS OR JAVASCRIPT LOGIC CAN BE SEEN WITH CURRENT NODE.JS SETTINGS.
WHEN HTML FILE IS OPENED DIRECTLY WITH GOOGLE CHROME, THE EFFECTS PERFORM AS EXPECTED.
THIS PROVED TO BE THE CURRENTLY BIGGEST PROBLEM OF THE ASSIGNMENT.
RE-DESIGNS ON SERVER.JS REQUIRED.
