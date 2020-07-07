const localStorageKeyName = 'tags'
type tagModel = {
    data: string[]
    fetch: () => string[]
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
        if (this.data.indexOf(name) >= 0) {
            return 'duplicated';

        } else {
            this.data.push(name);
            this.save();
            return 'success';

        }
    }
}

export default tagModel;