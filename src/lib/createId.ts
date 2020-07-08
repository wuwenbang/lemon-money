let id: number = parseInt(window.localStorage.getItem("idMax") || '0') || 0;
function createId() {
    console.log(window.localStorage.getItem("idMax"))
    id++;
    window.localStorage.setItem("idMax", id.toString());
    return id;
}
export default createId;