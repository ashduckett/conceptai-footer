function validateEmail(email) {
    var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return re.test(email.toLowerCase());
}

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

function validateFields() {
    var errors = false;
    var itemHasError = false;
    var inputFields = document.querySelectorAll('#contactForm input');

    inputFields.forEach(function(item) {
        if (item.type === 'text') {
            itemHasError = false;
            if (item.id === 'contactSubject') {
                document.getElementById('subjectOptions').classList.toggle('subjectOptionsDisplayed', !item.value.trim() === '');
                document.querySelector('#toggleSubjectsBtn i').classList.toggle('fa-rotate-180', !item.value.trim() === '');
            }

            var value = item.value;

            if (item.id === 'contactEmail') {
                var validEmail = validateEmail(value.trim());
                if (!validEmail || value.trim() === '') {
                    errors = true;
                    itemHasError = true;
                }
            } else {
                if (value.trim() === '') {
                    errors = true;
                    itemHasError = true;
                }
            }
            item.parentElement.nextElementSibling.nextElementSibling.firstElementChild.classList.toggle('displayError', itemHasError);
        }
    });
    return errors;
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

    fill.style.left = loc + thumb.getBoundingClientRect().width / 2 + "px";
    var trackWidth = track.offsetWidth;
    fill.style.width = trackWidth - loc - thumb.getBoundingClientRect().width / 2 + 'px';
    shell.style.height = smallval + "px";
    track.style.height = 0.5 + 'px';
    track.style.left = 0 + 'px';
    track.style.top = '50%';
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
        document.querySelector('#newsletterPrompt .fieldInput').classList.add('showingSubscribeButton');
        document.getElementsByClassName('errorEmail')[0].style.display = 'none';
    } else {
        document.getElementsByClassName('conceptaiButton')[0].classList.replace('showing', 'hidden');
        document.querySelectorAll('.conceptaiButton.vertical')[0].classList.replace('showing', 'hidden');
        document.querySelector('#newsletterPrompt .fieldInput').classList.remove('showingSubscribeButton');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const subscribeButtons = document.querySelectorAll('.subscribeBtn');

    subscribeButtons.forEach(function(item) {
        item.addEventListener('click', function(evt) {
            var email = document.getElementById('signupEmail').value;

            var request = new XMLHttpRequest();
            request.open('POST', 'sendNewsletterEmail.php', true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {

                    const signedUpMessage = document.getElementsByClassName('newsletterMessage')[0];
                    signedUpMessage.classList.add('displayError');
                    var resp = request.responseText;
                    
                    var json = null;
                    try {
                        json = JSON.parse(resp);
                    } catch (ex) {

                        console.log('There was an error.');
                    }

                    if (JSON.parse(resp).status === 1) {
                        const signedUpMessage = document.getElementsByClassName('newsletterMessage')[0];
                        signedUpMessage.classList.add('displayError');

                        setTimeout(function() {
                            signedUpMessage.classList.remove('displayError');
                            signUpEmailInput.value = '';

                            showSubscribeButton(false)

                        }, 10000);

                    }
                } else {
                    // There was an error. Show this in the UI.
                    //contactButton.innerHTML = 'Submit enquiry <img src="img/getInTouch.png">';
                }
            };

            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            
            // Unsure if we can use ES6 tactics here and just omit the right side...
            request.send(encodeQueryData({
                email: email,
            }));
        
        
        
        
        
        });
    });


                                     
    document.getElementsByClassName('conceptaiButton')[0].classList.add('hidden');

    const signupEmailInput = document.getElementById('signupEmail');
    const subjectOptions = document.getElementById('subjectOptions');


    var emailType = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
    var emailDropdown = document.createElement('div');
    var emailContainers = [];
    emailDropdown.classList.add('emailDropdown');


    var inputFields = document.querySelectorAll('#contactForm input');

    inputFields.forEach(function(item) {
        if (item.type === 'text') {


            item.addEventListener('blur', function() {
                if (item.id === 'contactSubject') {
                    subjectOptions.classList.toggle('subjectOptionsDisplayed', !item.value.trim() === '');
                    document.querySelector('#toggleSubjectsBtn i').classList.toggle('fa-rotate-180', !item.value.trim() === '');
                }
                var value = this.value;

                if (item.id === 'contactEmail') {
                    var validEmail = validateEmail(value.trim());
                    errors = !validEmail || value.trim() === '';
                } else {
                    errors = value.trim() === '';
                }

                this.parentElement.nextElementSibling.nextElementSibling.firstElementChild.classList.toggle('displayError', errors);
                
            });
        }
    });

    emailDropdown.addEventListener('click', function(evt) {
        signupEmailInput.value = evt.target.textContent;
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
        signupEmailInput.value = '';
        
        document.getElementsByClassName('errorEmail')[0].style.display = 'none';
        emailDropdown.style.height = '0px';
        showSubscribeButton(false)

        document.getElementsByClassName('newsletterMessage')[0].classList.remove('displayError');
    });

    var appendHere = document.querySelector('#newsletterEmail .fieldInput');
    appendHere.appendChild(emailDropdown);
    appendHere.appendChild(close);

    function encode(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    subjectOptions.addEventListener('click', function(evt) {
        evt.preventDefault();
        if (evt.target.tagName === 'A') {

            let exp = RegExp('([, ]+)?' + encode(evt.target.text));

            // If it's present
            if (exp.test(document.getElementById('contactSubject').value)) {
                
                // If it's found at the start of the string, remove any following items too
                var index = document.getElementById('contactSubject').value.search(exp);

                if (index === 0) {
                    exp = RegExp('([, ]+)?' + encode(evt.target.text) + '([, ]+)?');
                }


                
                document.getElementById('contactSubject').value = document.getElementById('contactSubject').value.replace(exp, '');
                evt.target.classList.remove('activeSubject');




            } else {
                var textToAdd = document.getElementById('contactSubject').value == '' ? evt.target.text : ', ' + evt.target.text;
    
                // Add the text to the field
                document.getElementById('contactSubject').value += textToAdd;

                // Highlight the anchor
                evt.target.classList.add('activeSubject');
            }

            // Slide out the label
            if (document.getElementById('contactSubject').value == '') {
                document.querySelector('#contactFormSubject label').classList.remove('fieldFilled');
            } else {
                document.querySelector('#contactFormSubject label').classList.add('fieldFilled');
            }
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
                
                evt.target.parentElement.nextElementSibling.classList.remove('expanded');
            }
        });

        item.addEventListener('input', function(evt) {
            
            if (evt.target.type === 'text') {
                if (this.value.trim() !== '') {
                    evt.target.parentElement.parentElement.firstElementChild.classList.add('fieldFilled');
                } else {
                    evt.target.parentElement.parentElement.firstElementChild.classList.remove('fieldFilled');
                }
            }

            
        });
    });

    signupEmailInput.addEventListener('focus', function() {
        this.nextElementSibling.classList.add('expanded');
    });

    signupEmailInput.addEventListener('blur', function() {
        this.nextElementSibling.classList.remove('expanded');
    });

    signupEmailInput.addEventListener('keydown', function(evt) {
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
            signupEmailInput.value = t;
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
        signupEmailInput.value = t;

        } else if (emailDropdown.offsetHeight !== 0 && evt.keyCode === 13) {    // Enter pressed
            // Now we need to get hold of the text of the selected item.
            var text = document.querySelector('.keyboardSelectedEmailOption').textContent;
            document.querySelector('.emailDropdown').style.height = '0px';

            if (validateEmail(text)) {
                signupEmailInput.value = text;
                showSubscribeButton(true);
            } else {
                document.getElementsByClassName('errorEmail')[0].style.display = 'block';
                showSubscribeButton(false);
            }
        }
    });

    signupEmailInput.addEventListener('input', function(evt) {
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


    document.getElementById('contactFormSubmitBtn').addEventListener('click', function(evt) {
        evt.preventDefault();
        // Grab the name
        var name = document.getElementById('contactName').value;
        var subject = document.getElementById('contactSubject').value;
        var company = document.getElementById('contactCompany').value;
        var email = document.getElementById('contactEmail').value;
        var phone = document.getElementById('contactPhone').value;
        var enquiry = document.getElementById('contactEnquiry').value;
        var budget = document.getElementById('slider').value;

        var errors = validateFields();


        if (errors === false) {
            console.log('fired code becase errors is ', errors)
            // As soon as you hit the button, you should switch to a swirly icon.
            var contactButton = document.getElementById('contactFormSubmitBtn');
            contactButton.innerHTML = '<i class="fas fa-sync fa-spin"></i>';

            var request = new XMLHttpRequest();
            request.open('POST', 'sendEmail.php', true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var resp = request.responseText;
                    var json = null;
                    try {
                        json = JSON.parse(resp);
                    } catch (ex) {
                        contactButton.innerHTML = 'Submit enquiry <img src="img/getInTouch.png">';
                        console.log('There was an error.');
                    }

                    if (JSON.parse(resp).status === 1) {
                        contactButton.innerHTML = 'Thank You!';

                        // Fire off a ten second timer
                        setTimeout(function() {
                            // Set the button back to normal
                            contactButton.innerHTML = 'Submit enquiry <img src="img/getInTouch.png">';

                            // Clear each form item

                            document.getElementById('contactName').value = '';
                            document.getElementById('contactSubject').value = '';
                            document.getElementById('contactCompany').value = '';
                            document.getElementById('contactEmail').value = '';
                            document.getElementById('contactPhone').value = '';
                            document.getElementById('contactEnquiry').value = '';
                            document.getElementById('slider').value = 1200;

                            
                            setValue(1200);

                        }, 10000);
                    }
                } else {
                    // There was an error. Show this in the UI.
                    contactButton.innerHTML = 'Submit enquiry <img src="img/getInTouch.png">';
                }
            };

            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            
            // Unsure if we can use ES6 tactics here and just omit the right side...
            request.send(encodeQueryData({
                name: name,
                subject: subject,
                company: company,
                email: email,
                phone: phone,
                enquiry: enquiry,
                budget: budget
            }));
        } else {

            // If there's an error in the subject then hide the options.
            if (document.getElementById('contactSubject').value.trim() === '') {
                subjectOptions.classList.remove('subjectOptionsDisplayed');
            }
        }
    });

    document.getElementById('toggleSubjectsBtn').addEventListener('click', function(evt) {
        evt.preventDefault();
        subjectOptions.classList.toggle('subjectOptionsDisplayed');

        if (subjectOptions.classList.contains('subjectOptionsDisplayed')) {
            document.querySelector('#toggleSubjectsBtn i').classList.add('fa-rotate-180');
            subjectOptions.classList.remove('hidden');
            subjectOptions.classList.remove('subjectOptionsHidden');
            document.querySelector('.subjectError').classList.remove('displayError');
        } else {
            document.querySelector('#toggleSubjectsBtn i').classList.remove('fa-rotate-180');
            subjectOptions.classList.add('subjectOptionsHidden');
        }
    });

    /* We need to change slider appearance oninput and onchange */
    setValue(1200);
    
    window.addEventListener('resize', function() {
        // Get hold of the current value given by the range
        var rangeValue = document.getElementById('slider').value;
        setValue(rangeValue);
    });
});
