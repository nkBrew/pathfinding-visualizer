(this["webpackJsonpreact-pathfinder"]=this["webpackJsonpreact-pathfinder"]||[]).push([[0],{21:function(e,t,o){},22:function(e,t,o){},29:function(e,t,o){},30:function(e,t,o){},31:function(e,t,o){},32:function(e,t,o){},33:function(e,t,o){},34:function(e,t,o){},35:function(e,t,o){"use strict";o.r(t);var n,i=o(2),r=o.n(i),c=o(16),a=o.n(c),s=(o(21),o(1)),l=o(9),d=o(4),h=o(5),u=o(13),j=(o(22),o(8)),b=o.n(j),f=o(7),g=o(6),O=o(0);!function(e){e.WALL="Wall",e.WEIGHT="Weight",e.FINDER="FINDER",e.TARGET="TARGET"}(n||(n={}));var v,w,p,A="rgb(89, 89, 89)",x=function(e){var t=e.col,o=e.row,i=e.isFinder,r=e.isTarget,c=e.isPath,a=e.isVisited,s=e.pathOnScreen,l=e.nodeClass,d=e.mouseEnterHandler,h=e.mouseDownHandler,u=e.mouseUpHandler;return Object(O.jsx)("div",{className:"node",onMouseEnter:function(){return d(t,o)},onMouseDown:function(){return h(t,o)},onMouseUp:function(){return u(t,o)},children:Object(O.jsxs)("div",{className:"node-center-align",children:[Object(O.jsx)("div",{className:b()("",{"node-wall":l==n.WALL,"node-visited":a&&!s&&!c,"node-visited-no-ani":a&&s,"node-path":c&&!s,"node-path-no-ani":c&&s})}),i&&Object(O.jsx)("div",{className:"node-icon",children:Object(O.jsx)(f.a,{icon:g.c,size:"lg",color:"rgb(89, 89, 89)"})}),r&&Object(O.jsx)("div",{className:"node-icon",children:Object(O.jsx)(f.a,{icon:g.d,size:"1x",transform:{rotate:20},color:A})}),l==n.WEIGHT&&Object(O.jsx)("div",{className:"node-icon node-weight",children:Object(O.jsx)(f.a,{icon:g.e,size:"1x",color:A})})]})})},m=r.a.memo(x),N=function(e,t,o,i,r){var c={explored:!1,parent:e,col:e.col,row:e.row};e.col>0&&r[e.row][e.col-1].nodeClass!=n.WALL&&!r[e.row][e.col-1].explored&&i.push(Object(s.a)(Object(s.a)({},c),{},{col:e.col-1})),e.row<t-1&&r[e.row+1][e.col].nodeClass!=n.WALL&&!r[e.row+1][e.col].explored&&i.push(Object(s.a)(Object(s.a)({},c),{},{row:e.row+1})),e.col<o-1&&r[e.row][e.col+1].nodeClass!=n.WALL&&!r[e.row][e.col+1].explored&&i.push(Object(s.a)(Object(s.a)({},c),{},{col:e.col+1})),e.row>0&&r[e.row-1][e.col].nodeClass!=n.WALL&&!r[e.row-1][e.col].explored&&i.push(Object(s.a)(Object(s.a)({},c),{},{row:e.row-1}))},S=function(e,t,o,i,r){var c={explored:!1,parent:e,col:e.col,row:e.row};e.col>0&&r[e.row][e.col-1].nodeClass!=n.WALL&&!r[e.row][e.col-1].explored&&i.push(Object(s.a)(Object(s.a)({},c),{},{col:e.col-1})),e.row<t-1&&r[e.row+1][e.col].nodeClass!=n.WALL&&!r[e.row+1][e.col].explored&&i.push(Object(s.a)(Object(s.a)({},c),{},{row:e.row+1})),e.col<o-1&&r[e.row][e.col+1].nodeClass!=n.WALL&&!r[e.row][e.col+1].explored&&i.push(Object(s.a)(Object(s.a)({},c),{},{col:e.col+1})),e.row>0&&r[e.row-1][e.col].nodeClass!=n.WALL&&!r[e.row-1][e.col].explored&&i.push(Object(s.a)(Object(s.a)({},c),{},{row:e.row-1}))},E=function(e,t,o,i,r){var c=function(e,t,o){for(var n=[],i=0;i<t;i++){for(var r=[],c=0;c<o;c++){var a={dist:1/0,row:i,col:c,nodeClass:e[i][c].nodeClass,previous:null,explored:!1};r.push(a)}n.push(r)}return n}(o,i,r),a=c[e.row][e.col];a.dist=T(t,e);var s=[],l=[];s.push(a);for(var d=function(){var e=s[0],i=0;if(s.forEach((function(t,o){t.dist<e.dist&&!t.explored&&(e=t,i=o)})),e.explored=!0,l.push(e),s.splice(i,1),k(e,t)){for(var r=[],a=e;null!=a;)r.push(a),a=a.previous;return{v:[l,r]}}var d=function(e,t){var o=t.length;if(0==o)return[];var i=t[0].length;return 0==i?[]:[{col:e.col+1,row:e.row},{col:e.col-1,row:e.row},{col:e.col,row:e.row+1},{col:e.col,row:e.row-1}].filter((function(e){return e.row<o&&e.row>=0&&e.col<i&&e.col>=0&&t[e.row][e.col].nodeClass!=n.WALL&&!t[e.row][e.col].explored})).map((function(e){return t[e.row][e.col]}))}(e,c);d.forEach((function(i){var r=o[i.row][i.col].nodeClass==n.WEIGHT?R:0;i.dist=T(t,i)+r,i.previous=e,s.push(i)}))};s.length;){var h=d();if("object"===typeof h)return h.v}return[l,[]]},R=15;!function(e){e.DIJKSTRA="DIJKSTRA",e.ASTAR="ASTAR",e.GREEDY="GREEDY",e.DFS="DFS",e.BFS="BFS"}(p||(p={}));var D=(v={},Object(h.a)(v,p.DIJKSTRA,"(weighted) the grandfather to most pathfinding algorithms and promises the shortest path."),Object(h.a)(v,p.ASTAR,"(weighted) arguably the best pathfinding algorithms and the most common algoirithms used in video games. It is based on Dijkstra's algorithm with a few modifications allowing it to be much faster while still maintaing the promise of having the shortest path."),Object(h.a)(v,p.GREEDY,"(weighted) this algorithm, while quick, can be used when speed over correctness is the top priority. It does not promise to give you the shortest path, but it does promise to give a path fast."),Object(h.a)(v,p.DFS,"(unweighted) an algorithm used mostly to demonstrate how the other algorithms exceed it. DFS is not suited well for pathfinding as it takes a long time and doe not guarantee the shortest path."),Object(h.a)(v,p.BFS,"(unweighted) a useful, but limited algorithm. BFS guarantees the shortest path, but is restricted due to being unweighted."),v),H=(w={},Object(h.a)(w,p.ASTAR,"A* Search"),Object(h.a)(w,p.DIJKSTRA,"Dijkstra"),Object(h.a)(w,p.GREEDY,"Greedy"),Object(h.a)(w,p.DFS,"Depth First Search"),Object(h.a)(w,p.BFS,"Breadth First Search"),w),k=function(e,t){return e.row==t.row&&e.col==t.col},C=function(e,t,o,i,r,c){switch(e){case p.DIJKSTRA:return function(e,t,o,i,r){for(var c=[],a=0;a<i;a++)for(var s=0;s<r;s++){var l={dist:1/0,previous:null,row:a,col:s,explored:!1};l.row==e.row&&l.col==e.col&&(l.dist=0),c.push(l)}for(var d=[],h=function(){var e=c.find((function(e){return!e.explored&&o[e.row][e.col].nodeClass!=n.WALL}));if(void 0==e)return{v:[d,[]]};var a=e;if(c.filter((function(e){return!e.explored})).forEach((function(e){e.dist<a.dist&&(a=e)})),a.dist==1/0)return{v:[d,[]]};if(a.explored=!0,d.push(a),k(a,t)){for(var s=[],l=a;null!=l;)s.push(l),l=l.previous;return{v:[d,s]}}[{col:a.col+1,row:a.row},{col:a.col-1,row:a.row},{col:a.col,row:a.row+1},{col:a.col,row:a.row-1}].filter((function(e){return e.col>=0&&e.col<r&&e.row>=0&&e.row<i&&o[e.row][e.col].nodeClass!=n.WALL})).forEach((function(e){var t=c[function(e,t,o){return e*o+t}(e.row,e.col,r)],i=o[e.row][e.col].nodeClass==n.WEIGHT?R:1,s=a.dist+i;s<t.dist&&(t.dist=s,t.previous=a)}))};c.some((function(e){return!e.explored}));){var u=h();if("object"===typeof u)return u.v}return[]}(t,o,i,r,c);case p.ASTAR:return function(e,t,o,i,r){var c=[],a=[],l=Object(s.a)(Object(s.a)({},e),{},{parent:null,fcost:0,gcost:0,hcost:0}),d=Object(s.a)(Object(s.a)({},t),{},{parent:null,fcost:0,gcost:0,hcost:0});c.push(l);for(var h=function(){var e=c[0],t=c.indexOf(e);if(c.forEach((function(o,n){o.fcost<e.fcost&&(e=o,t=n)})),c.splice(t,1),a.push(e),k(e,d)){for(var l=[],h=e;null!=h;)l.push(h),h=h.parent;return{v:[a,l]}}var j,b=[{col:e.col+1,row:e.row},{col:e.col-1,row:e.row},{col:e.col,row:e.row+1},{col:e.col,row:e.row-1}].filter((function(e){return e.row<i&&e.row>=0&&e.col<r&&e.col>=0&&o[e.row][e.col].nodeClass!=n.WALL})),f=Object(u.a)(b);try{for(f.s();!(j=f.n()).done;){var g,O=j.value,v=!1,w=Object(u.a)(a);try{for(w.s();!(g=w.n()).done;){var p=g.value;if(k(p,O)){v=!0;break}}}catch(q){w.e(q)}finally{w.f()}if(!v){var A,x=o[O.row][O.col].nodeClass==n.WEIGHT?R:1,m=e.gcost+x,N=T(O,d),S=m+N,E=Object(s.a)(Object(s.a)({},O),{},{parent:e,fcost:S,hcost:N,gcost:m}),D=!1,H=Object(u.a)(c);try{for(H.s();!(A=H.n()).done;){var C=A.value;k(E,C)&&C.gcost<E.gcost&&(D=!0)}}catch(q){H.e(q)}finally{H.f()}D||c.push(E)}}}catch(q){f.e(q)}finally{f.f()}};c.length>0;){var j=h();if("object"===typeof j)return j.v}return[a,[]]}(t,o,i,r,c);case p.GREEDY:return E(t,o,i,r,c);case p.DFS:return function(e,t,o,n,i){var r=[],c=Object(s.a)({explored:!1,nodeClass:o[e.row][e.col].nodeClass,parent:null},e);r.push(c);for(var a=[],l=[],d=0;d<n;d++){for(var h=[],u=0;u<i;u++)h.push({row:d,col:u,explored:!1,parent:null,nodeClass:o[d][u].nodeClass});l.push(h)}for(;r.length>0;){var j=r.pop();if(void 0==j)return[a,[]];if(j.explored=!0,l[j.row][j.col]=Object(s.a)({},j),a.push({col:j.col,row:j.row}),k(j,t)){for(var b=[],f=j;null!=f;)b.push(f),f=f.parent;return[a,b]}S(j,n,i,r,l)}return[a,[]]}(t,o,i,r,c);case p.BFS:return function(e,t,o,n,i){var r=[];r.push(Object(s.a)(Object(s.a)({},e),{},{explored:!1,parent:null,nodeClass:o[e.row][e.col].nodeClass}));for(var c=[],a=0;a<n;a++){for(var l=[],d=0;d<i;d++)l.push({col:d,row:a,parent:null,explored:!1,nodeClass:o[a][d].nodeClass});c.push(l)}for(var h=[];r.length>0;){var u=r.shift();if(void 0==u)return[h,[]];if(!c[u.row][u.col].explored){if(u.explored=!0,c[u.row][u.col]=Object(s.a)({},u),h.push({col:u.col,row:u.row}),k(u,t)){for(var j=[],b=u;null!=b;)j.push(b),b=b.parent;return[h,j]}N(u,n,i,r,c)}}return[h,[]]}(t,o,i,r,c);default:return[]}},T=function(e,t){return Math.pow(t.row-e.row,2)+Math.pow(t.col-e.col,2)},q=(o(29),function(e){var t=e.visualizing,o=e.algorithm,n=e.weightWall,r=e.onAlgorithmSelect,c=e.changeWeightWallToggle,a=e.onVisualize,s=e.onClear,l=Object(i.useState)(!1),h=Object(d.a)(l,2),u=h[0],j=h[1],v="Visualizing"+(o?" "+H[o]:"")+"!";return Object(O.jsx)("div",{className:"header-main",children:Object(O.jsx)("div",{className:"header-inner",children:Object(O.jsxs)("ul",{className:"header-wrapper",children:[Object(O.jsx)("li",{className:"flex-item",children:Object(O.jsx)("div",{className:"title",children:"Pathfinding Visualizer"})}),Object(O.jsx)("li",{className:"header-button flex-item-title",onClick:function(){return j(!u)},tabIndex:0,onBlur:function(){return j(!1)},children:Object(O.jsxs)("div",{className:"dropdown-container",children:[Object(O.jsx)("div",{className:b()("dropdown-btn",{"dropdown-btn-open":u,"dropdown-btn-hover":!u}),children:Object(O.jsx)("div",{children:Object(O.jsxs)("div",{className:"algorithms-label",children:["Algorithms ",Object(O.jsx)(f.a,{icon:u?g.b:g.a})]})})}),Object(O.jsx)("div",{className:b()("dropdown-content",{open:u,disabled:t}),children:Object.values(p).map((function(e){return Object(O.jsx)("a",{target:"#",onClick:function(){return r(e)},children:H[e]},"algorithm-dropdown-option"+e)}))})]})}),Object(O.jsx)("li",{className:"header-button flex-item",children:Object(O.jsx)("button",{className:b()("visualize-button",{disabled:t}),onClick:function(){return a()},disabled:t,children:v})}),Object(O.jsxs)("ul",{className:"flex-item",children:[Object(O.jsx)("li",{className:b()("header-button",{disabled:t}),onClick:function(){return c()},children:Object(O.jsxs)("div",{children:["Add ",n]})}),Object(O.jsx)("li",{className:b()("header-button",{disabled:t}),onClick:function(){return s(!0,!0,!0)},children:Object(O.jsx)("div",{children:"Clear Board"})}),Object(O.jsx)("li",{className:b()("header-button",{disabled:t}),onClick:function(){return s(!0,!1,!1)},children:Object(O.jsx)("div",{children:"Clear Walls"})}),Object(O.jsx)("li",{className:b()("header-button",{disabled:t}),onClick:function(){return s(!1,!0,!0)},children:Object(O.jsx)("div",{children:"Clear Path"})})]})]})})})}),y=(o(30),function(){return Object(O.jsx)("div",{className:"legend",children:Object(O.jsxs)("ul",{className:"legend-flexbox-wrapper",children:[Object(O.jsx)("li",{children:Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{children:"Finder"}),Object(O.jsx)(f.a,{icon:g.c})]})}),Object(O.jsx)("li",{children:Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{children:"Target"}),Object(O.jsx)(f.a,{icon:g.d})]})}),Object(O.jsx)("li",{children:Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{children:"Wall"}),Object(O.jsx)("div",{className:"legend-node",children:Object(O.jsx)("div",{className:"legend-node-wall"})})]})}),Object(O.jsx)("li",{children:Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{children:"Weight"}),Object(O.jsx)(f.a,{icon:g.e})]})}),Object(O.jsx)("li",{children:Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{children:"Visited Node "}),Object(O.jsx)("div",{className:"legend-node",children:Object(O.jsx)("div",{className:"legend-node-visited-0"})}),Object(O.jsx)("div",{className:"legend-node",children:Object(O.jsx)("div",{className:"legend-node-visited-1"})}),Object(O.jsx)("div",{className:"legend-node",children:Object(O.jsx)("div",{className:"legend-node-visited-2"})})]})}),Object(O.jsx)("li",{children:Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{children:"Path Node"}),Object(O.jsx)("div",{className:"legend-node",children:Object(O.jsx)("div",{className:"legend-node-path-0"})}),Object(O.jsx)("div",{className:"legend-node",children:Object(O.jsx)("div",{className:"legend-node-path-1"})})]})})]})})}),W=(o(31),function(e){var t=e.label,o=e.onClickHandler;return Object(O.jsx)("button",{className:"modal-button",onClick:o,children:t})}),L=(o(32),function(e){var t=e.heading,o=e.subheading,n=e.body;return Object(O.jsxs)("div",{children:[Object(O.jsx)("h1",{children:t}),o&&Object(O.jsx)("h4",{children:o}),n]})}),I=o.p+"static/media/algorithmAnimation.51b6fc2a.gif",P=o.p+"static/media/wallWeightAnimation.6b5f1849.gif",B=o.p+"static/media/dragFinderTarget.90f68543.gif",z=o.p+"static/media/toggleWallsWeights.443699c7.gif",F=[{heading:"Welcome to the Pathfinding Visualizer",subheading:"The Pathfinding Visualizer will show you how a pathfinding algorithm works by a visual representation",body:Object(O.jsxs)("div",{children:[Object(O.jsx)("p",{children:"This is a short tutorial intended to first give you a brief basic idea on what a pathfinding algorithm is and the basic instructions of how to use the application."}),Object(O.jsx)("p",{children:"This tutorial should take no longer than a couple minutes. If you'd rather learn by experimentation feel free to skip or close the tutorial anytime by clicking on the Close Tutorial button"})]})},{heading:"What is a Pathfinding Algorithm?",body:Object(O.jsxs)("div",{children:[Object(O.jsx)("p",{children:"A pathfinding algorithm is used to calculate the shortest path between two points. This application aims to show a visual representation of what the different algorithms do at each step of their search."}),Object(O.jsx)("p",{children:"Ever wonder how enemies in video games find you? These algorithms are commonly used in video games for this exact purpose among others! Other common use Cases include logistics planning, IP routing, robotics, and more!"}),Object(O.jsx)("p",{children:"While pathfinding algorithms can be used in many ways, this application will demonstrate the algorithm use cases on a 2D Cartesian plane with only horizontal and vertical moves allowed."})]})},{heading:"There are Different Algorithms!",subheading:"Like anything in life, not all Pathfinding algorithms are the same.",body:Object(O.jsxs)("div",{children:[Object(O.jsx)("p",{children:"Some pathfinding algorithms are weighted while others are unweighted. Weighted algorithms take into consideration the cost of reaching that node, while unweighted only consider the euclidian distance. In addition, some pathfinding algorithms can only promise a path between two points exists, while some promise the optimal shortest path between them."}),Object(O.jsx)("p",{children:"You can change algorithm used by the Visualizer from the Algorithms dropdown."}),Object(O.jsx)("img",{src:"data:image/png;base64,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"})]})},{heading:"Meet the algorithms",subheading:"Here is a brief description of the algorithms as well as which criterias they meet.",body:Object(O.jsx)("div",{className:"descriptions-container",children:Object(O.jsx)("ul",{className:"descriptions-ul",children:Object.values(p).map((function(e){return Object(O.jsxs)("li",{children:[Object(O.jsx)("b",{children:H[e]}),": ",D[e]]},"description-"+e)}))})})},{heading:"Adding Walls And Weights",subheading:"You can add walls and weights to the visualizer by clicking and dragging on any square in the application to add a wall. Walls are impassable terrain for the algorithm, and when calculating a path they will avoid this terrain. Weights are passable terrain, but have a higher cost of passing through that node than an unweighted node.",body:Object(O.jsxs)("div",{children:[Object(O.jsx)("p",{children:"Click and drag on the visualizer to add a wall or weight"}),Object(O.jsx)("img",{src:P}),Object(O.jsx)("p",{children:"You can toggle what you're adding by clicking the Add Weight/Wall button"}),Object(O.jsx)("img",{src:z})]})},{heading:"Visualizing",subheading:"To see the animation of the algorithm, click on the Visualize Button!",body:Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:I})})},{heading:"Moving the Finder and Target",subheading:"You can move the Finder and the target by clicking and dragging them around the screen. If a path is already on the screen, the new path and visited nodes will be immediately updated.",body:Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:B})})}],X=function(){var e=Object(i.useState)(!0),t=Object(d.a)(e,2),o=t[0],n=t[1],r=Object(i.useState)(1),c=Object(d.a)(r,2),a=c[0],l=c[1],h=F[a-1],u=function(e){(e>0&&a<F.length||e<0&&a>1)&&l(a+e)};return Object(O.jsx)("div",{id:"modal",className:"modal",onClick:function(e){"modal"==e.target.id&&n(!1)},style:{display:o?"block":"none"},children:Object(O.jsxs)("div",{id:"modal-content",className:"modal-content",children:[Object(O.jsxs)("p",{className:"float-right",children:[a,"/",F.length]}),Object(O.jsx)(L,Object(s.a)({},h)),Object(O.jsx)("div",{className:"modal-buttons-container",children:Object(O.jsxs)("div",{className:"modal-buttons-flexbox",children:[Object(O.jsx)(W,{label:"Previous",onClickHandler:function(){return u(-1)}}),Object(O.jsx)(W,{label:"Next",onClickHandler:function(){return u(1)}}),Object(O.jsx)(W,{label:"Close Tutorial",onClickHandler:function(){return n(!1)}})]})})]})})},V=(o(33),function(e){var t=e.children;return Object(O.jsx)("div",{children:Object(O.jsx)("div",{className:"grid-container",children:t})})}),Q=(o(34),window.innerWidth/34*.93>>0),Y=window.innerHeight/34*.9>>0,M=200,J=function(){var e=Object(i.useState)(!1),t=Object(d.a)(e,2),o=t[0],r=t[1],c=Object(i.useState)([[]]),a=Object(d.a)(c,2),h=a[0],u=a[1],j=Object(i.useState)(""),b=Object(d.a)(j,2),f=b[0],g=b[1],v=Object(i.useState)({col:0,row:0}),w=Object(d.a)(v,2),A=w[0],x=w[1],N=Object(i.useState)({col:0,row:0}),S=Object(d.a)(N,2),E=S[0],R=S[1],D=Object(i.useState)(!1),H=Object(d.a)(D,2),k=H[0],T=H[1],W=Object(i.useState)(!1),L=Object(d.a)(W,2),I=L[0],P=L[1],B=Object(i.useState)(p.ASTAR),z=Object(d.a)(B,2),F=z[0],J=z[1],U=Object(i.useState)(n.WALL),G=Object(d.a)(U,2),Z=G[0],K=G[1],$=Object(i.useRef)(null);Object(i.useEffect)((function(){for(var e=[],t=Q/3>>0,o=Y/2>>0,n=2*Q/3>>0,i=o,r=0;r<Y;r++){for(var c=[],a=0;a<Q;a++){var s={col:a,row:r,isFinder:t==a&&o==r,isTarget:n==a&&i==r,isPath:!1,isVisited:!1};c.push(s)}e.push(c)}u(e),x({col:t,row:o}),R({col:n,row:i})}),[]);var _=function(e,t,o){if(!k){for(var n=Object(l.a)(h),i=0;i<Y;i++)for(var r=0;r<Q;r++){var c=Object(s.a)({},h[i][r]);e&&(c.nodeClass=void 0),t&&(c.isPath=!1,c.isVisited=!1),n[i][r]=c}u(n),o&&P(!1)}},ee=function(){console.log(Z),Z==n.WEIGHT?K(n.WALL):K(n.WEIGHT)},te=function(e,t){var o=Object(l.a)(h),n=Object(s.a)({},o[t][e]),i=Object(s.a)(Object(s.a)({},n),{},{isVisited:!1,isPath:!1,nodeClass:n.nodeClass==Z?void 0:Z});o[t][e]=i,u(o)},oe=function(e,t){r(!0);var o=h[t][e];o.isFinder?g("finder"):o.isTarget?g("target"):te(e,t)},ne=function(){r(!1),f&&g("")},ie=function(e,t){var i=h[t][e];if(i.nodeClass!=n.WALL){var r=Object(l.a)(h);switch(f){case"finder":var c=Object(s.a)(Object(s.a)({},h[A.row][A.col]),{},{isFinder:!1}),a=Object(s.a)(Object(s.a)({},h[t][e]),{},{isFinder:!0});r[A.row][A.col]=c,r[t][e]=a,u(h),x({col:e,row:t}),I&&(_(!1,!0,!1),re(t,e,E.row,E.col,!1));break;case"target":var d=Object(s.a)(Object(s.a)({},h[E.row][E.col]),{},{isTarget:!1}),j=Object(s.a)(Object(s.a)({},h[t][e]),{},{isTarget:!0});r[E.row][E.col]=d,r[t][e]=j,u(h),R({col:e,row:t}),I&&(_(!1,!0,!1),re(A.row,A.col,t,e,!1))}}!o||f||i.isFinder||i.isTarget||te(e,t)},re=function(e,t,o,n,i){var r=C(F,{col:t,row:e},{col:n,row:o},h,Y,Q),c=r[0],a=r[1];I||T(!0),c&&(ce(c,i),a.length>0?ae(c.length,a,i):setTimeout((function(){T(!1),P(!0)}),c.length*M))},ce=function(e,t){if(t)for(var o=function(t){setTimeout((function(){var o=Object(l.a)(h),n=e[t],i=Object(s.a)(Object(s.a)({},h[n.row][n.col]),{},{isVisited:!0});o[i.row][i.col]=i,u(o)}),M*t)},n=0;n<e.length;n++)o(n);else{for(var i=Object(l.a)(h),r=0;r<e.length;r++){var c=e[r],a=Object(s.a)(Object(s.a)({},h[c.row][c.col]),{},{isVisited:!0});i[a.row][a.col]=a}u(i)}},ae=function(e,t,o){var n=t.reverse();if(o)for(var i=function(t){setTimeout((function(){var e=Object(l.a)(h),o=n[t],i=Object(s.a)(Object(s.a)({},h[o.row][o.col]),{},{isPath:!0});e[i.row][i.col]=i,u(e),t==n.length-1&&setTimeout((function(){T(!1),P(!0)}),800)}),M*e+M*t)},r=0;r<n.length;r++)i(r);else{for(var c=Object(l.a)(h),a=0;a<n.length;a++){var d=n[a],j=Object(s.a)(Object(s.a)({},h[d.row][d.col]),{},{isPath:!0});c[j.row][j.col]=j}u(c),T(!1),P(!0)}};return Object(i.useEffect)((function(){var e=function(e){"w"==e.key&&(console.log("hi"),ee())};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[Z]),Object(O.jsxs)("div",{children:[Object(O.jsx)(X,{}),Object(O.jsx)(q,{algorithm:F,visualizing:k,onAlgorithmSelect:function(e){k||J(e)},onVisualize:function(){_(!1,!0,!0),re(A.row,A.col,E.row,E.col,!0)},onClear:_,weightWall:Z,changeWeightWallToggle:ee}),Object(O.jsx)(y,{}),Object(O.jsx)("div",{className:"PathfindingVisualizer",children:Object(O.jsx)("div",{ref:$,children:Object(O.jsx)(V,{children:h.map((function(e,t){return Object(O.jsx)("div",{className:"grid-row",children:e.map((function(e){return Object(O.jsx)(m,{col:e.col,row:e.row,mouseEnterHandler:ie,isFinder:e.isFinder,isTarget:e.isTarget,mouseDownHandler:oe,mouseUpHandler:ne,isPath:e.isPath,isVisited:e.isVisited,pathOnScreen:I,nodeClass:e.nodeClass},"node-"+e.row+"-"+e.col)}))},"noderow"+t)}))})})})]})};var U=function(){return Object(O.jsx)("div",{className:"App",children:Object(O.jsx)(J,{})})},G=function(e){e&&e instanceof Function&&o.e(3).then(o.bind(null,36)).then((function(t){var o=t.getCLS,n=t.getFID,i=t.getFCP,r=t.getLCP,c=t.getTTFB;o(e),n(e),i(e),r(e),c(e)}))};a.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(U,{})}),document.getElementById("root")),G()}},[[35,1,2]]]);
//# sourceMappingURL=main.aa82f95c.chunk.js.map