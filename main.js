function validateEmail(email) {
    var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return re.test(email.toLowerCase());
}

function showValue(val) {
    /* setup variables for the elements of our slider */
    var thumb = document.getElementById("sliderthumb");
    var shell = document.getElementById("slidershell");
    var track = document.getElementById("slidertrack");
    var fill = document.getElementById("sliderfill");
    var rangevalue = document.getElementById("slidervalue");
    var slider = document.getElementById("slider");
    
    var pc = val/(slider.max - slider.min); /* the percentage slider value */

    var thumbsize = 40; /* must match the thumb size in your css */
    var bigval = track.offsetWidth;
    var smallval = 40; /* narrowest or shortest value depending on orientation */
    var tracksize = bigval - thumbsize;
    var loc = pc * tracksize;
    
    rangevalue.innerHTML = val !== '15000' ? '£' + val : '£' + val + '+';

        
    var rangeValueWidth = rangevalue.offsetWidth;
    rangevalue.style.left = (loc - rangeValueWidth / 2 + thumb.getBoundingClientRect().width / 2) + 'px';


    thumb.style.left = loc + 'px';

    // Grab the svg
    var svg = document.querySelector('svg');
    
    fill.style.left = loc + thumb.getBoundingClientRect().width / 2 + "px";
    var trackWidth = track.offsetWidth;
    fill.style.width = trackWidth - loc - thumb.getBoundingClientRect().width / 2 + 'px';
    shell.style.height = smallval + "px";
    track.style.height = 0.5 + 'px';
    track.style.left = 0 + 'px';
    track.style.top = '50%';

    var circle = document.querySelector('circle');
    circle.style.strokeDasharray = parseInt(pc * 100) + ' 100';
  }

/* we often need a function to set the slider values on page load */
function setValue(val) {
    document.getElementById("slider").value = val;
    showValue(val);
}



