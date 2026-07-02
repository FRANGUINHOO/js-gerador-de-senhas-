const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Inicializa a primeira senha
geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }
    
    if (alfabeto.length === 0) {
        campoSenha.value = '';
        classificaSenha(0);
        return; 
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    const valorEntropia = document.querySelector('.entropia');
    
    // Remove todas as classes de força para não acumular
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (tamanhoAlfabeto === 0) {
        forcaSenha.style.width = "0%"; // Zera a barra se não houver caracteres
        if (valorEntropia) {
            valorEntropia.textContent = "Selecione pelo menos uma característica.";
        }
        return;
    }

    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
        forcaSenha.style.width = "100%";
    } else if (entropia > 35 && entropia <= 57) {
        forcaSenha.classList.add('media');
        forcaSenha.style.width = "50%";
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
        forcaSenha.style.width = "25%";
    }
    
    if (valorEntropia) {
        let dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
        if (dias === 0) {
            valorEntropia.textContent = "Um computador pode descobrir essa senha instantaneamente.";
        } else {
            valorEntropia.textContent = "Um computador pode levar até " + dias + " dias para descobrir essa senha.";
        }
    }
}