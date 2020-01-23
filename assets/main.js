  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-154226005-1');



document.addEventListener('DOMContentLoaded', function() {
	let returnToTop = document.getElementById("return-to-top");
	
	// nav ul li a that are visible
	let mainNavLinks = Array.from(document.querySelectorAll("nav ul li a")).filter(el => el.offsetParent != null);;
	
	var updateOnScroll = function(event) {
		let fromTop = window.scrollY;
		
		if(fromTop > 20){
			returnToTop.style.display = "block";
		} else {
			returnToTop.style.display = "none";
		}
		
		if(mainNavLinks.length==0) return;
	  
		for(let i=1;i<mainNavLinks.length;i++){
			link = mainNavLinks[i-1];
			let nextLink = mainNavLinks[i];
			
			section = document.querySelector("#" + CSS.escape(link.hash.replace("#","")));
			let nextSection = document.querySelector("#" + CSS.escape(nextLink.hash.replace("#","")));
			
			if((i==1 || section.offsetTop<=fromTop) && nextSection.offsetTop > fromTop){
				link.classList.add("current");
			} else {
				link.classList.remove("current");
			}
			
			if(i==mainNavLinks.length-1 && nextSection.offsetTop <= fromTop){
				nextLink.classList.add("current");
			}
			else{
				nextLink.classList.remove("current");
			}
		}
};
	
	updateOnScroll();

	window.addEventListener("scroll", updateOnScroll);
});
