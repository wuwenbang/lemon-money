type StateType = {
    recordList: RecordItem[]
    tagList: Tag[]
    currentTag: undefined | Tag
}
type RecordItem = {
    tag: Tag;
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