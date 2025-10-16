/* Máscaras simples para CPF, telefone e CEP (client-side). 
   Isto é apenas para melhorar UX; validação final deve ser feita no servidor. */
document.addEventListener('DOMContentLoaded', function(){
  function setMask(el, maskFunc){
    el.addEventListener('input', function(e){
      const pos = el.selectionStart;
      const before = el.value;
      el.value = maskFunc(el.value);
      // attempt to keep cursor near same position
      try{ el.setSelectionRange(pos, pos); }catch(e){}
    });
  }

  function maskCPF(v){
    v = v.replace(/\D/g,'').slice(0,11);
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})\.(\d{3})(\d)/,'$1.$2.$3');
    v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/,'$1.$2.$3-$4');
    return v;
  }

  function maskPhone(v){
    v = v.replace(/\D/g,'').slice(0,11);
    if(v.length <= 10){
      v = v.replace(/(\d{2})(\d)/,'($1) $2');
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
    } else {
      v = v.replace(/(\d{2})(\d)/,'($1) $2');
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
    }
    return v;
  }

  function maskCEP(v){
    v = v.replace(/\D/g,'').slice(0,8);
    v = v.replace(/(\d{5})(\d)/,'$1-$2');
    return v;
  }

  var cpf = document.getElementById('cpf');
  var tel = document.getElementById('telefone');
  var cep = document.getElementById('cep');

  if(cpf) setMask(cpf, maskCPF);
  if(tel) setMask(tel, maskPhone);
  if(cep) setMask(cep, maskCEP);

  // Basic client-side validation hint
  var form = document.getElementById('cadastroForm');
  if(form){
    form.addEventListener('submit', function(e){
      if(!form.checkValidity()){
        e.preventDefault();
        form.reportValidity();
      } else {
        // Simula envio e mostra confirmação
        e.preventDefault();
        alert('Formulário válido! (Simulação de envio)\nVerifique se todos os dados estão corretos antes de enviar para o servidor.');
        form.reset();
      }
    });
  }
});
