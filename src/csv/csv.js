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
        var encodedUri = encodeURI(content);

        const element = document.createElement("a");
        // const file = new Blob([content], { type: 'text/csv' });
        element.href = encodedUri;
        element.download = "statistic.csv";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
}

export const CSV = new Csv()
