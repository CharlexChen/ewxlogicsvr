import * as XLSX from 'xlsx';
export function fileToBlob(file: Blob) {  
    return new Promise((resolve, reject) => {  
        const reader = new FileReader();  
        reader.onload = function(event: any) {
            // 这里我们实际上创建了一个新的Blob对象，它包含与原始File对象相同的数据  
            // 但这通常是不必要的，因为你可以直接使用File对象作为Blob  
            // resolve(new Blob([new Uint8Array(event.target.result)], { type: file.type }));
            const data = new Uint8Array(event.target.result);  
            const workbook = XLSX.read(data, { type: 'array' });  
            // 获取第一个工作表（Sheet）  
            const worksheetName = workbook.SheetNames[0];  
            const worksheet = workbook.Sheets[worksheetName];  
            // 将工作表转换为 JSON 对象数组  
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // 假设第一行是标题行  
            resolve(jsonData); // 输出 JSON 数据  
        };
        reader.onerror = reject;  
        reader.readAsArrayBuffer(file);  
    });  
}