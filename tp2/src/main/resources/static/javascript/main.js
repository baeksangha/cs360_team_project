function next_button_1(){
    $.ajax({
        type: "GET",
        url: window.location + "html/search_result2.html" ,
        dataType : "html" ,
        success: function(data) {
            $("#body_form").html(data);
        },
        error : function (e) {
            alert("func next_button_1 error");
        }
    });
	//
    // location.replace("main2.html");
}

function next_button_2(){
    $.ajax({
        type: "GET",
        url: window.location + "html/search_result1.html" ,
        dataType : "html" ,
        success: function(data) {
            $("#body_form").html(data);
        },
        error : function (e) {
            alert("func next_button_2 error");
        }
    });
}

function search_go() {

    var data = {
        input_str : $('#user_input').val()
    };
	var input = document.getElementById('user_input').value;
	var filter = document.getElementById('search_filter').value;

	//alert(data.input_str);
	//alert(input);

	$.ajax({
        type : "POST",
        contentType : "application/json",
        url : window.location + "input",
        data : JSON.stringify(data),
        dataType : "json",
        success : function (result) {
            var input_str = result.input_str;

            if(filter == "Gname") {
                search_gname(input_str);
            }
            else if(filter == "Dname") {
                alert("2");
            }
            //alert(result.input_str + "입력 성공");
        },
        error : function (e) {
            alert("input error");
        }
    });

}

function search_gname(input) {

    // result1 화면 가져오기
    $.ajax({
        type: "GET",
        url: window.location + "html/search_result1.html" ,
        dataType : "html" ,
        success: function(data) {

            $("#body_form").html(data);

            // 쿼리값 가져오기 (Dname == input)
            $.ajax({
                type : "GET",
                url : window.location + "result/gname",
                success : function (result) {
                    console.log(result);
                    $("#content_id").html(result[0].gname);
                },
                beforeSend : function() {
                    $('#content_id').html("processing...");
                },
                
            })
        },
        error : function (e) {
            alert("err");
        },
        complete : function () {
            $('#search_goods').html("'" + input + "'으로 검색한 결과입니다.");
        }
    });
    //$("#search_goods").append("dd");
}

function goods_search_info(input){
	$('.search_goods').text("근처에서 판매하는" + "'" + input + "'")

}

function stores_search_info(input){
	$('.search_stores').text("'" + input + "'" + "을 판매하는 근처 매장")
}

/*
function main(){
  $('.card').hide();
  $('.card').fadeIn(1000);
  // $('.projects-button').on('click',function(){
  //   $(this).toggleClass('active');
  //   $(this).text('Projects Viewed');
  //   $(this).next().slideToggle(400);
  // });
}
$(document).ready(main);
*/