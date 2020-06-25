<?php

require_once 'FmwDb.php';

class FMWDonation
{

	static $table = FMW_DB_PREFIX . 'donation';

	const fields = [
		'name',
		'email',
		'description',
		'quantity',
		'category',
		'category_description',
		'location_name',
		'location_lat',
		'location_lng',
		'created',
		'updated',
		'active'
	];

	public function __construct($id = null)
	{
		$this->db = FmwDb::getInstance();
		if ($id) {
			$this->id = $id;
			$this->findById($id);
		}
		// R::fancyDebug( TRUE );
	}

	public function new()
	{
		$this->data =  R::xdispense(self::$table);
	}

	public function setValue($field, $val)
	{
		if (in_array($field, self::fields))
			$this->data->{$field} = $val;
		else
			throw new Error("Invalid field! '$field'");
	}

	public function findById($id)
	{
		$this->data = R::load(self::$table, $id);
	}

	public function findByLatLng($lat, $lng, $radius, $start = 0, $limit = 20)
	{
		$query = "SELECT *, (
    			3959 * acos (
      			cos ( radians( %2\$s ) )
      			* cos( radians( location_lat ) )
      			* cos( radians( location_lng ) - radians( %3\$s ) )
				+ sin ( radians( %2\$s ) )
				* sin( radians( location_lat ) )
				)
			) AS distance
			FROM %1\$s
			HAVING distance < %6\$s
			ORDER BY distance
			LIMIT %4\$s , %5\$s ";
		$nquery = sprintf(
			$query,
			self::$table,
			$lat,
			$lng,
			$start,
			$limit,
			$radius
		);
		return R::getAll(
			$nquery
		);
	}

	private function backFill()
	{
		foreach (self::fields as $field) {
			if (!isset($this->data->{$field}))
				$this->data->{$field} = null;
		}
	}

	public function save()
	{
		$this->backFill();
		$this->id = R::store($this->data);
	}
}