function showSubscribeButton(shouldShow) {
    if (shouldShow) {
        document.getElementsByClassName('conceptaiButton')[0].classList.replace('hidden', 'showing')
        document.querySelectorAll('.conceptaiButton.vertical')[0].classList.replace('hidden', 'showing')

        document.querySelector('#newsletterPrompt .fieldInput').style.width = '33%';
        document.getElementsByClassName('errorEmail')[0].style.display = 'none';
    } else {
        document.getElementsByClassName('conceptaiButton')[0].classList.replace('showing', 'hidden');

        document.querySelectorAll('.conceptaiButton.vertical')[0].classList.replace('showing', 'hidden');

        document.querySelector('#newsletterPrompt .fieldInput').style.width = '50%';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementsByClassName('conceptaiButton')[0].classList.add('hidden');

    var emailType = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
    var emailDropdown = document.createElement('div');
    var emailContainers = [];
    emailDropdown.classList.add('emailDropdown');

    emailDropdown.addEventListener('click', function(evt) {
        document.getElementById('signupEmail').value = evt.target.textContent;
        emailDropdown.style.height = '0px';

        // Validate
        if (validateEmail(evt.target.textContent)) {
            showSubscribeButton(true);
        } else {
            showSubscribeButton(false);
            document.getElementsByClassName('errorEmail')[0].style.display = 'block';
        }
    });


    emailType.forEach(function(item, index) {
        var emailContainer = document.createElement('div');
        emailContainer.classList.add('emailOption');

        if (index === 0) {
            emailContainer.classList.add('keyboardSelectedEmailOption');
        }

        emailDropdown.appendChild(emailContainer);
        emailContainers.push(emailContainer);
    }, this);       
    
    // Create the closing button
    var close = document.createElement('a');
    close.innerHTML = '<img src="img/cross.svg">';
    close.href = '#';
    close.classList.add('clearAndClose');

    close.addEventListener('click', function(evt) {
        evt.preventDefault();
        document.getElementById('signupEmail').value = '';
        document.getElementsByClassName('errorEmail')[0].style.display = 'none';
        emailDropdown.style.height = '0px';
        showSubscribeButton(false)
    });

    var appendHere = document.querySelector('#newsletterEmail .fieldInput');
    appendHere.appendChild(emailDropdown);
    appendHere.appendChild(close);

    document.getElementById('subjectOptions').addEventListener('click', function(evt) {
        
        if (evt.target.tagName === 'A') {
            var textToAdd = document.getElementById('contactSubject').value == '' ? evt.target.text : ', ' + evt.target.text;
            document.getElementById('contactSubject').value += textToAdd;
            evt.target.classList.add('activeSubject');
        }
    });

    var allInputFields = document.querySelectorAll('.expandingLineField');

    allInputFields.forEach(function(item) {
        item.addEventListener('focus', function(evt) {
            if (evt.target.type === 'text') {
                evt.target.parentElement.nextElementSibling.classList.add('expanded');
            }
        });

        item.addEventListener('blur', function(evt) {
            if (evt.target.type === 'text') {
                this.parentElement.nextElementSibling.classList.remove('expanded');
            }
        });
    });

    document.getElementById('signupEmail').addEventListener('focus', function() {
        this.nextElementSibling.classList.add('expanded');
    });

    document.getElementById('signupEmail').addEventListener('blur', function() {
        this.nextElementSibling.classList.remove('expanded');
    });

    document.getElementById('signupEmail').addEventListener('keydown', function(evt) {
        if (emailDropdown.offsetHeight !== 0 && evt.keyCode === 40) {   // DOWN pressed
            var dropdownItems = emailDropdown.childNodes;
            var indexOfKeyboardSelectedItem = null;

            dropdownItems.forEach(function(item, index) {
                if (item.classList.contains('keyboardSelectedEmailOption')) {
                    item.classList.remove('keyboardSelectedEmailOption');
                    indexOfKeyboardSelectedItem = index;
                }
            });
        
            if (indexOfKeyboardSelectedItem < 3) {
                indexOfKeyboardSelectedItem++;
            } else {
                indexOfKeyboardSelectedItem = 0;
            }
            dropdownItems[indexOfKeyboardSelectedItem].classList.add('keyboardSelectedEmailOption');
            var t = document.getElementsByClassName('keyboardSelectedEmailOption')[0].textContent;
            document.getElementById('signupEmail').value = t;
        } else if (emailDropdown.offsetHeight !== 0 && evt.keyCode === 38) {    // Up pressed
            var dropdownItems = emailDropdown.childNodes;
            var indexOfKeyboardSelectedItem = null;

            dropdownItems.forEach(function(item, index) {
                if (item.classList.contains('keyboardSelectedEmailOption')) {
                    item.classList.remove('keyboardSelectedEmailOption');
                    indexOfKeyboardSelectedItem = index;
                }
            });
        
            if (indexOfKeyboardSelectedItem > 0) {
                indexOfKeyboardSelectedItem--;
            } else {
                indexOfKeyboardSelectedItem = 3;
            }
            dropdownItems[indexOfKeyboardSelectedItem].classList.add('keyboardSelectedEmailOption');

        var t = document.getElementsByClassName('keyboardSelectedEmailOption')[0].textContent;
        document.getElementById('signupEmail').value = t;

        } else if (emailDropdown.offsetHeight !== 0 && evt.keyCode === 13) {    // Enter pressed
            // Now we need to get hold of the text of the selected item.
            var text = document.querySelector('.keyboardSelectedEmailOption').textContent;
            document.querySelector('.emailDropdown').style.height = '0px';

            if (validateEmail(text)) {
                document.getElementById('signupEmail').value = text;
                showSubscribeButton(true);
            } else {
                document.getElementsByClassName('errorEmail')[0].style.display = 'block';
                showSubscribeButton(false);
            }
        }
    });

    document.getElementById('signupEmail').addEventListener('input', function(evt) {
        var sanitisedInput = '';
        var indexOfAt = this.value.indexOf('@');

        // If there is an at in the string, we only want what's before it
        if (indexOfAt !== -1) {
            sanitisedInput = this.value.substr(0, indexOfAt);
        } else {
            sanitisedInput = this.value;
        }

        // If there is any kind of input, show the div
        if (this.value.trim() !== '') {
            
            emailContainers.forEach(function(item, index) {
                item.innerHTML = '<span class="customEmail">' + sanitisedInput + '</span>@' + emailType[index];
            }, this);

            // Show clear button
            document.querySelector('.clearAndClose').style.display = 'block';
        } else {
            // If there's no text then don't show the subscribe button
            showSubscribeButton(false);
            document.querySelector('#newsletterEmail .emailDropdown').style.height = '0px';
            document.querySelector('.clearAndClose').style.display = 'none';
        }
        
        var dropdownItems = emailDropdown.childNodes;
        var foundCount = 0;


        dropdownItems.forEach(function(item) {
            if (item.textContent.search(this.value) === -1) {
                item.style.display = 'none';
            } else {
                item.style.display = 'flex';
                foundCount++;
            }
        }, this);

        emailDropdown.style.height = foundCount * 40 + 'px';

        // If there's nothing entered, just don't show the dropdown
        if (this.value.trim() == '') {
            emailDropdown.style.height = 0 + 'px';
        }


        if (validateEmail(this.value.trim())) {
            document.getElementsByClassName('errorEmail')[0].style.display = 'none';
            showSubscribeButton(true);
        } else {
            document.getElementsByClassName('errorEmail')[0].style.display = 'block';
            showSubscribeButton(false);
        }

        if (this.value.trim() == '') {
            document.getElementsByClassName('errorEmail')[0].style.display = 'none';
        }
    });

    // Handler when the DOM is fully loaded
    // This needs to be set explicitly rather than just the CSS as grabbing it doesn't know, apparently, about the CSS.
    document.getElementById('subjectOptions').style.display = 'none';

    document.getElementById('toggleSubjectsBtn').addEventListener('click', function(evt) {
        evt.preventDefault();
        var displayState = document.getElementById('subjectOptions').style.display === 'none' ? 'flex' : 'none';
        
        document.getElementById('subjectOptions').style.display = displayState;


        if (displayState === 'flex') {
            document.querySelector('#toggleSubjectsBtn i').classList.replace('fa-caret-down', 'fa-caret-up');
        } else {
            document.querySelector('#toggleSubjectsBtn i').classList.replace('fa-caret-up', 'fa-caret-down');
        }
    });

    /* We need to change slider appearance oninput and onchange */
    setValue(7500);
    
    window.addEventListener('resize', function() {
        // Get hold of the current value given by the range
        var rangeValue = document.getElementById('slider').value;
        setValue(rangeValue);
    });
});
