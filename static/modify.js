$(document).ready(function () {
    showModifyTarget();
})

function showModifyTarget() {
    $.ajax({
        type: "GET",
        url: "/modifyDiaries",
        data: {},
        success: function(response) {
            if(response['result'] === 'success') {
                let targetData = response['target_data'];

                let targetDate = targetData[0]['date'];
                let targetRate = targetData[0]['rate'];
                let targetKeyword = targetData[0]['keyword'];
                let targetContent = targetData[0]['content'];

                let date = document.getElementById('todayDate');
                let rate = document.getElementById('todayRate');
                let keyword= document.getElementById('todayKeyWord');
                let content = document.getElementById('todayContent');

                date.setAttribute('value', targetDate);
                rate.setAttribute('value', targetRate);
                keyword.setAttribute('value', targetKeyword);
                content.innerText = targetContent;
            };
        }
    });
};

function modifyReview() {
    let date = document.getElementById("todayDate").value;
    let rate = document.getElementById("todayRate").value;
    let keyword = document.getElementById("todayKeyWord").value;
    let content = document.getElementById("todayContent").value;

    if (date === "") {
        alert("오늘 날짜를 확인하세요!");
        document.getElementById("todayDate").focus();
        return;
    }
    if (rate === "") {
        alert("오늘 하루 평점을 입력하세요!");
        document.getElementById("todayRate").focus();
        return;
    }
    if (keyword === "") {
        alert("오늘 하루 키워드를 입력하세요!");
        document.getElementById("todayKeyWord").focus();
        return;
    }
    if (content === "") {
        alert("일기를 작성하세요!");
        document.getElementById("todayContent").focus();
        return;
    }

    $.ajax({
        type: "POST",
        url: "/diaries2",
        data: {
            'date': date,
            'rate': rate,
            'keyword': keyword,
            'content': content,
            'status': 1
        },
        success: function (response) {
            if (response["result"] === "success") {
                alert(response['msg']);
                window.location.reload();
            }
        }
    })
}