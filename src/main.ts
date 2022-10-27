function deleteCache(): void {
    const cache = CacheService.getScriptCache();
    cache.remove('lastReceivedDate');
}

function extraction(body: string): string {
    const sentence: string[] = body.split("\n")
    const pattern: string[] = ["授業名", "休講日"];
    let str: string = "";

    // Search for lines that partially match the pattern
    for (let i = 0; i < pattern.length; i++) {
        for (let k = 0; k < sentence.length; k++) {
            if (!sentence[k].indexOf(pattern[i])) {
                str += sentence[k] + "\n";
            }
        }
    }

    return str;
}

function main(): void {
    const targetLabels: string = "休講情報";
    let label;
    let threads: any[] = [];

    label = GmailApp.getUserLabelByName(targetLabels);
    threads = label.getThreads();

    let message = threads[0].getMessages()[0]; // Get first message
    const receivedDate: Date = message.getDate();
    Logger.log(receivedDate);

    const cache = CacheService.getScriptCache();
    var cacheReceivedDate: string | null = cache.get("lastReceivedDate");
    if (cacheReceivedDate == null) {
        Logger.log(message.getPlainBody());
    }
    else {
        while (new Date(cacheReceivedDate) < receivedDate) {
            Logger.log(message.getPlainBody()); // Log contents of the body          
        }
    }

    cache.put("lastReceivedDate", String(receivedDate));

}

module.exports = extraction;