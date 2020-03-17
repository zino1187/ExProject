var express = require('express');
var mysql = require("mysql");
var router = express.Router();

const conStr ={
  host:"localhost",
  user:"root",
  password:"1234",
  database:"ios"
}
//게시물 수정 요청 처리 
router.post("/edit", function(request, response){
  
  var con = mysql.createConnection(conStr);
  con.connect();

  var sql="update board set title=?, writer=?, content=?";
  sql+=" where board_id=?";
  
  var title = request.body.title;
  var writer = request.body.writer; 
  var content = request.body.content; 
  var board_id = request.body.board_id;

  con.query(sql, [ title, writer, content, board_id ], function(err, result, fields){
    if(err){
      console.log(err);
    }else{
      response.render("content", {
        board:request.body
      });
    }
    con.end();
  });



});

//게시물 삭제 요청 처리 
router.get("/delete", function(request, response){
  var con = mysql.createConnection(conStr);
  con.connect();
  
  var sql = "delete from board where board_id=?";  
  con.query(sql, [request.query.board_id], function(err, result, fields){
    //삭제에 성공하면, 코멘트도 지우자!!
    //사실상 이 작업은 두개의 세부업무로 이루어진 트랜잭션 상황이다..
    if(err){
      console.log(err);
    }else{
      sql ="delete from comment where board_id=?";
      con.query(sql, [ request.query.board_id], function(er, r, f){
        response.redirect("/board/list"); 
      });
    }
    con.end();
  });

});

//코멘드 목록 요청 처리 
router.get("/comment/list", function(request, response){
  var con = mysql.createConnection(conStr);
  con.connect(); 

  var sql="select * from comment where board_id=?";

  con.query(sql, [request.query.board_id], function(err, result, fields){
    //제이슨 결과물을 문자열로 전송!!
    var data = {
      commentList:result 
    }    
    response.send(JSON.stringify(data));
    con.end();
  });



});

//코멘트 등록 요청 처리 
router.post("/comment/regist", function(request, response){
  var param = request.body;
  
  var con = mysql.createConnection(conStr);
  con.connect();
  
  var sql ="insert into comment(board_id,msg,cwriter) values(?,?,?)";
  con.query(sql, [param.board_id, param.msg, param.cwriter], function(err, result, fields){
    //코멘트 등록 후...content.ejs렌더링
    if(err){
      console.log(err);
    }else{
      //response.send("0");
      response.send("1");
    }
    con.end();
  });
  


});

//상세보기 요청 처리 
router.get("/detail", function(request, response){
  console.log("board_id 값은 ", request.query);
  var con = mysql.createConnection(conStr);
  con.connect();

  var sql = "select * from board where board_id = ?";

  
  //게시물 한건 
  con.query(sql, [request.query.board_id], function(err, result, fields){
    if(err){
      console.log(err);
    }else{
        sql="select * from comment where board_id=?";
        con.query(sql, [request.query.board_id], function(e,data,f){
          if(e){
            console.log(e);
          } else{

            console.log("result", result);
            console.log("comment", data);

            var records={
              board:result[0],
              commentArray:data
            }
            response.render("content", records);
          }   
        });
    }
    con.end();
  });
  //이 게시물에 딸린 코멘트 목록!!

});

//게시물 등록 요청 처리 
router.post("/regist", function(request, response){
  //파라미터 받기 
  console.log(request.body);
  var con = mysql.createConnection(conStr);
  con.connect();
  
  var json = request.body;

  var sql ="insert into board(title,writer,content) values(?,?,?)";
  con.query(sql, [ json.title, json.writer, json.content ], function(err, result, fields){
    if(err){
      console.log(err);
    }else{
      response.redirect("/board/list");
    }
    con.end();
  });
});

/* GET users listing. */
router.get('/list', function(req, res, next) {
  //res.send('게시판 목록이 나올 예정');
  var con = mysql.createConnection(conStr);
  con.connect(); 
  var sql ="select b.board_id as board_id , title , writer, regdate, hit, count(comment_id) as cnt";
  sql +=" from board b left outer join comment c";
  sql +=" on b.board_id = c.board_id";
  sql +=" group by b.board_id, title, writer, regdate, hit";
  
  console.log(sql);

  con.query(sql, function(err, result, fields){
    console.log(result);
    //list.ejs에 배열로 전달로 되고 있음 주의!!!
    res.render("list", {
      listArray:result
    }); 
    con.end();
  });

});

module.exports = router;
