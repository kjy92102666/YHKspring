package hello.hellospring.cnotroller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {

    @GetMapping("hello")//맵 어플리케이션에서 /hello로 들어오면 이 메소드를 호출. get메소드
    public String hello(Model model){
        model.addAttribute("data", "hello!");//mvc에 model
        return "hello";//resources/templates/hello.html를 찾아서 랜더링 해라.(화면을 실행시켜라)
        //라고 Thymeleaf 템플릿 엔진이 처리.
    }//'resources:templates/'+{ViewName(ex:hello)}+'.html'

    @GetMapping("hello-mvc")
    public String helloMvc(@RequestParam(name="name") String name, Model model){
        model.addAttribute("name", name);
        return "hello-template";
    }
    /*
    hello-mvc?name=spring!!!!! 입력시 String name에 name=spring!!!!!값이 담기고, 밑에name도 마찬가지로 모델에 담기고
    템플릿에서 ${name}=spring!!!!!이 담기게된다. ${~}에 '~' 모델에서 키값이 name을 꺼내오는거
    Ctrl+p 파라미터 정보 보는 단축키.
    */

    @GetMapping("hello-string")
    @ResponseBody//http에서 (header,body중)body부에 데이터를 직접 넣어주겠다.
    public String helloString(@RequestParam("name") String name){
        return "hello " + name; // 템플릿엔진은 화면을 가지고 뷰라는 템플릿을 조작하는 방식으로 데이터를 그대로 표출.
        //return "<html>hello " + name + "/<html>"; 굳이 html로 표현하자면..
    }

    @GetMapping("hello-api")
    @ResponseBody//http응답에 바로 문자를 넘겨줬지만,  객체가 반환되기에 기본값이 json방식으로 데이터를 만들어서 http에 응답.
    public Hello helloApi(@RequestParam("name") String name){
        Hello hello = new Hello(); //ctrl+shift+enter 누르면 세미콜론같은 문장완성기능이 있다.
        hello.setName(name);
        return hello;
    }

    static class Hello {//static 클래스를 만들면 'HelloController{}'클래스 안에서 또 쓸 수 있다. 자바문법.
        private String name;
        //제네레이터 단축키 'alt+insert' 꺼낼때는'getName()' 넣을때는'setName(String name)'
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
