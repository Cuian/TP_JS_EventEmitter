﻿/*
* Thibault Chauvenet
* IUT de Nantes
*2014-2015
*/

/////////////////////////////
//Structure reprise du cours
////////////////////////////

EventEmitter = function (){
//HashMap[event-­‐>[fn1,fn2,...]]

//Torréfaction de riz ou factory de fonction ... tough choice.
if(!(this instanceof EventEmitter)){
return new EventEmitter();
}

//Boite à gouter de stockage des éléments (fonctions, utilisations restante)
this.chantillySurCrepe={};
this.confitureSurBrioche={};


return this;
}


//Définition de la recette de cuisine
EventEmitter.prototype = {


//Ajout d'une association event/fonction, ou si l'event n'est pas référencé, création d'un tableau de fonction associé à l'event.
on : function(bocal,pateAuChocolatATartiner)
{
	//La sagesse veut que je factorise ce code. Mais je vais plutôt employer ce temps perdu à écrire des commentaires inutiles.
	if(this.chantillySurCrepe.hasOwnProperty(bocal))
	{
		this.chantillySurCrepe[bocal].push(pateAuChocolatATartiner);
		this.confitureSurBrioche[bocal].push(-1);	//Si valeur à -1, c'est un équivalent de time(event, infini, fonction)
	}
	else
	{
		this.chantillySurCrepe[bocal] = [];
		this.chantillySurCrepe[bocal].push(pateAuChocolatATartiner);
		
		this.confitureSurBrioche[bocal] = [];
		this.confitureSurBrioche[bocal].push(-1);
	}
	
	return this;
	
},

//Ajout d'une association event/fonction qui ne pourra executer qu'un nombre limité de fois. Ou si l'event n'est pas référencé, création d'un tableau de fonction associé à l'event.
times : function(bocal,mesure,pateAuChocolatATartiner)
{
	//Faire des copier/coller ne m'empêchera pas de tartiner des couches supplémentaires du nutella de l'inutilité.
	if(this.chantillySurCrepe.hasOwnProperty(bocal))
	{
		this.chantillySurCrepe[bocal].push(pateAuChocolatATartiner);
		this.confitureSurBrioche[bocal].push(mesure);	//Si valeur à -1, c'est un équivalent de time(event, infini, fonction)
	}
	else
	{
		this.chantillySurCrepe[bocal] = [];
		this.chantillySurCrepe[bocal].push(pateAuChocolatATartiner);
		
		this.confitureSurBrioche[bocal] = [];
		this.confitureSurBrioche[bocal].push(mesure);
	}
	
	return this;
	
},

//Ajout d'une association event/fonction qui ne pourra executer qu'une fois. Ou si l'event n'est pas référencé, création d'un tableau de fonction associé à l'event.
once : function(bocal,pateAuChocolatATartiner)
{
	//Bon, on peut faire une concession je suppose... Sinon les fondants au chocolat c'est pas mal non plus.
	return this.times(bocal,1,pateAuChocolatATartiner);
},


//Suppression d'un évènement spécifié en paramètre, ou si aucun paramètre n'est entré, suppression de l'ensemble des évènements
off : function(/* argument éventuel */)
{
	//Suppression de l'ensemble des fonctions d'un event
	if(arguments.length == 1)
	{
		 delete this.chantillySurCrepe[arguments[0]];
		 delete this.confitureSurBrioche[arguments[0]];
	}
	//Suppression d'une fonction liée à un event
	else if(arguments.length > 1)
	{
		//delete this.chantillySurCrepe[arguments[0]];
		var spatule = this.chantillySurCrepe[arguments[0]].indexOf(arguments[1])
		if(spatule > -1)
		{
			this.chantillySurCrepe[arguments[0]].splice(spatule,1);
			this.confitureSurBrioche[arguments[0]].splice(spatule,1);
		}
		
		//Si le tableau est vide, on le supprime
		if(this.chantillySurCrepe[arguments[0]].length === 0)
		{
			delete this.chantillySurCrepe[arguments[0]];
			delete this.confitureSurBrioche[arguments[0]];
		}
	}
	//Suppression de toutes les fonctions liés à tout les events
	else
	{   
		for(var sucre in this.chantillySurCrepe)
		{
			delete this.chantillySurCrepe[sucre];
		}
		
		for(var levure in this.confitureSurBrioche)
		{
			delete this.confitureSurBrioche[levure];
		}
	}
	
	return this;
	
},


//Appel les fonctions de l'évènement passé en paramètre, en leur donnant comme paramètres les éventuels paramètres passés en paramètres
emit:function(bocal)
{
	var farine = this.chantillySurCrepe[bocal];
	var lait = this.confitureSurBrioche[bocal];
	var oeuf;
	
	if(arguments.length > 1)
	{
	    var saladier = Array.prototype.slice.call(arguments);
		oeuf = saladier.slice(1); //Récupération du tableau des arguments privés de boca
	}
	else
	{
		oeuf = [];
	}
	//Fonction(s) appellée(s) si seulement elles existent. Et on leur applique le tableau partiel d'arguments.
	if(typeof farine != "undefined")
	{
		var verreDoseur = farine.length;
		var spatule = 0;
		
		while(spatule < verreDoseur)
		{
			if(lait[spatule] > 0 || lait[spatule] < 0)
			{
				farine[spatule].apply(this,oeuf);
				if(lait[spatule] > 0) this.confitureSurBrioche[bocal][spatule]--;
				spatule++;

			}
			else
			{
				delete this.chantillySurCrepe[bocal][spatule];
				delete this.confitureSurBrioche[bocal][spatule];
				verreDoseur--;
			}
		}
	}
	return this;
}



};

/*		ZONE DE CUISSON		*/

//var fn = console.log.bind(console);

//EventEmitter().on("event1",fn ).on("event2",fn ).emit("event1",1).emit("event2",2).off("event1",fn).emit("event1",1).emit("event2",2);
//EventEmitter().once("event",function(){console.log("Shouldonlybeprintedonce");}).emit("event").emit("event");
//EventEmitter().times("event1",2,fn).emit("event1","helloshouldbeprint").emit("event1","worldshouldbeprint").emit("event1","SHOULDNOTBEPRINTED");
//EventEmitter().times("event1",3,fn).emit("event1","helloshouldbeprint").emit("event1","worldshouldbeprint").emit("event1","SHOULDNOTBEPRINTED");
