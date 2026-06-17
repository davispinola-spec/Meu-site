
// Garante que o script rode apenas após o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', () => {
    iniciarContadorImpacto();
    configurarBotaoTopo();
});

// ==========================================================================
// 1. Contador Dinâmico de Árvores Preservadas
// ==========================================================================
function iniciarContadorImpacto() {
    const alvoInsercao = document.getElementById('como-ajudar');
    
    if (alvoInsercao) {
        // Criando a estrutura de forma limpa usando classes do CSS
        const divContador = document.createElement('div');
        divContador.className = 'contador-box';
        
        divContador.innerHTML = `
            <p style="margin: 0 0 0.25rem 0; font-weight: 600; color: #1e4129; font-size: 0.95rem;">
                Comunidade Engajada: Protegendo aproximadamente
            </p>
            <span id="numero-arvores" style="font-size: 2rem; font-weight: 800; color: #2c5e3b; display: block; margin: 0.25rem 0;">0</span> 
            <p style="margin: 0; font-weight: 600; color: #2c5e3b; font-size: 0.95rem;">árvores nativas por minuto no mundo</p>
        `;
        
        alvoInsercao.appendChild(divContador);

        // Lógica da animação do número
        let valorAtual = 0;
        const valorFinal = 1850; 
        const duracaoTotal = 1500; // Tempo da animação em milissegundos
        const framesPorSegundo = 60;
        const incremento = Math.ceil(valorFinal / (duracaoTotal / (1000 / framesPorSegundo)));

        const temporizador = setInterval(() => {
            valorAtual += incremento;
            if (valorAtual >= valorFinal) {
                valorAtual = valorFinal;
                clearInterval(temporizador);
            }
            document.getElementById('numero-arvores').innerText = valorAtual.toLocaleString('pt-BR');
        }, 1000 / framesPorSegundo);
    }
}

// ==========================================================================
// 2. Criação Dinâmica do Botão "Voltar ao Topo"
// ==========================================================================
function configurarBotaoTopo() {
    const botao = document.createElement('button');
    botao.innerHTML = '&#8593;'; // Seta para cima em código HTML (↑)
    botao.title = 'Voltar ao topo da página';
    
    // Injeta os estilos dinâmicos diretamente no botão
    Object.assign(botao.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '48px',
        height: '48px',
        backgroundColor: '#2c5e3b',
        color: '#ffffff',
        border: 'none',
        borderRadius: '50%',
        fontSize: '22px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '9999',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    document.body.appendChild(botao);

    // Monitora a rolagem da página para exibir/ocultar o botão
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            botao.style.opacity = '1';
            botao.style.visibility = 'visible';
        } else {
            botao.style.opacity = '0';
            botao.style.visibility = 'hidden';
        }
    });

    // Efeito hover via JavaScript
    botao.addEventListener('mouseenter', () => {
        botao.style.backgroundColor = '#1e4129';
        botao.style.transform = 'scale(1.08)';
    });
    botao.addEventListener('mouseleave', () => {
        botao.style.backgroundColor = '#2c5e3b';
        botao.style.transform = 'scale(1)';
    });

    // Scroll suave de retorno
    botao.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
