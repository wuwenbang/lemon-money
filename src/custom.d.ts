
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

interface Window {
}