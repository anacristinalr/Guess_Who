% personaje(nombre, genero, lentes, pelo_largo, pelo_corto, gorro, aretes, barba,
% pelo_suelto, pelo_color, mirada, tez, tipo_pelo, corte_militar, copete, 
% edad, ropa, es_calvo, etnia, bigote)


% genero: hombre | mujer

% lentes: si | no           
% pelo_largo: si | no      
% pelo_corto: si | no
% gorro: si | no
% aretes: si | no
% barba: si | no

% pelo_suelto: si | no
% pelo_color: negro | castanio | rubio | pelirrojo | multicolor | gris | no
% mirada: izquierda | derecha | de_frente
% tez: clara | morena

% Edad: infante | adulto | adulto_mayor  
% Tipo_pelo: liso | ondulado | afro | no
% Ropa: chompa | polo | caffarena | camisa  
% Es_calvo: si | no  
% Etnia: asiatica | occidental | afrodescendiente  

% FILTROS DINÁMICOS
% Obtener solo los nombres de los personajes
personaje(P) :- personaje(P, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _).

% ETHAN
personaje(ethan, hombre, no, no, no, no, si, no,
          no, negro, derecha, clara, ondulado, no, no,
          adulto, polo, no, occidental, no).

% SIDNEY
personaje(sidney, mujer, no, si, no, si, no, no,
          no, pelirrojo, izquierda, clara, liso, no, no,
          adulto, polo, no, occidental, no).

% OLIVIA
personaje(olivia, mujer, no, si, no, no, no, no,
          no, multicolor, derecha, morena, afro, no, no,
          adulto, polo, no, afrodescendiente, no).

% DIEGO
personaje(diego, hombre, no, no, no, no, no, no,
          no, negro, izquierda, clara, liso, no, no,
          adulto, polo, no, occidental, no).

% THEO
personaje(theo, hombre, no, no, no, si, no, no,
          no, castanio, izquierda, clara, liso, no, no,
          adulto, chompa, no, occidental, no).

% DYLAN
personaje(dylan, hombre, no, no, no, no, no, no,
          no, negro, derecha, clara, liso, no, si,
          adulto, polo, no, occidental, no).

% LAURA
personaje(laura, mujer, no, si, no, no, si, no,
          si, negro, izquierda, morena, ondulado, no, no,
          adulto, chompa, no, occidental, no).

% JASPER
personaje(jasper, hombre, si, no, no, no, no, no,
          no, rubio, izquierda, clara, liso, no, si,
          adulto, camisa, no, occidental, no).

% AMY
personaje(amy, mujer, si, no, si, no, no, no,
          si, multicolor, derecha, clara, liso, no, no,
          adulto, chompa, no, occidental, no).

% MAYA
personaje(maya, mujer, no, si, no, no, no, no,
          no, pelirrojo, izquierda, clara, liso, no, no,
          adulto, chompa, no, occidental, no).

% MARCUS
personaje(marcus, hombre, no, no, no, no, no, no,
          no, rubio, derecha, morena, liso, si, no,
          adulto, polo, no, afrodescendiente, no).

% LUKE
personaje(luke, hombre, si, no, no, no, no, no,
          no, castanio, izquierda, clara, liso, no, no,
          adulto, polo, no, occidental, no).

% SAM
personaje(sam, mujer, no, si, no, no, no, no,
          si, negro, izquierda, morena, ondulado, no, no,
          adulto, chompa, no, afrodescendiente, no).

% MASON
personaje(mason, hombre, no, no, no, no, no, si,
          no, castanio, izquierda, clara, liso, no, no,
          adulto, polo, no, occidental, no).

% ZARA
personaje(zara, mujer, no, no, si, no, no, no,
          no, rubio, izquierda, clara, liso, no, no,
          adulto, caffarena, no, occidental, no).

%---------------------------------------------------------------

% JACK
personaje(jack, hombre, no, no, si, no, no, no,
          no, negro, derecha, clara, liso, no, si,
          adulto, polo, no, occidental, no).

% ANGELINA
personaje(angelina, mujer, no, si, no, no, si, no,
          si, negro, izquierda, clara, liso, no, no,
          adulto, polo, no, occidental, no).

% RENZO
personaje(renzo, hombre, no, no, si, no, no, no,
          no, castanio, izquierda, clara, liso, no, no,
          adulto, polo, no, occidental, no).

% ANA
personaje(ana, mujer, si, si, no, no, no, no,
          si, negro, izquierda, clara, ondulado, no, no,
          adulto, chompa, no, occidental, no).

