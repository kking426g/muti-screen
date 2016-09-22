var func = {};
var p_name = '';
var p_pic = '';

$(function() {
  var c_infro = '';
  var u_guid = ''; //這個人的guid
  var u_name = ''; //這個人的名字



  $('#decide').hide();
  $('#cant_play').hide();
  $('#again').hide();
  $('#notice').hide();
  $('#make_sure').hide();
  $('#score').hide();
  $('#next').hide();

  var socket = io.connect('http://127.0.0.1:8000');

  $('#yes_me').click(function() {
    socket.emit('client', p_name, p_pic);
    $('#make_sure').hide();
  })


  socket.on('client_change', function(p_name, user_guid, tv_guid, g_data, sum) {
    u_guid = user_guid;
    u_name = p_name;
    //$('#user_name').append("<p>我的名字是"+p_name+"</p>");

  });




  socket.on('client_change1', function(user_guid, tv_guid, g_data, sum) {
    $('#game_data').hide();
    $('#decide').show();
  });

  socket.on('new_paper', function(p) {
    if (u_guid == p) {
      for (var i = 0; i < 3; i++) {
        $('#' + i).attr("disabled", true);
      }
    } else {
      $('#notice').append(p.name + '已經出牌了');
      $('#notice').show(); //告知別人已經出牌了
    }
  });

  socket.on('winner', function(board, win) {
    for (var i = 0; i < board.length; i++) {
      $('#' + i).attr("disabled", true);
    }
    setTimeout($('.b').remove(), 100000);
    $('#again').show();
    //$('#again').append("<p>"+ win.name +"贏了</p>");

  })


  socket.on('deuce', function(board) {
    for (var i = 0; i < board.length; i++) {
      $('#' + i).attr("disabled", true);
    }
    setTimeout($('.b').remove(), 100000);
    $('#again').show();
  })


  $('#exit_button').click(function() { //離開遊戲
    socket.emit('exit', u_guid); //傳這個人的guid
    document.location.href = "error";
  })


  socket.on('do_exit', function() {
    $('#exit').append('你已經成功退出了。請重新加入遊戲或關閉瀏覽器。');
    $('#game_data').hide();
    $('#play').hide();
    $('#again').hide();
    $('#infor').hide();

  });


  socket.on('exit_hide', function() { //隱藏退出的資訊
    $('#again').hide();
  })




  $('#start').click(function() {
    socket.emit('g_start'); //遊戲開始
  });

  $('#wait').click(function() {
    socket.emit('wait_others'); //等待
  });


  //$('#exit_button').click(){}//退出遊戲
  //退出遊戲



  socket.on('paper_game_start', function(g_infro) {
    c_infro = g_infro;
    $('#again').hide();
    $('#play').empty();

    $('.b').remove();
    var board = $('<table/>').addClass('b')
      .attr('style', '  width:100%; height:100%;	align=left cellpadding=4 cellspacing=4 frame=border rules=all');
    var body = $('<tbody/>').addClass('b');
    var tr0 = $('<tr/>').addClass('b');


    for (var i = 0; i < 3; i++) {
      if (i == 0) {
        var td = $('<td/>').addClass('b')
          .attr('style', 'width:165px;height:173px; float:left;margin:5px;padding:10px;font-size:60px;text-align:center;')


        var button = $('<img/>').addClass('b')
          .attr('id', '剪刀_' + i)
          .attr('src', '../static/scissors.jpg')
          //src='../static/scissors.jpg'
          .attr('style', 'width:165px;height:173px; float:left;margin:5px;padding:10px;font-size:30px;text-align:center;')

        .click(function() {
          var b_id = $(this).attr('id');
          var i_d = b_id.substring(4, 3);
          var b_val = b_id.substring(0, b_id.indexOf("_0"));

          socket.emit('btn_click', b_id, b_val, u_guid, i_d);
          $('#play').empty();
          $('#play').append('你出了' + b_id.substring(0, b_id.indexOf("_0")));
        });
        td.append(button);
        tr0.append(td);
      }


      if (i == 1) {
        var td = $('<td/>').addClass('b')
          .attr('style', 'width:165px;height:173px;  float:left;margin:5px;padding:10px;font-size:60px;text-align:center;')


        var button = $('<img/>').addClass('b')
          .attr('id', '石頭_' + i)
          .attr('src', '../static/stone.jpg')
          //src='../static/scissors.jpg'
          .attr('style', 'width:165px;height:173px; float:left;margin:5px;padding:10px;font-size:30px;text-align:center;')

        .click(function() {
          var b_id = $(this).attr('id');
          var i_d = b_id.substring(4, 3);
          var b_val = b_id.substring(0, b_id.indexOf("_1"));

          socket.emit('btn_click', b_id, b_val, u_guid, i_d);
          $('#play').empty();
          $('#play').append('你出了' + b_id.substring(0, b_id.indexOf("_1")));
        });
        td.append(button);
        tr0.append(td);

      }


      if (i == 2) {

        var td = $('<td/>').addClass('b')
          .attr('style', 'width:165px;height:173px;  float:left;margin:5px;padding:10px;font-size:60px;text-align:center;')


        var button = $('<img/>').addClass('b')
          .attr('id', '布_' + i)
          .attr('src', '../static/papers.jpg')
          .attr('style', 'width:165px;height:173px; float:left;margin:5px;padding:10px;font-size:30px;text-align:center;')

        .click(function() {
          var b_id = $(this).attr('id');
          var i_d = b_id.substring(3, 2);
          var b_val = b_id.substring(0, b_id.indexOf("_2"));

          socket.emit('btn_click', b_id, b_val, u_guid, i_d);
          $('#play').empty();
          $('#play').append('你出了' + b_id.substring(0, b_id.indexOf("_2")));

        });
        td.append(button);
        tr0.append(td);
      }
    }
    $('#game_data').hide();
    body.append(tr0);
    board.append(body);
    $('#play').append(board);
  });


  socket.on('join_failed', function() {
    $('#cant_play').show();
  });



  socket.on('next_g', function() { //下一局的確定鍵
    $('#play').empty();
    $('#next').show();

  })



  $('#next_b').click(function() { //確定下一局
    $('#next').hide();
    socket.emit('next_paper');
  })




  socket.on('show_score_hide', function() { //那個button不見
    $('#all_score').hide();
  })


  socket.on('g_button', function(all_name, all_guid, key) { //all_name, all_guid, player_i
    //$('#money').empty();
    $('#again').empty();

    //$('.b').remove();
    var board = $('<table/>')
      .attr('style', 'border: 1px ;background-color: rgb(255, 255, 255);  width:100%; height:50%;	align=left cellpadding=1 cellspacing=1 frame=border rules=all');
    var body = $('<tbody/>');
    var tr0 = $('<tr/>');
    var tr1 = $('<tr/>');
    var tr2 = $('<tr/>');
    var tr3 = $('<tr/>');

    for (var i = 0; i < all_name.length; i++) {
      if (i == 0 || i == 1) {
        var td = $('<td/>')
          .attr('style', 'width:300px;height:60px; float:left;margin:2px;font-size:10px;text-align:center;')

        var button = $('<button/>')
          .attr('id', all_name[i])
          .attr('name', all_guid[i])
          .text(all_name[i])
          .val(all_name[i])
          .attr('style', 'width:300px;height:60px; float:left;margin:2px;font-size:30px;text-align:center;')
          .click(function() {

            var name = $(this).val();
            var guid = $(this).attr('name');
            socket.emit('leave_g', key, u_guid, name, guid);
            socket.emit('new_g', key, name, guid); //改變電視畫面
            document.location.href = "?inning=" + key + "&game=" + guid + "?";

            //var b_id = $(this).attr('id');
            //socket.emit('b_click', b_id, c_infro);
          });
        td.append(button);
        tr0.append(td);
      }


      if (i == 2 || i == 3) {
        var td = $('<td/>')
          .attr('style', 'width:300px;height:60px; float:left;margin:2px;font-size:10px;text-align:center;')

        var button = $('<button/>')
          .attr('id', all_name[i])
          .attr('name', all_guid[i])
          .val(all_name[i])
          .text(all_name[i])
          .attr('style', 'width:300px;height:60px; float:left;margin:2px;font-size:30px;text-align:center;')
          .click(function() {

            var name = $(this).val();
            var guid = $(this).attr('name');
            socket.emit('leave_g', key, u_guid, name, guid);
            socket.emit('new_g', key, name, guid); //改變電視畫面
            document.location.href = "?inning=" + key + "&game=" + guid + "?";

            //var b_id = $(this).attr('id');
            //socket.emit('b_click', b_id, c_infro);
          });
        td.append(button);
        tr1.append(td);
      }



      if (i == 4) {
        var td = $('<td/>')
          .attr('style', 'width:300px;height:60px; float:left;margin:2px;font-size:10px;text-align:center;')

        var button = $('<button/>')
          .attr('id', all_name[i])
          .attr('name', all_guid[i])
          .val(all_name[i])
          .text(all_name[i])
          .attr('style', 'width:300px;height:60px; float:left;margin:2px;font-size:30px;text-align:center;')
          .click(function() {

            var name = $(this).val();
            var guid = $(this).attr('name');
            socket.emit('leave_g', key, u_guid, name, guid);
            socket.emit('new_g', key, name, guid); //改變電視畫面
            document.location.href = "?inning=" + key + "&game=" + guid + "?";

            //var b_id = $(this).attr('id');
            //socket.emit('b_click', b_id, c_infro);
          });
        td.append(button);
        tr2.append(td);
      }
    } //for 迴圈


    var td = $('<td/>')
      .attr('style', 'width:300px;height:60px; float:left;margin:2px;font-size:10px;text-align:center;')

    var button = $('<button/>')
      .attr('id', 'exit_button')

    .val('退出遊戲')
      .text('退出遊戲')
      .attr('style', 'width:300px;height:60px; float:left;margin:2px;font-size:30px;text-align:center;')
      .click(function() {
        socket.emit('exit', u_guid); //傳這個人的guid
        document.location.href = "error";
        $('#money').hide();
      });
    td.append(button);
    tr2.append(td);


    var td = $('<td/>')
      .attr('style', 'width:600px;height:60px; float:left;margin:2px;font-size:10px;text-align:center;')

    var button = $('<button/>')
      .attr('id', 'all_score')
      .text('查看大家成績')
      .val('查看大家成績')
      .attr('style', 'width:600px;height:60px; float:left;margin:2px;font-size:30px;text-align:center;')
      .click(function() {
        socket.emit('show_score');
        $(this).hide();
      });
    td.append(button);
    tr3.append(td);

    body.append(tr0);
    body.append(tr1);
    body.append(tr2);
    body.append(tr3);
    board.append(body);
    //$('#play').append(board);
    $('#again').append(board);
    $('#again').show();
  })




  socket.on('end_paper', function() { //遊戲結束
    $('#again').show();
  })


  $('#not_me').click(function() {
    $('#make_sure').hide();
    $('#play').append('請關閉此分頁，用無痕視窗登入。');
  })


  $('#ag_button').click(function() { //再玩一次
    socket.emit('play_again');
  })



  socket.on('clear_screen', function() {
    $('#again').hide();
  });


});
