export const extractArrayURLIds = (array: string[]):string[] => {
    let itemArray:string[] = [];
    array.forEach((element: string) => {
        let item = extractURLId(element);
        if(item) itemArray.push(item);
    });
    return itemArray;
}
export const extractURLId = (url: string):string => {
    const id = url.split('/').pop() ?? '';
    return id;
}

export const isEmpty = (str: string):boolean => {
    return (str === "" || str === null || str === undefined);
}