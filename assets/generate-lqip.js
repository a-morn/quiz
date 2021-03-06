const lqip = require("lqip");

const files = [
  "./public/countries/world-map.jpeg",
  "./public/game-of-thrones/got-tapestry.jpg",
  "./public/music-theory/abandoned-art-school.jpg",
  "./public/computer-science/hhkb2.jpg",
  "./public/mathematics/mandelbrot.png"
];

files.forEach(async (file) => {
  const base64 = await lqip.base64(file);
  console.log(file, "\n", base64);
});
