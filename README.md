# WebAssignment
Web-tech assignment for WebTechnology in UoB.

Members of the group: only Phoenix Yu, ho19002.

## Introduction
This application aims at creating an atmosphertic environment for the users to relax after work or study. The background of the webpage is fully dynamic which imports .mp4 format files. The users may chose between the library provided(though not yet implemented), or files of their own. The same goes with the sounds(in .mp3 format only), however added a central switch which is by default toggled off in case of bad webpage design.

## Self-Markings:
-HTML: A;

-CSS: A;

-JAVASCRIPT: A;

The features of responsive sidebar, login/administration page and modals are learned from external sources. No bootstrap was implemented but instead the work on HTML, CSS and JAVASCRIPT were learned either from self-experimenting, or examples from elsewhere but retyped after full understanding.

Some of the template goes from:

[Responsive Sidebar Tutorial](https://www.youtube.com/watch?v=wpGNFGqNfdU)

[Login and Registration Form](https://www.youtube.com/watch?v=Ec1G5Hp-8Ko&t=271s)

[Simple-to-implement Modals from JQuery external library](https://jquerymodal.com/)

-PNG: B;

-SVG: B;

Since I did not use static images for most of the implementation apart from the login page, I only implemented GIMP for resizing and modifying the resolution of the original image. SVG is basically implemented on the sidebar of admin.html from Font Awesome website.

-SERVER: A-;

Server-wise, although implemented cookies for backing up the preferences of the user, the server still fails for fetching data from user(see [problems](## Problems) for specific description). And the simple structure and bootstrap-less implementation requires less work for content negotiation and works on URL validation.

-DATABASE: B+;

Some security work on database and prepared statements are implemented for database-related application security.

-DYNAMIC PAGE: A-;

Client-wise, a template html is created for valid users and their preference storage.


## Achievements:
-Sidebar menu(contents may be adjusted).

-Modals for background and sound configuration, local audio/video file adjustment.

-A login page for client usage, with the support of sqlite3 database to store client accounts.

-Dynamic page demonstration based on user account and preference.

-Implementation of cookies to temporarily store the last state of a user interface.

-Password security implementing SHA256.

-Operational performance using node/express.js.

-Since the web does not use any bootstrap, there is not much version issue on implementing the webpage.


## Problems:
-Unable to fetch local audio/video files as planned. Due to the security protocol that when fetching data from local storage, the absolute path of the file should NEVER be shown. Attempts of using Data URLs have made but failed due to the fact that Data URLs of audio and video types are too large for solely implememnting cookies and database. Local storage may prove as an alternative but not the ideal solution since it serves as duplicating audio/video files to the local client, making it storage-demanding.

-Timer, breath modulator interface, and special effects not implemented, due to the work on server side.

-Certificate not made, only SHA256 password hashing is made for securing data.

## Conclusion:
Handling the project alone is challenging but rewarding. For client side, the project is unconventional in that it heavily implement the usage of large files such as videos and audio. For the server, layers of security issues has to be reconsidered for less storage and priviledge usage of client interaction. 

Services provided contains much potentials for the project. The main body can not only be just simple texts, but also interface with small modules, or just leave the body blank by default. The sidebar may add extra features like the intended breath modulator, timer, routine selection, alarm, special-effect selection and access for feedback from users.
