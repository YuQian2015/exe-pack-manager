<html>
  <head>
    <title>登录</title>
    {% include "../component/import.tpl" %}
      <style type="text/css">
        body > .grid {
            background-image: url('http://exe.moyufed.com/wall_bg.jpg');
            background-repeat: no-repeat;
            background-size: 100%;
            height: 100%;
        }
        .column {
          max-width: 450px;
        }
      </style>
  </head>
  <body>
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <form id="loginForm" class="ui large form login-form">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="tel" name="tel" placeholder="邮箱地址">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="密码">
              </div>
            </div>
            <div class="ui fluid large teal submit button">登录</div>
          </div>
          <div class="ui error message"></div>
        </form>
        <div class="ui message">新用户，请<a href="#">注册</a>。</div>
      </div>
    </div>
  </body>
</html>