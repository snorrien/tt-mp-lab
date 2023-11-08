<script>
import ValidationService from './validation-service'
import axios from 'axios'

const validation = new ValidationService();

export default {
  data() {
    return {
      confirmed: false,
      isActive: true,
      name: '',
      email: '',
      role: null,
      password: '',
      repeatPassword: '',
      public:false,
      nameError: null,
      emailError: null,
      roleError: null,
      passwordError: null,
      repeatPasswordError: null,

      valueDropdown: null,
      list: [
        { value: 1, name: "Бухгалтер" },
        { value: 2, name: "Менеджер" },
        { value: 3, name: "Программист" }
      ],
      visible: false,
    }
  },
  methods: {
    acceptOferta() {
      this.isActive = !this.isActive;
    },
    async register() {
      console.log(this.public)
      const inputsAreValid = this.validateInputs();
      if (!inputsAreValid) {
        return
      }
      else {
        await axios.post('https://jsonplaceholder.typicode.com/posts', {
          public: this.public,
          username: this.name,
          email: this.email,
          role: this.role.number,
          password: this.password,
          password_repeat: this.repeatPassword,
        })
        this.confirmed = !this.confirmed
      };
    },

    validateInputs() {
      this.nameError = validation.validateName(this.name)
      this.emailError = validation.validateEmail(this.email)
      this.roleError = validation.validateRole(this.role)
      this.passwordError = validation.validatePassword(this.password)
      this.repeatPasswordError = validation.validateRepeatPassword(this.repeatPassword, this.password)

      if (this.nameError || this.emailError || this.roleError || this.passwordError || this.repeatPasswordError || !this.isActive) {
        return false
      } else {
        return true
      }
    },

    toggleDropdown() {
      this.visible = !this.visible;
    },

    makePublic() {
      this.public = !this.public;
      console.log(this.public);
    },

    selectItem(option) {
      this.valueDropdown = option;
      this.role = option;
    },
  }
}
</script>

