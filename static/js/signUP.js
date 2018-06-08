$(document).ready(function () {
    var isAuth = false;
    var errorBox = $("div.alert-danger");
    var successBox = $("div.alert-success");
    successBox.slideUp(1);
    errorBox.slideUp(1);
    //console.log(successBox);
    var getInfo = function () {

        $.get("/getInfo" , function (data) {
            console.log(data);
            if (data['status']) {
                $.get("logout",function(data){
                    console.log(data.msg);
                });
            }
            else {
                console.log("khoda ro shokr kharej bud");
            }
        }) ;
    };
    getInfo();
    $("#accept_button").click(function () {
        var errmsg="";
        var ndate = new Date($("#birthDate").val());
        var yndate = ndate.getFullYear();
        if($("#password").val().length <4){errmsg+="\n"+"طول رمز عبور باید بیشتر از 3 رقم باشد"}
        if($("#password").val()!=$("#re_password").val()){errmsg+="\n"+"رمز عبور مغایر است";}
        if(!($("#terms").is(":checked"))){errmsg+="\n"+"لطفا شرایط را بپذیرید";}
        if($("#firstName").val()===""){errmsg+="\n"+"نام را وارد کنید";}
        if($("#lastName").val()===""){errmsg+="\n"+"نام خانوادگی را وارد کنید";}
        if($("#phone").val()===""){errmsg+="\n"+"شماره تماس را وارد کنید";}
        if($("#phone").val().length != 11 || $("#phone").val().charAt(0)!='0'){errmsg+='\n'+"شماره تلفن معتبر نیست";}
        if($("#code").val()===""){errmsg+="\n"+"شماره شناسنامه را وارد کنید";}
        if($("#code").val().length != 10){errmsg+='\n'+ "شماره شناسنامه معتبر نمیباشد"}
        if(yndate>2000 || yndate<1900){errmsg+='\n'+"تاریخ تولد معتبر نمی باشد";}
        console.log(errmsg);
        if(errmsg!=""){

            successBox.slideUp(1);
            errorBox.slideUp(1);
            errorBox.html(errmsg).slideDown(500);
        }
        else {
//            console.log("hahaha!");
            var reqobject={"fname":$("#firstName").val() , "lname":$("#lastName").val() , "phone": $("#phone").val() ,
                "code": $("#code").val() , "pass": $("#password").val(), "gender":$("#gender").val(),"bdate":$("#birthDate").val()};
            console.log(reqobject);
            $.post('/signup',reqobject,function(data){
                if(data['status']){
                    successBox.slideUp(1);
                    errorBox.slideUp(1);
                    successBox.html("با موفقیت ثبت شد").slideDown(500);
                }else{
                    successBox.slideUp(1);
                    errorBox.slideUp(1);
                    errorBox.html(data['msg']).slideDown(500);
                }
            });

        }




    });
    $("#return_button").click(function  () {
        window.location = '/';
    });




});