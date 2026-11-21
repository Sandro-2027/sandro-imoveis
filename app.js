
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       CABEÇALHO AO ROLAR A PÁGINA
    ===================================== */

    const header = document.querySelector("header");

    function atualizarCabecalho() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 30);
        }
    }

    window.addEventListener("scroll", atualizarCabecalho);
    atualizarCabecalho();


    /* =====================================
       FILTROS DE EMPREENDIMENTOS
    ===================================== */

    const filtroBairro = document.getElementById("filtroBairro");
    const filtroTipo = document.getElementById("filtroTipo");
    const filtroPreco = document.getElementById("filtroPreco");
    const filtroVaga = document.getElementById("filtroVaga");
    const contador = document.getElementById("contadorResultados");

    // Identifica o destaque Trend Santa Cruz
    const trend = document.querySelector(".destaque-principal");

    if (trend) {
        trend.dataset.bairro = "santa-cruz";
        trend.dataset.tipo =
            "studio|1-dormitorio|2-dormitorios|apartamento";
        trend.dataset.preco = "consultar";
        trend.dataset.vaga = "consultar";
    }

    // Identifica o destaque Artesano Cantalupe
    const artesano = document.getElementById("artesano");

    if (artesano) {
        artesano.dataset.bairro = "alphaville";
        artesano.dataset.tipo = "terreno";
        artesano.dataset.preco = "consultar";
        artesano.dataset.vaga = "consultar";
    }

    // Reúne cartões e destaques na mesma lista
    const cards = Array.from(
        document.querySelectorAll(
            "#empreendimentos .card, .destaque-principal, #artesano"
        )
    );

    // Normaliza textos para evitar diferenças de acentuação
    function normalizar(texto) {
        return String(texto || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function aplicarFiltros() {

        const bairroSelecionado = filtroBairro
            ? normalizar(filtroBairro.value)
            : "";

        const tipoSelecionado = filtroTipo
            ? normalizar(filtroTipo.value)
            : "";

        const precoSelecionado = filtroPreco
            ? normalizar(filtroPreco.value)
            : "";

        const vagaSelecionada = filtroVaga
            ? normalizar(filtroVaga.value)
            : "";

        let encontrados = 0;

        cards.forEach(function (card) {

            const bairros = normalizar(card.dataset.bairro)
                .split("|")
                .map(function (item) {
                    return item.trim();
                });

            const tipos = normalizar(card.dataset.tipo)
                .split("|")
                .map(function (item) {
                    return item.trim();
                });

            const preco = normalizar(card.dataset.preco);
            const vaga = normalizar(card.dataset.vaga);

            const correspondeBairro =
                !bairroSelecionado ||
                bairros.includes(bairroSelecionado);

            const correspondeTipo =
                !tipoSelecionado ||
                tipos.includes(tipoSelecionado);

            const correspondePreco =
                !precoSelecionado ||
                preco === precoSelecionado;

            const correspondeVaga =
                !vagaSelecionada ||
                vaga === vagaSelecionada;

            const mostrar =
                correspondeBairro &&
                correspondeTipo &&
                correspondePreco &&
                correspondeVaga;

            card.hidden = !mostrar;
            card.style.display = mostrar ? "" : "none";

            if (mostrar) {
                encontrados++;
            }
        });

        if (contador) {
            contador.textContent =
                encontrados === 1
                    ? "1 empreendimento encontrado"
                    : encontrados + " empreendimentos encontrados";
        }
    }

    // Ativa os filtros
    [
        filtroBairro,
        filtroTipo,
        filtroPreco,
        filtroVaga
    ].forEach(function (filtro) {

        if (filtro) {
            filtro.addEventListener("change", aplicarFiltros);
        }

    });

    // Mostra todos os empreendimentos inicialmente
    aplicarFiltros();


    /* =====================================
       TRATAMENTO DE IMAGENS QUE NÃO ABREM
    ===================================== */

    document.querySelectorAll("img").forEach(function (imagem) {

        imagem.addEventListener("error", function () {

            imagem.style.display = "none";

            const area = imagem.closest(
                ".card-image-wrapper, .destaque-imagem"
            );

            if (area) {

                area.classList.add("imagem-indisponivel");

                if (!area.querySelector(".aviso-imagem")) {

                    const aviso = document.createElement("div");

                    aviso.className = "aviso-imagem";
                    aviso.textContent = "Imagem em atualização";

                    area.appendChild(aviso);
                }
            }

        });

    });


    /* =====================================
       FAQ - PERGUNTAS E RESPOSTAS
    ===================================== */

    document.querySelectorAll(".faq-pergunta").forEach(
        function (pergunta) {

            pergunta.addEventListener("click", function () {

                const item = pergunta.closest(".faq-item");

                if (!item) return;

                item.classList.toggle("ativo");

            });

        }
    );


    /* =====================================
       ANIMAÇÕES AO ROLAR A PÁGINA
    ===================================== */

    const elementosAnimados = document.querySelectorAll(
        ".card, .vantagem, .faq-item, .titulo-section, .texto-seo"
    );

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(
            function (entradas, observer) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("mostrar");

                        observer.unobserve(entrada.target);
                    }

                });

            },
            {
                threshold: 0.08
            }
        );

        elementosAnimados.forEach(function (elemento) {

            elemento.classList.add("animar");
            observador.observe(elemento);

        });

    }


    /* =====================================
       ROLAGEM SUAVE DOS LINKS INTERNOS
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(
        function (link) {

            link.addEventListener("click", function (evento) {

                const destino = link.getAttribute("href");

                if (!destino || destino === "#") return;

                const elemento = document.querySelector(destino);

                if (elemento) {

                    evento.preventDefault();

                    elemento.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        }
    );


    /* =====================================
       BOTÃO VOLTAR AO TOPO
    ===================================== */

    let botaoTopo = document.getElementById("voltar-topo");

    if (!botaoTopo) {

        botaoTopo = document.createElement("button");

        botaoTopo.id = "voltar-topo";
        botaoTopo.type = "button";
        botaoTopo.textContent = "↑";
        botaoTopo.setAttribute("aria-label", "Voltar ao topo");
        botaoTopo.style.display = "none";

        document.body.appendChild(botaoTopo);

    }

    window.addEventListener("scroll", function () {

        botaoTopo.style.display =
            window.scrollY > 450 ? "flex" : "none";

    });

    botaoTopo.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================
       POPUP DO WHATSAPP
    ===================================== */

    const popup = document.getElementById("whatsapp-popup");

    if (popup) {

        popup.style.display = "none";

        window.setTimeout(function () {

            popup.style.display = "block";

        }, 5000);

        window.setTimeout(function () {

            popup.style.display = "none";

        }, 13000);

    }


    /* =====================================
       RASTREAMENTO DO WHATSAPP

       O evento whatsapp_click já é registrado
       no index.html. Não duplicar aqui.
    ===================================== */

});
