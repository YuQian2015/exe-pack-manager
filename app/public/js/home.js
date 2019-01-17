
function login() {
    var result = {};
    result.tel = $("#loginForm input[name='tel']").val();
    result.password = $("#loginForm input[name='password']").val();
    $.ajax({
        type: 'POST',
        url: "/api/v1/login",
        contentType: 'application/json',
        data: JSON.stringify(result),
        success: function (res) {
            if (res && res.success) {
                localStorage.setItem('token', res.data.token);
                window.location.href = 'home';
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    });
}

$(document).ready(function () {
    $('.ui.login-form').form({
        fields: {
            email: {
                identifier: 'email',
                rules: [
                    {
                        type: 'empty',
                        prompt: '输入邮箱'
                    },
                    {
                        type: 'email',
                        prompt: '请输入合法的邮箱'
                    }
                ]
            },
            password: {
                identifier: 'password',
                rules: [
                    {
                        type: 'empty',
                        prompt: '请输入你的密码'
                    },
                    {
                        type: 'length[6]',
                        prompt: '密码不能少于6位'
                    }
                ]
            }
        }
    });
    $('#loginForm').submit(function (e) {
        login();
        e.preventDefault();
    })
});


