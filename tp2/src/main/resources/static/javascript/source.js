$(document).ready(function () {

    $('#submit_input').click(function (event) {
        event.preventDefault();
        ajaxPost();
    });

    function ajaxPost() {

        //console.log($('#input_box').val())
        var data = {
            input_str : $('#input_box').val()
        };
        $('#response-panel2').html($('#input_box').val());

        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : window.location + "api/morp/input",
            data : JSON.stringify(data),
            dataType : 'json',
            success : function (result) {
                var str = result.input_str;
                if(str != "") {
                    setTimeout(process_kkma(str),1000);
                    setTimeout(process_twitter(str), 1000);
                    setTimeout(process_komoran(str), 1000);
                } else {
                    $('#response-panel2').html("<strong>Error!</strong>");
                }
            },
            error : function (e) {
                alert("Error!");
                console.log("Error : ",e);

            }
        });

        resetData();
    }

    function process_kkma(param) {

        $.ajax({
            type : "GET",
            url : window.location + "api/morp/input/kkma",
            success : function (result) {
                console.log(result);

                $('#result_kkma').empty();
                $('#kkma_noun').empty();

                /* 형태소 분석 결과 출력창 */
                $.each(result.data, function (i1, elem1) {
                    $.each(elem1, function (i2, elem2) {
                        $('#result_kkma').append(elem2.smplStr2+"\n");
                    });
                });

                /* 명사 추출 결과 출력창 */
                $.each(result.noun, function (i, elem) {
                    $('#kkma_noun').append(elem.string+'\n');
                })

                /* 걸린 시간 출력창 */
                $('#kkma_time').html(result.time/1000);
            },
            beforeSend : function() {
                $('#result_kkma').html("processing...");
                $('#kkma_noun').empty();
                $('#kkma_time').empty();
            },
            error : function (e) {
                $('#result_kkma').html("Error occurred!");
                console.log(e);
            }
        });
    }

    function process_twitter(param) {

        $.ajax({
            type : "GET",
            url : window.location + "api/morp/input/twitter",
            success : function (result) {
                console.log(result);

                $('#result_twitter').empty();
                $('#twitter_noun').empty();

                /* 형태소 분석 결과 출력창 */
                $.each(result.data, function (i, elem) {
                    $('#result_twitter').append(elem.text + "/" + elem.pos + "\n");
                });

                /* 명사 추출 결과 출력창 */
                $.each(result.noun, function (i, elem) {
                    $('#twitter_noun').append(elem + "\n");
                });

                /* 걸린 시간 출력창 */
                $('#twitter_time').html(result.time/1000);
            },
            beforeSend : function () {
                $('#result_twitter').html("processing...");
                $('#twitter_noun').empty();
                $('#twitter_time').empty();
            },
            error : function (e) {
                $('#result_twitter').html("Error occurred!");
                console.log(e);
            }
        })
    }

    function process_komoran(param) {

        $.ajax({
            type : "GET",
            url : window.location + "api/morp/input/komoran",
            success : function (result) {
                console.log(result);

                $('#result_komoran').empty();
                $('#komoran_noun').empty();

                /* 형태소 분석 결과 출력창*/
                $.each(result.data, function (i, elem) {
                    $('#result_komoran').append(elem.morph + "/" + elem.pos + "\n");
                });

                /* 명사 추출 결과 출력창 */
                $.each(result.noun, function (i, elem) {
                    $('#komoran_noun').append(elem+'\n');
                })

                /* 걸린 시간 출력창 */
                $('#komoran_time').html(result.time/1000);
            },
            beforeSend : function () {
                $('#result_komoran').html("processing...");
                $('#komoran_noun').empty();
                $('#komoran_time').empty();
            },
            error : function (e) {
                $('#result_komoran').html("Error occurred!");
                console.log(e);
            }
        })
    }
    function resetData() {
        $('#input_box').val("");
    }
})

function file_browse() {

    $("#input").click();

    $("#input").on('change', function () {

        var input = document.getElementById('input');
        var ext = $('#input').val().split('\\').pop().toLowerCase();
        $("#input_box").val(ext);

        var file = input.files[0];
        fr = new FileReader();
        fr.onload = function (ev) {
            console.log(ev.target.result);
            console.log(Base64.decode(ev.target.result.split(",")[1]));
        };
        fr.readAsDataURL(file);
    });

    function receivedText() {
        document.getElementById('result_kkma').appendChild(document.createTextNode(fr.result))
    }
}