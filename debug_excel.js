import * as XLSX from 'xlsx';
import * as fs from 'fs';
import path from 'path';

// Handle ESM import in Node if type: module is set in package.json
// Or just use createRequire if needed. But package.json has "type": "module".

const file = 'Reference/OT_Risk_MonteCarlo_Risk_Assessment_Profile.xlsx';

try {
    const buf = fs.readFileSync(file);
    const wb = XLSX.read(buf, { type: 'buffer' });

    console.log("Sheets:", wb.SheetNames.join(", "));

    wb.SheetNames.forEach(sheetName => {
        const sheet = wb.Sheets[sheetName];
        // Get range
        if (!sheet['!ref']) return;
        const range = XLSX.utils.decode_range(sheet['!ref']);
        // Get first row (headers)
        const headers = [];
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell = sheet[XLSX.utils.encode_cell({ r: range.s.r, c: C })];
            if (cell && cell.v) headers.push(cell.v);
        }
        console.log(`\nSheet: ${sheetName}`);
        console.log("Headers:", headers.join(" | "));
    });
} catch (e) {
    console.error("Error reading file:", e);
}
