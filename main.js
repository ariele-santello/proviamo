 function myFunction() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {x.className += " responsive";} 
	else {x.className = "topnav";}
    }

function changeCSS(cssFile, cssLinkIndex) {
	/* create new link */

	var newlink = document.createElement("link");
	newlink.rel = "stylesheet"; 
  	newlink.type = "text/css";
	newlink.href = cssFile;
	
	/* case 1: external html */
	var linksArray = document.head.getElementsByTagName("link");
	var firstCount = 0;
    	for (var l = 0; l < linksArray.length; l++) {
    		if (linksArray[l].rel == "stylesheet") {
 			firstCount += 1;
    			linksArray[l].href = cssFile;
    		}
    	}
    	if (firstCount == 0) {document.head.appendChild(newlink);}
	
	/* case 2: internal html */
	var myFrames = document.getElementsByTagName("iframe");
    	for (var i = 0; i < myFrames.length; i++) {
    		var n = i+1;
    		var myFrame = document.getElementById("iframe"+ n);
    		var elmnt = myFrame.contentWindow.document.head;
    		var mylinks = elmnt.getElementsByTagName("link");
    		var count = 0;
    		for (var l = 0; l < mylinks.length; l++) {
    			if (mylinks[l].rel == "stylesheet") {
    				count += 1;
    				mylinks[l].href = cssFile;
    			}
    		}
    		if (count == 0) {elmnt.appendChild(newlink);}
    	}
    
    /* aggiunta per cambiare il css anche nei singoli iframe    */
    
    /* frames[i].document.head.repleaceChild(newLink);
    n = i+1
    frames['frame'+n].document.head.children[1].replace(newlink, oldlink);   */
	
    /*	var doc = document.getElementsByTagName("iframe");
	for (var i = 0; i < doc.length; i++) {
		var c = doc[i].contentWindow;
		var iframeOldlink = c.document.getElementsByTagName("link").item(cssLinkIndex);
		var d = c.document.getElementsByTagName("head");
		d[0].replaceChild(newlink, iframeOldlink);
    	}  */
}


function changeIssue(issueN){
	var y = [];
	for (var h=1; h<=3; h++){
		if ('issue'+h === issueN){x = document.getElementById('issue'+h);}
		else{y.push(h);}
	}
	//issue da nascondere
	for (var num of y){
		var curIssue = document.getElementById('issue'+num);
		curIssue.style.display = "none"; 
		for (var i=0; i<curIssue.children.length; i++) {curIssue.children[i].style.display = "none";}
	}
	//issue da mostrare
	var xChildren = x.children;     /*  i div che hanno class coverPage e articleN   */
	var totLength = xChildren.length;  
	x.style.display = "block";   /* issue da mostrare  */
	xChildren[0].style.display = "block";   /* cover da mostrare  */
	
	var oldArticles = document.getElementById("changeArguments").children;  /* per cambiare il contenuto delle funzioni onclick degli articoli  */
	
	for (var i=1; i<totLength; i++) {
		xChildren[i].style.display = "none";    // articoli da non mostrare  
		
		var newArticle = document.createElement("a");    // creazione del nuovo tag 
		newArticle.setAttribute("class", "buttonArticle");   // creazione del nuovo tag, set classe
		newArticle.setAttribute("onclick", "changeArticle('article"  + i + "', '" + issueN + "')");   // creazione del nuovo tag, set onclick attibute

		var myFrame = xChildren[i].children[0];
		var myMeta = myFrame.contentWindow.document.head.getElementsByTagName("meta");
			for (var l = 0; l < myMeta.length; l++) {
				if (myMeta[l].name == "DC.title") {
					newArticle.innerHTML = myMeta[l].content;
				}
			}
		document.getElementById("changeArguments").replaceChild(newArticle, oldArticles[i-1]);
	}	
        var originButton = document.getElementById("Origin");
	if (originButton.hasAttribute("href")) {
		originButton.removeAttribute("href");
	}
	showMetaList('changeIssue', issueN); 
}

