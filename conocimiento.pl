personaje(ana, mujer, rubio, no, no, no).
personaje(carlos, hombre, castanio, si, si, si).
personaje(elena, mujer, pelirrojo, no, si, no).
personaje(juan, hombre, negro, no, no, si).
personaje(lucia, mujer, castanio, si, no, no).
personaje(mario, hombre, rubio, no, si, si).

es_mujer(N) :- personaje(N, mujer, _, _, _, _).
tiene_gafas(N) :- personaje(N, _, _, si, _, _).
tiene_sombrero(N) :- personaje(N, _, _, _, si, _).

% Filtrar lista
filtrar(mujer, Lista, Filtrados) :- include(es_mujer, Lista, Filtrados).
filtrar(gafas, Lista, Filtrados) :- include(tiene_gafas, Lista, Filtrados).
filtrar(sombrero, Lista, Filtrados) :- include(tiene_sombrero, Lista, Filtrados).
