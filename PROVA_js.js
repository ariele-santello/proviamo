

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
    	if (firstCount == 0) {
    		document.head.appendChild(newlink);
    	}
	
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
    		if (count == 0) {
    			elmnt.appendChild(newlink);
    		}
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
	
	  /*  identificare l'issue da mostrare   */
	
	if ('issue1' === issueN) {
		var x = document.getElementById('issue1');
		var y = document.getElementById('issue2');
	} 
	else {
		var x = document.getElementById('issue2');
		var y = document.getElementById('issue1');
	}

	  /*  azioni sull'issue da mostrare e quelli da non mostrare   */
	
	var xChildren = x.children;     /*  i div che hanno class coverPage e articleN   */
	var totLength = xChildren.length;     /* lunghezza della struttura dati dei figli di x  */
	
	x.style.display = "block";   /* issue da mostrare  */
	xChildren[0].style.display = "block";   /* cover da mostrare  */
	
	y.style.display = "none";  /* issue da non mostrare  */
	for (var i=0; i<y.children.length; i++) {
		y.children[i].style.display = "none";
	}
	
	var oldArticles = document.getElementById("changeArguments").children;  /* per cambiare il contenuto delle funzioni onclick degli articoli  */
	
	for (var i=1; i<totLength; i++) {
		xChildren[i].style.display = "none";    /* articoli da non mostrare  */
		
		var newArticle = document.createElement("a");    /* creazione del nuovo tag  */
		newArticle.setAttribute("class", "buttonArticle");   /* creazione del nuovo tag, set classe  */
		newArticle.setAttribute("onclick", "changeArticle('article"  + i + "', '" + issueN + "')");   /* creazione del nuovo tag, set onclick attibute  */

		var myFrame = xChildren[i].children[0];
		var myMeta = myFrame.contentWindow.document.head.getElementsByTagName("meta");
			for (var l = 0; l < myMeta.length; l++) {
				if (myMeta[l].name == "DC.title") {
					newArticle.innerHTML = myMeta[l].content;
				}
			}
		
		document.getElementById("changeArguments").replaceChild(newArticle, oldArticles[i-1]);
	}
	


    /*	for (var n=1; n<totLength; n++) {
		var newArticle = document.createElement("a");
		newArticle.setAttribute("class", "buttonArticle");
	    	newArticle.setAttribute("onclick", "changeArticle('article"  + n + "', '" + issueN + "')");
		
	    newArticle.innerHTML = 'article'+n;

	    document.getElementById("changeArguments").replaceChild(newArticle, oldArticles[n-1]);
    	}   */
	
        var originButton = document.getElementById("Origin");
	if (originButton.hasAttribute("href")) {
		originButton.removeAttribute("href");
	}
}


/*
function changeArticle(articleNum, issueNum){
	var c = document.getElementById(issueNum).children;
	c[0].style.display = "none";
	for (var i=1; i<c.length; i++) {
		if ("article" + i === articleNum) {
			c[i].style.display = "block";
			
			// TORNARE AL FILE SORGENTE   
			var myFrame = c[i].children[0];
			var elmnt = myFrame.contentWindow.document.head;
			var myMeta = elmnt.getElementsByTagName("meta");
				for (var l = 0; l < myMeta.length; l++) {
					if (myMeta[l].name == "DC.identifier" && myMeta[l].scheme == "DCTERMS.URI") {
						var myOrigin = document.getElementById("Origin");
						myOrigin.href = myMeta[l].content;
						myOrigin.target = "_blank";
    					}
    				}
		}
		else {
			c[i].style.display = "none";
		}
	}	
}
*/
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
		else {
			c[i].style.display = "none";
		}
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
}


/*	
function changeArticleCover(articleNum, issueNum) {
	var c = window.parent.document.getElementById(issueNum).children;
	c[0].style.display = "none";
	for (var i=1; i<=3; i++) {
		if ("article" + i === articleNum) {
			c[i].style.display = "block";
		}
		else {
			c[i].style.display = "none";
		}
	}
}
*/	