function getLinkOrigin(currentArticle, myOrigin) {
	/* TORNARE AL FILE SORGENTE   */
	var myFrame = currentArticle.children[0];
	var elmnt = myFrame.contentWindow.document.head;
	var myMeta = elmnt.getElementsByTagName("meta");
		for (var l = 0; l < myMeta.length; l++) {
			if (myMeta[l].name == "DC.identifier" && myMeta[l].scheme == "DCTERMS.URI") {
				myOrigin.href = myMeta[l].content;
				myOrigin.target = "_blank";
			}
		}
}

function changeArticleCommon(c, articleNum, myOrigin){
	c[0].style.display = "none";
	for (var i=1; i<c.length; i++){
		if ("article" + i === articleNum){
			c[i].style.display = "block";
			getLinkOrigin(c[i], myOrigin);
		}
		else {c[i].style.display = "none";}
	}
}

function changeArticle(articleNum, issueNum){
	var c = document.getElementById(issueNum).children;
	var myOrigin = document.getElementById("Origin");
	changeArticleCommon(c, articleNum, myOrigin);
}

function changeArticleCover(articleNum, issueNum){
	var c = window.parent.document.getElementById(issueNum).children;
	var myOrigin = window.parent.document.getElementById("Origin");
	changeArticleCommon(c, articleNum, myOrigin);
	showMetaList('changeArticleCover', issueNum);
}

function showMetaList(string, issueN){
	if (string === 'changeArticleCover'){var strToParse = window.parent.document.getElementById('metadata').children;}
	else {var strToParse = document.getElementById('metadata').children;}
	for (var m=1; m<strToParse.length; m++){
		if (strToParse[m].id === "list"+issueN.charAt(0).toUpperCase()+issueN.slice(1)){strToParse[m].style.display = "block";}
		else{strToParse[m].style.display = "none";}
	}
}

function prevArticle() {
 	var articles = document.getElementsByClassName("article");
 	
 	for (var i = 1; i < articles.length; i++) { //i= 1 perché non voglio considerare il primo articolo
 		var frame = articles[i],
 			style = window.getComputedStyle(frame),
			displayValue = style.getPropertyValue('display'); //queste ultime due righe sono equivalenti a var displayValue = window.getComputedStyle(frame, null).display;
		if (displayValue === "block") {
			if (!(frame.classList.contains('article1'))) {
				frame.style.display = "none";
				var articleNow = articles[i-1];
				articleNow.style.display = "block";
				/* var myFrame = articleNow.children[0];
				var curIssue = articleNow.parentElement;
				var x = curIssue.children[i-1]; */
				var myOrigin = document.getElementById("Origin");
				getLinkOrigin(articleNow, myOrigin); // se scegliamo di definire la variabile myframe in questa funzione va sostituito articleNow con myFrame come parametro input della funzione getLinkOrigin
			}
		}
	}	
}

function nextArticle() {
	var articles = document.getElementsByClassName("article");

	for (var i = articles.length-2; i >= 0; i--) { //articles length = 6, ma noi non vogliamo considerare l'ultimo quindi mettiamo articles.lenght - 2 (con -1 considera anche l'ultimo perché length - 1 = 5 e articles[5] è l'ultimo articolo)
		var frame = articles[i],
    		style = window.getComputedStyle(frame),
			displayValue = style.getPropertyValue('display');
		if (displayValue === 'block') {
			if (!(frame.classList.contains('article5'))) { //IMPORTANTE: qua ho messo che la classe dell'ultimo articolo è "article5"
				frame.style.display='none';
				articles[i+1].style.display = 'block';
				var myOrigin = document.getElementById("Origin");
				getLinkOrigin(articles[i+1], myOrigin);
			}
		}
	}
}


