$(function () {
    // @@@1@@@
    $("#datetimePicker").datetimepicker({
        format: "YYYY-MM-DD"
    });
    // @@@2@@@
    let current = document.querySelector("#current");
    let imgs = document.querySelectorAll(".imgs img");
    let opacity = 0.4;
    imgs.forEach(img => img.addEventListener('click', imgClick));

    function imgClick(e) {
        imgs.forEach(img => (img.style.opacity = 1));
        current.src = e.target.src;
        e.target.style.opacity = opacity;
    };
});

function submitReview() {
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
        url: "/write_one",
        data: {
            'date': date,
            'rate': rate,
            'keyword': keyword,
            'content': content,
            'status': 0
        },
        success: function (response) {
            if (response["result"] === "success") {
                alert(response['msg']);
                window.location.reload();
            }
        }
    })
}