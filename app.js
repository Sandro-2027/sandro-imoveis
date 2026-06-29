/* ==========================================================
SANDRO IMÓVEIS INTELIGENTES
app.js
==========================================================*/

// ==========================================================
// MENU FIXO
// ==========================================================

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("header-scroll");

    } else {

        header.classList.remove("header-scroll");

    }

});

// ==========================================================
// FAQ
// ==========================================================

const perguntas = document.querySelectorAll(".faq-pergunta");

perguntas.forEach(function (pergunta) {

    pergunta.addEventListener("click", function () {

        const item = this.parentElement;

        const resposta = item.querySelector(".faq-resposta");

        document.querySelectorAll(".faq-item").forEach(function (faq) {

            if (faq !== item) {

                faq.classList.remove("ativo");

                faq.querySelector(".faq-resposta").style.maxHeight = null;

            }

        });

        item.classList.toggle("ativo");

        if (item.classList.contains("ativo")) {

            resposta.style.maxHeight = resposta.scrollHeight + "px";

        } else {

            resposta.style.maxHeight = null;

        }

    });

});

// ==========================================================
// ANIMAÇÃO AO ROLAR
// ==========================================================

const elementos = document.querySelectorAll(

".card,.vantagem,.faq-item,.titulo-section,.texto-seo"

);

const observador = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("mostrar");

        }

    });

}, {

    threshold:0.15

});

elementos.forEach(function(item){

    observador.observe(item);

});

// ==========================================================
// BOTÃO VOLTAR AO TOPO
// ==========================================================

const voltarTopo = document.createElement("div");

voltarTopo.innerHTML="▲";

voltarTopo.className="btn-topo";

document.body.appendChild(voltarTopo);

window.addEventListener("scroll",function(){

    if(window.scrollY>700){

        voltarTopo.classList.add("mostrar");

    }else{

        voltarTopo.classList.remove("mostrar");

    }

});

voltarTopo.addEventListener("click",function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ==========================================================
// LINKS SUAVES
// ==========================================================

document.querySelectorAll('a[href^="#"]').forEach(function(link){

    link.addEventListener("click",function(e){

        const destino=document.querySelector(

            this.getAttribute("href")

        );

        if(destino){

            e.preventDefault();

            destino.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// ==========================================================
// CARDS CLICÁVEIS
// ==========================================================

document.querySelectorAll(".card").forEach(function(card){

    const link=card.getAttribute("data-link");

    if(link){

        card.style.cursor="pointer";

        card.addEventListener("click",function(){

            window.location.href=link;

        });

    }

});
/* ==========================================
POPUP DO WHATSAPP
========================================== */

window.addEventListener("load", function () {

    const popup = document.getElementById("whatsapp-popup");

    if (!popup) return;

    setTimeout(function () {
        popup.classList.add("show");
    }, 5000);

    setTimeout(function () {
        popup.classList.remove("show");
    }, 13000);

});