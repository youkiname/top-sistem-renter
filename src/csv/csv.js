class Csv {
    content = null;

    makeTitleRow(columns) {
        let result = ''
        columns.map(column => {
            result += column.title + ';';
        })
        return result + "\r\n";
    }

    make(columns, data) {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += this.makeTitleRow(columns);
        data.forEach(function (element) {
            let row = '';
            columns.map((column, idx) => {
                row += element[column.key] + ';'
            })
            csvContent += row + "\r\n";
        });
        this.content = csvContent;
        return this.content;
    }

    download(columns, data) {
        const content = this.make(columns, data)
        const encodedUri = encodeURI(content);
        window.open(encodedUri);
    }
}

export const CSV = new Csv()
