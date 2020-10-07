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
	if ('issue1' === issueN) {
		var x = document.getElementById('issue1');
		var y = document.getElementById('issue2');
	} 
	else {
		var x = document.getElementById('issue2');
		var y = document.getElementById('issue1');
	}

	x.style.display = "block";
	x.children[0].style.display = "block";
	for (var i=1; i<=3; i++) {
		x.children[i].style.display = "none";
	}
	y.style.display = "none";


	var oldArticles = document.getElementById("changeArguments").children;

	for (var i=0; i<3; i++) {
		var newArticle = document.createElement("a");
		newArticle.setAttribute("class", "buttonArticle");
		var n = i+1;
	    newArticle.setAttribute("onclick", "changeArticle('article"  + n + "', '" + issueN + "')");
	    newArticle.innerHTML = 'article'+n;

	    document.getElementById("changeArguments").replaceChild(newArticle, oldArticles[i]);
    	}
	
     /* var originButton = document.getElementById("Origin");
	if (originButton.hasAttribute("href")) {
		originButton.removeAttribute("href");
	}
	*/
}



function changeArticle(articleNum, issueNum){
	var c = document.getElementById(issueNum).children;
	c[0].style.display = "none";
	for (var i=1; i<=3; i++) {
		if ("article" + i === articleNum) {
			c[i].style.display = "block";
			
		/* TORNARE AL FILE SORGENTE
			var myFrame = c[i].children[0]
			var elmnt = myFrame.contentWindow.document.head;
			var myMeta = elmnt.getElementsByTagName("meta");
				for (var l = 0; l < myMeta.length; l++) {
					if (myMeta[l].name == "DC.identifier" && myMeta[l].scheme == "DCTERMS.URI") {
						myOrigin = document.getelementById("Origin");
						myOrigin.href = myMeta[l].content;
    					}
    				}   */
		}
		else {
			c[i].style.display = "none";
		}
	}	
}

/*	
function changeArticleCover(articleNum, issueNum) {
	var c = window.parent.document.getElementById(issueNum).children;
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


















