/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */

var regexZawgyi = /Zawgyi-One/;
var regexMyanmar3 = /Myanmar3/;

var fontFamilyName = getFontForElement(document.body);

var zawgyiChars = "ကခဒေငပး";
var zawgyiCharsArray = zawgyiChars.split("");

var myanmar3Chars = "ကခငလေယပ";
var myanmar3CharsArray = myanmar3Chars.split("");

/**
 * Check the font name
 * If font name is 'Zawgyi-One' or 'Myanmar3'
 * Auto switch the font name
 */
if (regexZawgyi.test(fontFamilyName) || findByChars(zawgyiCharsArray)) {
  changeFont('Zawgyi-One');
  chrome.extension.sendRequest({}, function(response) {});
} else if (regexMyanmar3.test(fontFamilyName) || findByChars(myanmar3CharsArray)){
  changeFont('Myanmar3');
}

/**
 * Find the fonts used in page by using char array
 * @argument {CharArray} char array
 * @returns {boolean} boolean return if char is found
 */
function findByChars(arr) {
	for (i = 0; i < arr.length; i++) {
		var re = new RegExp(arr[i], "g");
		if (re.test(document.body.innerText)) {
			return true;
		}
	}
}


/**
 * Get the font used for a given element
 * @argument {HTMLElement} the element to check font for
 * @returns {string} The name of the used font or null if font could not be detected
 */
function getFontForElement(ele) {
    if (ele.currentStyle) { // sort of, but not really, works in IE
        return ele.currentStyle["fontFamily"];
    } else if (document.defaultView) { // works in Opera and FF
        return document.defaultView.getComputedStyle(ele,null).getPropertyValue("font-family");
    } else {
        return null;
    }
}

/**
 * Switch the font
 * @argument {fontname} name of the font to switch
 * @returns {void} 
 */
function changeFont(fontname) {
    fontfamily = fontname;
    document.getElementsByTagName('body')[0].style.fontFamily = fontfamily;
    var tag = ['body', 'p', 'li', 'span', 'textarea', 'input', 'div', 'a', 'td', 'h1', 'h2', 'h3'];
    var p;
    for (j = 0; j < tag.length; j++) {
        if (document.getElementsByTagName(tag[j]) != null) {
            p = document.getElementsByTagName(tag[j]);
            for (i = 0; i < p.length; i++) {
                if (p[i].style != undefined) {
                    p[i].style.fontFamily = fontfamily;
                }
            }
        }
    }
    var iframe = document.getElementsByTagName('iframe');
    for (k = 0; k < iframe.length; k++) {
        doc = iframe[k].contentDocument;
        for (j = 0; j < tag.length; j++) {
            if (document.getElementsByTagName(tag[j]) != null) {
                p = doc.getElementsByTagName(tag[j]);
                for (i = 0; i < p.length; i++) {
                    if (p[i].style != undefined) {
                        p[i].style.fontFamily = fontfamily;
                    }
                }
            }
        }
    }
}