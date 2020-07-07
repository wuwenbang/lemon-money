const localStorageKeyName = 'tags'
type Tag = {
    id: string;
    name: string;
}
type tagModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated'
    save: () => void
}
const tagModel: tagModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name: string) {
        const names = this.data.map(item => item.name)
        if (names.indexOf(name) >= 0) {
            return 'duplicated';

        } else {
            this.data.push({ id: name, name: name });
            this.save();
            return 'success';
        }
    }
}

export default tagModel;