function metadataViewer () {  // ricordarsi di lowercase e altre cose di scrittura + separare 1. più classi in una 2. più tag innestati + funzioni block/hide sulle singole liste
//window.addEventListener("load", function(){
	// enter each issue 
	var elements = document.getElementById('content').children;
	
	var counter = 0;
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].id.includes('issue')){
			counter++;
		}
	}
	for (var i = 1; i <= counter; i++) {
		// find the reference list 

		var myList = document.getElementById("listIssue"+ i);  
		
		// enter each iFrame of the issue 
		var myFrames = document.getElementById("issue"+ i).getElementsByTagName("iframe");

    	for (var n = 1; n < myFrames.length; n++) { 
		
		var sc = document.createElement("script");
		sc.setAttribute('src', '../../main.js');
		myFrames[n].contentWindow.document.head.appendChild(sc);
		
	    	var elmnt = myFrames[n].contentWindow.document.body;

	    	//add an id for each element of the body of the iframe with the name of the tag + number of the tag + number of the current article (e.g. "h1-1-n")
	    	var allIframeElements = elmnt.getElementsByTagName("*");
	    	//for (let element of allIframeElements) {
	    	for (var e = 0; e < allIframeElements.length; e++) {
	    		var x = allIframeElements[e].tagName; //ritorna una stringa che rappresenta il nome del tag in maiuscolo	    		
	    		var elementsWithSameTag = elmnt.querySelectorAll('[id^=' + CSS.escape(x) + ']'); //^ matches the start; the querySelectorAll method returns a static NodeList with elements matching the specified group of selectors; css.escape per assicurarsi che il valore sia codificato correttamente per l'uso in un'espressione CSS
	    		var len = elementsWithSameTag.length;
	    		allIframeElements[e].setAttribute("id", x+"-"+(len+1)+"-"+n);
	    	}		    	 
			
			// get span tag 
			var spans = Array.prototype.slice.call(elmnt.getElementsByTagName("span"));

			//first check: if the category already exist
			for (var span of spans) {
				// creating the variable for the parent
				if (span.parentNode.tagName === ("I" || "A" || "Q" || "SPAN" || "EM" || "STRONG" || "B" || "CITE")) {
					var inlineParent = span.parentNode;
					var spanParent = inlineParent.parentNode;
				}
				else {var spanParent = span.parentNode;}
				var curCategory = span.className;  	//person
				var categoryFound = false;				
				var instanceFound = false;
				for (var a=0; a<myList.children.length; a++){ 	//a questo punto specificare se ci sono più classi
					if (curCategory === myList.children[a].className) { // invece di myList.children[a].id
						categoryFound = true;
						var matchedLi = myList.children[a];
					}
				}

				if (categoryFound === false) {
					createCategoryLi(curCategory, myList);
					var matchedLi = myList.getElementsByClassName(curCategory)[0];
				}

				else{
					for (c=0; c<matchedLi.children.length; c++){
						if (span.innerHTML.includes(matchedLi.children[c].className) || matchedLi.children[c].className.includes(span.innerHTML)) { // partial matching
							instanceFound = true;
							var matchedUl = matchedLi.children[c];
						}
					}
				}
			
				if (instanceFound === false) {
					createInstanceUl(span.innerHTML, matchedLi, myList);
					var newUl = myList.getElementsByClassName(span.innerHTML)[0];
				}
				else {
					var newUl = matchedUl;
				}
				
				createOccurrenceLi(span, spanParent, span.innerHTML, newUl, n, myFrames, myList);	
				
			}


			// get time tag 
			var times = Array.prototype.slice.call(elmnt.getElementsByTagName("time"));

			//first check: if the category already exist
			for (var t=0; t<times.length; t++){
				// creating variable for parent
				if (times[t].parentNode.tagName === ("Q" || "I" || "SPAN" || "A" || "EM" || "STRONG" || "B" || "CITE")) {
					var inlineParent = times[t].parentNode;
					var timeParent = inlineParent.parentNode;
				}
				else {var timeParent = times[t].parentNode;}
				var myInstanceFound = false;
				if (t===0 && n===1) {
					createCategoryLi("TIME", myList); //decidere come chiamarlo
				}

				else{
					for (r=0; r<myList.getElementsByClassName('TIME')[0].children.length; r++){  //document.getElementById('Time').children.length
						if ((times[t].dateTime === myList.getElementsByClassName('TIME')[0].children[r].className)) {  // qualcosa qui non funziona, forse, invece di id, class.. (createInstanceUl risulta avere parent null)   //document.getElementById('Time').children[r].className
							myInstanceFound = true;
							var matchedTimeUl = myList.getElementsByClassName('TIME')[0].children[r];  //document.getElementById('Time').children[r];
						}
					}
				}

				if (myInstanceFound === false) {
					createInstanceUl(times[t].dateTime, myList.getElementsByClassName('TIME')[0], myList);  //secondo parametro: document.getElementById('Time')
					var newUl = myList.getElementsByClassName(times[t].dateTime)[0];
				}
				else{
					var newUl = matchedTimeUl;
				}

				createOccurrenceLi(times[t], timeParent, times[t].dateTime, newUl, n, myFrames, myList);
			}

		}
	}
}
//});

