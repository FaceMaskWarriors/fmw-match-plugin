<?php
require_once "include/rb-mysql.php";
// require_once "include/WPBeanFormatter.php";
define('FMW_DB_PREFIX', 'fmw_');

// General singleton class.
class FmwDb {
	// Hold the class instance.
	private static $instance = null;

	// The constructor is private
	// to prevent initiation with outer code.
	private function __construct()
	{
	  // The expensive process (e.g.,db connection) goes here.
	  R::setup("mysql:host=db;port=3306;dbname=".DB_NAME, DB_USER, DB_PASSWORD);
	  R::useFeatureSet('novice/latest');
	  R::ext('xdispense', function( $type ){
        return R::getRedBean()->dispense( $type );
      });

	}

	// The object is created from within the class itself
	// only if the class has no instance.
	public static function getInstance()
	{
	  if (self::$instance == null)
	  {
		self::$instance = new FmwDb();
	  }

	  return self::$instance;
	}

	private function __destruct(){
		R::close();
	}
  }