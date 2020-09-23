/* eslint-disable semi */

import $ from 'jquery'

export function getComments(apiUrl, siteKey, before, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`
  if (before) {
    url += `&before=${before}`
  }
  $.ajax({
    url,
  }).done((data) => {
    cb(data)
  });
}

export function addComments(apiUrl, siteKey, newData, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data: newData,
  }).done((data) => {
    cb(data)
  });
}