function createCategoryLi(category, myList) {
	var newLi = document.createElement('li');
	newLi.setAttribute('class', category); // invece di ('id', category+i)
	//1. add showLiChildren
	newLi.setAttribute('onClick', "showLiChildren('"+myList.id+"', '"+category+"')");
	newLi.setAttribute('data-position', myList.children.length); //attributo per ordinare in base all'ordine di apparizione
	newLi.style.listStyleType = 'none';
	var liNode = document.createTextNode(category);
	newLi.appendChild(liNode);
	myList.appendChild(newLi);
}

function createInstanceUl(instance, parentLi, myList) {
	var newUl = document.createElement('ul');
	newUl.setAttribute('class', instance);
	newUl.setAttribute('onClick', "showUlChildren('"+myList.id+"', '"+instance+"', event)");
	newUl.setAttribute('data-position', parentLi.children.length);
	newUl.style.display = 'none';
	var ulNode = document.createTextNode(instance);
	newUl.appendChild(ulNode);
	var wikiLi = document.createElement('li'); //creiamo un elemento li che è il bottone cliccabile per arriavre alla pagina Wikipedia di instance
	wikiLi.setAttribute('id', 'wikiButton');
	var link = document.createElement('a'); //creiamo un elemento 'a'
	var normalizedInstance = instance.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //NFD Unicode Normal Form: scompone i grafemi in una combinazione di grafemi semplici per esempio e piu accento. la Regex invece è un range per eliminare gli accenti, quindi da u ad f.
	var hrefValue = 'http://en.wikipedia.org/wiki/'+normalizedInstance;  //costruiamo il link    
	//link.setAttribute('href', hrefValue); //aggiungiamo a "link", figlio di "wikiLi", l'url costruito //da reintegrare se le altre due opzioni non vanno
	//link.setAttribute('target', '_blank'); //da reintegrare se le altre due opzioni non vanno
	link.setAttribute('onClick', 'wikiLink("'+hrefValue+'", event)'); //alternativa alla funzione inline, eventListener
	var wikiText = document.createTextNode("wikipedia");
	link.appendChild(wikiText);
	wikiLi.appendChild(link);
	newUl.appendChild(wikiLi);
	parentLi.appendChild(newUl);	
}

function wikiLink(newUrl, event) { 
	window.open(newUrl, "_blank"); 
	event.stopPropagation();
} 

function createOccurrenceLi(occurrence, occurrenceParent, occurrenceValue, newUl, n, myFrames, myList) {	//occurrenceValue è instance nella funzione precedente
	var occurrenceLi = document.createElement('li');

	//recuperare il parent per scriverlo in instanceNode come punto di riferimento per l'user
	var parentTag = occurrenceParent.id.match(/([^-]+)/)[1];
	if (parentTag === "P") {parentTag = "paragraph"}
	else if (parentTag.startsWith("H")) {parentTag = "title"}
	else if (parentTag === "FIGCAPTION") {parentTag = "figure caption"}
	var parentNum = occurrenceParent.id.match(/-([^-]+)-/)[1];  
	var parentTagAndNum = (parentTag+" "+parentNum).toLowerCase();
	var instanceNode = document.createTextNode("article "+n+", "+parentTagAndNum+": "); //aggiungere stringa del titolo dell'articolo?
	
	occurrenceLi.style.display = 'none';

	occurrenceLi.appendChild(instanceNode);

	
	//numero di li il cui span o elemento time corrispondente ha lo stesso parent di quello corrente
	var pos = 0;
	for (var ulchild of newUl.children){
		if (occurrenceParent.id === ulchild.getAttribute('data-parent')){
			pos++;
		}
	}
	occurrenceLi.setAttribute('data-parent', occurrenceParent.id);

	var citNode = document.createTextNode('" '+ parsing(occurrence.innerText, occurrenceParent, pos)+'"'); //vedi se fare textNode o innerHTML
	occurrenceLi.appendChild(citNode); //appena tolto dal commento

	var occurrenceId = occurrenceValue+"-"+(newUl.children.length+1);
	occurrence.setAttribute('id', occurrenceId);

	occurrenceLi.setAttribute('onclick', "highlight('"+occurrenceId+"', '"+myFrames[n].id+"', event)"); // per richiamare la funzione che evidenza il metadato nel testo dell'articolo quando si clicca sul <li> corrispondente nel metadata viewer

	newUl.appendChild(occurrenceLi);

	//from text keywords to metadata viewer
	occurrence.setAttribute('onclick', "goToMetadata('"+myList.id+"', '"+occurrenceValue+"')");
}
					
