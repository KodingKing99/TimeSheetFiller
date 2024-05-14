import { analyze, doFill } from "./content";
import { messages } from "./messages";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === messages.FILL_SCHEDULE) {
        console.log("Filling the schedule!")
        console.log("message: ", message)
        doFill(message.data);
    } else if (message.action === messages.ANALYZE) {
        console.log("Analyzing the schedule!")
        console.log("message: ", message)
        let result = analyze();
        sendResponse({ data: result });
    }
});