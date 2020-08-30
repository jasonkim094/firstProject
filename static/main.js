// 전역변수!!
var dates = [];
var rates = [];
var keywords = [];
var contents = [];
// 이미지 로드되기 전에
$(document).ready(function() {
    const historyElement = document.getElementById('history');
    const paginationElement = document.getElementById('pagination');
    const rows = 5;
    let currentPage = 1;

    $.ajax({
        type: "GET",
        url: "/diaries",
        data: {},
        success: function (response) {
            let journals = response['history'];

            for (let i = 0; i < journals.length; i++) {
                let journal = journals[i];

                dates.push(journal['date']);
                rates.push(journal['rate']);
                keywords.push(journal['keyword']);
                contents.push(journal['content']);
            }
            // dates, rates, keywords, contents 라는 array 에 diary 정보가 포함되어 있음.
            // console.log(dates)
        }
    });
    displayList(historyElement, rows, currentPage);
    setupPagination(paginationElement, rows);
});

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function displayList (wrapper, rowsPerPage, page) {
    $.ajax({
        type: "GET",
        url: "/diaries",
        data: {},
        success: function (response) {
            if (response['result'] === 'success') {
                wrapper.innerHTML = "";
                page--;

                let start = page * rowsPerPage;
                let end = start + rowsPerPage;

                let paginatedDates = dates.slice(start, end);
                let paginatedRates = rates.slice(start, end);
                let paginatedKeywords = keywords.slice(start, end);
                let paginatedContents = contents.slice(start, end);

                for (let i = 0; i < paginatedDates.length; i++) {
                    let paginatedDate = paginatedDates[i];
                    let paginatedRate = paginatedRates[i];
                    let paginatedKeyword = paginatedKeywords[i];
                    let paginatedContent = paginatedContents[i];

                    let journalElement = document.createElement('tr');
                    journalElement.classList.add('item');

                    let journalElementItem1 = document.createElement('td');
                    let journalElementItem2 = document.createElement('td');
                    let journalElementItem3 = document.createElement('td');
                    let journalElementItem4 = document.createElement('td');

                    journalElementItem1.innerText = paginatedDate;
                    journalElementItem2.innerText = paginatedRate;
                    journalElementItem3.innerText = paginatedKeyword;
                    journalElementItem4.innerText = paginatedContent;

                    journalElement.appendChild(journalElementItem1);
                    journalElement.appendChild(journalElementItem2);
                    journalElement.appendChild(journalElementItem3);
                    journalElement.appendChild(journalElementItem4);

                    wrapper.appendChild(journalElement);
                }
            }
        }
    })
}

function setupPagination(wrapper, rowsPerPage) {
    wrapper.innerHTML = "";
    let pageCount = Math.ceil(dates.length / rowsPerPage);
}