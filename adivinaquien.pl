% personaje(nombre, genero, accesorios, lentes, pelo_largo, pelo_corto, gorro, aretes, barba,
% pelo_suelto, pelo_color, mirada, tez, tipo_pelo, corte, copete)

personaje(ethan, hombre, si, no, no, no, no, si, no, no, negro, derecha, clara, ondulado, no, no).
personaje(sidney, mujer, si, no, si, no, si, no, no, no, pelirrojo, izquierda, clara, liso, no, no).
personaje(olivia, mujer, no, no, si, no, no, no, no, no, multicolor, derecha, morena, afro, no, no).
personaje(diego, hombre, no, no, no, no, no, no, no, no, negro, izquierda, clara, liso, no, no).
personaje(theo, hombre, no, no, no, no, si, no, no, no, castanio, izquierda, clara, liso, no, no).
personaje(dylan, hombre, no, no, no, no, no, no, no, no, negro, derecha, clara, liso, no, si).
personaje(laura, mujer, si, no, si, no, no, si, no, si, negro, izquierda, morena, ondulado, no, no).
personaje(jasper, hombre, si, si, no, no, no, no, no, no, rubio, izquierda, clara, liso, no, si).
personaje(amy, mujer, si, si, no, si, no, no, no, si, multicolor, derecha, clara, liso, no, no).
personaje(maya, mujer, no, no, si, no, no, no, no, no, pelirrojo, izquierda, clara, liso, no, no).
personaje(marcus, hombre, no, no, no, no, no, no, no, no, rubio, derecha, morena, liso, si, no).
personaje(luke, hombre, si, si, no, no, no, no, no, no, castanio, izquierda, clara, liso, no, no).
personaje(sam, mujer, no, no, si, no, no, no, no, si, negro, izquierda, morena, ondulado, no, no).
personaje(mason, hombre, no, no, no, no, no, no, si, no, castanio, izquierda, clara, liso, no, no).
personaje(zara, mujer, no, no, no, si, no, no, no, no, rubio, izquierda, clara, liso, no, no).


% Regla auxiliar para obtener solo los nombres de los personajes
personaje(P) :- personaje(P, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _).

% Filtros dinámicos
es_mujer(X) :- personaje(X, mujer, _, _, _, _, _, _, _, _, _, _, _, _, _, _).
es_hombre(X) :- personaje(X, hombre, _, _, _, _, _, _, _, _, _, _, _, _, _, _).
tiene_accesorios(X) :- personaje(X, _, si, _, _, _, _, _, _, _, _, _, _, _, _, _).
usa_lentes(X) :- personaje(X, _, _, si, _, _, _, _, _, _, _, _, _, _, _, _).
tiene_pelo_largo(X) :- personaje(X, _, _, _, si, _, _, _, _, _, _, _, _, _, _, _).
tiene_pelo_corto(X) :- personaje(X, _, _, _, _, si, _, _, _, _, _, _, _, _, _, _).
usa_gorro(X) :- personaje(X, _, _, _, _, _, si, _, _, _, _, _, _, _, _, _).
usa_aretes(X) :- personaje(X, _, _, _, _, _, _, si, _, _, _, _, _, _, _, _).
tiene_barba(X) :- personaje(X, _, _, _, _, _, _, _, si, _, _, _, _, _, _, _).
pelo_suelto(X) :- personaje(X, mujer, _, _, _, _, _, _, _, si, _, _, _, _, _, _).
cabello_rubio(X) :- personaje(X, _, _, _, _, _, _, _, _, _, rubio, _, _, _, _, _).
cabello_castanio(X) :- personaje(X, _, _, _, _, _, _, _, _, _, castanio, _, _, _, _, _).
cabello_negro(X) :- personaje(X, _, _, _, _, _, _, _, _, _, negro, _, _, _, _, _).
cabello_pelirrojo(X) :- personaje(X, _, _, _, _, _, _, _, _, _, pelirrojo, _, _, _, _, _).
cabello_multicolor(X) :- personaje(X, _, _, _, _, _, _, _, _, _, multicolor, _, _, _, _, _).
mira_derecha(X) :- personaje(X, _, _, _, _, _, _, _, _, _, _, derecha, _, _, _, _).
mira_izquierda(X) :- personaje(X, _, _, _, _, _, _, _, _, _, _, izquierda, _, _, _, _).
tez_clara(X) :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, clara, _, _, _).
tez_morena(X) :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, morena, _, _, _).
pelo_afro(X) :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, afro, _, _).
pelo_ondulado(X) :- personaje(X, _, _, _, _, _, _, _, _, _, _, _, _, ondulado, _, _).
corte_militar(X) :- personaje(X, hombre, _, _, _, _, _, _, _, _, _, _, _, _, si, _).
tiene_copete(X) :- personaje(X, hombre, _, _, _, _, _, _, _, _, _, _, _, _, _, si).

% Mapeo entre preguntas y predicados
filtro_predicado(mujer, es_mujer).
filtro_predicado(hombre, es_hombre).
filtro_predicado(accesorios, tiene_accesorios).
filtro_predicado(lentes, usa_lentes).
filtro_predicado(pelo_largo, tiene_pelo_largo).
filtro_predicado(pelo_corto, tiene_pelo_corto).
filtro_predicado(gorro, usa_gorro).
filtro_predicado(aretes, usa_aretes).
filtro_predicado(barba, tiene_barba).
filtro_predicado(pelo_suelto, pelo_suelto).
filtro_predicado(rubio, cabello_rubio).
filtro_predicado(castanio, cabello_castanio).
filtro_predicado(negro, cabello_negro).
filtro_predicado(pelirrojo, cabello_pelirrojo).
filtro_predicado(multicolor, cabello_multicolor).
filtro_predicado(derecha, mira_derecha).
filtro_predicado(izquierda, mira_izquierda).
filtro_predicado(tez_clara, tez_clara).
filtro_predicado(tez_morena, tez_morena).
filtro_predicado(afro, pelo_afro).
filtro_predicado(ondulado, pelo_ondulado).
filtro_predicado(corte_militar, corte_militar).
filtro_predicado(copete, tiene_copete).

% Filtro sin lambda (compatible con SWI-Prolog)
cumple_predicado(Pred, X) :-
    Goal =.. [Pred, X],
    call(Goal).

filtrar(Pregunta, Lista, Filtrados) :-
    filtro_predicado(Pregunta, Pred),
    include(cumple_predicado(Pred), Lista, Filtrados).
