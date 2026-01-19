chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-title-url",
    title: "タイトルとURLをコピー",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy-title-url") {
    // 日本語URLをそのままにするため、decodeURIを使う
    const decodedUrl = decodeURI(tab.url);
    const textToCopy = `${tab.title}\n${decodedUrl}`;

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