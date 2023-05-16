SELECT 
fkJogador, ((COUNT(idCorneta)*100)/(SELECT COUNT(idCorneta) FROM corneta WHERE tipoCorneta = "Jogando bem")) as porcentagemBem FROM corneta
WHERE tipoCorneta = "Jogando bem"
GROUP BY fkJogador
ORDER BY porcentagemBem DESC;

SELECT 
fkJogador, ((COUNT(idCorneta)*100)/(SELECT COUNT(idCorneta) FROM corneta WHERE tipoCorneta = "Jogando mal")) as porcentagemBem FROM corneta
WHERE tipoCorneta = "Jogando mal"
GROUP BY fkJogador
ORDER BY porcentagemBem DESC;