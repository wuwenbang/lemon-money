type StateType = {
    recordList: RecordItem[]
    tagList: Tag[]
    currentTag: undefined | Tag
}
type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    time?: string;
};
type Tag = {
    id: string;
    name: string;
};

interface Window {
}