<?php

require_once 'FmwDb.php';

class FMWDonation {

	static $table = 'donation';

	public function __construct(){
		$this->db = FmwDb::getInstance();
	}

	public static function create($count = 1){
		echo self::$table;
		// return  R::dispense(self::$table, $count, FALSE );
	}


}