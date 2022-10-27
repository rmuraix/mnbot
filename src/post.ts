function postToLine(str: string): void {
    const scriptProperties = PropertiesService.getScriptProperties();
    const userID = scriptProperties.getProperty("USER_ID") || "";

    const postData = {
        "to": userID,
        "messages": str
    };

    const access_token =
        scriptProperties.getProperty("CHANNEL_ACCESS_TOKEN") || "";

    const headers = {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + access_token,
    };
    const options: any = {
        method: "post",
        headers: headers,
        payload: JSON.stringify(postData),
    };

    UrlFetchApp.fetch("https://api.line.me/v2/bot/message/push", options);
}
