type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    time?: Date;
};
type Tag = {
    id: string;
    name: string;
};
type tagModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated'
    save: () => void
    update: (name: string, id: string) => 'success' | 'duplicated' | 'notFind'
    remove: (id: string) => boolean
};

interface Window {
    tagList: Tag[];
}