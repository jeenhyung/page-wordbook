// chrome.extension.onRequest.addListener(async (request, sender, sendResponse) => {
//   console.log(`chrome.extension.onRequest.addListener(): ${request.method}`);
//   if (request.method === 'getSelection') {
//     sendResponse({ data: window.getSelection().toString() });
//   } else {
//     sendResponse({}); // snub them.
//   }
// });

// function sendServiceRequest(selectedText) {
//   const serviceCall = 'http://www.google.com/search?q=' + selectedText;
//   chrome.tabs.create({url: serviceCall});
// }

// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function(response) {
//     sendServiceRequest(response.data);
//   });
// });







///////////////////////////////////////////////////////////////////




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


// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log("chrome.runtime.onMessage.addListener() rquest:" + JSON.stringify(request))
//     if (request.method == "getSelection")
//       sendResponse({data: window.getSelection().toString()});
//     else
//       sendResponse({}); // snub them.
// });

// chrome.runtime.onMessage.addListener(gotMessage);

// function gotMessage (message, sender, sendResponse) {
//   console.log("chrome.runtime.onMessage.addListener() message.txt:" + JSON.stringify(message.txt))
// //   autoChat(message.tme, message.txt, message.rid)
// }


// var apiKey = "trnsl.1.1.20171031T094741Z.b8618875ef69a6bb.d4baa2b7efd346de3d5d51c9d805ab3cc18aada9";
// var langDirection = "en-zh"
var selection = "";

// // Add bubble to the top of the page.
// var bubble = document.createElement('div');
// bubble.setAttribute('class', 'bubble');
// document.body.appendChild(bubble);

//
var iconBtnDiv = document.createElement('div');

var iconBtn = document.createElement('button');
iconBtn.setAttribute('class', 'iconBtn');
iconBtn.setAttribute('id', 'iconBtn');
iconBtn.addEventListener('click', function(e) {
  console.log('1');
  alert(1);
  chrome.runtime.sendMessage({selection: selection}, (response) => {
    console.log("[contentscript] chrome.runtime.sendMessage()");
    console.log(response.farewell);
  });
});
// iconBtn.setAttribute('href', "http://google.com");
// iconBtn.innerHTML='<i class="fa fa-home"></i>';
iconBtn.innerText='저장';

function initiconBtnDiv() {
  console.log('initiconBtnDiv()');
  // iconBtnDiv.innerHTML='<i class="fa fa-home"></i>';
  // iconBtnDiv.style.top = '0px';
  // iconBtnDiv.style.left = '0px';
  iconBtnDiv.style.visibility = 'hidden';
  iconBtnDiv.style.position = 'absolute';
}
initiconBtnDiv();

iconBtnDiv.appendChild(iconBtn);
document.body.appendChild(iconBtnDiv);



// const myPics = document.getElementById('myPics');
// const rect = bubble.getBoundingClientRect();    // 전체화면

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function(e) {

  selection = window.getSelection().toString();

  console.log("document.addEventListener.mouseup() selection:" + JSON.stringify(selection));
  if (selection.length > 0) {
    
    // console.log('x:'+e.clientX);    // 화면 기준 위치값
    // console.log('y:'+e.clientY);
    // console.log('x:'+e.pageX);    // 전체 페이지 크기 기준 위치값
    // console.log('y:'+e.pageY);    
    // console.log('letf:'+rect.left); // 0, 가로길이
    // console.log('top:'+rect.top);   // 세로 길이
    // const x = e.clientX; // - rect.left;
    // const y = e.clientY - rect.top;
    // translateText(x, y, selection);
    translateText(e.pageX-20, e.pageY+5, selection);

    chrome.runtime.sendMessage({ selection }, (response) => {
      console.log("[contentscript] chrome.runtime.sendMessage()");
      console.log(response.farewell);
    });
  }

}, false);

// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
  // bubble.style.visibility = 'hidden';
  iconBtnDiv.style.visibility = 'hidden';
}, false);


function translateText(mouseX, mouseY, selection) {
//   var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + apiKey + "&text=" + selection + "&lang=" + langDirection
//   fetch(url)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//         if (/^[a-z\d\-_\s]+$/i.test(data.text[0])) {
//           renderBubble(mouseX, mouseY, "Translation not found.");
//         } else {
//           renderBubble(mouseX, mouseY, data.text[0]);
//         }
//     })
//     .catch(function(err) {
//         console.error('An error ocurred', err);
//     });
  // renderBubble(mouseX, mouseY, selection);
  renderIconBtn(mouseX, mouseY);
  
}

// function btnClick() {
//     console.log("btnClick()");
// }

function renderIconBtn(mouseX, mouseY) {
  // iconBtnDiv.innerHTML = '<button id="iconBtn" onclick="btnClick()"><i class="fa fa-home"></i></button>';
  iconBtnDiv.style.top = mouseY + 'px';
  iconBtnDiv.style.left = mouseX + 'px';
  iconBtnDiv.style.visibility = 'visible';
  iconBtnDiv.style.position = 'absolute';
}

// // Move that bubble to the appropriate location.
// function renderBubble(mouseX, mouseY, selection) {
//   bubble.innerHTML = selection;
//   bubble.style.top = mouseY + 'px';
//   bubble.style.left = mouseX + 'px';
//   bubble.style.visibility = 'visible';
//   bubble.style.position = 'absolute';
// }



// bubble.addEventListener('click', function(e) {
//     console.log("document.addEventListener.btnClick() e"+ JSON.stringify(e));
//     // var link = document.getElementById('link');
//     // // onClick's logic below:
//     // link.addEventListener('click', function() {
//     //     hellYeah('xxx');
//     // });
// });
