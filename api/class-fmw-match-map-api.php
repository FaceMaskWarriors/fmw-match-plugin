<?php

require_once plugin_dir_path( dirname( __FILE__ ) ) ."/lib/db/FMWDonation.php";

class Fmw_Match_Api {

	var $route_base = 'fmw-map';

	public function __construct()
	{

	}

	public function addDonation($req){
		$parameters = $req->get_json_params();
		$donation = new FMWDonation();
		$donation->new();
		foreach($parameters as $key => $value){
			$donation->setValue($key, $value);
		}

		$donation->save();
		return new WP_REST_Response( $donation->data , 200 );
	}

	public function getDonation($req){
		$donationId = $req['id'];
		$donation = new FMWDonation($donationId);
		return new WP_REST_Response( $donation->data , 200 );
	}

	public function missingParams($params){
		$message = "Params : ".join(", ", $params )." are required";
		$err = (object)[
			"error" => true,
			"message" => $message
		];
		return new WP_REST_Response( $err , 400 );
	}

	public function findDonations($req){
		$reqParams = ['lat', 'lng'];
		foreach($reqParams as $param){
			if(!$req[$param])
				return $this->missingParams($reqParams);
		}

		$radius = $req['radius'] ? $req['radius'] : 10;
		$donation = new FMWDonation();
		$donations = $donation->findByLatLng($req['lat'], $req['lng'], $radius );

		return new WP_REST_Response( $donations , 200 );
	}

	public function phpInfo(){
		phpinfo();
	}

	public function define_api_hooks(){
		add_action( 'rest_api_init', function () {

			register_rest_route( $this->route_base, '/phpinfo', array(
				'methods'  => WP_REST_Server::READABLE,
				'callback' => array($this, 'phpInfo'),
				'args'     => array(),
			));

			register_rest_route( $this->route_base, '/donation', array(
				'methods'  => WP_REST_Server::CREATABLE,
				'callback' => array($this, 'addDonation'),
				'args'     => array(),
			));

			register_rest_route( $this->route_base, '/donation/(?P<id>[\d+])', array(
				'methods'  => WP_REST_Server::READABLE,
				'callback' => array($this, 'getDonation'),
				'args'     => array(),
			));

			register_rest_route( $this->route_base, '/donation/search', array(
				'methods'  => WP_REST_Server::READABLE,
				'callback' => array($this, 'findDonations'),
				'args'     => array(),
			));

		});
	}

}