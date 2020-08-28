$(document).ready(function() {
    showDiary();
});


function showDiary() {
    $.ajax({
        type: "GET",
        url: "/diaries",
        data: {},
        success: function(response) {
            if(response["result"] === "success") {
                let histories = response['history'];
                for (let i=0; i<histories.length; i++) {
                    let history = histories[i];
                    let date = history['date'];
                    let rate = history['rate'];
                    let keyword = history['keyword'];
                    let content = history['content'];

                    makeRow(date, rate, keyword, content);
                }
            }
        }
    })
};

function makeRow(date, rate, keyword, content) {
    let tempHTML = `
                    <tr>
                        <th>${date}</th>
                        <th>${rate}</th>
                        <th>${keyword}</th>
                        <th>${content}</th>
                    </tr>
                `;
    $("#history").append(tempHTML);
};