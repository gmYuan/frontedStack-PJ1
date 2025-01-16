let title = require('./title');
console.log(title);

// const bootstrap = require('bootstrap');
// console.log('bootstrap--', bootstrap);


// import $ from 'Jquery';
// console.log('Jquery--', $);

// import _ from 'Lodash'; 
// console.log('lodash是--', _);

// import './index.css';

// import moment from 'moment';
// console.log('moment--', moment);


console.log('我是src/index.js里的process.env.NODE_ENV----', process.env.NODE_ENV);
console.log('我是src/index.js里的process.env----', process.env);


let playBtn = document.getElementById('play');
playBtn.addEventListener('click', () => {
  import(/* webpackChunkName: "myVideo", webpackPrefetch: true */ './video').then((res) => {
    console.log('res是', res);
  })
})

