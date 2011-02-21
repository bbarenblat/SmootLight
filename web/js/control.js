/* control.js - control the SmootLight installation
 *
 * Copyright (C) 2011 by Benjamin Barenblat
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * Except as contained in this notice, the name(s) of the above copyright
 * holders shall not be used in advertising or otherwise to promote the sale,
 * use or other dealings in this Software without prior written authorization.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * The script talks with the installation by making HTTP requests to the given
 * URL.
 */
const installationEntryPointURL = "lights.json"

/**
 * Reloads the behavior list, updating the control form accordingly.
 */
function refreshBehaviorList() {
	const request = { "OperationType": "ListAll",
	                  "Key": "Behaviors" };
	$.getJSON(installationEntryPointURL,
	          request,
	          function(behaviors) {
	          	setBehaviors(behaviors);
	          	showRefreshButton();
			  });
}

/**
 * Sets the behavior list in the control form.
 *
 * @param behaviors Array of behavior objects to set.  Each object must have a
 * name field, which will be displayed as the behavior's name.
 */
function setBehaviors(behaviors) {
	$("#behaviors option").remove()
	for (var i = 0; i < behaviors.length; i++) {
		$("#behaviors").append("<option value=\""
		                       + behaviors[i].name
		                       + "\">"
		                       + behaviors[i].name
		                       + "</option>");
	}
}

function showRefreshButton() {
	$("#preferences #refreshBehaviorListButton").removeClass("invisible");
}

// Refresh the behavior list as soon as the DOM is available.
$(refreshBehaviorList);
