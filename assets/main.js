  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-154226005-1');



document.addEventListener('DOMContentLoaded', function() {
	// nav ul li a that are visible
	let mainNavLinks = Array.from(document.querySelectorAll("nav ul li a")).filter(el => el.offsetParent != null);;

	if(mainNavLinks.length==0) return;
	
	var updateSidebar = function(event) {
		let fromTop = window.scrollY;
	  
		for(let i=1;i<mainNavLinks.length;i++){
			link = mainNavLinks[i-1];
			let nextLink = mainNavLinks[i];
			
			section = document.querySelector(link.hash);
			let nextSection = document.querySelector(nextLink.hash);
			
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
	
	updateSidebar();

	window.addEventListener("scroll", updateSidebar);
});
