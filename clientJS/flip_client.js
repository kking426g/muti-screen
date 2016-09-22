  var func = {};
  var p_name;
  var p_pic;
  $(function() {
    var socket = io.connect('http://127.0.0.1:8000');

    $('#yes_me').click(function() {
      socket.emit('client', p_name, p_pic);
      $('#make_sure').hide();
    })

    var u_guid = ''; //這個人的guid
    var u_name = ''; //這個人的名字
    var flip_kind = ''; //哪一種（簡單還是困難）
    $('#again').hide();
    $('#decide').hide();
    $('#make_sure').hide();
    $('#score').hide();
    $('#choose').hide();
    $('#title').empty();
    $('#title').append('<p>Player information</p>');
    socket.on('client_change', function(p_name, user_guid, tv_guid, g_data, sum) {
      u_guid = user_guid;
      u_name = p_name;
      $('div').remove('.p');
    });

    socket.on('show_tiles', function(all_tile, player, p_start, name, players, flip_select_number) {
      $("#memory_board").empty();
      $('#again').hide();
      for (var j = 0; j < players.length; j++) {
        if (players[j].guid == u_guid) {
          $('#memory_board').append('<span class="color-box" style="background-color:' + players[j].color + ' "></span>');
        }
      }
      //class p都消除
      //$( ".f" ).show();
      tiles = [];
      //$('div').remove('.p');
      flip_kind = flip_select_number;
      if (flip_select_number == 1) {
        for (var i = 0; i < all_tile.length; i++) {
          $('div').remove('.f'); //刪除之前的board
          $('div').remove('.s');
          //$('#memory_board').empty();

          var tile = $('<button/>').addClass('f')
            .attr('id', 'tile_' + i)
            .click(function() {
              var t_id = $(this).attr('id');
              var t_text = $(this).attr('text'); //undefind
              var i_d = t_id.substring(7, 5);
              socket.emit('tile_click', t_id, i_d, t_text, player);
              console.log('點擊這個的id:' + t_id);
            });
          tiles.push(tile);

        }
        $('#memory_board').append(tiles);
        $("#memory_board").show();
      }

      if (flip_select_number == 2) {
        for (var i = 0; i < all_tile.length; i++) {
          $('div').remove('.f'); //刪除之前的board
          $('div').remove('.s');
          //$('#memory_board').empty();

          var tile = $('<button/>').addClass('s')
            .attr('id', 'tile_' + i)

          .click(function() {
            var t_id = $(this).attr('id');
            var t_text = $(this).attr('text'); //undefind
            var i_d = t_id.substring(7, 5);
            socket.emit('tile_click', t_id, i_d, t_text, player);
            console.log('點擊這個的id:' + t_id);
          });
          tiles.push(tile);

        }
        $('#memory_board').append(tiles);
        $("#memory_board").show();
      }
    })

    socket.on('g_over', function(winner) {
      $(".p").hide();
      $("#memory_board").hide();
      $('#again').show();
    });

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

    })




    $('#ag_button').click(function() { //再玩一次
      socket.emit('play_again');
    })




    $('#exit_button').click(function() { //離開遊戲
      socket.emit('exit', u_guid); //傳這個人的guid
      document.location.href = "error";
    })

    socket.on('clear_screen', function() {
      $('#again').hide();

    });

    socket.on('do_exit', function() {
      $('#exit').append('你已經成功退出了。請重新加入遊戲或關閉瀏覽器。');
      $('#game_data').hide();
      $('#memory_board').hide();
      $('#again').hide();
      $('#infor').hide();

    });

    socket.on('exit_hide', function() { //隱藏退出的資訊
      $('#again').hide();
    })


    socket.on('decide', function() { //決定要不要開始遊戲
      $('#decide').show();
    });

    $('#start').click(function() { //開始玩遊戲
      $('#choose').show(); //簡單還是困難的
      $('#decide').hide();
    })

    $('#easy').click(function() { //玩簡單的遊戲
      socket.emit('g_start', u_guid, u_name, p_pic, 1); //這個人的guid
    })

    $('#hard').click(function() { //玩困難版的
      socket.emit('g_start', u_guid, u_name, p_pic, 2);
    })

    $('#wait').click(function() {
      socket.emit('wait_other', u_guid, u_name, p_pic);
    })

    socket.on('div_hide', function() {
      $('#decide').hide();
      $('#choose').hide();
    });



    var p_fliped = 0; //翻開了幾隊排
    socket.on('new_tileboard', function(t_id, id, player, m_player, tile_ids_array) {
      //$('div').remove('.s');
      //$('#game_data').append("<div class='s'>顏色是"+ player.color +"</div>");
      //$('#game_data').append("<div class='s'>你已經翻開了"+ player.fliped +"對牌</div>")
      // .addClass('p');
      if (flip_kind == 2) {

        if (tile_ids_array.length == 2) {
          $("#" + t_id + "").attr('style', ' background:' + m_player.color + '');
          var img = "<img src='../static/" + id + ".png' height='30' width='30'/>";
          $("#" + t_id + "").html(img);
          setTimeout(function() {
            time()
          }, 700);

          function time() {
            for (var i = 0; i < tile_ids_array.length; i++) {
              $("#" + tile_ids_array[i] + "").attr('style', ' background:#000088');
              $("#" + tile_ids_array[i] + "").html('');
            }
          }

        } else {
          $("#" + t_id + "").attr('style', 'background:' + m_player.color + '');

          var img = "<img src='../static/" + id + ".png' height='30' width='30'/>";

          $("#" + t_id + "").html(img);
        }
      }

      if (flip_kind == 1) {
        if (tile_ids_array.length == 2) {
          $("#" + t_id + "").attr('style', ' background:' + m_player.color + '');
          var img = "<img src='../static/" + id + ".png' />";
          $("#" + t_id + "").html(img);
          setTimeout(function() {
            time()
          }, 700);

          function time() {
            for (var i = 0; i < tile_ids_array.length; i++) {
              $("#" + tile_ids_array[i] + "").attr('style', ' background:#000088');
              $("#" + tile_ids_array[i] + "").html('');
            }
          }

        } else {
          $("#" + t_id + "").attr('style', 'background:' + m_player.color + '');

          var img = "<img src='../static/" + id + ".png' />";

          $("#" + t_id + "").html(img);
        }
      }




    });


    socket.on('newboard_fliped', function(t_id, img, player, m_player, tile_ids_array, memory_tile_fliped) {

      if (flip_kind == 2) {

        $("#" + t_id + "").attr('style', 'background:' + m_player.color + '');
        var img_1 = "<img src='../static/" + img + ".png' height='30' width='30'/>";
        $("#" + t_id + "").html(img_1);
      }

      if (flip_kind == 1) {

        $("#" + t_id + "").attr('style', 'background:' + m_player.color + '');
        var img_1 = "<img src='../static/" + img + ".png' height='30' width='30'/>";
        $("#" + t_id + "").html(img_1);
      }


      for (var j = 0; j < memory_tile_fliped.length; j++) {
        document.getElementById(memory_tile_fliped[j]).style.visibility = "hidden";
      }
    })


    $('#not_me').click(function() {
      $('#make_sure').hide();
      $('#play').append('請關閉此分頁，用無痕視窗登入。');
    })
  });