% BEN
personaje(ben, hombre, si, no, no, no, no, no,
          no, gris, de_frente, clara, no, no, no,
          adulto_mayor, camisa, si, occidental, si).

% LILY
personaje(lily, mujer, no, si, no, si, no, no,
          si, castanio, izquierda, clara, liso, no, no,
          adulto, polo, no, asiatica, no).

% BRIAN
personaje(brian, hombre, no, no, no, no, no, no,
          no, no, derecha, clara, no, no, no,
          adulto, polo, si, occidental, no).

% GEORGE
personaje(george, hombre, no, no, si, no, no, no,
          no, rubio, de_frente, clara, liso, no, no,
          infante, chompa, no, occidental, no).

% NAMJOON
personaje(namjoon, hombre, no, no, si, no, no, no,
          no, gris, izquierda, clara, liso, no, si,
          adulto, caffarena, no, asiatica, no).

% MINJEONG
personaje(minjeong, mujer, no, si, no, no, si, no,
          si, castanio, izquierda, clara, liso, no, no,
          adulto, caffarena, no, asiatica, no).

% CONNOR
personaje(connor, hombre, no, si, no, no, no, si,
          no, negro, derecha, morena, afro, no, no,
          adulto, polo, no, afrodescendiente, si).

% SUSAN
personaje(susan, mujer, si, no, si, no, no, no,
          si, gris, derecha, clara, ondulado, no, no,
          adulto_mayor, camisa, no, occidental, no).

% RICHARD
personaje(richard, hombre, si, no, si, no, no, no,
          no, gris, derecha, clara, no, no, no,
          adulto_mayor, camisa, si, occidental, no).

% MIKE
personaje(mike, hombre, no, no, si, si, no, no,
          no, negro, derecha, clara, liso, no, no,
          infante, polo, no, occidental, no).

% CHARLES
personaje(charles, hombre, no, no, si, no, no, no,
          no, negro, derecha, morena, afro, si, no,
          infante, polo, no, afrodescendiente, no).


% Filtros por género
es_hombre(X) :- personaje(X, hombre, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _).
es_mujer(X)  :- personaje(X, mujer, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _).

% Accesorios y rasgos faciales
usa_lentes(X)      :- personaje(X, _, si, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _).
tiene_pelo_largo(X):- personaje(X, _, _, si, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _).
tiene_pelo_corto(X):- personaje(X, _, _, _, si, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _).
usa_gorro(X)       :- personaje(X, _, _, _, _, si, _, _, _, _, _, _, _, _, _, _, _, _, _, _).
usa_aretes(X)      :- personaje(X, _, _, _, _, _, si, _, _, _, _, _, _, _, _, _, _, _, _, _).
tiene_barba(X)     :- personaje(X, _, _, _, _, _, _, si, _, _, _, _, _, _, _, _, _, _, _, _).
tiene_bigote(X)    :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, si).

% Cabello suelto (solo aplicable a mujeres)
pelo_suelto(X)     :- personaje(X, mujer, _, _, _, _, _, _, si, _, _, _, _, _, _, _, _, _, _, _).

% Color de cabello
cabello_negro(X)      :- personaje(X, _, _, _, _, _, _, _, _, negro, _, _, _, _, _, _, _, _, _, _).
cabello_castanio(X)   :- personaje(X, _, _, _, _, _, _, _, _, castanio, _, _, _, _, _, _, _, _, _, _).
cabello_rubio(X)      :- personaje(X, _, _, _, _, _, _, _, _, rubio, _, _, _, _, _, _, _, _, _, _).
cabello_gris(X)       :- personaje(X, _, _, _, _, _, _, _, _, gris, _, _, _, _, _, _, _, _, _, _).
cabello_pelirrojo(X)  :- personaje(X, _, _, _, _, _, _, _, _, pelirrojo, _, _, _, _, _, _, _, _, _, _).
cabello_multicolor(X) :- personaje(X, _, _, _, _, _, _, _, _, multicolor, _, _, _, _, _, _, _, _, _, _).
es_calvo(X)           :- personaje(X, _, _, _, _, _, _, _, _, no, _, _, _, _, _, _, si, _, _, _).

% Mirada
mira_izquierda(X) :- personaje(X, _, _, _, _, _, _, _, _, _, izquierda, _, _, _, _, _, _, _, _, _).
mira_derecha(X)   :- personaje(X, _, _, _, _, _, _, _, _, _, derecha, _, _, _, _, _, _, _, _, _).
mira_frente(X)    :- personaje(X, _, _, _, _, _, _, _, _, _, de_frente, _, _, _, _, _, _, _, _, _).

