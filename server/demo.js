console.log("hello");

function getRoot(value, callback) {
  setTimeout(() => {
    const root = Math.sqrt(value);
    callback(root);
  }, Math.random() * 1000);
}

function getRootList(arr, callback) {
  callback(getRoot(9));
}

getRootList([1, 9, 4, 16], (roots) => console.log(roots));
