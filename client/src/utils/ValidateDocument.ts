// eslint-disable-next-line no-var

export function validateDocument(document: string) {
	document = document.replace(/\D/g, '');
	if(document.toString().length != 11 || /^(\d)\1{10}$/.test(document)) return false;
	var result = true;
	[9,10].forEach(function(j){
			var soma = 0, r;
			document.split(/(?=)/).splice(0,j).forEach(function(e, i){
					soma += parseInt(e) * ((j+2)-(i+1));
			});
			r = soma % 11;
			r = (r <2)?0:11-r;
			if(r != parseInt(document.substring(j, j+1))) result = false;
	});
	
	return result;
}