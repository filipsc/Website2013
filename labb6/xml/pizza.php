<?php
include 'maindb.php';

if (isset($_REQUEST['action'])) {
	$act = $_REQUEST['action'];


	if ($act == "test") {
		echo "testing succesfull";

	//Get the json encoded version of all the pizzas.
	} elseif ($act == "getall") {
		echo json_encode($pizzas);
	//TOTEST
	//Set the sent info
	} elseif ($act == "set") {
		if (isset($_REQUEST['id'])){
			$id = $_REQUEST['id'];
			//Find by id, if found length should be 1.
			$pis = $xml->xpath("//menu//pizza[@id='".$id."']");
			if(count($pis) == 1) {
				$pi = $pis[0];
				if(isset($_REQUEST['name'])){
					$name = (string)$_REQUEST['name'];
					$pi->name = $name;
				}
				if(isset($_REQUEST['description'])){
					$description = (string)$_REQUEST['description'];
					$pi->description = $description;
				}
				if(isset($_REQUEST['popularity'])){
					$popularity = (int)$_REQUEST['popularity'];
					$pi->popularity = $popularity;
				}
				if(isset($_REQUEST['ingredients'])){
					$ings = $_REQUEST['ingredients'];
					$ings = array_filter($ings); //Remove unused values.

					//First remove the previous ingredients. TODO: DOES NOT SEEMS TO WORK?!
					foreach ($pi->ingredient as $ing) {
						$ing = dom_import_simplexml($ing);
                    	$ing->parentNode->removeChild($ing);
                    	echo $xml->asXML();
					}
			
					//Secondly add the new ingredients.
					foreach ($ings as $id => $amount) {
						$ing = $pi->addChild('ingredient');
						$ing->addAttribute('id', $id);
						$ing->addAttribute('units', $amount);
						echo $id." | ".$amount;
					}

				}
				//Save xml
				$xml->asXML('pizzeria.xml');

				echo $xml->asXML();
			} else {
				echo "pizza with id: ".$id." does not exist";
			}
		} else {
			echo "failure set: need to set id";
		}

	//TOTEST
	//Get a pizza specified by the id sent along.
	} elseif ($act == "get") {
		if (isset($_REQUEST['id'])) {
			$id = $_REQUEST['id'];
			
			if (isset($pizzas[$id])) {
				echo json_encode($pizzas[$id]);
			} else {
				echo "pizza with id: ".$id." does not exist";
			}
			
		} else {
			echo "id needs to be set";
		}

	//Add another pizza  
	} elseif ($act == "add") {
		if (isset($_REQUEST['name'])) {
			//description
			$desc = "";
			if (isset($_REQUEST['description'])) {
				$desc = $_REQUEST['description'];
			}
			//other stuff
			$name = $_REQUEST['name'];
			$id = key( array_slice( $pizzas, -1, 1, TRUE )) + 1; //Magic functions, that returns a free idvalue.

			//set values
			$newPi = $xml->menu->addChild('pizza');
			$newPi->addAttribute("id", $id);
			$newPi->addChild("name", $name);
			$newPi->addChild("popularity", 0);
			$newPi->addChild("description", $desc);

			//TODO check for and add ingredients
			if(isset($_REQUEST['ingredients'])){
				$ings = $_REQUEST['ingredients'];
				$ings = array_filter($ings); //Remove unused values.

				//Secondly add the new ingredients.
				foreach ($ings as $id => $amount) {
					$ing = $pi->addChild('ingredient');
					$ing->addAttribute('id', $id);
					$ing->addAttribute('units', $amount);
				}
			}

			//Save xml
			$xml->asXML('pizzeria.xml');

			//Return the new id to use.
			echo $id;
		} else {
			echo "name needs to be set";
		}

	//TOTEST
	//delete a pizza
	} elseif ($act =="delete") {
		if (isset($_REQUEST['id'])) {
			$id = $_REQUEST['id'];

			//Find by id, if found length should be 1.
			$pis = $xml->xpath("//menu//pizza[@id='".$id."']");
			if (count($pis) == 1) {
				$pi = $pis[0];
				$domPi = dom_import_simplexml($pi);
				$domPi->parentNode->removeChild($domPi);

				$xml->asXML("pizzeria.xml");
				echo "success?"; //NEVER EVER EVER FORGET TO SAVE
			} else {
				echo "ingredient with id: ".$id." does not exist";
			}

		} else {
			echo "id needs to be set";
		}

	} elseif ($act == "getTop10") {
		$top10 = array();
		foreach ($pizzas as $id => $value) {
			$pop = $value['popularity'];
			$top10[] = array('id' => $id, 'name' => $value['name'], 'popularity' => $pop);
		}

		//sort the array by the popularity.
		function sortPop($a, $b) {
		    if ($a['popularity'] == $b['popularity']) {
		        return 0;
		    }
		    return ($a['popularity'] > $b['popularity']) ? -1 : 1;
		}
		
		uasort($top10, 'sortPop');
		//Take out the top 10 of the sorted array.
		$top10 = array_splice($top10, 0, 10);

		echo json_encode($top10);

	//If the action was not found above it does not exist.
	} else {
		echo "|".$act."| is not a valid action";
	}
}

?>