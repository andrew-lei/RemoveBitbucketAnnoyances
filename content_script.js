const isBitbucket = !!document.getElementsByClassName('bitbucket-theme');
const branchDialogMap = new Map(
    [['inline-dialog-repository-layout-revision-selector-dialog', 'inline-dialog-repository-layout-revision-selector-dialog-search-input']
    ,['inline-dialog-sourceBranch-dialog', 'sourceBranchDialog-search-input']
    ,['inline-dialog-targetBranch-dialog', 'targetBranchDialog-search-input']
    ]);
if (isBitbucket) {
    const config = { childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            const branchDialogs = Array.from(mutation.addedNodes).filter((node) => branchDialogMap.has(node.id));
            for (const branchDialog of branchDialogs) {
                const branchSearchInput = document.getElementById(branchDialogMap.get(branchDialog.id));
                branchSearchInput.setAttribute('autocomplete', 'off');
                chrome.runtime.sendMessage({registerHost: true}, () => {});
            }
        }
    }
    const observer = new MutationObserver(callback);
    observer.observe(document.body, config);
}
