<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://github.com/dtiemann83
 * @since      1.0.0
 *
 * @package    Fmw_Match_Map
 * @subpackage Fmw_Match_Map/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Fmw_Match_Map
 * @subpackage Fmw_Match_Map/admin
 * @author     Dana Tiemann <dana@netpostech.com>
 */
class Fmw_Match_Map_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Fmw_Match_Map_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Fmw_Match_Map_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/fmw-match-map-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Fmw_Match_Map_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Fmw_Match_Map_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/fmw-match-map-admin.js', array( 'jquery' ), $this->version, false );

	}

	public function register_options_page(){
		add_options_page('FMW Match Map Settings', 'FMW Map', 'manage_options', 'fmw-match-map-opts', array($this, 'adminPage'));
	}

	public function adminPage(){
		require('adminPage.php');
	}

}
