/*
			// get time tag 
			var times = Array.prototype.slice.call(elmnt.getElementsByTagName("time"));
		
			for (var t=0; t<times.length; t++){
				var myInstanceFound = false;
				if (t===0){
					var new_Li = document.createElement('li');
					new_Li.setAttribute('id', "Time"); //decidere come chiamarlo
					var li_Node = document.createTextNode("Time");
					new_Li.appendChild(li_Node);
					myList.appendChild(new_Li);
				}
				else{
					for (c=0; c<myList.getElementById('Time').children.length; c++){
						if ((times[t].dateTime === myList.getElementById('Time').children[c].id)) { //invece di (span.innerHTML === matchedLi.children[c].id) --> il metodo .includes serve per il partial matching
							myInstanceFound = true;
							var matchedUl = myList.getElementById('Time').children[c];
						}
					}
				}
			
				if (myInstanceFound === false) {
					var newUl = document.createElement('ul');
					newUl.setAttribute('id', times[t].dateTime);
					var ulNode = document.createTextNode(times[t].dateTime);
					newUl.appendChild(ulNode);
					myList.getElementById('Time').appendChild(newUl); //matched e newLi
				}
				else{
					var newUl = matchedUl;
				}
				// document.getElementById("writeHere").innerHTML = newUl.id+', ';

				var instanceLi = document.createElement('li');

				//recuperare il parent per scriverlo in instanceNode come punto di riferimento per l'user
				var parentTag = span.parentNode.id.match(/([^-]+)/)[1];
				var parentNum = span.parentNode.id.match(/-([^-]+)-/)[1];  
				var parentTagAndNum = (parentTag+" "+parentNum).toLowerCase();

				var instanceNode = document.createTextNode("article "+n+", "+parentTagAndNum+": "); //aggiungere stringa del titolo dell'articolo?
				
				instanceLi.appendChild(instanceNode);
				instanceLi.setAttribute('onclick', "highlight('"+spanId+"', 'iFrame"+n+"')"); // per richiamare la funzione che evidenza il metadato nel testo dell'articolo quando si clicca sul <li> corrispondente nel metadata viewer

				newUl.appendChild(instanceLi);
			}
			*/
		
			// get span tag 
			var spans = Array.prototype.slice.call(elmnt.getElementsByTagName("span"));
			for (var span of spans) {
				var curCategory = span.className;  	//person
				var categoryFound = false;				
				var instanceFound = false;
				for (var a=0; a<myList.children.length; a++){ 	//a questo punto specificare se ci sono più classi
					if (curCategory === myList.children[a].id) {
						categoryFound = true;
						var matchedLi = myList.children[a];
					}
				}
				if (categoryFound === false) {
					var newLi = document.createElement('li');
					newLi.setAttribute('id', curCategory);
					//1. add showLiChildren
					newLi.setAttribute('onClick', "showLiChildren('"+curCategory+"')");
					var liNode = document.createTextNode(curCategory);
					newLi.appendChild(liNode);
					myList.appendChild(newLi);
					var matchedLi = newLi;
				}
				else{
					for (c=0; c<matchedLi.children.length; c++){
						if (span.innerHTML.includes(matchedLi.children[c].id) || matchedLi.children[c].id.includes(span.innerHTML)) { //invece di (span.innerHTML === matchedLi.children[c].id) --> il metodo .includes serve per il partial matching
							instanceFound = true;
							var matchedUl = matchedLi.children[c];
						}
					}
				}
			
				if (instanceFound === false) {
					var newUl = document.createElement('ul');
					newUl.setAttribute('id', span.innerHTML);
					//2. add showUlChildren and display none
					newUl.setAttribute('onClick', "showUlChildren('"+span.innerHTML+"', event)");
					newUl.style.display = 'none';
					var ulNode = document.createTextNode(span.innerHTML);
					newUl.appendChild(ulNode);
					matchedLi.appendChild(newUl); //matched e newLi
				}
				else{
					var newUl = matchedUl;
				}
				// document.getElementById("writeHere").innerHTML = newUl.id+', ';

				var instanceLi = document.createElement('li');

				//recuperare il parent per scriverlo in instanceNode come punto di riferimento per l'user
				var parentTag = span.parentNode.id.match(/([^-]+)/)[1];
				if (parentTag === "P") {parentTag = "paragraph";}
				else if (parentTag.startsWith("H")) {parentTag = "title";}
				else if (parentTag === "FIGCAPTION") {parentTag = "figure caption";}
				var parentNum = span.parentNode.id.match(/-([^-]+)-/)[1];  
				var parentTagAndNum = (parentTag+" "+parentNum).toLowerCase();

				var instanceNode = document.createTextNode("article "+n+", "+parentTagAndNum+": "); //aggiungere stringa del titolo dell'articolo?
				
				//3. display none
				instanceLi.style.display = 'none';
				instanceLi.appendChild(instanceNode);
				
				/*
				//numero di li il cui span corrispondente ha lo stesso parent di quello corrente
				var pos = 0;
				for (var ulchild of newUl.children){
					if span.parent.id === ulchild.data-parent{ // controllare risultato di === False
						pos++;
					}
				}
				instanceLi.setAttribute('data-parent', span.parent.id);
				*/

				//var citNode = document.createTextNode('" '+ parsing(span.innerHTML, span.parentNode)+'"'); //vedi se fare textNode o innerHTML
				//instanceLi.appendChild(citNode);


				var spanId = span.innerHTML+(newUl.children.length+1);
				span.setAttribute('id', spanId);

				instanceLi.setAttribute('onclick', "highlight('"+spanId+"', '"+myFrames[n].id+"')"); // per richiamare la funzione che evidenza il metadato nel testo dell'articolo quando si clicca sul <li> corrispondente nel metadata viewer

				newUl.appendChild(instanceLi);
				
				//from text keywords to metadata viewer
				span.setAttribute('onclick', "goToMetadata('"+span.innerHTML+"')");
			}