//from text keywords to metadata viewer
function goToMetadata(curListId, instanceId){
	var e = window.parent.document.getElementById(curListId).getElementsByClassName(instanceId)[0];
	e.style.display = 'block';
	var f = e.children;
	f[0].style.display = 'inline-block;'
	for (var g=1; g<f.length; g++){
		f[g].style.display = 'block';
	}
	e.style.backgroundColor = "#FFDAB9";
	e.scrollIntoView(true);

	// animazione scomparsa colore background dopo 10 secondi:
	var backgroundAnimation = window.parent.document.createElement('style'); // può andare in contrsto con la funzione che cambia lo stile dell'articolo?
    backgroundAnimation.type = 'text/css';

	var keyFramePrefixes = ["-webkit-", "-o-", "-moz-", ""];
	var keyFrames = [];
	var textNode = null;

	for (var i in keyFramePrefixes) {
		keyFrames = '@'+keyFramePrefixes[i]+'keyframes background-fade {'+
		'80% { background-color: #FFDAB9; }'+
		'100% { background-color: transparent; }'+
		'}';
		var rules = window.parent.document.createTextNode(keyFrames);
	}

	backgroundAnimation.appendChild(rules);

	window.parent.document.getElementsByTagName("head")[0].appendChild(backgroundAnimation);

	e.style.animation = 'background-fade 10s forwards';
	e.style.WebkitAnimation = 'background-fade 10s forwards';
    e.style.OAnimation = 'background-fade 10s forwards';
    e.style.MozAnimation = 'background-fade 10s forwards';


    setTimeout(function() {
    	e.style.backgroundColor = 'transparent';
    	e.style.WebkitAnimationName = '';
    	e.style.animation = '';
        e.style.OAnimation = '';
        e.style.MozAnimation = '';
        window.parent.document.getElementsByTagName("head")[0].removeChild(backgroundAnimation);
    	}, 10000); // we have to reset the name of animation otherwise another call to background-fade wont have any effect
	
     event.stopPropagation();

}
//attribuisci effetto di hover da specificare nel css tipo con un background color 

function showLiChildren(myListId, instanceId){
	var e = document.getElementById(myListId).getElementsByClassName(instanceId)[0].children;
	if(e[0].style.display == 'block') {
		for (var child of e) {
			child.style.display = 'none';
			var f = child.children;
			for (var g of f) { g.style.display = 'none'; }
		}
	}
	else{
		for (var child of e) {
			child.style.display = 'block';
			var f = child.children;
			/*
			for (var g of f){
				g.style.display = 'none'; 
			}
			*/

			// non mostrare i figli <li> degli <ul> tranne il primo figlio di ogni <ul>, cioè il link a wikipedia
			for (var g = 0; g < f.length; g++) {
				if (g === 0) {f[g].style.display = "inline-block";}
				else {f[g].style.display = 'none';}
			}

		}
	}
}

function showUlChildren(myListId, instanceId, event){
	var e = document.getElementById(myListId).getElementsByClassName(instanceId)[0].children;
	if(e[1].style.display == 'block'){
		//for (var child of e){
		for (var i=1; i<e.length; i++){
			e[i].style.display = 'none';
		}
	}
	else{
		//for (var child of e){
		for (var i=1; i<e.length; i++){
			e[i].style.display = 'block';
		}		
		/*for (var b = 0; b < e.length; b++) {
			if (b === 0) {e[b].style.display = "inline-block";}
			else {e[b].style.display = 'none';}
		}
		*/
	}
	event.stopPropagation();
}

