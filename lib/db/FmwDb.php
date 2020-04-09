<?php
require_once "include/rb-mysql.php";
// require_once "include/WPBeanFormatter.php";

// General singleton class.
class FmwDb {
	// Hold the class instance.
	private static $instance = null;

	// The constructor is private
	// to prevent initiation with outer code.
	private function __construct()
	{
	  // The expensive process (e.g.,db connection) goes here.
	  R::setup("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASSWORD);
	}

	// The object is created from within the class itself
	// only if the class has no instance.
	public static function getInstance()
	{
	  if (self::$instance == null)
	  {
		self::$instance = new Singleton();
	  }

	  return self::$instance;
	}

	private function __destruct(){
		R::close();
	}
  }