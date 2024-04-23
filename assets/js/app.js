var file;
var category = new Array;
category[0] = "All";
var page_rows = 16;
var pageLimit = 50;
function readCSVFile(cat) {
    document.getElementById('prebody').style.display = "none";
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
        var csvdata = event.target.result;
        var rowData = csvdata.split('\n');
        var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];
        tbodyEl.innerHTML = "";

        for (var row = 1; row < rowData.length; row++) {
            rowColData = (row != 1)? rowData[row].split('\",\"') : rowData[row].split(',');

            if (rowColData[0] == "F" || rowColData[4] == null || rowColData[14] == null) continue;
            else {
                var catTemp = parseInt(rowColData[4].replaceAll(/\"/g, '').replaceAll('［', '').replaceAll('］', ''));
                if (cat == 0) { }
                else if (cat == 1) { if (!(catTemp <= 210 || (catTemp > 300 && catTemp <= 400) || catTemp == 800 || row == 1)) continue; }
                else if (cat == 2) { if (!((catTemp > 210 && catTemp <= 300) || row == 1)) continue; }
                else if (cat == 3) { if (!((catTemp > 500 && catTemp < 900 && catTemp != 800) || row == 1)) continue; }
                else if (cat == 4) { if (!((catTemp >= 900 && catTemp < 1000) || row == 1)) continue; }
            }

            var newRow = tbodyEl.insertRow();
            var numCell = newRow.insertCell();
            if (row == 1) { numCell.innerHTML = ''; }
            else { numCell.innerHTML = parseInt(rowColData[14].replaceAll(/\"/g, '').replaceAll('［', '').replaceAll('］', '')); }

            for (var col = 0; col < rowColData.length; col++) {
                if (col == 4 || col == 5 || col == 7 || col == 8 || col == 16 || col == 17 || col == 18 || col == 19 || col == 20 || col == 22 || col == 37 || col == 50) {
                    var newCell = newRow.insertCell();
                    newCell.innerHTML = rowColData[col].replaceAll(/\"/g, '').replaceAll('［', '').replaceAll('］', '');
                }
                else if (col == 21) {
                    var newCell = newRow.insertCell();
                    newCell.innerHTML = rowColData[col].replaceAll(/\"/g, '').replaceAll('［', '').replaceAll('］', '') + '/' + rowColData[col + 2].replaceAll(/\"/g, '').replaceAll('［', '').replaceAll('］', '');
                }
            }
        }
    };
}
function readCSVFileHidden() {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
        var csvdata = event.target.result;
        var rowData = csvdata.split('\n');

        var tbodyHi = document.getElementById('tblcsvhidden').getElementsByTagName('tbody')[0];
        tbodyHi.innerHTML = "";
        var tbodyHi_1 = document.getElementById('tblcsvhidden_1').getElementsByTagName('tbody')[0];
        tbodyHi_1.innerHTML = "";
        var tbodyHi_2 = document.getElementById('tblcsvhidden_2').getElementsByTagName('tbody')[0];
        tbodyHi_2.innerHTML = "";
        var tbodyHi_3 = document.getElementById('tblcsvhidden_3').getElementsByTagName('tbody')[0];
        tbodyHi_3.innerHTML = "";
        var tbodyHi_4 = document.getElementById('tblcsvhidden_4').getElementsByTagName('tbody')[0];
        tbodyHi_4.innerHTML = "";

        for (var row = 0; row < rowData.length; row++) {
            rowColData = (row != 1)? rowData[row].split('\",\"') : rowData[row].split(',');
            if (rowColData[0]=='' || rowColData[0]==null) continue;
            else if(rowColData[4] != '' && rowColData[4] != null ) {
                makeHiddenTable(tbodyHi, rowColData);
                var catTemp = parseInt(rowColData[4].replaceAll(/\"/g, '').replaceAll('［', '').replaceAll('］', ''));
                if ((catTemp <= 210 || (catTemp > 300 && catTemp <= 400)|| catTemp == 800 || row == 1)) makeHiddenTable(tbodyHi_1, rowColData);
                if ((catTemp > 210 && catTemp <= 300) || row == 1) makeHiddenTable(tbodyHi_2, rowColData);
                if ((catTemp > 500 && catTemp < 900 && catTemp != 800) || row == 1) makeHiddenTable(tbodyHi_3, rowColData);
                if ((catTemp >= 900 && catTemp < 1000) || row == 1) makeHiddenTable(tbodyHi_4, rowColData);

            }
            else{
                makeHiddenTable(tbodyHi, rowColData);
                makeHiddenTable(tbodyHi_1, rowColData);
                makeHiddenTable(tbodyHi_2, rowColData);
                makeHiddenTable(tbodyHi_3, rowColData);
                makeHiddenTable(tbodyHi_4, rowColData);
            }
        }
    };
}
function readToArray(cat) {
    var pContent = [[]];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async function (event) {
        var csvdata = event.target.result;
        var rowData = csvdata.split('\n');
        for (var row = 0; row < rowData.length; row++) {
            itemArray = [];
            rowColData = (row != 1)? rowData[row].split('\",\"') : rowData[row].split(',');
            if (rowColData[0] == "F" || rowColData[4] == null || rowColData[14] == null) continue;
            var catTemp = parseInt(rowColData[4].replaceAll(/\"/g, '').replaceAll('［', '').replaceAll('］', ''));
            if (cat == 0) { }
            else if (cat == 1) { if (!(catTemp <= 210 || (catTemp > 300 && catTemp <= 400) || catTemp == 800 || row == 1)) continue; }
            else if (cat == 2) { if (!((catTemp > 210 && catTemp <= 300) || row == 1)) continue; }
            else if (cat == 3) { if (!((catTemp > 500 && catTemp < 900 && catTemp != 800) || row == 1)) continue; }
            else if (cat == 4) { if (!((catTemp >= 900 && catTemp < 1000) || row == 1)) continue; }

            for (var col = 0; col < rowColData.length; col++) {
                var catTemp = rowColData[col].replaceAll(/\"/g, '').replaceAll('［', '').replaceAll('］', '');
                itemArray.push(catTemp);
            }
            pContent.push(itemArray);
        }
        printPart(pContent, cat);
    };


}
function makeHiddenTable(tbodyEl, rowColData) {
    var newRow = tbodyEl.insertRow();
    for (var col = 0; col < rowColData.length; col++) {
        var newCell = newRow.insertCell();
        newCell.innerHTML = rowColData[col];
    }
}
async function addArrayContent(row, rowColData, pContent) {
    for (var col = 0; col < rowColData.length; col++) {
        var catTemp = rowColData[col].replaceAll(/\"/g, '').replaceAll('［', '').replaceAll('］', '');
        pContent[row][col] = catTemp;
    }
}

$(document).ready(function () {
    $(document).on('click', "#openFile", function () {
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            file = e.target.files[0];
            readCSVFile(0);
            readCSVFileHidden();
            $("#catSelect").val(0);
        }
        input.click();
    });
    $(document).on('change', '#catSelect', function () {
        if (file == null) { return; }
        var selOption = $('#catSelect').val();
        readCSVFile(selOption);
    });

    $(document).on('click', '#outCSV', function () {
        if (file == undefined) return;
        var rows;
        if ($("#catSelect").val() == '0') rows=$("#tblcsvhidden").find('tr');
        if ($("#catSelect").val() == '1') rows=$("#tblcsvhidden_1").find('tr');
        if ($("#catSelect").val() == '2') rows=$("#tblcsvhidden_2").find('tr');
        if ($("#catSelect").val() == '3') rows=$("#tblcsvhidden_3").find('tr');
        if ($("#catSelect").val() == '4') rows=$("#tblcsvhidden_4").find('tr');
        var today = new Date();
        var filename = today.getDate().toString() + today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
        exportTableToCSV(filename + "_All", rows);
    });
    $(document).on('click', '#outAll', function () {
        if (file == undefined) return;
        var today = new Date();
        var filename = today.getDate().toString() + today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
        var rows;
        rows = $("#tblcsvhidden_1").find('tr');
        exportTableToCSV(filename + "cat1", rows);
        rows = $("#tblcsvhidden_2").find('tr');
        exportTableToCSV(filename + "cat2", rows);
        rows = $("#tblcsvhidden_3").find('tr');
        exportTableToCSV(filename + "cat3", rows);
        rows = $("#tblcsvhidden_4").find('tr');
        exportTableToCSV(filename + "cat4", rows);
    });

    $(document).on('click', '#print', async function () {
        if (file == undefined) return;
        if ($("#catSelect").val() == '0'){alert('カテゴリを選択してください。'); return;}
        await readToArray($("#catSelect").val());
    });
    $(document).on('click', '#printAll', async function () {
        if (file == undefined) return;
        await readToArray(1);
        await readToArray(2);
        await readToArray(3);
        await readToArray(4);
    });
});
  
async function printPart(pContent, cat) {
    let rlt = []
    let checkNum = [];
    let j = 0;
    pContent.forEach((e, i) => {
        if (i < 2) return;
        //const item = e[2] + e[37];
        const item = e[2] + e[37];
        if (checkNum[item] == undefined) {
            checkNum[item] = j ++ ;
            rlt[checkNum[item]] = [];
            rlt[checkNum[item]].push([]);
            rlt[checkNum[item]].push(pContent[1]);
        }
        rlt[checkNum[item]].push(e);
    });
    var outString = "";
    var today = new Date();
    var filename = today.getDate().toString() + today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
    var filenameIndex = (cat == 0) ? "_all" : cat.toString();
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: filename + "_cat" + filenameIndex + '.pdf',
        image: { type: 'jpeg', quality: 0.1 },
        html2canvas: { scale: 2.0, dpi: 192, letterRendering: true, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };
    let sBreak = 0;
    for(arkey=0; arkey < rlt.length; arkey++){
        e = rlt[arkey];

        if(arkey % 10 == 0)  {
            if(arkey == 0) outString += '<div class="pdf_page">';
            else outString += '</div><div class="pdf_page">';
        }
        outString += await getOutSting(e);
        outString += '<div class="page-break">&nbsp</div>';
        
    }
    outString += '</div>';
    await print_sub(opt, outString);
}
async function print_sub(opt, outString) {
    var element = document.getElementById('printElement');
    await setElement(element, outString);
    await setBlock(element);
    //await html2pdf(element, opt);
//************************************ */
    await convertOnePdf(opt,element);
    await setNone(element);
}
function convertOnePdf(opt,element){
    const pages = Array.from(element.querySelectorAll("div.pdf_page"));
    let worker = html2pdf()
        .set(opt)
        .from(pages[0]);

    worker = worker.toPdf(); 

    if (pages.length > 0) {
        pages.slice(1).forEach((page, index) => {
        worker = worker

            .get('pdf')
            .then(pdf => {
            pdf.addPage()
            })
            .from(page)
            .toContainer()
            .toCanvas()
            .toPdf();
        })
    }
    worker.save();
}
function setElement(element, outString){element.innerHTML = outString;}
function setBlock(element){element.style.display = 'block';}
function setNone(element){element.style.display = 'none';}
function getOutSting(pContent) {
    var tableString = '';
    tableString += '<div style="padding-right: 10px; width: 100%;">';
    if(pContent.length <= (page_rows*pageLimit+2)){
        let total_rows=0;
        let total_pages=1;
        let max_page=Math.ceil((pContent.length-2)/page_rows);
        while(total_pages <= max_page){
            tableString += getPageSting(total_pages, max_page, pContent);
                            
            total_pages++;
            total_rows+=page_rows;
        }
        tableString += '</div>';
        return tableString;
    }
    else { alert("請求書に入力する行数は80に制限されています。"); return "limited"; }

}

function getPageSting(pageNum, tpageNum, pContent) {
    var pageString = `
        <div style="position: relative; padding-left: 10px; padding-right: 10px; padding-top: 15px;">`;
    if (tpageNum == 1) { }
    else {
        pageString += `
            <div style="position: absolute; top: 15px; right: 10px;">${pageNum}枚目/${tpageNum}枚中</div>
            `;
    }
    pageString += `        
            <div style="display: flex; justify-content: space-between; align-items: flex-end;padding-bottom: 20px;">
                <div style="font-size: 16px; width: 400px;">${pContent[1][7]} ： ${pContent[2][7]}</div>
                <div style="font-size: 32px; display: flex; justify-content: center; width: 400px;">発注書</div>
                <div style="font-size: 12px; width: 400px; text-align: right;">${pContent[1][35]}${pContent[2][35]}</div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;padding-bottom: 10px;">
                <div style="display: flex; flex-direction: column;">
                    <div style="font-size: 24px; font-weight: 500;">${pContent[2][8]}様</div>
                </div>
                <div style="font-size: 16px;">
                </div>
            </div>
            <div style="display: flex; align-items: center;padding-bottom: 15px;">
                <span style="font-size: 14px;">${pContent[1][37]} ： </span> 
                <span style="font-size: 24px;">${pContent[2][37]}</span>
            </div>
            <div>
                <table class="pt-tb" border="1" style="border-collapse: collapse; width: 100%;">
                    <thead border="0">
                        <tr>
                            <th style="border: 0; font-size: 12px; text-align: center; width: 20px;">No</th>
                            <th style="border: 0; font-size: 12px; text-align: center; width: 60px;">商品コード</th>
                            <th style="border: 0; font-size: 12px; text-align: center;">商品名</th>
                            <th style="border: 0; font-size: 12px; text-align: center; width: 70px;">単価/単位</th>
                            <th style="border: 0; font-size: 12px; text-align: center; width: 70px;">注文数</th>
                        </tr>
                    </thead>
                
                    <tbody>`;
    if (pageNum == tpageNum) {
        for (k = (page_rows * (tpageNum - 1) + 2); k < pContent.length; k++) {
            pageString += "<tr>";
            pageString += "<td>" + (k - 1) + "</td>";
            pageString += "<td>" + pContent[k][16] + "</td>";
            pageString += '<td style="font-size: 12px;">' + pContent[k][17] + "</td>";   
            pageString += "<td>" + pContent[k][21] + "/" + pContent[k][23] + "</td>";
            pageString += "<td>" + pContent[k][22] + pContent[k][23] + "</td>";
            pageString += "</tr>";
        }
    }
    else {
        for (k = (page_rows * (pageNum - 1) + 2); k < (page_rows * pageNum + 2); k++) {
            pageString += "<tr>";
            pageString += "<td>" + (k - 1) + "</td>";
            pageString += "<td>" + pContent[k][16] + "</td>";
            pageString += '<td style="font-size: 12px;">' + pContent[k][17] + "</td>";
            pageString += "<td>" + pContent[k][21] + "/" + pContent[k][23] + "</td>";
            pageString += "<td>" + pContent[k][22] + pContent[k][23] + "</td>";
            pageString += "</tr>";
        }
    }
    pageString += `</tbody>
                </table>
            </div>`;
    if (pageNum == tpageNum) {
        pageString += `
                <div>
                    <p style="font-size: 12px;">備考</p>
                    <div style="border: 1px solid black; height: 100px;width: 99%; margin: 1px;">&nbsp;&nbsp;${pContent[2][50]}</div>
                </div>
            </div>           
                `;
    }
    else {
        pageString += `
            </div>
            <div class="page-break">&nbsp</div>
            `;
    }
    return pageString;
}
function downloadCSV(csv, filename) {
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    var csvFile = new Blob([bom, csv], { type: "text/csv" });
    $('<a></a>')
        .attr({
            'download': filename,
            'href': window.URL.createObjectURL(csvFile),
            'target': '_blank'
        })[0].click();
}

function exportTableToCSV(filename, rows) {
    var csv = [];
    rows.each(function (index, row) {
        var cols = $(row).find('td, th');
        var temp = [];
        cols.each(function (index, col) {
            temp.push($(col).text().trim());
        });
        csv.push(temp.join(','));
    });

    downloadCSV(csv.join("\n"), filename);
}
//Produced By GreenPower 2023.4.24:11:06:36
//if you have some error or question please contact to " takahasihideo.g@gmail.com " ------- GreenPower