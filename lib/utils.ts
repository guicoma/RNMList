const regex = /^https:\/\/rickandmortyapi\.com\/api\/[a-z]+\/\d+$/;

export const extractArrayURLIds = (array: string[]):string[] => {
    let itemArray:string[] = [];
    array.forEach((element: string) => {
        try {
            let item = extractURLId(element);
            if (item) itemArray.push(item!);
        } catch (error) {}
    });
    return itemArray;
}

export const extractURLId = (url: string):string|undefined => {
    const urlTrimmed = url.trim();
    if (!regex.test(urlTrimmed)) throw new Error(`Invalid URL: "${urlTrimmed}".`);
    const id = urlTrimmed.split('/').pop();
    return id;
}

export const isEmpty = (str: string):boolean => {
    const trimmed = str.trim();
    return (trimmed === "" || trimmed === null || trimmed === undefined);
}