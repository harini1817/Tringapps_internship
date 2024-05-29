import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function CSVExcelFile({ file }) {
    const [excelData, setExcelData] = useState([]);

    const handleReadExcel = () => {
        if (!file) {
            console.log("No file chosen");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setExcelData(data);
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <button onClick={handleReadExcel} style={{ marginBottom: "20px" }}>Show Content</button>
            <div>
               
                <table className="excel-table">
                    <tbody>
                        {excelData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
