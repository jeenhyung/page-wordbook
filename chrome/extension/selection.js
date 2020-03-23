

// 메시지 센더 to background.js
chrome.runtime.sendMessage({greeting: 'backgroundhello'}, (response) => {
  console.log("[contentscript] chrome.runtime.sendMessage()");
  console.log(response.farewell);
  // var checkReady = setInterval(() => {
  //     if (document.readyState === "complete") {
  //         clearInterval(checkReady)
  //         console.log("We're in the injected content script!")
  //     }
  // })
});

// 메시지 리스너 from todoapp.js
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log('[contentscript] chrome.runtime.onMessage.addListener()');
    console.log(sender.tab ? "[contentscript] from a content script:" + sender.tab.url : "[contentscript] from the extension");
    if (request.greeting === 'contenthello') {
      sendResponse({ farewell: 'uigoodbye' });
    }
});


let selection = '';
var actualCode = 'function btnClick() {'
               + '    alert(2);'
               + '    console.log("The state of the player has changed");'
               + '}';

//
// const iconBtnDiv = document.createElement('div');
const iconBtn = document.createElement('button');



// var iconBtnClickScript = document.createElement('script');
// iconBtnClickScript.textContent = actualCode;
// (document.head||document.documentElement).appendChild(iconBtnClickScript);
// iconBtnClickScript.parentNode.removeChild(iconBtnClickScript);


function initiconBtn() {
  // iconBtn.setAttribute('class', 'iconbtn');
  iconBtn.setAttribute('id', 'iconbtn');
  iconBtn.setAttribute('value', '저장');
  iconBtn.style.visibility = 'hidden';
  iconBtn.style.position = 'absolute';
  // iconBtn.setAttribute('onclick', 'btnClick();');
  // iconBtn.setAttribute.onclick = function(e) {
  //   alert(3);
  // };
  iconBtn.addEventListener('click', (e) => {
    console.log('iconBtn.addEventListener.click() selection:' + selection);
    
    chrome.runtime.sendMessage({ selection }, (response) => {
      console.log("[contentscript] chrome.runtime.sendMessage()");
      console.log(response.farewell);
    });

    iconBtn.style.visibility = 'hidden';
  }, false);

  iconBtn.innerHTML='<text>저장</text>';
  // iconBtn.innerText='저장';
}

// function initiconBtnDiv() {
//   console.log('initiconBtnDiv()');
//   iconBtnDiv.style.visibility = 'hidden';
//   iconBtnDiv.style.position = 'absolute';
//   iconBtnDiv.appendChild(iconBtn);
// }

initiconBtn();
// initiconBtnDiv();


// document.body.appendChild(iconBtnDiv);
document.body.appendChild(iconBtn);

// function btnClick() {
//   alert(3);
// }
function renderIconBtn(mouseX, mouseY) {
  // iconBtnDiv.innerHTML = '<button id="iconbtn" onclick="btnClick()"><i class="fa fa-home"></i></button>';
  iconBtn.style.top = `${mouseY}px`;
  iconBtn.style.left = `${mouseX}px`;
  iconBtn.style.visibility = 'visible';
  iconBtn.style.position = 'absolute';
}

function translateText(mouseX, mouseY, selection) {
  renderIconBtn(mouseX, mouseY);
}

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', (e) => {
  selection = window.getSelection().toString();

  console.log("document.addEventListener.mouseup() selection:" + JSON.stringify(selection));
  if (selection.length > 0) {
    translateText(e.pageX - 20, e.pageY + 5, selection);
  }

}, false);

// Close the bubble when we click on the screen.
document.addEventListener('mousedown', (e) => {
  if (selection.length === 0 || selection === '\n' || selection === '\n ' || selection === ' ') {
    iconBtn.style.visibility = 'hidden';
  }
}, false);