function parsing(instance, parent, numIstanza){
	var container = parent.innerText;
	if (instance.includes("(") && instance.includes(")")){ //modificate le parentesi con le corrispettive espressioni in regexp
		var cleanInstance = instance.replace(/\(/g, "\\S*\(").replace(/\)/g, "\\S*\)");
	} 
	else{
		var cleanInstance = instance;
	}
	var e = new RegExp('(\\S+\\s){0,5}\\S*' + cleanInstance + '(\\,?\\s+\\S+){0,5}', 'ig');
  	var res = container.match(e);
  	return res[numIstanza];
}

// evidenziare i metadati nel testo dell'articolo
// serve anche cambiare articolo se i metadati puntano all'articolo non in block al momento? sì
// manca la scomparsa dello stile onscroll e onclick su qualunque altro tasto
function highlight(spanId, iFrameN, event) {
	//removeHighligth(iFrameN);
	var elmnt = document.getElementById(iFrameN).contentWindow.document;
	var curInstance = elmnt.getElementById(spanId);
	curInstance.setAttribute("name", "onView");
	curInstance.style.backgroundColor = "#ffff00";
	curInstance.scrollIntoView(true);
	// sostituire curInstance.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}); ?? In alcuni browser non va
	//metodi 1. creare nuva variabile in cui salvare spanId e iFrame in cui cercarlo per cancellare lo style 2. modificare i parametri della funzione removeHighlight in ciascun punto (tutti i metadati e gli altri onclick di interesse)
	//manca anche il cambio articolo se triggerato rispettivo metadato (appare sul titolo e poi si sposta al punto preciso)


	// animazione scomparsa colore background dopo 10 secondi:
	var cssAnimation = elmnt.createElement('style'); // può andare in contrsto con la funzione che cambia lo stile dell'articolo?
    cssAnimation.type = 'text/css';

	var keyFramePrefixes = ["-webkit-", "-o-", "-moz-", ""];
	var keyFrames = [];
	var textNode = null;

	for (var i in keyFramePrefixes) {
		keyFrames = '@'+keyFramePrefixes[i]+'keyframes background-fade {'+
		'80% { background-color: #ffff00; }'+
		'100% { background-color: transparent; }'+
		'}';
		var rules = elmnt.createTextNode(keyFrames);
	}

	cssAnimation.appendChild(rules);

	elmnt.getElementsByTagName("head")[0].appendChild(cssAnimation);

	curInstance.style.animation = 'background-fade 10s forwards';
	curInstance.style.WebkitAnimation = 'background-fade 10s forwards';
    curInstance.style.OAnimation = 'background-fade 10s forwards';
    curInstance.style.MozAnimation = 'background-fade 10s forwards';


    setTimeout(function() {
    	curInstance.style.backgroundColor = 'transparent';
    	curInstance.style.WebkitAnimationName = '';
    	curInstance.style.animation = '';
        curInstance.style.OAnimation = '';
        curInstance.style.MozAnimation = '';
        elmnt.getElementsByTagName("head")[0].removeChild(cssAnimation);
    	}, 10000); // we have to reset the name of animation otherwise another call to background-fade wont have any effect
	
     event.stopPropagation();
}

function sortOccurrences(keyToSearch){
	var elements = document.getElementById("metadata").children;
	for (var i = 1; i < elements.length; i++){   //sostituito 2 con elements.length 
		sortCategory(document.getElementById("listIssue" + i), keyToSearch);
		for (var n = 0; n < document.getElementById("listIssue" + i).children.length; n++){
			sortCategory(document.getElementById("listIssue" + i).getElementsByClassName(document.getElementById("listIssue" + i).children[n].className)[0], keyToSearch);
		}
	}
}

