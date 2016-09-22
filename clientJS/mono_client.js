var func = {};
var p_name = '';
var p_pic = '';


$(function() {
  var c_infro = '';
  var u_guid = ''; //這個人的guid
  var u_name = ''; //這個人的名字
  var u_price = '';
  var inning = ''; //新的一局的uuid
  var allthe_guid = ''; //所有遊戲的名字

  $('#no_build').hide();
  $('#build').hide();
  $('#hide_place').hide();
  $('#all_place').hide();
  $('#decide').hide();
  $('#cant_play').hide();
  $('#again').hide();
  $('#dice').hide();
  $('#yes').hide();
  $('#no').hide();
  $('#ok').hide();
  $('#certain').hide();
  $('#place').hide();
  $('#pay_yes').hide();
  $('#make_sure').hide();
  $('#score').hide();

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



  socket.on('new_board', function(board) {

    for (var i = 0; i < board.length; i++) {
      if (board[i] != null) {
        $('#' + i).text(board[i]);
        $('#' + i).attr("disabled", true);
      }
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




  socket.on('decide', function() {
    //$('#play').append('<p>要不要開始</p>');
    $('#decide').show();
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
    $('#decide').hide();
  });

  $('#wait').click(function() {
    socket.emit('wait_other', u_guid, p_name, p_pic);
  });


  //$('#exit_button').click(){}//退出遊戲
  //退出遊戲



  socket.on('mono_game_start', function(p, start_p) {
    c_infro = p;

    $('#play').append('<span class="color-box" style="background-color:' + p.color + ' "></span>');
    var img = "<img src='" + p.toy + "' height='30' width='30'/>";
    $('#play').append(img);

    $('#money').remove();
    $('#again').hide();
    $('#place').show();
    $('#game_data').hide();
    //顯示錢
    var m = $('<p/>')
      .attr('id', 'money')
      .html('目前有' + p.money + '錢')
      .attr('style', 'text-align:center');

    $('#play').append(m);

    if (p.guid == start_p.guid) {
      $('#dice').show();
    }
  });



  socket.on('change_player', function(c_infro) {
    $('#dice').show();
  })



  socket.on('show_score_hide', function() { //那個button不見
    $('#all_score').hide();
  })



  socket.on('g_button', function(win, all_name, all_guid, key) {
    $('#money').empty();
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




  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  $('#dice').click(function() {
    var r_number = getRandomInt(2, 12);
    //顯示直出幾點？
    var w = $('<p/>')
      .html('走' + r_number + '步')
      .attr('id', 'walk_s')
      .attr('style', 'text-align:center');
    //$('#play').append('<p text-align="center" id="walk_s" >走'+r_number+'步</p>');
    $('#play').append(w);
    $('#dice').hide();
    socket.emit('walk', c_infro, r_number);

  })


  $('#not_me').click(function() {
    $('#make_sure').hide();
    $('#play').append('請關閉此分頁，用無痕視窗登入。');
  })


  socket.on('mono_game_chance', function(p, chance) {
    u_price = chance.c_p;
    c_infro = p;
    if (p.guid == c_infro.guid) {
      //$('#play').append('<p id="temp">'+chance.c+'</p>');
      $('#ok').show();
    }
  })


  socket.on('mono_game_pay', function(players, p, pay) {
    u_price = pay; //要付多少錢
    c_infro = p;
    //$('#play').append('<p id="temp">這是'+ pay.owner.name +'的地,要付多少錢'+pay.pay+'</p>');
    $('#pay_yes').show();
  })




  $('#pay_yes').click(function() {
    socket.emit('get_money', c_infro); //取得最新的錢
    socket.emit('change_player', c_infro);
    $('#temp').remove();
    $('#money').remove();
    $('#walk_s').remove();
    //$('#play').append("<p id='money' >目前有"+c_infro.money+"錢</p>");
    $('#pay_yes').hide();
  })

  socket.on('money', function(players) {
    $('#money').remove();
    for (var i = 0; i < players.length; i++) {
      if (players[i].guid == c_infro.guid) {


        var m = $('<p/>')
          .attr('id', 'money')
          .html('目前有' + players[i].money + '錢')
          .attr('style', 'text-align:center');

        $('#play').append(m);



        //$('#play').append("<p id='money' >目前有"+players[i].money+"錢</p>");
      }
    }
  })




  $('#ok').click(function() {
    socket.emit('change_player', c_infro);
    $('#money').remove();
    $('#temp').remove();
    $('#walk_s').remove();
    $('#play').empty();

    //$('#play').append("<p id='money' >目前有"+c_infro.money+"錢</p>");

    $('#play').append('<span class="color-box" style="background-color:' + c_infro.color + ' "></span>');
    var img = "<img src='" + c_infro.toy + "' height='30' width='30'/>";
    $('#play').append(img);


    var m = $('<p/>')
      .attr('id', 'money')
      .html('目前有' + c_infro.money + '錢')
      .attr('style', 'text-align:center');

    $('#play').append(m);

    $('#ok').hide();


  })


  $('#certain').click(function() {
    $('#walk_s').remove();
    //socket.emit('pay_money');
    socket.emit('change_player', c_infro);
    $('#certain').hide();
    $('#temp').remove();
  })




  socket.on('mono_game_newboard', function(players, p, script, price) {

    //顯示訊息new_board.players, new_board.script, new_board.price
    //new_board.players, new_board.p, new_board.script, new_board.price
    u_price = price;
    $('#money').remove();

    var m = $('<p/>')
      .attr('id', 'money')
      .html('目前有' + p.money + '錢')
      .attr('style', 'text-align:center');

    $('#play').append(m);


    //$('#play').append("<p id='money' >目前有"+p.money+"錢</p>");
    for (var i = 0; i < players.length; i++) {
      //alert(player[i].name);
      if (p.guid == players[i].guid) {
        //$('#play').append('<p id='+ price +'>是否要購買'+script+'價格'+ price +'</p>');

        $('#yes').show();
        $('#no').show();
      }
    }
  })




  socket.on('buy_already', function(players) {
    $('#money').remove();
    for (var i = 0; i < players.length; i++) {
      if (players[i].guid == c_infro.guid) {




        var m = $('<p/>')
          .attr('id', 'money')
          .html('目前有' + players[i].money + '錢')
          .attr('style', 'text-align:center');

        $('#play').append(m);
      }
    }
  })



  socket.on('div_hide', function() {
    $('#decide').hide();
  });




  $('#yes').click(function() {
    socket.emit('buy_city', c_infro, u_price);
    $('#yes').hide();
    $('#no').hide();
    $("#" + u_price + "").remove();
    $('#walk_s').remove();
  })

  $('#no').click(function() {
    socket.emit('change_player', c_infro);
    $('#yes').hide();
    $('#no').hide();
    $("#" + u_price + "").remove();
    $('#walk_s').remove();
  })


  socket.on('mono_game_lucky', function(players, p, script) {
    $('#money').remove();
    //$('#play').append('<p id="temp">'+script+'</p>');



    var m = $('<p/>')
      .attr('id', 'money')
      .html('目前有' + p.money + '錢')
      .attr('style', 'text-align:center');

    $('#play').append(m);

    $('#certain').show();

  })

  socket.on('house', function(players, p) {
    $('#money').remove();


    var m = $('<p/>')
      .attr('id', 'money')
      .html('目前有' + p.money + '錢')
      .attr('style', 'text-align:center');

    $('#play').append(m);

  })


  socket.on('mono_game_free', function(players, p, script) {
    $('#play').append('<p id="temp">' + script + '</p>');
    $('#certain').show();
    socket.emit('change_player', c_infro);

  })

  $('#place').click(function() { //顯示買的房子
    socket.emit('find_place', c_infro);
    //如果有買就放到div裡面, 點了就顯示
    $('#all_place').show();
    $('#hide_place').show();
  })


  socket.on('found_place', function(p, places, house) {
    $('#all_place').empty();
    for (var i = 0; i < places.length; i++) {
      $('#all_place').append("<p>國家：" + places[i] + "有" + house[i] + "棟房子</p>");
    }
  })


  $('#no_build').click(function() {
    socket.emit('change_player', c_infro);
    $('#no_build').hide();
    $('#build').hide();
    $('#temp').remove();
    $('#money').remove();
    $('#walk_s').remove();
  })


  $('#build').click(function() { //蓋房子
    socket.emit('new_house', c_infro);
    socket.emit('change_player', c_infro);
    $('#no_build').hide();
    $('#build').hide();
    $('#temp').remove();
    $('#walk_s').remove();
  })


  socket.on('mono_game_more_h', function(player, p, script) { //是否要建房子
    if (p.guid == c_infro.guid) {
      c_infro = p;
      //$('#play').append('<p id="temp">這是你購買的地，是否要建房子？</p>');
      $('#no_build').show();
      $('#build').show();
    }
  })



  $('#hide_place').click(function() { //隱藏買的地
    $('#all_place').hide();
    $('#hide_place').hide();
  })




  socket.on('join_failed', function() {
    $('#cant_play').show();
  });

  socket.on('clear_screen', function() {
    $('#again').hide();

  });


  socket.on('end_g', function(players, win_p) { //遊戲結束
    $('#dice').hide();
    $('#place').hide();
    $('#again').show();
  })


});
