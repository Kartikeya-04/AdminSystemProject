const bg = document.querySelector('.bg');
const taken = document.querySelector('#pic');
const btn = document.querySelector('.upload');
var username;
let cropper;
var repic;
taken.onchange = function () {
  bg.src = URL.createObjectURL(taken.files[0]);
  console.log(bg.src);
  const bg2 = bg.src;
  const take = taken.files[0];
  const re = new FileReader();
  re.addEventListener('load', () => {
    console.log(re.result);
    repic = re.result;
  });
  re.readAsDataURL(take);

  //

  //try1
};

bg.addEventListener('click', (e) => {
  if (!cropper) {
    cropper = new Cropper(bg, { aspectRatio: 1, viewMode: 0 });
  }

  //   const filee = e.target.files[0];
  //   console.log('data see');
  //   console.log(filee);

  //   // Ensure the canvas element is created and appended to the DOM
  //   //try2
  //   // const croppedCanvas = cropper.getCroppedCanvas();
  //   // if (croppedCanvas) {
  //   //   // Check if the canvas element is already appended
  //   //   const existingCanvas = document.querySelector('.cropped-canvas');
  //   //   if (existingCanvas) {
  //   //     existingCanvas.parentNode.replaceChild(croppedCanvas, existingCanvas);
  //   //   } else {
  //   //     document.body.appendChild(croppedCanvas);
  //   //   }

  //   //   const croppedDataURL = croppedCanvas.toDataURL('image/png');
  //   //   bg.src = croppedDataURL;
  //   // } else {
  //   //   console.error('Canvas element not found');
  //   // }
  //   //post
  //   // try {
  //   //     var username = document.querySelector('.username').value;

  //   //     const response = await fetch('http://localhost:5000/usercred', {
  //   //       method: 'POST',
  //   //       headers: {
  //   //         'Content-Type': 'application/json',
  //   //       },
  //   //       body: JSON.stringify({
  //   //         username: username,
  //   //         profile: pic,
  //   //       }),
  //   //     });

  //   //     const data = await response.json();

  //   //     console.log(data);

  //   //   } catch (error) {
  //   //     console.error('Error:', error);
  //   //   }

  //try image

  bg.addEventListener('load', () => {});
});

// try new

btn.addEventListener('click', async (e) => {
  e.preventDefault();
  document.querySelector('.view').disabled = false;
  var pic = bg.src;
  console.log('chechk');
  console.log(pic);

  try {
    console.log('check2');
    var my = JSON.stringify(pic);
    console.log('nrew');
    console.log(my);
    username = document.querySelector('#name').value;
    console.log(username);

    const response = await fetch('http://localhost:5000/usercred', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        // profile: my,
        profile: repic,
      }),
    });

    const data = await response.json();
    alert(JSON.stringify(data));
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
});

async function getCroppedDataURL(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = src;
  });
}

document.querySelector('.view').addEventListener('click', function () {
  shown();

  var myInput = document.getElementById('myInput');

  myInput.value = username;

  var sidepic = document.querySelector('.sidepic');
  sidepic.src = bg.src;

  //call backend

  // const result=fetch('http://localhost:')
});
var a = true;
var overElement = document.querySelector('.over');

function shown() {
  a = !a; // Toggle the value of 'a'

  if (a) {
    overElement.classList.add('high');
    overElement.classList.remove('low');
  } else {
    overElement.classList.add('low');
    overElement.classList.remove('high');
  }
}
