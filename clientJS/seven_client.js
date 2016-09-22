var func = {};

var p_name = '';
var p_pic = '';


$(function() {
  var c_infro = '';
  var u_guid = ''; //這個人的guid
  var u_name = ''; //這個人的名字
  var inning = ''; //新的一局的uuid
  var allthe_guid = ''; //所有遊戲的名字


  $('#decide').hide();
  $('#cant_play').hide();
  $('#again').hide();
  $('#make_sure').hide();
  $('#dealed').hide();
  $('#hide').hide();
  $('#score').hide();
  //$('#notice').hide();
  var socket = io.connect('http://127.0.0.1:8000');


  $('#yes_me').click(function() {
    socket.emit('client', p_name, p_pic);
    $('#make_sure').hide();
  })

  socket.on('client_change', function(p_name, user_guid, tv_guid, g_data, sum) {
    u_guid = user_guid;
    u_name = p_name;



  });


  $('#all_score').click(function() {
    socket.emit('show_score');
    $('#all_score').hide();
  })

  socket.on('client_change1', function(user_guid, tv_guid, g_data, sum) {
    $('#game_data').hide();
    $('#decide').show();
  });

  socket.on('new_board', function(board) {

    for (var i = 0; i < board.length; i++) {
      if (board[i] != null) {
        $('#' + i).text(board[i]);
        $('#' + i).attr("disabled", true);
      }
    }
  });

  socket.on('winner', function(board, win, all_name, all_guid, key) {
    //alert('有人贏了');
    allthe_guid = all_guid;
    for (var i = 0; i < board.length; i++) {
      $('#' + i).attr("disabled", true);
    }
    setTimeout($('.b').remove(), 100000);
    $('#again').show();
  });


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




  //點遊戲之後的動作
  socket.on('deuce', function(board) {
    for (var i = 0; i < board.length; i++) {
      $('#' + i).attr("disabled", true);
    }
    setTimeout($('.b').remove(), 100000);
    $('#again').show();
    //顯示出可以選擇的遊戲
    //$('#again').append('<input id="'+ csdcd +'" type="button" value="'+ scdsd +'" style="width:100px;height:100px">');
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




  $('#ag_button').click(function() {
    socket.emit('play_again');
  })


  $('#start').click(function() {
    socket.emit('g_start', u_guid, p_name, p_pic); //遊戲開始
  });

  $('#wait').click(function() {
    socket.emit('wait_others'); //等待
    $('decide').hide();
  });


  //$('#exit_button').click(){}//退出遊戲
  //退出遊戲
  socket.on('card_infro', function(play_array) {
    $('#notice').append('<p>你可以出</p>');
    for (var i = 0; i < play_array.length; i++) {
      $('#notice').append(play_array[i]);

      //$("'#"+ play_array[i] +"'").offset({top:-10,left:0});


    }

  })

  socket.on('hide_card', function(card_id) {

    //var img = "<img  class ='i' src='../static/bg_" + card_id + ".gif' height='54' width='40'/>";
    //$('#dealed').append(img);
    $('#' + card_id).hide();
    $('#notice').empty();
  })




  socket.on('hide_card_count', function(card_id) {
    var img = "<img  class ='i' src='../static/bg_" + card_id + ".png' height='54' width='40'/>";

    $('#hide').append(img);
    $('#' + card_id).hide();
    $('#notice').empty();
  })

  socket.on('new_player', function(players, p, play, dealcard) {
    $('#pocker').empty();

    for (var i = 0; i < p.card.length; i++) {
      //var img = "<img class ='i' id = '" + p.card[i] + "' src='../static/bg_" + p.card[i] + ".gif' />";
      if (p.card[i] != null) {

        var img = "<img class ='i' id = '" + p.card[i] + "' src='../static/bg_" + p.card[i] + ".png' height='54' width='40'/>";
        $('#pocker').append(img); //顯示牌
      }




      $('img#' + p.card[i]).click(function(card) {

        if (p.guid == play.guid) {
          socket.emit('sendID', players, p, card.currentTarget.id, dealcard);

          //$(this).hide();

        } else {
          console.log(card.currentTarget.id);
        }

        //將現在點到的這張牌的id船過去(obj.currentTarget.id是物件)
      });

    }

    if (p.guid == play.guid) {
      $('#notice').append('<p>換你出牌</p>');
      if (dealcard.length != 0) {
        for (var j = 0; j < dealcard.length; j++) {
          $('#notice').append(dealcard[j]);
          //$("'#"+ dealcard[j] +"'").offset({top:+100,left:+100});
          //move_position(dealcard);
          $('#' + dealcard[j]).attr('style', 'width:67px;height:92px; ');


        }
      } else {
        $('#notice').append('<p>這個人只能蓋牌</p>');
      }
    }
    //遊戲開始,,,顯示大家的牌，開始的人可以按牌


  })

  socket.on('choose_again', function(p) {
    //$('#play').append('<p class ="i" >重選一張</p>');

  })


  function move_position(array) {
    for (var i = 0; i < array.length; i++) {

      x = $('#' + array[i]).offset().left;
      y = $('#' + array[i]).offset().top;
      $('#' + array[i]).offset({
        top: x - 20,
        left: y
      });
    }
  }




  socket.on('seven_end', function(players, p, play_p, dealcard) {
      //$('#pocker').empty();
      $('div#pocker > img').remove();
      $('div#hide > img').remove();
      $('div#dealed > img').remove();
      $('#hide').hide();
      $('#dealed').hide();
      $('#notice').empty();

      //$("div.n").find("img").removeClass("i");
    }) //遊戲結束


  socket.on('seven_game_start', function(players, p, start_p, dealcard) {



    $('#again').hide();
    $('#hide').show();
    $('#dealed').show();

    //c_infro = g_infro;
    $('#game_data').hide();
    if (p.guid == start_p.guid) {
      $('#notice').append('<p>換你出牌</p>');
    }
    //遊戲開始,,,顯示大家的牌，開始的人可以按牌
    for (var i = 0; i < p.card.length; i++) {
      var img = "<img class ='i' id = '" + p.card[i] + "' src='../static/bg_" + p.card[i] + ".png' height='54' width='40'/>";

      $('#pocker').append(img); //顯示牌

      $('img#' + p.card[i]).click(function(card) {

        if (p.guid == start_p.guid) {
          g_play = '';
          socket.emit('sendID', players, p, card.currentTarget.id, dealcard);

          //$(this).hide();

        } else {
          console.log(card.currentTarget.id);
        }

        //將現在點到的這張牌的id船過去(obj.currentTarget.id是物件)
      });

    }
    //$('#notice').append('<input id="123" type="button" value="改變位置" >');
    $('#123').click(function() {
      x = $("#S7").offset().left;
      y = $("#S7").offset().top;
      $('#S7').offset({
        top: x + 100,
        left: y + 100
      });
    });

    $('#play').show();

  });


  socket.on('join_failed', function() {
    $('#cant_play').show();
  });

  socket.on('clear_screen', function() {
    $('#again').hide();

  });


  socket.on('not_enough_p', function() {
    //全部都合起來
    $('#play').empty();

  })

  $('#not_me').click(function() {
    $('#make_sure').hide();
    $('#play').append('請關閉此分頁，用無痕視窗登入。');
  })
});
