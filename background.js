chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-url-only",
    title: "URLのみをコピー",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id: "copy-title-only",
    title: "タイトルのみをコピー",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id: "copy-title-url",
    title: "タイトルとURLをコピー",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const decodedUrl = decodeURI(tab.url);
  let textToCopy = "";

  if (info.menuItemId === "copy-url-only") {
    textToCopy = decodedUrl;
  } else if (info.menuItemId === "copy-title-only") {
    textToCopy = tab.title;
  } else if (info.menuItemId === "copy-title-url") {
    textToCopy = `${tab.title}\n${decodedUrl}`;
  }

  if (textToCopy) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (text) => {
        navigator.clipboard.writeText(text).then(() => {
          alert("コピーしました！\n" + text);
        }).catch(err => {
          console.error("コピー失敗:", err);
        });
      },
      args: [textToCopy]
    });
  }
});