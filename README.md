# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

A hands on project mainly practicing HTML, CSS, JS, JQuery and AJAX front-end skills. Node, Express back-end skills.

## Getting Started

1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
3. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- body-parser
- chance
- md5
- Node 5.10.x or above

## Dev Dependencies
- nodemon

## Screenshots
!["screenshot of mobile/tablet layout "](https://github.com/eyoa/tweeter/blob/master/public/images/smallerLayout.png?raw=true)
!["screenshot of desktop layout "](https://github.com/eyoa/tweeter/blob/master/public/images/desktopLayout.png?raw=true)
!["screenshot of counter"](https://github.com/eyoa/tweeter/blob/master/public/images/desktopLayout.png?raw=true)
!["screenshot of error message display "](https://github.com/eyoa/tweeter/blob/master/public/images/errorMsg.png?raw=true)
!["screenshot of back to top button "](https://github.com/eyoa/tweeter/blob/master/public/images/backToTop.png?raw=true)



## Features
- Character counter
  - Shows how many characters remaining from maximum count of 140
  - will turn red when exceeding 140 limit
  - shows negative number of characters over the limit. 
- Submits new tweets 
  - submits new tweets via Ajax to the server 
  - checks for invalid tweets (blank or over 140 chracters) and shows corresponding error message
  - escapes the new tweet content to prevent XSS
- Nav bar write new tweet button
  - compose tweet area is hidden at first
  - the button toggles animated slideup and down the compose tweet area
  - also auto focuses when appearing
- back to top button
  - when user scrolls past the header a back to top button appears
  - will bring back up to the top of the page
  - will slide down the compose tweet area and auto focus 
- layout changes for responsive design (desktop and mobile versions) 