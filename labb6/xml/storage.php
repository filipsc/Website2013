<?php
include 'maindb.php';

if (isset($_REQUEST['action'])) {
	$act = $_REQUEST['action'];


	if ($act == "test") {
		echo "testing succesfull";

	//Get the json encoded version of all the ingredients.
	} elseif ($act == "getall") {
		echo json_encode($ingredients);

	//Set the name of a ingredient
	} elseif ($act == "set") {
		if (isset($_REQUEST['id'])) {
			$id = (int)$_REQUEST['id'];

			//Find by id, if found length should be 1.
			$ings = $xml->xpath("//storage//ingredient[@id='".$id."']");
			if(count($ings) == 1) {
				$ing = $ings[0];
				$ingAttr = $ing->attributes();

				if (isset($_REQUEST['name'])) {
					$name = (string)$_REQUEST['name'];
					$ingAttr['name'] = $name;
				}
				if (isset($_REQUEST['amount'])) {
					$amount = (int)$_REQUEST['amount'];
					$ingAttr['in_storage'] = $amount; 
				}

				//Save xml
				$xml->asXML('pizzeria.xml');
			} else {
				echo "ingredient with id: ".$id." does not exist";
			}
		} else {
			echo "id needs to be set";
		}

	//Get a ingredient specified by the id sent along.
	} elseif ($act == "get") {
		if (isset($_REQUEST['id'])) {
			$id = $_REQUEST['id'];

			echo json_encode($ingredients[$id]);
		} else {
			echo "id needs to be set";
		}

	//Add another ingredient
	} elseif ($act == "add") {
		if (isset($_REQUEST['name']) && isset($_REQUEST['amount'])) {
			$name = $_REQUEST['name'];
			$amount = $_REQUEST['amount'];
			$id = key( array_slice( $ingredients, -1, 1, TRUE )) + 1; //Magic functions, that returns a free idvalue.
			$newIng = $xml->storage->addChild('ingredient');
			$newIng->addAttribute("id", $id);
			$newIng->addAttribute("name", $name);
			$newIng->addAttribute("in_storage", $amount);

			//Save xml
			$xml->asXML('pizzeria.xml');

			//Return the new id to use.
			echo $id;
		} else {
			echo "name and amount needs to be set";
		}

	//Delete an ingredient.
	} elseif ($act =="delete") {
		if (isset($_REQUEST['id'])) {
			$id = $_REQUEST['id'];

			//Find by id, if found length should be 1.
			$ings = $xml->xpath("//storage//ingredient[@id='".$id."']");
			if (count($ings) == 1) {
				$ing = $ings[0];
				$domIng = dom_import_simplexml($ing);
				$domIng->parentNode->removeChild($domIng);

				//Save xml
				$xml->asXML("pizzeria.xml");

				echo "success";
			} else {
				echo "ingredient with id: ".$id." does not exist";
			}
		} else {
			echo "id needs to be set";
		}

	//If the action was not found above it does not exist.
	} else {
		echo "|".$act."| is not a valid action";
	}
}
?>