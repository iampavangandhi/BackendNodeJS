const os = require("os");

//console.log(os.cpus());
for (e of os.cpus()) {
  console.log(e.model);
}

os.cpus().forEach(e => {
  console.log(e.model);
});

console.log(os.hostname());
