document.getElementsByTagName('body')[0].onscroll = function(){
    document.getElementsByTagName('header')[0].classList.toggle('shown');
    if(window.pageYOffset != 0){ 
        document.getElementsByTagName('header')[0].classList.add('shown');
        to_top.style.opacity = '1';
}
    else{
        document.getElementsByTagName('header')[0].classList.remove('shown');
        to_top.style.opacity = '0';
    }
}

menu_button.onclick = function(){
    menu.classList.toggle('shown');
    document.getElementsByTagName('header')[0].classList.add('shown');
}

let lis = Array.from(menu.getElementsByTagName('li'));
for(let li in lis){
    lis[li].onclick = function(){
        document.getElementsByTagName('header')[0].classList.add('shown');
        menu.classList.remove('shown');
    }
}

let buttons = Array.from(document.getElementsByTagName('button'));

for(let button in buttons){
    buttons[button].onclick = function(){
        form.classList.add('shown');
    }
}
close_form.onclick = function(){
    form.classList.remove('shown');
}

send_form_data.style.opacity = '.7';
send_form_data.disabled = true;
let nameFlag = false;
  let phoneFlag = false;
  let nickFlag = false;
  
function checkFlags(){
    if(nameFlag && phoneFlag && nickFlag){
        send_form_data.style.opacity = '1';
        send_form_data.disabled = false;
      }
    else{
        send_form_data.style.opacity = '.7';
        send_form_data.disabled = true;
    }
  }

  $('#nick').on('input', function () {
    if(nick.value.replace(' ', '') != ''){
        nickFlag = true;
    }
    else{
        nickFlag = false;
    }
    checkFlags();
  })

  $('#phone').on('input', function () {
    var phoneNumber = $(this).val();
        var phoneNumberDigitsOnly = phoneNumber.replace(/\D/g, '');
        $(this).val(phoneNumberDigitsOnly);
        var digitsRegex = /^\d+$/;

        if (digitsRegex.test(phoneNumberDigitsOnly)) {
          phoneFlag = true;
        } else {
            phoneFlag = false;
        }
    checkFlags();
  });
  
  $('#name').on('input', function() {
      $(this).val($(this).val().replace(/[^a-zа-яё\s]/gi, ''));
    if($(this).val() != '' && $(this).val() != ' '){
      nameFlag = true;
    }
    else{
      nameFlag = false;
    }
    checkFlags();
  });

function tg_send(text){
    const CHAT_ID = "-1002142471820";
    const TOKEN = "7190591849:AAFJ51KoFS_Y1jP3abvmMa40Q6D-aVFoZX8";
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'MarkDown',
        text: text
    });
    document.getElementById('name').value = '';
    phone.value = '';
    nick.value = '';
    send_form_data.innerHTML = '<img src="Imgs/check-solid.svg" alt="user-check">';
}

function sendInfo() {
    const name_ = document.getElementById('name').value;
    const phone_ = document.getElementById('phone').value;
    const nick_ = document.getElementById('nick').value;
  
    const message = `Имя: ${name_}\nНомер: ${phone_}\nНик: ${nick_}`;
  
    tg_send(message);
  }
  
  send_form_data.onclick = function(){
      if(!send_form_data.disabled){
        sendInfo();
      }
  }