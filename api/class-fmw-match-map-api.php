<?php

require_once plugin_dir_path(dirname(__FILE__)) . "/lib/db/FMWDonation.php";

class Fmw_Match_Api
{

	var $route_base = 'fmw-map';

	public function __construct()
	{
	}

	public function helloWorld()
	{
		// $donation = FMWDonation::create();
		return new WP_REST_Response("BINGO!", 200);
	}

	public function define_api_hooks()
	{
		add_action('rest_api_init', function () {
			register_rest_route($this->route_base, '/test', array(
				'methods'  => WP_REST_Server::READABLE,
				'callback' => array($this, 'helloWorld'),
				'args'     => array(),
			));
		});
	}
}
