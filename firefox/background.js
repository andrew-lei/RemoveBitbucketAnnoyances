function getHost(url) {
  return url.match(/^http(?:s)?:\/\/.*?\//)[0];
}

browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    const host = getHost(sender.tab.url);
    browser.webRequest.onBeforeRequest.addListener(
      function(details) {
        if (!details.url.includes('orderBy')) {
          return {redirectUrl: `${details.url}&orderBy=MODIFICATION`};
        }
      },
      {urls: [`${host}*rest/api/*branches?*`], types: ['xmlhttprequest']},
      ['blocking']
    )
  }
);