function prevArticle() {
 	var articles = document.getElementsByClassName("article");
 	
 	for (var i = 1; i < articles.length; i++) { /* i= 1 perché non voglio considerare il primo articolo */
 		var frame = articles[i],
 			style = window.getComputedStyle(frame),
			displayValue = style.getPropertyValue('display'); /* queste ultime due righe sono equivalenti a var displayValue = window.getComputedStyle(frame, null).display; */
		if (displayValue === "block") {
			if (!(frame.classList.contains('article1'))) {
				frame.style.display = "none";
				var articleNow = articles[i-1];
				articleNow.style.display = "block";
				/* var myFrame = articleNow.children[0];
				var curIssue = articleNow.parentElement;
				var x = curIssue.children[i-1]; */
				var myOrigin = document.getElementById("Origin");
				getLinkOrigin(articleNow, myOrigin); /* se scegliamo di definire la variabile myframe in questa funzione va sostituito articleNow con myFrame come parametro input della funzione getLinkOrigin */
			}
		}
	}	
}



function nextArticle() {
	var articles = document.getElementsByClassName("article");

	for (var i = articles.length-2; i >= 0; i--) { /* articles length = 6, ma noi non vogliamo considerare l'ultimo quindi mettiamo articles.lenght - 2 (con -1 considera anche l'ultimo perché lenght - 1 = 5 e articles[5] è l'ultimo articolo) */
		var frame = articles[i],
    		style = window.getComputedStyle(frame),
			displayValue = style.getPropertyValue('display');
		if (displayValue === 'block') {
			if (!(frame.classList.contains('article3'))) { /* IMPORTANTE: qua ho messo che la classe dell'ultimo articolo è "article3" ma nel sito finale sarà ARTICLE5*/
				frame.style.display='none';
				articles[i+1].style.display = 'block';
				var myOrigin = document.getElementById("Origin");
				getLinkOrigin(articles[i+1], myOrigin);
			}
		}
	}
}





function metadataViewer () {  // ricordarsi di lowercase e altre cose di scrittura

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

		//var myIssue = document.getElementById("issue"+ i);
		//var myFrames = myIssue.getElementsByTagName("iframe");
		var myFrames = document.getElementById("issue"+ i).getElementsByTagName("iframe"); //accorpamento delle due variabili precedenti

	    	for (var n = 1; n < myFrames.length; n++) {       
		   		//var curFrame = myFrames[n];
		    	//var elmnt = curFrame.contentWindow.document.body;
		    	var elmnt = myFrames[n].contentWindow.document.body;     

				// get span tag 

				var spans = Array.prototype.slice.call(elmnt.getElementsByTagName("span"));
				for (var span of spans) {										
					var curCategory = span.className;  	//person   
					var categoryFound = false;							//fino qua verificato da w3school
				     // var instanceFound = false;
					for (i=0; i<myList.children.length; i++){ 	//a questo unto specificare se ci sono più classi
						if (curCategory === myList.children[i].id) {
							categoryFound = true;
							var matchedLi = myList.children[i];
						}
					}
					if (categoryFound === false) {
						var newLi = document.createElement('li');
						newLi.setAttribute('id', curCategory);
						var liNode = document.createTextNode(curCategory);
						newLi.appendChild(liNode);
						myList.appendChild(newLi);
					}
					/* else{
						for (c=0; c<matchedLi.children.length; c++){
							if (span.innerHTML === matchedLi.children[c].id) {
								instanceFound = true;
								var fantoccio = matchedLi.children[c];
							}
						}
					}
				
					if (instanceFound === false) {
						var newUl = document.createElement('ul');
						newUl.setAttribute('id', span.innerHTML);
						var ulNode = document.createTextNode(span.innerHTML);
						NewUl.appendChild(ulNode);
						matchedLi.appendChild(newUl); //matched e newLi
					}
					else{
						var newUl = fantoccio;
					}


					var instanceLi = document.createElement('li');
					var instanceNode = document.createTextNode("article"+n": "+); //aggiungere stringa de titolo
					instanceLi.appendChild(instanceNode);
					newUl.appendChild(instanceLi);
					span.setAttribute('id', span.innerHTML+(newUl.length+1)); */

				}
			}
	}

}
















