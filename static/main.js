// 이미지 로드되기 전에
$(document).ready(function() {
    const historyElement = document.getElementById('history');
    const paginationElement = document.getElementById('pagination');
    const rows = 5;
    let currentPage = 1;

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
                let journals = response['history']
                let start = page * rowsPerPage;
                let end = start + rowsPerPage;

                for (let i = 0; i < journals.length; i++) {
                    let journal = journals[i];
                    let date = journal['date'];
                    let rate = journal['rate'];
                    let keyword = journal['keyword'];
                    let content = journal['content'];

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

function setupPagination(wrapper, rowsPerPage) {
    wrapper.innerHTML = "";
}