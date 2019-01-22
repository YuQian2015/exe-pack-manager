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
        <form id="loginForm" class="ui large form login-form" style="display: none">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="userId" name="userId" placeholder="用户ID">
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
          <div class="ui message" onclick="showQrCode()">使用二维码登录</div>
        </form>
        <div class="ui message">
          {% import "../component/qr-login.tpl" as login %}
          {{ login.field('') }}
        </div>

      </div>
    </div>
  </body>
</html>