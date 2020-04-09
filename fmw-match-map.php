<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/dtiemann83
 * @since             1.0.0
 * @package           Fmw_Match_Map
 *
 * @wordpress-plugin
 * Plugin Name:       FMWMatchMap
 * Plugin URI:        https://github.com/dtiemann83/fmw-match-map.git
 * Description:       Map for facemask warriors, to match donation centers and supplies
 * Version:           1.0.0
 * Author:            Dana Tiemann
 * Author URI:        https://github.com/dtiemann83
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       fmw-match-map
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'FMW_MATCH_MAP_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-fmw-match-map-activator.php
 */
function activate_fmw_match_map() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-fmw-match-map-activator.php';
	Fmw_Match_Map_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-fmw-match-map-deactivator.php
 */
function deactivate_fmw_match_map() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-fmw-match-map-deactivator.php';
	Fmw_Match_Map_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_fmw_match_map' );
register_deactivation_hook( __FILE__, 'deactivate_fmw_match_map' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-fmw-match-map.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_fmw_match_map() {

	$plugin = new Fmw_Match_Map();
	$plugin->run();

}
run_fmw_match_map();
