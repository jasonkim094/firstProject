$(document).ready(function () {
    showSeeTarget();
})

function showSeeTarget() {
    $.ajax({
        type: "GET",
        url: "/modifyDiaries",
        data: {},
        success: function (response) {
            if (response['result'] === 'success') {
                let targetData = response['target_data'];

                let targetDate = targetData[0]['date'];
                let targetRate = targetData[0]['rate'];
                let targetKeyword = targetData[0]['keyword'];
                let targetContent = targetData[0]['content'];

                let date = document.getElementById('todayDate');
                let rate = document.getElementById('todayRate');
                let keyword= document.getElementById('todayKeyWord');
                let content = document.getElementById('todayContent');

                date.innerText = targetDate;
                rate.innerText = targetRate;
                keyword.innerText = targetKeyword;
                content.innerText = targetContent;
            };
        }
    });
};

function deleteDiary() {
    let targetToken = document.getElementById('todayDate').innerText;
    $.ajax({
        type: "POST",
        url: "deleteDiaries",
        data: {
            'target': targetToken
        },
        success: function(response) {
            if (response['result'] === 'success') {
                alert(response['msg']);
            };
        }
    });
};