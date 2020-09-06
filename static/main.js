$(document).ready(function() {
    const historyElement = document.getElementById('history');
    const paginationElement = document.getElementById('pagination');
    const rows = 5;
    let currentPage = 1;

    displayList(historyElement, rows, currentPage);
    setupPagination(paginationElement, rows);
});

function displayList (wrapper, rowsPerPage, page) {
    $.ajax({
        type: "GET",
        url: "/diaries",
        data: {},
        success: function (response) {
            if (response['result'] === 'success') {
                wrapper.innerHTML = "";
                page--;
                let journals = response['history'].reverse();
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
                    let journalElementItem5 = document.createElement('td');

                    let journalElementBtn5 = document.createElement('input');

                    journalElementItem1.innerText = date;
                    journalElementItem2.innerText = rate;
                    journalElementItem3.innerText = keyword;
                    journalElementItem4.innerText = content;
                    journalElementBtn5.setAttribute('type', 'button');
                    journalElementBtn5.setAttribute('class', 'showJournalBtn');
                    journalElementBtn5.setAttribute('value', '보기');
                    journalElementBtn5.setAttribute("onclick", "location.href='/see'; seeJournal(this)");
                    // journalElementBtn5.setAttribute("onclick", "seeJournal(this)")

                    journalElementItem5.appendChild(journalElementBtn5);

                    journalElement.appendChild(journalElementItem1);
                    journalElement.appendChild(journalElementItem2);
                    journalElement.appendChild(journalElementItem3);
                    journalElement.appendChild(journalElementItem4);
                    journalElement.appendChild(journalElementItem5);

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

function seeJournal(self) {
    let targetDate = self.parentNode.parentNode.childNodes[0].innerText;
    $.ajax({
        type: "POST",
        url: "/createTarget",
        data: {
            'target': targetDate
        },
        success: function(response) {
        }
    });
};