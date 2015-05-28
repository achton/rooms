<?php

/**
 * @file
 * This file contains no working PHP code; it exists to provide additional
 * documentation for doxygen as well as to document hooks in the standard
 * Drupal manner.
 */

/**
 * Notifies subscribing modules of changes to the availability
 * calendar. This allows modules to react to changes.
 *
 * @param array $response - The response generated from the availability
 * calendar on a per-event basis
 * Response 100 - Event blocked
 * Response 200 - Event update
 * Response 300 - Wrong unit
 *
 * @param array $events - The events that were sent to the availability
 * calendar to be changed.
 */
function hook_rooms_availability_update($response, $events) {
  // Check
  foreach ($response as $code => $event_id) {
    if ($code == ROOMS_UPDATE) {
      // Get the event id
        $unit_affected = $events[$event_id]->$unit;
    }
  }
}