<template>
  <div v-if="!confirmed" class="content-wrapper">
    <p class="title">Регистрация</p>
    <div class="form-wrapper">
      <p class="title-sm">Заполните Ваши данные</p>
      <div class="form">
        <div class="form__col">
          <div class="input">
            <input placeholder="Имя" v-model="name" :class="{ errorinput: nameError !== null }">
            <span class="error-text" v-if="nameError">{{ nameError }}</span>
          </div>
          <div class="input password">
            <input placeholder="Пароль" v-model="password" :class="{ errorinput: passwordError !== null }">
            <img src="./icons/showed.svg" />
            <span class="error-text" v-if="passwordError">{{ passwordError }}</span>
          </div>
        </div>
        <div class="form__col">
          <div class="input">
            <input placeholder="Email" v-model="email" :class="{ errorinput: emailError !== null }">
            <span class="error-text" v-if="emailError">{{ emailError }}</span>
          </div>
          <div class="role" :class="{ 'errorinput': roleError }" @click="toggleDropdown()">
            <span class="error-text" v-if="roleError">{{ roleError }}</span>
            <div class="role__selectedItem" :data-value="valueDropdown" :data-list="list">
              <div class="role__selector" >
                <div class="role__label" :class="{ 'placeholder-text': !valueDropdown }">
                  {{ valueDropdown ? valueDropdown.name : 'Должность' }}
                </div>
                <div :class="{ hidden: !visible }">
                  <ul class="role__list">
                    <li :class="{ 'current': item === valueDropdown }" v-for="item in list" @click="selectItem(item)">{{
                      item.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="input password">
            <input placeholder="Повторите пароль" type="password" v-model="repeatPassword"
              :class="{ errorinput: repeatPasswordError !== null }">
            <img src="./icons/hided.svg" />
            <span class="error-text" v-if="repeatPasswordError">{{ repeatPasswordError }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-wrapper">
      <div class="checkbox">
        <label class="checkbox__switch" >
          <input type="checkbox" >
          <span class="checkbox__slider" @click="makePublic"></span>
        </label>
        <div class="checkbox__content">
          <p class="checkbox__title">Хотите чтобы Ваш профиль видели другие участники платформы? </p>
          <p class="checkbox__text">Включает профиль для просмотра другими пользователями по ссылке</p>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom__oferta">
          <button class="oferta" :class="isActive ? 'active' : ''" @click="acceptOferta"></button>
          <p class="oferta__text">Регистрируясь, Вы соглашаетесь с <span>политикой конфиденциальности</span> и обработкой
            <span>персональных данных</span>
          </p>
        </div>
        <div>
          <button class="register" @click="async () => await register()">Зарегистрироваться</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="register-confirm">
    <p class="title">Регистрация успешно завершена</p>
  </div>
</template>

<style scoped>
.content-wrapper {
  width: 960px;
  height: 547px;
  border-radius: 15px;
  background: #FFF;
  margin: auto;
}

.title {
  font-size: 19px;
  font-weight: 700;
  line-height: 27px;
  letter-spacing: -0.066px;
  padding: 17px 31px;
}

.form-wrapper {
  border-top: 1px solid #D9D9D9;
  border-bottom: 1px solid #D9D9D9;
}

.title-sm {
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  padding: 17px 31px;
}

.form {
  display: flex;
  padding: 17px 31px 30px;
  height: 225px;
  gap: 14px;
}

.form__col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.input,
.password {
  position: relative;
}

.password input {
  padding-right: 35px;
}

.password img {
  position: absolute;
  right: 10px;
  top: 40%
}

.selectGroup {
  position: relative;
  cursor: pointer;
}

.role {
  width: 450px;
  height: 39px;
  padding: 10px;
  align-items: center;
  border-radius: 11px;
  border: 1px solid #E6E6EB;
  position: relative;
}

.role:hover {
  cursor: pointer;
}

.role__selectedItem {
  position: relative;
  cursor: pointer;
  font-size: 14px;
}

.role__list {
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #FFF;
  position: absolute;
  left: -10px;
  top: 42px;
  z-index: 1;
  border-radius: 11px;
  box-shadow: 0px 0px 6px 0px rgba(148, 181, 225, 0.35);
  font-size: 14px;
}

.role__list li {
  padding: 4px 5px;
}

.role__list li:hover {
  padding-bottom: 9px;
  background: rgba(73, 122, 218, 0.20);
  border-radius: 5px;
}

.role__selector {
  z-index: 1;
}

.hidden {
  visibility: hidden;
}

.visible {
  visibility: visible;
}

.placeholder-text {
  color: #9292A0;
}

.error-text {
  position: absolute;
  right: 0;
  top: 100%;
  color: red;
  font-size: 10px;
}

.errorinput {
  border: 1px solid red;
}

.bottom-wrapper {
  padding: 23px 15px 0 31px;
}

.checkbox {
  display: flex;
}

.checkbox__switch {
  position: relative;
  display: inline-block;
  width: 39px;
  height: 19px;
}

.checkbox__switch input {
  opacity: 1;
  width: 0;
  height: 0;
}

.checkbox__slider {
  position: absolute;
  cursor: pointer;
  top: -1px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FFF;
  transition: .4s;
  border-radius: 30px;
  border: 1px solid #ccc;
}

.checkbox__slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  border-radius: 16px;
  left: -1px;
  top: 0;
  bottom: 0;
  background-color: #FFF;
  border: 1px solid #ccc;
  transition: .4s;
}

input:checked+.checkbox__slider {
  background: #3586FF;
  border: 1px solid transparent;
}

input:checked+.checkbox__slider:before {
  transform: translateX(20px);
}

.checkbox__title {
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 10px;
  line-height: 19px;
}

.checkbox__text {
  line-height: 19px;
  color: #696977;
}

.checkbox__content {
  padding-left: 5px;
}

.bottom__oferta {
  display: flex;
  flex-direction: row;
}

.oferta {
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 19px;
  width: 19px;
  background-color: #FFF;
}

.oferta:hover {
  cursor: pointer;
}

.active {
  background-image: url('./icons/Vector.svg');
  background-color: #3586FF;
  border: none;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 60% 60%;
  border: 1px solid #FFF;
}

.bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 70px;
  padding-top: 30px;
}

.oferta__text {
  padding-left: 14px;
}

.oferta__text span {
  color: #3586FF;
  height: 19px;
}

.register {
  width: 302px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(73, 122, 218, 0.20);
  border: none;
  color: #3586FF;
}

.register:hover {
  cursor: pointer;
}

.register-confirm {
  width: 440px;
  height: 100px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  background: #FFF;
  margin: auto;
}
</style>
