function getHost(url) {
  return url.match(/^http(?:s)?:\/\/.*?\//)[0];
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function getBranchesCall(root) {
  return `^${escapeRegExp(root)}.*rest\\/api\\/.*branches\\?.*`;
}

function branchOrderModifiedRule(root) {
  return {
    addRules: [{
      id: 1,
      priority: 1,
      action: { 
        type: 'redirect',
        redirect: {
          transform: {
            queryTransform: {
              addOrReplaceParams: [{
                key: 'orderBy',
                value: 'MODIFICATION'
              }]
            }
          }
        }
      },
      condition: {
        regexFilter: getBranchesCall(root),
        resourceTypes: ['xmlhttprequest']
      }
    }],
    removeRuleIds: [1]
  };
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    const host = getHost(sender.tab.url);
    if (request.registerHost && host) {
      chrome.declarativeNetRequest.updateDynamicRules(branchOrderModifiedRule(host));
    }
  }
);