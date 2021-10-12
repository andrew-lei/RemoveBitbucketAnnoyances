const revisionSelector = document.getElementById('repository-layout-revision-selector');
if (revisionSelector) {
    const config = { childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (Array.from(mutation.addedNodes).some((node) => node.id === 'inline-dialog-repository-layout-revision-selector-dialog')) {
                const branchSearchInput = document.getElementById('inline-dialog-repository-layout-revision-selector-dialog-search-input');
                branchSearchInput.setAttribute('autocomplete', 'off');
                chrome.runtime.sendMessage({registerHost: true}, () => {});
            }
        }
    }
    const observer = new MutationObserver(callback);
    observer.observe(document.body, config);
}