% Tez
tez_clara(X)  :- personaje(X, _, _, _, _, _, _, _, _, _, _, clara, _, _, _, _, _, _, _, _).
tez_morena(X) :- personaje(X, _, _, _, _, _, _, _, _, _, _, morena, _, _, _, _, _, _, _, _).
tez_oscura(X) :- personaje(X, _, _, _, _, _, _, _, _, _, _, oscura, _, _, _, _, _, _, _, _).


% Tipo de cabello
pelo_liso(X)      :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, liso, _, _, _, _, _, _, _).
pelo_ondulado(X)  :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, ondulado, _, _, _, _, _, _, _).
pelo_afro(X)      :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, afro, _, _, _, _, _, _, _).
pelo_sin_tipo(X)  :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, no, _, _, _, _, _, _, _).

% Corte militar y copete (hombres)
corte_militar(X)  :- personaje(X, hombre, _, _, _, _, _, _, _, _, _, _, _, si, _, _, _, _, _, _).
tiene_copete(X)   :- personaje(X, hombre, _, _, _, _, _, _, _, _, _, _, _, _, si, _, _, _, _, _).

% Edad
es_infante(X)        :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, infante, _, _, _, _).
es_adulto(X)         :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, adulto, _, _, _, _).
es_adulto_mayor(X)   :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, adulto_mayor, _, _, _, _).

% Ropa
usa_chompa(X)     :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, chompa, _, _, _).
usa_polo(X)       :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, polo, _, _, _).
usa_caffarena(X)  :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, caffarena, _, _, _).
usa_camisa(X)     :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, camisa, _, _, _).

% Etnia
es_occidental(X)        :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, occidental, _).
es_asiatico(X)          :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, asiatica, _).
es_afrodescendiente(X)  :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, afrodescendiente, _).

% MAPEO ENTRE PREGUNTAS Y PREDICADOS

% Género
filtro_predicado(mujer, es_mujer).
filtro_predicado(hombre, es_hombre).

% Accesorios y rasgos faciales
filtro_predicado(lentes, usa_lentes).
filtro_predicado(pelo_largo, tiene_pelo_largo).
filtro_predicado(pelo_corto, tiene_pelo_corto).
filtro_predicado(gorro, usa_gorro).
filtro_predicado(aretes, usa_aretes).
filtro_predicado(barba, tiene_barba).
filtro_predicado(bigote, tiene_bigote).

% Cabello suelto (solo para mujeres)
filtro_predicado(pelo_suelto, pelo_suelto).

% Colores de cabello
filtro_predicado(negro, cabello_negro).
filtro_predicado(castanio, cabello_castanio).
filtro_predicado(rubio, cabello_rubio).
filtro_predicado(gris, cabello_gris).
filtro_predicado(pelirrojo, cabello_pelirrojo).
filtro_predicado(multicolor, cabello_multicolor).
filtro_predicado(calvo, es_calvo).

% Mirada
filtro_predicado(derecha, mira_derecha).
filtro_predicado(izquierda, mira_izquierda).
filtro_predicado(frente, mira_frente).

% Tez
filtro_predicado(tez_clara, tez_clara).
filtro_predicado(tez_morena, tez_morena).

% Tipo de cabello
filtro_predicado(liso, pelo_liso).
filtro_predicado(ondulado, pelo_ondulado).
filtro_predicado(afro, pelo_afro).
filtro_predicado(sin_tipo, pelo_sin_tipo).

% Estilo de cabello (solo hombres)
filtro_predicado(corte_militar, corte_militar).
filtro_predicado(copete, tiene_copete).

% Edad
filtro_predicado(infante, es_infante).
filtro_predicado(adulto, es_adulto).
filtro_predicado(adulto_mayor, es_adulto_mayor).

% Ropa
filtro_predicado(chompa, usa_chompa).
filtro_predicado(polo, usa_polo).
filtro_predicado(caffarena, usa_caffarena).
filtro_predicado(camisa, usa_camisa).

% Etnia
filtro_predicado(occidental, es_occidental).
filtro_predicado(asiatico, es_asiatico).
filtro_predicado(afrodescendiente, es_afrodescendiente).


% Filtro sin lambda (compatible con SWI-Prolog)

cumple_predicado(Pred, X) :-
    Goal =.. [Pred, X],
    call(Goal).

filtrar(Pregunta, Lista, Filtrados) :-
    filtro_predicado(Pregunta, Pred),
    include(cumple_predicado(Pred), Lista, Filtrados).
