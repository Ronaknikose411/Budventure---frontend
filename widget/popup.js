// widget/popup.js

(function () {

  /* -------------------------
     CREATE FLOATING BUTTON
  --------------------------*/
  const btn = document.createElement("div");
  btn.id = "bv-chat-btn";
  btn.innerHTML = "💬";
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: #2563eb;
    color: #fff;
    font-size: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 999999;
    transition: transform 0.2s ease, background 0.2s ease;
    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  `;

  btn.onmouseenter = () => btn.style.transform = "scale(1.1)";
  btn.onmouseleave = () => btn.style.transform = "scale(1)";
  document.body.appendChild(btn);


  /* -------------------------
       CREATE CHAT IFRAME
  --------------------------*/
  const iframe = document.createElement("iframe");
  iframe.id = "bv-chat-iframe";
  iframe.src = "http://localhost:7000/widget/index.html";  // Change on production
  iframe.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 350px;
    height: 520px;
    border-radius: 14px;
    border: none;
    display: none;
    z-index: 999999;
    box-shadow: 0 12px 30px rgba(0,0,0,0.25);
    background: #ffffff;
  `;
  document.body.appendChild(iframe);


  /* -------------------------
        TOGGLE CHAT BOX
  --------------------------*/
  let open = false;

  btn.onclick = () => {
    open = !open;
    iframe.style.display = open ? "block" : "none";
  };

})();
