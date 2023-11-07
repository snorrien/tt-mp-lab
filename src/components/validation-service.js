export default class ValidationService {
    emptyErrorMessage = 'Поле не можеть быть пустым'

    validateName(value) {
        if (value.length === 0) {
            return this.emptyErrorMessage
        } else if (value.length < 3) {
            return 'Слишком короткое имя'
        } else {
            return null
        }
    }

    validateEmail(value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return null
        } else if (value.length === 0) {
            return this.emptyErrorMessage
        } else {
            return 'Некорректный e-mail'
        }
    }

    validateGroup(value) {
        if (value) {
            return null
        } else {
            return this.emptyErrorMessage
        }
    }

    validatePassword(value) {
        if (value.length === 0) {
            return this.emptyErrorMessage
        } else if (value.length < 6 && value.length > 0) {
            return 'Слишком короткий пароль'
        } else {
            return null
        }
    }

    validateRepeatPassword(value, password) {
        if (value !== password) {
            return 'Пароли не совпадают'
        } else if(value.length === 0){
            return this.emptyErrorMessage
        } else {
            return null
        }
    }
}