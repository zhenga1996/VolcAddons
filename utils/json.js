const files = [];
register("gameUnload", () => {
    files.forEach(file => {
        FileLib.write("VolcAddons", "json/" + file, JSON.stringify(this.data, null, 4));
    });
});

export class Json {
    /**
     * Create a new persistant single object JSON file.
     * Currently using this to keep track of server based data.
     * 
     * @param {String} file - The name of the JSON file
     */
    constructor(file, save=true) {
        this.data = JSON.parse(FileLib.read("VolcAddons", "json/" + file));
        if (save) files.push(file);
    }

    /**
     * Get the data of the JSON file
     * 
     * @returns {Object} The data of the JSON file
     */
    getData() {
        return this.data;
    }
}
