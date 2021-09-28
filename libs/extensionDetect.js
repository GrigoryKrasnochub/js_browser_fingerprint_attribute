const Extensions = [
  {
    id: 'aapbdbdomjkkjkaonfhkkikfgjllcleb',
    title: 'GoogleTranslate',
    sourceFile: 'options.html'
  },
  {
    id: 'aapbdb2mjkkjkaonfhkkikfgjllcleb',
    title: 'NotGoogleTranslate',
    sourceFile: 'options.html'
  },
  {
    id: 'aapbdb2mjkkjkaonfhkkikfgjllcleeb',
    title: 'NotGoogleTranslate2',
    sourceFile: 'options.html'
  },
];

function getExtensions() {
  let extensions = {};
  return new Promise(async resolve => {
    for (let i = 0; i < Extensions.length; i++) {
      extensions[Extensions[i].title] = false;
      await fetch('chrome-extension://' + Extensions[i].id + '/' + Extensions[i].sourceFile).then(
          (response) => {
            if (response.ok) {
              extensions[Extensions[i].title] = true;
            }
          }
      ).catch(status => {
        return console.log(status);
      });
    }
    resolve(extensions);
  })
}