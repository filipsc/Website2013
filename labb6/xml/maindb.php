<?php
$xml = simplexml_load_file('pizzeria.xml');

/*
	Get and save all pizzas in a PHP-array
*/
$pizzas = array();
foreach ($xml->menu->pizza as $pi) {
	$piID = (int)$pi->attributes()->id;
	$piName = (string)$pi->name;
	$piDesc = (string)$pi->description;
	$piPop = (int)$pi->popularity;
	$piIngredients = array();
	foreach ($pi->ingredient as $ing) {
		$piIngredients[(int)$ing['id']] = (int)$ing['units'];
	};
	$pizzas[(int)$piID] =  array('name' => $piName, 'description' => $piDesc, 'popularity' => $piPop, 'ingredients' => $piIngredients);
};
asort($pizzas);

/*
	Get and save all ingredients in a PHP-array
*/
$ingredients = array();
foreach ($xml->storage->ingredient as $ing){
	$ingID = (int)$ing->attributes()->id;
	$ingName = (string)$ing->attributes()->name;
	$ingAmount = (int)$ing->attributes()->in_storage;
	$ingredients[$ingID] = array('name' => $ingName, 'in_storage' => $ingAmount);
}
asort($ingredients);

 
?>