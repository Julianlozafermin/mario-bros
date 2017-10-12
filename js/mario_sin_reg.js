window.onload = function()
{
	var canvas = document.getElementById("miCanvas");
	var context = canvas.getContext("2d");

	document.onkeydown = function(e) { keys[e.which] = true; }
	document.onkeyup = function(e) { keys[e.which] = false; }

	//Constantes del Juego
	const colorLetras = "#ffffff";
	const TILE_ASTA = 140;
	const TILE_MONEDA = 1;
	const CAMINANDO_DERECHA = 0;
	const CAMINANDO_IZQUIERDA = 1;
	const BRINCANDO = 2;
	const DERECHA = 1;
	const IZQUIERDA = -1;
	const TAM_TILE = 16;
	const KEY_R = 82;
	const MARIO_SMALL = 0;
	const MARIO_BIG = 1;


	var escenario = [
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 120, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,147,147,147,147,147,147,147,147,147,147, 9, 9, 9, 9, 147, 147, 147, 147, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 9, 9, 9, 0, 1, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 104, 104, 9, 9, 9, 9, 9, 9, 9, 9, 140, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 104, 104, 104, 9, 9, 9, 9, 9, 9, 9, 9, 140, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 104, 104, 104, 104, 9, 9, 9, 9, 9, 9, 9, 9, 140, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 147, 147, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 104, 104, 104, 104, 104, 9, 9, 9, 9, 9, 9, 9, 9, 140, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 5, 1, 9, 9, 9, 9, 0, 1, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 477, 478, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 477, 478, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 4, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 4, 9, 9, 9, 9, 0, 0, 9, 9, 9, 9, 9, 9, 1, 9, 9, 4, 9, 9, 1, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9, 104, 9, 9, 104, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 104, 104, 9, 9, 104, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 104, 104, 104, 104, 104, 104, 9, 9, 9, 9, 9, 9, 9, 9, 140, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 477, 478, 9, 9, 9, 9, 9, 9, 9, 9, 9, 497, 498, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 497, 498, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 104, 104, 9, 9, 104, 104, 9, 9, 9, 9, 9, 9, 9, 9, 104, 104, 104, 9, 9, 104, 104, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 104, 104, 104, 104, 104, 104, 104, 9, 9, 9, 9, 9, 9, 9, 9, 140, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 9, 9, 477, 478, 9, 9, 9, 9, 9, 9, 9, 9, 9, 497, 498, 9, 9, 9, 9, 9, 9, 9, 9, 9, 497, 498, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 497, 498, 9, 9, 9, 9, 9, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 9, 9, 477, 478, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 104, 104, 104, 9, 9, 104, 104, 104, 9, 9, 9, 9, 9, 9, 104, 104, 104, 104, 9, 9, 104, 104, 104, 9, 9, 9, 9, 9, 477, 478, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 477, 478, 9, 104, 104, 104, 104, 104, 104, 104, 104, 9, 9, 9, 9, 9, 9, 9, 9, 140, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 497, 498, 9, 9, 9, 9, 9, 9, 9, 9, 9, 497, 498, 9, 9, 9, 9, 9, 9, 9, 9, 9, 497, 498, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 497, 498, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 497, 498, 9, 9, 9, 9, 9, 9, 9, 9, 9, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 104, 104, 104, 104, 9, 9, 104, 104, 104, 104, 9, 9, 9, 9, 104, 104, 104, 104, 104, 9, 9, 104, 104, 104, 104, 9, 9, 9, 9, 497, 498, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 497, 498, 104, 104, 104, 104, 104, 104, 104, 104, 104, 9, 9, 9, 9, 9, 9, 9, 9, 104, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
						[ 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 102, 9, 9, 100, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 102, 9, 9, 9, 100, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 102, 9, 9, 100, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101 ],
						[ 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 67, 9, 9, 65, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 67, 9, 9, 9, 65, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 67, 9, 9, 65, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66 ]
					];


	var ancho_canvas;
	var alto_canvas;
	var mitad_screen;

	var keys = [];
	var game_over = false;
	var gano = false;
	var mario_llego_al_castillo = false;
	var Puntos = 0;
	var edo_mario = CAMINANDO_DERECHA;
	var brincando = false;
	var cambio_de_estado = false;
	var altura_brinco = 0;
	var edo_sprite = 0;
	var velocidad_mario = 1;
	var numTilesImagen = 20;
	var jsonBloquesCoins = convertMtzToObj(escenario);
	var Bloques = jsonBloquesCoins.Bloques;
	var Monedas = jsonBloquesCoins.Monedas;
	var num_bloques = Bloques.length;
	var Enemigos = getEnemigosIniciales();
	var num_enemigos = Enemigos.length;
	var edo_sprite_enemigo = 0;
	var intersecto_con_bloque_monedas = false;
	var juego_terminado = false;
	var MuestraHongo = false;
	var hongo_sin_comer = true;
	var dibujaMonedaBloque = false;
	var pos_monedaBloque = 0;
	var veces_monedas = 0;
	

	//Cargando Imagenes

	//Del Fondo
	var img_fondo = new Image();
	img_fondo.src = "img/escenario/blue_sky.png";

	//De Mario
	var img_actual_mario = new Image();
	var img_mario_big_walking_right = new Array();
	var img_mario_mini_walking_right = new Array();
	var img_mario_big_walking_left = new Array();
	var img_mario_mini_walking_left = new Array();

	img_mario_big_walking_right[0] = new Image();
	img_mario_big_walking_right[1] = new Image();
	img_mario_big_walking_right[2] = new Image();
	img_mario_big_walking_right[0].src = "img/personajes/mario_big_walking_1.png";
	img_mario_big_walking_right[1].src = "img/personajes/mario_big_walking_2.png";
	img_mario_big_walking_right[2].src = "img/personajes/mario_big_walking_3.png";

	img_mario_mini_walking_right[0] = new Image();
	img_mario_mini_walking_right[1] = new Image();
	img_mario_mini_walking_right[2] = new Image();
	img_mario_mini_walking_right[0].src = "img/personajes/mario_mini_walking_1.png";
	img_mario_mini_walking_right[1].src = "img/personajes/mario_mini_walking_2.png";
	img_mario_mini_walking_right[2].src = "img/personajes/mario_mini_walking_3.png";

	img_mario_big_walking_left[0] = new Image();
	img_mario_big_walking_left[1] = new Image();
	img_mario_big_walking_left[2] = new Image();
	img_mario_big_walking_left[0].src = "img/personajes/mario_big_walking_1-izquierda.png";
	img_mario_big_walking_left[1].src = "img/personajes/mario_big_walking_2-izquierda.png";
	img_mario_big_walking_left[2].src = "img/personajes/mario_big_walking_3-izquierda.png";


	img_mario_mini_walking_left[0] = new Image();
	img_mario_mini_walking_left[1] = new Image();
	img_mario_mini_walking_left[2] = new Image();
	img_mario_mini_walking_left[0].src = "img/personajes/mario_mini_walking_1-izquierda.png";
	img_mario_mini_walking_left[1].src = "img/personajes/mario_mini_walking_2-izquierda.png";
	img_mario_mini_walking_left[2].src = "img/personajes/mario_mini_walking_3-izquierda.png";

	var img_mario_win = new Image();
	img_mario_win.src = "img/personajes/Mario_Win.png";
	var img_mario_lost = new Image();
	img_mario_lost.src = "img/personajes/mario_Lost.png";

	var img_mario_big_jump_right = new Image();
	img_mario_big_jump_right.src = "img/personajes/mario_big_jump.png";
	var img_mario_big_jump_left = new Image();
	img_mario_big_jump_left.src = "img/personajes/mario_big_jump-izquierda.png";

	var img_mario_mini_jump_right = new Image();
	img_mario_mini_jump_right.src = "img/personajes/mario_mini_jump.png";
	var img_mario_mini_jump_left = new Image();
	img_mario_mini_jump_left.src = "img/personajes/mario_mini_jump-izquierda.png";

	var mountains = new Array();
	mountains[0] = new Image();
	mountains[1] = new Image();
	mountains[2] = new Image();
	mountains[3] = new Image();
	mountains[4] = new Image();
	mountains[5] = new Image();
	mountains[0].src = "img/escenario/mountain_1.png";
	mountains[1].src = "img/escenario/mountain_2.png";
	mountains[2].src = "img/escenario/mountain_3.png";
	mountains[3].src = "img/escenario/mountain_4.png";
	mountains[4].src = "img/escenario/mountain_5.png";
	mountains[5].src = "img/escenario/big_mountain.png";

	var castillo = new Image();
	castillo.src = "img/escenario/castle_top.png";

	var nubes = new Array();
	nubes[0] = new Image();
	nubes[1] = new Image();

	nubes[0].src = "img/escenario/small_cloud.png";
	nubes[1].src = "img/escenario/clouds.png";

	var img_tile = new Image();
	img_tile.src = "img/tiles/mario_tileset.png";

	var img_enemigos = new Array();
	img_enemigos[0] = new Image();
	img_enemigos[1] = new Image();
	img_enemigos[0].src = "img/personajes/goomba_walking_1.png";
	img_enemigos[1].src = "img/personajes/goomba_walking_2.png";

	img_hongo = new Image();

	//Cargando el audio
	var musica_fondo = new Audio();
	var musica_ganadora = new Audio();
	var musica_perdedora = new Audio();
	var musica_salto = new Audio();
	var musica_mario_grande = new Audio();
	var power_up_hongo = new Audio();
	var musica_moneda = new Audio();
	musica_fondo.src = "audio/soundtracks/Overworld.ogg";
	musica_ganadora.src = "audio/soundtracks/Course Clear.ogg";
	musica_perdedora.src = "audio/soundtracks/Life Lost.ogg";
	musica_mario_grande.src = "audio/sfx/smb_powerup.wav";
	power_up_hongo.src = "audio/sfx/PowerUp.ogg";
	musica_salto.src = "audio/sfx/jump.ogg";
	musica_moneda.src = "audio/sfx/coin.wav";
	musica_fondo.loop = true;
	// musica_fondo.addEventListener('load', musica_fondo.play(), false);


	//Posiciones de las imagenes de fondo
	var pos_x_montain = [ 0, 850, 1750, 2350, 2750, 3300 ];
	var x_castillo = 3525;
	var pos_nubes_chicas =	[
								{ x : 150, y : 100 },
								{ x : 650, y : 10 },
								{ x : 1550, y : 20 },
								{ x : 2200, y : 15 },
								{ x : 3000, y : 10 },
								{ x : 3040, y : 20 },
							];
	var pos_nubes_grandes =	[
								{ x : 800, y : 111 },
								{ x : 2300, y : 111 },
								{ x : 3500, y : 111 },
							];




	//Objeto Mario
	var mario = { x : 20, y : -30, ancho : 16, alto : 16, direccion : DERECHA, tamanio : MARIO_SMALL };
	//Objeto Hongo
	var hongo = { x : 100, y : 207, ancho : TAM_TILE, alto : TAM_TILE, direccion : CAMINANDO_DERECHA, altura : 0 };

	iniciaJuego();

	
	function iniciaJuego()
	{
		musica_perdedora.pause();
		musica_ganadora.pause();
		musica_fondo.currentTime = 0;
		musica_fondo.play();

		ancho_canvas = canvas.width;
		alto_canvas = canvas.height;
		mitad_screen = (ancho_canvas / 2) | 0;

		keys = [];
		game_over = false;
		gano = false;
		mario_llego_al_castillo = false;
		Puntos = 0;
		edo_mario = CAMINANDO_DERECHA;
		brincando = false;
		cambio_de_estado = false;
		altura_brinco = 0;
		edo_sprite = 0;
		velocidad_mario = 1;
		img_actual_mario = img_mario_big_walking_right[0];
		numTilesImagen = 20;
		jsonBloquesCoins = convertMtzToObj(escenario);
		Bloques = jsonBloquesCoins.Bloques;
		Monedas = jsonBloquesCoins.Monedas;
		num_bloques = Bloques.length;
		Enemigos = getEnemigosIniciales();
		num_enemigos = Enemigos.length;
		edo_sprite_enemigo = 0;
		juego_terminado = false;
		hongo_sin_comer = true;
		MuestraHongo = false;
		dibujaMonedaBloque = false;
		pos_monedaBloque = 0;
		veces_monedas = 0;

		//Posiciones de las imagenes de fondo
		pos_x_montain = [ 0, 850, 1750, 2350, 2750, 3300 ];
		x_castillo = 3525;
		pos_nubes_chicas =	[
								{ x : 150, y : 100 },
								{ x : 650, y : 10 },
								{ x : 1550, y : 20 },
								{ x : 2200, y : 15 },
								{ x : 3000, y : 10 },
								{ x : 3040, y : 20 },
							];
		pos_nubes_grandes =	[
								{ x : 800, y : 111 },
								{ x : 2300, y : 111 },
								{ x : 3500, y : 111 },
							];
		//Objeto Mario
		mario = { x : 20, y : -30, ancho : 16, alto : 16, direccion : DERECHA, tamanio : MARIO_SMALL };
	}

	function convertMtzToObj(MtzEscenario)
	{
		//el numero147 indica que hay una moneda, en ese caso se agrega al arreglo de monedas
		//El numero 9 en la matriz quiere decir que no hay nada en esa pocision
		var ancho_escenario = MtzEscenario[0].length;
		var alto_escenario = MtzEscenario.length;

		var ArrayObjBloques = new Array();
		var ArrayObjMonedas = new Array();
		var _sx;
		var _sy;
		var tile;
		var tileRow;
		var tileCol;
		for(var i = 0; i < alto_escenario; i++)
			for(var j = 0; j < ancho_escenario; j++)
			{
				if(MtzEscenario[i][j] != 9)
				{
					tile = escenario[i][j];
					tileRow = (tile / numTilesImagen) | 0;
					tileCol = (tile % numTilesImagen) | 0;
					
					if(tileRow == 0)
						_sy = 0;
					else
						_sy = (tileRow * TAM_TILE) + (tileRow * 2);

					if(tileCol == 0)
						_sx = 0;
					else
						_sx = (tileCol * TAM_TILE) + (tileCol * 2);

					if(MtzEscenario[i][j] != 147 && MtzEscenario[i][j] != 5)
						ArrayObjBloques.push({ x : j * TAM_TILE, y : i * TAM_TILE, ancho : TAM_TILE, alto : TAM_TILE, sx : _sx, sy : _sy, num_tile : MtzEscenario[i][j], num_monedas : getRandomInt(2, 8) });
					else
					{
						if(MtzEscenario[i][j] == 5)
						{
							ArrayObjBloques.push({ x : j * TAM_TILE, y : i * TAM_TILE, ancho : TAM_TILE, alto : TAM_TILE, sx : _sx - TAM_TILE - 2, sy : _sy, num_tile : MtzEscenario[i][j], num_monedas : getRandomInt(2, 8) });
							hongo = { x : j * TAM_TILE, y : i * TAM_TILE, ancho : TAM_TILE, alto : TAM_TILE, direccion : CAMINANDO_DERECHA, altura : 0, sx : 1 * TAM_TILE + 2 , sy : 3 * TAM_TILE + 6 }
						}
						else
							ArrayObjMonedas.push({ x : j * TAM_TILE, y : i * TAM_TILE, ancho : TAM_TILE, alto : TAM_TILE, sx : _sx, sy : _sy });
					}
				}
			}
		return { Bloques : ArrayObjBloques, Monedas : ArrayObjMonedas };
	}

	function getEnemigosIniciales()
	{
		var vec_enemigos = new Array();
		var enem_ancho = 16;
		var enem_alto = 16;
		vec_enemigos.push( { x : 100, y : 207, ancho : enem_ancho, alto : enem_alto, direccion : CAMINANDO_DERECHA } );
		vec_enemigos.push( { x : 900, y : 207, ancho : enem_ancho, alto : enem_alto, direccion : CAMINANDO_IZQUIERDA } );
		vec_enemigos.push( { x : 800, y : 207, ancho : enem_ancho, alto : enem_alto, direccion : CAMINANDO_DERECHA } );
		vec_enemigos.push( { x : 2000, y : 207, ancho : enem_ancho, alto : enem_alto, direccion : CAMINANDO_IZQUIERDA } );
		vec_enemigos.push( { x : 2350, y : 207, ancho : enem_ancho, alto : enem_alto, direccion : CAMINANDO_DERECHA } );
		vec_enemigos.push( { x : 2400, y : 207, ancho : enem_ancho, alto : enem_alto, direccion : CAMINANDO_IZQUIERDA } );
		vec_enemigos.push( { x : 2500, y : 207, ancho : enem_ancho, alto : enem_alto, direccion : CAMINANDO_DERECHA } );
		vec_enemigos.push( { x : 2900, y : 207, ancho : enem_ancho, alto : enem_alto, direccion : CAMINANDO_IZQUIERDA } );

		return vec_enemigos;
	}

	function dibujaEscenario()
	{
		//Este for lo que hace es pintar el cielo
		for(var i = 0; i < 15; i++)
			context.drawImage(img_fondo, i *256, 0);


		//dibujando nubes chicas
		var num_nubes_chicas = pos_nubes_chicas.length;
		for(var k = 0; k < num_nubes_chicas; k++)
			context.drawImage(nubes[0], pos_nubes_chicas[k].x, pos_nubes_chicas[k].y);
		
		//dibujando nubes grandes
		var num_nubes_grandes = pos_nubes_grandes.length;
		for(var k = 0; k < num_nubes_grandes; k++)
			context.drawImage(nubes[1], pos_nubes_grandes[k].x, pos_nubes_grandes[k].y);



		//dibujando las montañas
		var num_montains = pos_x_montain.length;
		for(var m = 0; m < num_montains; m++)
			context.drawImage(mountains[m], pos_x_montain[m], (256 - mountains[m].naturalHeight) - 32);

		//dibujando el castillo
		context.drawImage(castillo, x_castillo, (256 - castillo.naturalHeight) - 32);

		//dibujando los bloques
		for(var i = 0; i < num_bloques; i++)
			context.drawImage(img_tile, Bloques[i].sx, Bloques[i].sy, TAM_TILE, TAM_TILE, Bloques[i].x, Bloques[i].y, TAM_TILE, TAM_TILE);

		//Dibujando la moneda que sale de un bloque de monedas
		if(dibujaMonedaBloque)
		{
			context.drawImage(img_tile, 6 * TAM_TILE + 12, 7 * TAM_TILE + 14, TAM_TILE, TAM_TILE, Bloques[pos_monedaBloque].x, Bloques[pos_monedaBloque].y - 30, TAM_TILE, TAM_TILE);
			if(veces_monedas == 10)
			{
				veces_monedas = 0;
				dibujaMonedaBloque = false;
			}
			veces_monedas++;
		}

		if(MuestraHongo)
			context.drawImage(img_tile, hongo.sx, hongo.sy, TAM_TILE, TAM_TILE, hongo.x, hongo.y, TAM_TILE, TAM_TILE);

		//dibujando las monedas
		var num_monedas = Monedas.length;
		for(var i = 0; i < num_monedas; i++)
			context.drawImage(img_tile, Monedas[i].sx, Monedas[i].sy, TAM_TILE, TAM_TILE, Monedas[i].x, Monedas[i].y, TAM_TILE, TAM_TILE);
	}

	function dibujaMario()
	{
		var mario_reposo = true;
		
		mario.y += 1;
		if(colisiona_con_bloque(mario))
			mario.y -= velocidad_mario;

		if(brincando)
		{
			mario.y -= 2;
			if(colisiona_con_bloque(mario))
				altura_brinco = 123;
			if(altura_brinco >= 123)
			{
				brincando = false;
				altura_brinco = 0;
			}
			else
				altura_brinco += 2;
		}
		
		moverEnemigos(true);

		if(MuestraHongo)
			moverHongo();

		if(mario.tamanio == MARIO_BIG)
		{
			//Espacio (Brincar)
			if(keys[32])
			{
				mario.y++;
				if(colisiona_con_bloque(mario))
				{
					musica_salto.play();
					brincando = true;
					if(edo_mario == CAMINANDO_DERECHA)
						img_actual_mario = img_mario_big_jump_right;
					else
						img_actual_mario = img_mario_big_jump_left;
					mario_reposo = false;
				}
				mario.y--;
			}
			//Izquierda
			if(keys[37])
			{
				if(edo_mario != CAMINANDO_IZQUIERDA)
					edo_sprite = 0;
				edo_mario = CAMINANDO_IZQUIERDA;
				if(mario.x > 0)
				{
					mario.x -= velocidad_mario;
					if(colisiona_con_bloque(mario))
						mario.x += velocidad_mario;
				}
				img_actual_mario = img_mario_big_walking_left[edo_sprite];
				edo_sprite = (edo_sprite + 1) % 3;
				mario_reposo = false;
			}
			//Derecha
			if(keys[39])
			{
				if(edo_mario != CAMINANDO_DERECHA)
					edo_sprite = 0;
				edo_mario = CAMINANDO_DERECHA;
				if(mario.x >= mitad_screen)
				{
					moverEscenario(-velocidad_mario);
					if(colisiona_con_puerta_del_castillo(mario))
						mario_llego_al_castillo = true;
					if(colisiona_con_bloque(mario))
						moverEscenario(velocidad_mario);
					else
						moverEnemigos(false);
				}
				else
				{
					mario.x += velocidad_mario;
					if(colisiona_con_puerta_del_castillo(mario))
						mario_llego_al_castillo = true;
					if(colisiona_con_bloque(mario))
						mario.x -= velocidad_mario;
				}
				img_actual_mario = img_mario_big_walking_right[edo_sprite];
				edo_sprite = (edo_sprite + 1) % 3;
				mario_reposo = false;
			}
			it_moneda = coliciona_con_moneda(mario);
			if(it_moneda != -1)
			{
				Puntos += 10;
				Monedas.splice(it_moneda, 1);
				musica_moneda.currentTime = 0;
				musica_moneda.play();
			}

			if(mario_reposo == true)
				if(edo_mario == CAMINANDO_DERECHA)
					img_actual_mario = img_mario_big_walking_right[0];
				else
					img_actual_mario = img_mario_big_walking_left[0];

			for(var e = 0; e < num_enemigos; e++)
				context.drawImage(img_enemigos[edo_sprite_enemigo], Enemigos[e].x, Enemigos[e].y);
			edo_sprite_enemigo = (edo_sprite_enemigo + 1) % 2;

			if(brincando && edo_mario == CAMINANDO_DERECHA)
				img_actual_mario = img_mario_big_jump_right;
			else if(brincando && edo_mario == CAMINANDO_IZQUIERDA)
				img_actual_mario = img_mario_big_jump_left;
		}
		else
		{
			//Espacio (Brincar)
			if(keys[32])
			{
				mario.y++;
				if(colisiona_con_bloque(mario))
				{
					musica_salto.play();
					brincando = true;
					if(edo_mario == CAMINANDO_DERECHA)
						img_actual_mario = img_mario_mini_jump_right;
					else
						img_actual_mario = img_mario_mini_jump_left;
					mario_reposo = false;
				}
				mario.y--;
			}
			//Izquierda
			if(keys[37])
			{
				if(edo_mario != CAMINANDO_IZQUIERDA)
					edo_sprite = 0;
				edo_mario = CAMINANDO_IZQUIERDA;
				if(mario.x > 0)
				{
					mario.x -= velocidad_mario;
					if(colisiona_con_bloque(mario))
						mario.x += velocidad_mario;
				}
				img_actual_mario = img_mario_mini_walking_left[edo_sprite];
				edo_sprite = (edo_sprite + 1) % 3;
				mario_reposo = false;
			}
			//Derecha
			if(keys[39])
			{
				if(edo_mario != CAMINANDO_DERECHA)
					edo_sprite = 0;
				edo_mario = CAMINANDO_DERECHA;
				if(mario.x >= mitad_screen)
				{
					moverEscenario(-velocidad_mario);
					if(colisiona_con_puerta_del_castillo(mario))
						mario_llego_al_castillo = true;
					if(colisiona_con_bloque(mario))
						moverEscenario(velocidad_mario);
					else
						moverEnemigos(false);
				}
				else
				{
					mario.x += velocidad_mario;
					if(colisiona_con_puerta_del_castillo(mario))
						mario_llego_al_castillo = true;
					if(colisiona_con_bloque(mario))
						mario.x -= velocidad_mario;
				}
				img_actual_mario = img_mario_mini_walking_right[edo_sprite];
				edo_sprite = (edo_sprite + 1) % 3;
				mario_reposo = false;
			}
			it_moneda = coliciona_con_moneda(mario);
			if(it_moneda != -1)
			{
				Puntos += 10;
				Monedas.splice(it_moneda, 1);
				musica_moneda.currentTime = 0;
				musica_moneda.play();
			}

			if(mario_reposo == true)
				if(edo_mario == CAMINANDO_DERECHA)
					img_actual_mario = img_mario_mini_walking_right[0];
				else
					img_actual_mario = img_mario_mini_walking_left[0];

			for(var e = 0; e < num_enemigos; e++)
				context.drawImage(img_enemigos[edo_sprite_enemigo], Enemigos[e].x, Enemigos[e].y);
			edo_sprite_enemigo = (edo_sprite_enemigo + 1) % 2;

			if(brincando && edo_mario == CAMINANDO_DERECHA)
				img_actual_mario = img_mario_mini_jump_right;
			else if(brincando && edo_mario == CAMINANDO_IZQUIERDA)
				img_actual_mario = img_mario_mini_jump_left;
		}
		

		context.drawImage(img_actual_mario, mario.x, mario.y);

		pintaPuntaje();

		if(mario.y > alto_canvas)
			game_over = true;

		if(colisiona_con_enemigo(mario))
			game_over = true;
	}

	function colisiona_con_enemigo(obj)
	{
		for(var e = 0; e < num_enemigos; e++)
			if(intersects(obj, Enemigos[e]))
				return true;
		return false;
	}

	function getRandomInt(min, max)
	{
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function moverHongo()
	{		
		if(hongo.altura == (TAM_TILE + 2))
		{
			hongo.y++;
			if(colisiona_con_bloque(hongo))
				hongo.y--;

			if(hongo.direccion == CAMINANDO_DERECHA)
			{
				hongo.x += velocidad_mario;
				if(colisiona_con_bloque(hongo))
				{
					hongo.x -= velocidad_mario;
					hongo.direccion = CAMINANDO_IZQUIERDA;
				}
			}
			else
			{
				hongo.x -= velocidad_mario;
				if(colisiona_con_bloque(hongo))
				{
					hongo.x += velocidad_mario;
					hongo.direccion = CAMINANDO_DERECHA;
				}
			}
			if(intersects(mario, hongo))
			{
				musica_mario_grande.currentTime = 0;
				musica_mario_grande.play();
				mario.tamanio = MARIO_BIG;
				MuestraHongo = false;
				hongo_sin_comer = false;
				mario.y -= 15;
				mario.alto = 30;
			}
		}
		else
		{
			hongo.y--;
			hongo.altura++;
		}
	}

	function moverEnemigos(todos)
	{
		for(var e = 0; e < num_enemigos; e++)
		{
			Enemigos[e].y++;
			if(colisiona_con_bloque(Enemigos[e]))
				Enemigos[e].y--;
			if(todos == true && Enemigos[e].direccion == CAMINANDO_DERECHA)
			{
				Enemigos[e].x += velocidad_mario;
				if(colisiona_con_bloque(Enemigos[e]))
				{
					Enemigos[e].x -= velocidad_mario;
					Enemigos[e].direccion = CAMINANDO_IZQUIERDA;
				}
			}
			else //Caminando hacia la izquierda
			{
				Enemigos[e].x -= velocidad_mario;
				if(colisiona_con_bloque(Enemigos[e]))
				{
					Enemigos[e].x += velocidad_mario;
					Enemigos[e].direccion = CAMINANDO_DERECHA;
				}
			}
		}
	}

	function moverEscenario(offset)
	{
		//moviendo nubes chicas
		var num_nubes_chicas = pos_nubes_chicas.length;
		for(var k = 0; k < num_nubes_chicas; k++)
			pos_nubes_chicas[k].x += offset;
		
		//moviendo nubes grandes
		var num_nubes_grandes = pos_nubes_grandes.length;
		for(var k = 0; k < num_nubes_grandes; k++)
			pos_nubes_grandes[k].x += offset;

		//moviendo las montañas
		var num_montains = pos_x_montain.length;
		for(var m = 0; m < num_montains; m++)
			pos_x_montain[m] += offset;

		//moviendo el castillo
		x_castillo += offset;

		//Moviendo los bloques
		for(var i = 0; i < num_bloques; i++)
			Bloques[i].x += offset;

		//Moviendo las monedas
		var num_monedas = Monedas.length;
		for(var i = 0; i < num_monedas; i++)
			Monedas[i].x += offset;

		//Moviendo el hongo
		hongo.x += offset;
	}

	function colisiona_con_puerta_del_castillo(obj)
	{
		if(intersects(obj, { x : x_castillo + 48, y : 176, ancho: 96, alto: 80 } ))
			return true;
		return false;
	}

	//Funciones para ver si mario colisiona
	function colisiona_con_bloque(obj)
	{
		for(var i = 0; i < num_bloques; i++)
		{
			if(intersects(obj, Bloques[i]))
			{
				if(Bloques[i].num_tile == TILE_ASTA)
					gano = true;
				if(Bloques[i].num_tile == TILE_MONEDA && Bloques[i].num_monedas > 0 && intersecto_con_bloque_monedas)
				{

					dibujaMonedaBloque = true;
					pos_monedaBloque = i;
					musica_moneda.currentTime = 0;
					musica_moneda.play();
					Bloques[i].num_monedas--;
					Puntos += 10;
					if(Bloques[i].num_monedas == 0)
						cambiaBloqueMonedaXBloqueSinMonedas(i);
						
				}
				else if(Bloques[i].num_tile == 5 && hongo_sin_comer && !MuestraHongo)
				{
					power_up_hongo.currentTime = 0;
					power_up_hongo.play();
					MuestraHongo = true;
				}
				return true;
			}
		}	
		return false;
	}

	function cambiaBloqueMonedaXBloqueSinMonedas(pos_bloque_moneda)
	{
		//Ponemos un numero de tile diferente del numero de tile del bloque de monedas
		Bloques[pos_bloque_moneda].num_tile == 4;
		Bloques[pos_bloque_moneda].sx = 4 * TAM_TILE + 8;
	}

	//Funciones para ver si mario colisiona
	function coliciona_con_moneda(obj)
	{
		var num_monedas = Monedas.length;
		for(var i = 0; i < num_monedas; i++)
			if(intersects(obj, Monedas[i]))
				return i;
		return -1;
	}

	function intersects(obj1, obj2)
	{
		if(((obj1.x + obj1.ancho) > obj2.x) && ((obj1.y + obj1.alto) > obj2.y) && ((obj2.x + obj2.ancho) > obj1.x) && ((obj2.y + obj2.alto) > obj1.y))
		{
			if(obj1.y >= obj2.y)
				intersecto_con_bloque_monedas = true;
			else
				intersecto_con_bloque_monedas = false;
			return true;
		}
		else
			return false;
	}

	function pintaPuntaje()
	{
		context.save();
		context.font = "10px Emulogic";
		context.fillStyle = colorLetras;
		pintaMoneda(ancho_canvas - 80, 9);
		context.fillText(" x " + Puntos, ancho_canvas - 70,20);
		context.restore();
	}

	function pintaMoneda(pos_x, pos_y)
	{
		var _sx = 7 * TAM_TILE + (7 * 2);
		var _sy = 8 * TAM_TILE;
		context.drawImage(img_tile, _sx, _sy, TAM_TILE, TAM_TILE, pos_x, pos_y, TAM_TILE, TAM_TILE);
	}

	function animacionGameOver()
	{
		musica_fondo.pause();
		musica_moneda.pause();
		musica_ganadora.pause();
		musica_perdedora.currentTime = 0;
		musica_perdedora.play();
		context.fillStyle = "#e74c3c";
		context.fillRect(0, 0, ancho_canvas, alto_canvas);
		context.drawImage(img_mario_lost, 0, 0, img_mario_lost.naturalWidth, img_mario_lost.naturalHeight, (ancho_canvas - (img_mario_lost.naturalWidth / 2)) / 2, img_mario_lost.naturalHeight / 2, img_mario_lost.naturalWidth / 2, img_mario_lost.naturalHeight / 2);
		context.font="30px Emulogic";
		context.fillStyle = colorLetras;
		context.fillText("GAME OVER", 110, 50);
		context.font="10px Emulogic";
		context.fillText("Presiona R para reiniciar el juego", 80, 80);
		juego_terminado = true;
	}

	function animacionMarioWin()
	{
		musica_fondo.pause();
		musica_moneda.pause();
		musica_ganadora.currentTime = 0;
		musica_ganadora.play();
		context.fillStyle = "#1abc9c";
		context.fillRect(0, 0, ancho_canvas, alto_canvas);
		context.drawImage(img_mario_win, 0, 0, img_mario_win.naturalWidth, img_mario_win.naturalHeight, 125, 128, ancho_canvas / 2, alto_canvas / 2);
		context.font="30px Emulogic";
		context.fillStyle = colorLetras;
		context.fillText("YOU WIN!!", 130, 50);
		context.font="10px Emulogic";
		context.fillText("Presiona R para reiniciar el juego", 80, 80);
		pintaMoneda(ancho_canvas - 110, 99);
		context.fillText(" x " + Puntos, ancho_canvas - 100,110);
		juego_terminado = true;
	}

	function dibujaBarrasDeVida()
	{
		context.save();
		//Pintando Barra de Vida de Mario
		context.drawImage(img_cara_mario, 3, 3, 23, 30);
		context.fillStyle = "#fff";
		context.fillRect(25,7,180,20);
		context.fillStyle = "#f1c40f";
		context.fillRect(27,9,176,16);

		//Pintando Barra de Vida del Dragon
		context.drawImage(img_cara_dragon, 275, 3);
		context.fillStyle = "#fff";
		context.fillRect(315,7,180,20);
		context.fillStyle = "#f1c40f";
		context.fillRect(317,9,176,16);
		context.restore();
	}

	function dibujaDragon()
	{
		context.drawImage(img_dragon[0], 350, 50);
	}

	function gameLoop()
	{
		if(!game_over && !gano)
		{
			dibujaEscenario();
			dibujaMario();
		}
		else if(game_over && !juego_terminado)
			animacionGameOver();
		else if(!juego_terminado)
			animacionMarioWin();
		if(juego_terminado && keys[KEY_R])
			iniciaJuego();
	}

	setInterval(gameLoop, 10);

}