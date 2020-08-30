$(document).ready(function() {
    const historyElement = document.getElementById('history');
    const paginationElement = document.getElementById('pagination');
    const rows = 5;
    let currentPage = 1;

    displayList(historyElement, rows, currentPage);
    setupPagination(paginationElement, rows);
});

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function displayList (wrapper, rowsPerPage, page) {
    $.ajax({
        type: "GET",
        url: "/diaries",
        data: {},
        success: function (response) {
            if (response['result'] === 'success') {
                wrapper.innerHTML = "";
                page--;
                let journals = response['history']
                let start = page * rowsPerPage;
                let end = start + rowsPerPage;
                let paginatedJournals = journals.slice(start, end);

                for (let i = 0; i < paginatedJournals.length; i++) {
                    let paginatedJournal = paginatedJournals[i];
                    let date = paginatedJournal['date'];
                    let rate = paginatedJournal['rate'];
                    let keyword = paginatedJournal['keyword'];
                    let content = paginatedJournal['content'];

                    let journalElement = document.createElement('tr');
                    journalElement.classList.add('item');

                    let journalElementItem1 = document.createElement('td');
                    let journalElementItem2 = document.createElement('td');
                    let journalElementItem3 = document.createElement('td');
                    let journalElementItem4 = document.createElement('td');

                    journalElementItem1.innerText = date;
                    journalElementItem2.innerText = rate;
                    journalElementItem3.innerText = keyword;
                    journalElementItem4.innerText = content;

                    journalElement.appendChild(journalElementItem1);
                    journalElement.appendChild(journalElementItem2);
                    journalElement.appendChild(journalElementItem3);
                    journalElement.appendChild(journalElementItem4);

                    wrapper.appendChild(journalElement);
                };
            };
        }
    });
};

function setupPagination (wrapper, rowsPerPage) {
    $.ajax({
        type: "GET",
        url: "/diaries",
        data: {},
        success: function (response) {
            let journals = response['history'];
            let pageTotal = Math.ceil(journals.length / rowsPerPage);

            for (let i = 1; i < pageTotal + 1; i++) {
                let btn = paginationButton(i);
                wrapper.appendChild(btn);
            };
        }
    });
};

function paginationButton(page) {
    const historyElement = document.getElementById('history');
    const rows = 5;
    let currentPage = 1;
    let button = document.createElement('button');
    button.innerText = page;

    if (currentPage === page) button.classList.add('active');

    button.addEventListener('click', function () {
        currentPage = page;
        displayList(historyElement, rows, currentPage);

        let currentBtn = document.querySelector('#pagination button.active');
        currentBtn.classList.remove('active');

        button.classList.add('active');
    });
    return button;
};