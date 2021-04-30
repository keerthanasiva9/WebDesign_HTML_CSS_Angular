//Assigns div the value selected from the text editor area
let div = document.querySelector('.text-editor');

//------------------------------------------------BOLD----------------------------------------------------------
//Gets and assigns the bold button id
let boldBtn = document.getElementById('Bold-Btn');

let boldClickListener = (event) => {

  //Gets the selection
  let selection = window.getSelection();
  //Gets the range starting from 0
  let range = selection.getRangeAt(0);
  let parent = selection.anchorNode.parentElement;
 
  //Gets the string from the text area and replace the selected text with the bold text
  if(parent == div){
    let nspan = document. createElement('span');
    nspan.classList.add('text-bold');
    nspan.textContent=selection;
    console.log(nspan.innerHTML);
    range.deleteContents();
    range.insertNode(nspan);
  }

  //Changes it back to normal text!
  else
  {
    if(parent.classList.contains('text-bold')){
      let nspan = document. createElement('span');
      nspan.classList.add('text-unbold');
      nspan.textContent=selection;
      console.log(nspan.innerHTML);
      range.deleteContents();
      range.insertNode(nspan);
    }
    else{
      let nspan = document. createElement('span');
    nspan.classList.add('text-bold');
    nspan.textContent=selection;
    console.log(nspan.innerHTML);
    range.deleteContents();
    range.insertNode(nspan);
    }
  }
};

//Event happens on the click of the button
boldBtn.addEventListener('click', boldClickListener);

//---------------------------Italics------------------------------------------------------------
let italicBtn = document.getElementById('Italic-Btn');

let italicClickListener = (event) => {
//Gets the selection
let selection = window.getSelection();
//Gets the range
  let range = selection.getRangeAt(0);
  let parent = selection.anchorNode.parentElement;
 
  //Gets the string from the text area and replace the selected text with the italic text
  if(parent == div){
    let nspan = document. createElement('span');
    nspan.classList.add('text-italic');
    nspan.textContent=selection;
    console.log(nspan.innerHTML);
    range.deleteContents();
    range.insertNode(nspan);
  }

  else
  {
    if(parent.classList.contains('text-italic')){
      let nspan = document. createElement('span');
      nspan.classList.add('text-unbold');
      nspan.textContent=selection;
      console.log(nspan.innerHTML);
      range.deleteContents();
      range.insertNode(nspan);
    }
    else{
      let nspan = document. createElement('span');
    nspan.classList.add('text-italic');
    nspan.textContent=selection;
    console.log(nspan.innerHTML);
    range.deleteContents();
    range.insertNode(nspan);
    }
  }
};

//Event happens on the click of the button
italicBtn.addEventListener('click', italicClickListener);


//----------------------------------Underline-------------------------------------------------
let underlineBtn = document.getElementById('Underline-Btn');

let underClickListener = (event) => {
  let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let parent = selection.anchorNode.parentElement;
   
//Gets the string from the text area and replace the selected text with the Underlined text
    if(parent == div){
      let nspan = document. createElement('span');
      nspan.classList.add('text-underline');
      nspan.textContent=selection;
      console.log(nspan.innerHTML);
      range.deleteContents();
      range.insertNode(nspan);
    }
  
    //Changes it back to normal text
    else
    {
      if(parent.classList.contains('text-underline')){
        let nspan = document. createElement('span');
        nspan.classList.add('text-unbold');
        nspan.textContent=selection;
        console.log(nspan.innerHTML);
        range.deleteContents();
        range.insertNode(nspan);
      }
      else{
        let nspan = document. createElement('span');
      nspan.classList.add('text-underline');
      nspan.textContent=selection;
      console.log(nspan.innerHTML);
      range.deleteContents();
      range.insertNode(nspan);
      }
    }
  };

  //Event happens on click of the button
underlineBtn.addEventListener('click', underClickListener);

//-----------------------------Left Alignment-------------------------------------------------------------------
let leftBtn = document.getElementById('Left-Btn');

//Function to align the text to the left and calling the function on click of the button
function leftAlign(){
  document.getElementById("text-editor").style.textAlign="left";
}

//----------------------------Right Alignment-------------------------------------------------
let rightBtn = document.getElementById('Right-Btn');

//Function to align the text to the right and calling the function on click of the button
function rightAlign(){
  document.getElementById("text-editor").style.textAlign="right";
}


//------------------------------------Justify-------------------------------------------------
let justifyBtn = document.getElementById('Justify-Btn');

//Function to justify the text and calling the function on click of the button
function justifyAlign(){
  document.getElementById("text-editor").style.textAlign="justify";
}
