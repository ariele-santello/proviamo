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
		x = document.getElementById('issue1')
		y = document.getElementById('issue2')
	} 
	else {
		x = document.getElementById('issue2')
		y = document.getElementById('issue1')
	}

		x.style.display = "block";
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
}

/*
function changeArticle(articleN){
	if ('article1' === articleN) {
		var x = document.getElementById('article1')
		var y = document.getElementById('article2')
		var z = document.getElementById('article3')
	} 
	else if ('article2' === articleN) {
		var x = document.getElementById('article2')
		var y = document.getElementById('article1')
		var z = document.getElementById('article3')
	}
	else {
		var x = document.getElementById('article3')
		var y = document.getElementById('article1')
		var z = document.getElementById('article2')
	}

		x.style.display = "block";
		y.style.display = "none";
		z.style.display = "none";
}
*/


function changeArticle(articleNum, issueNum){
	var c = document.getElementById(issueNum).children;
	for (var i=1; i<=3; i++) {
		if ("article" + i === articleNum) {
			c[i-1].style.display = "block";
		}
		else {
			c[i-1].style.display = "none";
		}
	}
}
	
function changeArticleCover{
	
}
	





















