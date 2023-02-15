export const onCodeHandler = (): string => {
  return `if(this.value.length==3 && event.keyCode>47 && event.keyCode < 58) return false;`
}

export const onlyNumberVoid = (): string => {
  return `validity.valid||(value='')`
}

export const onCardNumberHandler = (): string => {
    return "if(this.value.length==19 && event.keyCode>47 && event.keyCode < 58) return false; return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
}
