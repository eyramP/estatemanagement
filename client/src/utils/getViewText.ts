export function getViewText(count: number | undefined){
    return `${count} ${count === 1 ? "view" : "views"}`;
}