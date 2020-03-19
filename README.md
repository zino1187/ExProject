# ExProject
Node.js - Express 프레임웍을 이용한 코멘트 비동기 게시판

<!DOCTYPE html>
<head>
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
<script>
//자바스크립트로 태그를 동적으로 처리하기란 만만치 않다!! 
//개발자는 DOM에 대한 지식을 많아 알아야 하고, 안다고 해도 코드량이 많다..
//ex) table 을 화면에 동적 출력....ㅜㅜ
//프런트 분야에서 이런 문제를 보다 효율적으로 처리하기 위한 기술들이 개발되고 잇는데, 
//구글 : Angular  ,  Facebook:React ,   지네단체(the organization of themselves):Vue
//위의 기술들과 상관없이 예전부터 개발된 바벨이라는 라이브러리를 이용하면, 
//자바스크립트 코드 내에서도 태그를 이용할 수 있다..
</script>    
<script type="text/babel">
class MyTable extends React.Component{
    //리엑트의 컴포넌트를 상속받으면, 화면에 출력한 디자인 코드를 반환하는 render() 메서드를
    //재정의 해야 한다!! 
    constructor(){
        super();//부모 생성자 호출

        this.state = {
            age:30
        }      
    }

    render(){
        return <table border="1px" width="500px">
                    <tr>
                        <td>Name</td>
                        <td>Age</td>
                    </tr>
                    <tr>
                        <td>{this.props.msg}</td>
                        <td>{this.props.test}</td>
                    </tr>
                    <tr>
                        <td>Adams</td>
                        <td>{this.state.age}</td>
                    </tr>
                    <tr>
                        <td>Brian</td>
                        <td>42</td>
                    </tr>
                </table>
    }
}

//위에서 정의한 나만의 컴포넌트를 화면에 출력해보자
ReactDOM.render( <MyTable msg="hi" test="aaaaa"/> , document.getElementById("content") );
</script>

</head>
<body>
    <div id="content"></div>    
</body>
</html>