function sortByFreq() {
	var elements = document.getElementById("metadata").children;
	//parte 1: assegnare l'attributo data-frequency a ogni li e ogni ul
	for (var i = 1; i < elements.length; i++) { //entriamo in ognuna delle liste
		var curListCategories = document.getElementById('listIssue'+i).children; //<li> di ogni lista
		for (var g = 0; g < curListCategories.length; g++) {
			var curListCategoriesUl = curListCategories[g].children; //ul di ogni li
			curListCategories[g].setAttribute('data-frequency', curListCategoriesUl.length); //creiamo attributo data-frequency per ogni li, che ha come valore la lunghezza della lista dei suoi figli
			for (k = 0; k < curListCategoriesUl.length; k++) { //entriamo in ogni ul
				curListCategoriesUl[k].setAttribute('data-frequency', curListCategoriesUl[k].children.length); //assegnamo l'attributo data-frequency anche a ogni ul, il cui valore è il totale del figli di quell'ul
			}
		}

		//parte 2: ordinare secondo il valore dell'attributo
		sortCategory(document.getElementById("listIssue" + i), 'data-frequency');
		var numCategories = document.getElementById("listIssue" + i).childNodes.length;
		while (numCategories--) { document.getElementById("listIssue" + i).appendChild(document.getElementById("listIssue" + i).childNodes[numCategories]);}
		
		for (var n = 0; n < document.getElementById("listIssue" + i).children.length; n++){
			sortCategory(document.getElementById("listIssue" + i).getElementsByClassName(document.getElementById("listIssue" + i).children[n].className)[0], 'data-frequency');
			var numIstances = document.getElementById("listIssue" + i).children[n].children.length;
			while (numIstances--) { document.getElementById("listIssue" + i).children[n].appendChild(document.getElementById("listIssue" + i).children[n].children[numIstances]); }
		}
	}

}


function sortCategory(list, searchKey) {
  var i, switching, b, shouldSwitch;
  switching = true;
  while (switching) {
  	switching = false;
  	b = list.children;
  	for (i = 0; i < (b.length - 1); i++) {
      		shouldSwitch = false;
		if (!isNaN(b[i].getAttribute(searchKey))){var myStr = parseInt(b[i].getAttribute(searchKey))>parseInt(b[i+1].getAttribute(searchKey));}
		else{var myStr = b[i].getAttribute(searchKey).toLowerCase() >b[i+1].getAttribute(searchKey).toLowerCase();}
      		if (myStr) {
        		shouldSwitch = true;
        		break;
      		}
    	}
    	if (shouldSwitch) {
		b[i].parentNode.insertBefore(b[i + 1], b[i]); 
		switching = true;
	}
  }
}

function showMetaContent(){
	if (document.getElementById('contentToShow').style.display === 'none'){document.getElementById('contentToShow').style.display = 'block';}
	else{document.getElementById('contentToShow').style.display = 'none';}
}

/*
function removeHighligth(iFrameN){
	var isOnView = document.getElementById(iFrameN).contentWindow.document.getElementsByName("onView");
    	if(isOnView){
        	isOnView.removeAttribute("name");
    	}
}
*/

/*
//ULTIMA DELLE QUESTIONI DA RISOLVERE: da scrivere dopo la riga 307, per il problema delle doppie classi tipo class = "person artist"
if (curCategory.includes(" ")) { //se c'è uno spazio in teoria vuol dire che c'è più di una classe
   	var multipleCats = curCategory.split(" "); // si crea un array con le categorie, tipo [person, artist]
    for (var c = 0; c < multipleCats.length; c++) {
        if (multipleCats[c] != "") {var curCategory+c = multipleCats[c]} // creiamo diverse variabili?
    }
}


*/

// body della funzione parsing!!
//var container = parent.innerHTML.replace(/<[^>]*>/gi, ' ') //or gi:To perform a global, case-insensitive search
	//.replace(/\s{2,}/gi, ' ')
	//.trim();
/*	
	// se riusciamo a trovare un modo di far funzionare la riga 401, allora dalla 385 alla 400 sono inutili
	if (numIstanza != 0) {
		// vedere come gestire le posizioni 0
		var occorrenzeArray = [];
		var pos = container.indexOf(span);
		occorrenzeArray.push(pos);
		// calcolo del numero di occorrenze
		c = 1;
		while (c < numero di occorrenze) {
			pos = container.indexOf(span, pos+1);
			occorrenzeArray.push(pos);
			c++;
		}
		//da rivedere
		var posIstanzaCorrente = occorrenzeArray[numIstanza];
	}

	//versione con stringa di regexp che non va
	var regExp = eval("/(\\S+\\s){0,5}\\S*" + span + "\\*(\\S+\\s+) {0,5}/g");
	var snippetArray = container.match(regExp);
	return snippetArray[numIstanza];
*/
