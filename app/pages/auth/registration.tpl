{% extends '../_layouts/auth.tpl' %}

{#{% block Head %}{% endblock %}#}
  {#{% block Meta %}{% endblock %}#}
  {#{% block Styles %}{% endblock %}#}

{#{% block Body-before %}{% endblock %}#}

{#{% block Body %}{% endblock %}#}
  {#{% block Menu %}{% endblock %}#}
    {#{% block Menu-content %}{% endblock %}#}

  {#{% block Header-before %}{% endblock %}#}

  {#{% block Header %}{% endblock %}#}
    {#{% block Header-content %}{% endblock %}#}

  {#{% block Header-after %}{% endblock %}#}

  {#{% block Middle-before %}{% endblock %}#}

  {#{% block Middle %}{% endblock %}#}
    {#{% block Middle-content %}{% endblock %}#}

      {#{% block Content %}{% endblock %}#}
        {% block Content-content %}
          <div class="auth auth--registration">
            <h1 class="auth__title">Регистрация исполнителя</h1>
            <p>
              <input type="text"
                  name="phone"
                  placeholder="Мобильный телефон"
                  class="auth__field input input--default input--full input--lg">
              <input type="text"
                  name="password"
                  placeholder="Пароль"
                  class="auth__field input input--default input--full input--lg">
            </p>
            <p>
              <button type="submit" class="auth__submit btn btn--primary btn--full btn--lg">Зарегистрироваться</button>
            </p>
            <p class="auth__description">
              Нажимая на кнопку «Зарегистрироваться», вы подтверждаете свое согласие с условиями
              <a href="#">публичной оферты</a>
            </p>
            <p class="text-center">или зарегистрироваться через</p>
            <p class="auth__socials">
              <a class="auth__social" href="#">
                <i class="icon icon--social-vk"></i>
              </a>
              <a class="auth__social" href="#">
                <i class="icon icon--social-ok"></i>
              </a>
              <a class="auth__social" href="#">
                <i class="icon icon--social-mail"></i>
              </a>
            </p>
          </div>
          <br>
          <p class="text-center">
            <a href="#" class="link link--white">Зарегистрированы?</a>
          </p>
        {% endblock %}

      {#{% block Sidebar-left %}{% endblock %}#}
        {#{% block Sidebar-left-content %}{% endblock %}#}

      {#{% block Sidebar-right %}{% endblock %}#}
        {#{% block Sidebar-right-content %}{% endblock %}#}

  {#{% block Middle-after %}{% endblock %}#}

  {#{% block Footer-before %}{% endblock %}#}

  {#{% block Footer %}{% endblock %}#}
    {#{% block Footer-content %}{% endblock %}#}

  {#{% block Footer-after %}{% endblock %}#}

{#{% block Body-after %}{% endblock %}#}

{#{% block Scripts %}{% endblock %}#}