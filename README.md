# Pathfinding Visualizer

This project is intended to show a visualizing of how pathfinding algorithms work.
Users can compare each algorithm and follow along with the algorithm so they can have a better understanding. 

The Visualizer can be viewed at: https://nkbrew.github.io/pathfinding-visualizer/

# Algorithms
Several pathfinding algorithms are implemented including:

- Dijkstra: (weighted) the grandfather to most pathfinding algorithms and promises the shortest path.
- A* Search: (weighted) arguably the best pathfinding algorithm and the most common algoirithm used in video games. It is based on Dijkstra's algorithm with a few modifications allowing it to be much faster while still maintaing the promise of having the shortest path.
- Greedy: (weighted) this algorithm, while quick, can be used when speed over correctness is the top priority. It does not promise to give you the shortest path, but it does promise to give a path fast.
- Depth First Search: (unweighted) an algorithm used mostly to demonstrate how the other algorithms exceed it. DFS is not suited well for pathfinding as it takes a long time and does not guarantee the shortest path.
- Breadth First Search: (unweighted) a useful, but limited algorithm. BFS guarantees the shortest path, but is restricted due to being unweighted.


# Stack
The project was built using React, TypeScript and SASS.

I also used Create React App to create the project, and FontAwesome for icons.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/320px-React-icon.svg.png" style="height:100px"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" style="height:100px"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/320px-Sass_Logo_Color.svg.png" style="height:100px"/>

# Running Locally

If you wish to clone the repo and run the code locally you can do so by running the following commands after cloning the repo.

*Note: I tried using yarn for this project. Feel free to use npm by default though. Stick to one or the other. 

To install dependencies:  

 ```
 yarn
 ```  

or 
```
npm install
```  
Then, To run the project:  
```
yarn start
```
or
```
npm start
```

# Things I Learned

This project was mainly an oppurtunity to learn tools. I'll talk about some of the 
tools and stack I used and why I like them.

React: I have experience in React, but have never created a full web app from start to finish myself. It was a lot of fun being able to control everything how I wanted to make it. I enjoy
using React a lot. It's state management tools are a pleasure to work with, especially 
with React Hooks.

Typescript: I've tried typescript in the past on a few projects I started but never finished. I've always enjoyed it over pure Javascript, even when working on my own. I made it a goal to finish this project, and
Typescript really helped my brain to understand and put a better picture in my head of what I wanted to build. I also found it a huge advantage when I would take a break for a couple days and come back. Being able to just look at the type of object I had previously defined allowed me to settle back into actually writing code. 

SASS: SASS is a lot of fun. I am still learning CSS, so being able to use the SCSS layout was a big advantage for me. Variables are great, and I prefer the SASS syntax over the way its done in pure CSS. I enjoy a lot of the functions included in SASS like darken() to be able to quickly adjust a previously defined variable.

GitHub Pages: The webapp is hosted on github pages. This is the first webapp I've made myself that is actually hosted somewhere. I was always intimidated by it because I thought it would be very difficult, or expensive. I was pleasantly surprised by how easy and free it was to do with GitHub Pages.

GitHub Actions: Something I didn't really have to do was automate my deploys. I don't really like the idea of manually deploying after every change. So I looked into GitHub actions to automate my deploys and was very happy with again how easy it was to get working, and the options available to use. My actions script is simple, but I like the idea that I could make it much more complex if I wanted to. 
