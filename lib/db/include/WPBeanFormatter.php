<?php

class WPBeanFormatter implements RedBean_IBeanFormatter
{
    public function formatBeanTable($table) {
        global $table_prefix;
        return $table_prefix."$table";
    }
    public function formatBeanID( $table ) {
        return "id";
    }
}

R::$writer->setBeanFormatter(new WPBeanFormatter());
