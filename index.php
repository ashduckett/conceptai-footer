<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="css/contact.css">
    <link href="https://fonts.googleapis.com/css?family=Gothic+A1" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="css/open-sans.css" rel="stylesheet">
    <link href="css/all.css" rel="stylesheet">
    <link href="css/hover-min.css" rel="stylesheet">
    <script src="main.js"></script>
    <title>Document</title>
</head>
<body>
    <header>
        <h1 >Let's talk.</h1>
        <p>
            We'd love to talk to you face to face; learn about your business and what you do. We thrive in helping forward thinking businesses find digital and 
            design solutions. So please get in touch.
        </p>
    </header>
    <section id="contactFormSection">
        <form id="contactForm" action="sendEmail.php" method="POST">
            <section id="contactFormName">
                <label>Name*</label>
                <div class="fieldInput">
                    <input name="contactName" class="expandingLineField" id="contactName" type="text" placeholder="Who are you?">
                </div>
                <div class="colouredLine"></div>
                <div class="errorContainer"><div class="nameError fieldError">Please enter a name.</div></div>
            </section>
            


            <section id="contactFormSubject">
                <label>Subject*</label>
                <div class="fieldInput">
                    <input name="contactSubject" class="expandingLineField" type="text" id="contactSubject" placeholder="What would you like us to help you with?">
                    <a class="hvr-wobble-vertical" id="toggleSubjectsBtn" href="#"><i class="fas fa-caret-down"></i></a>
                </div>
                <div class="colouredLine"></div>
                <div class="errorContainer"><div class="subjectError fieldError">Please enter a subject.</div></div>
            </section>
                <div id="subjectOptions" class="hidden">
                    <div class="subjectOptionPrompt">Choose your services:</div>
                    <div class="subjectOption">
                        <a href="#">Website Design & Development</a><div class="separator"></div>
                    </div>
                    <div class="subjectOption">
                        <a href="#">Social Media</a>
                        <div class="separator"></div>
                    </div>
                    <div class="subjectOption">
                        <a href="#">Branding & Design</a>
                        <div class="separator"></div>
                    </div>
                    <div class="subjectOption">
                        <a href="#">Google Adwords</a>
                        <div class="separator"></div>
                    </div>
                    <div class="subjectOption">
                        <a href="#">Trademarking</a>
                        <div class="separator"></div>
                    </div>
                    <div class="subjectOption">
                        <a href="#">GDPR</a>
                        <div class="separator"></div>
                    </div>
                    <div class="subjectOption">
                        <a href="#">After Care&trade; (Web Support & Maintenance)</a>
                        <div class="separator"></div>
                    </div>
                    <div class="subjectOption">
                        <a href="#">SEO</a>
                        <div class="separator"></div>
                    </div>
                    <div class="subjectOption">
                        <a href="#">Videography</a>
                        <div class="separator"></div>
                    </div>
                    <div class="subjectOption">
                        <a href="#">Photography</a>
                        <div class="separator"></div>
                    </div>
                    <div class="subjectOption">
                        <a href="#">Marketing</a>
                        <div class="separator"></div>
                    </div>
                    <div class="subjectOption">
                        <a href="#">PR</a>
                    </div>
                </div>
            <!-- </div> -->

            <div class="threeItemRow">
                <section id="contactFormCompany">
                    <label>Company*</label>
                    <div class="fieldInput">
                        <input name="contactCompany" class="expandingLineField" type="text" placeholder="Conceptai" id="contactCompany">
                        
                    </div>
                    <div class="colouredLine"></div>
                    <div class="errorContainer"><div class="companyError fieldError">Please enter a company.</div></div>
                </section>
                <section id="contactFormEmail">
                    <label>Email*</label>
                    <div class="fieldInput">
                        <input name="contactEmail" class="expandingLineField" type="text" placeholder="hello@conceptai.co.uk" id="contactEmail">
                    </div>
                    <div class="colouredLine"></div>
                    <div class="errorContainer"><div class="emailError fieldError">Please enter a valid email.</div></div>
                </section>
                <section id="contactFormPhone">
                    <label>Phone*</label>
                    
                    <div class="fieldInput">
                        <input name="contactPhone" class="expandingLineField" type="text" id="contactPhone" placeholder="+44 1935 700 463">
                    </div>
                    <div class="colouredLine"></div>
                    <div class="errorContainer"><div class="phoneError fieldError">Please enter a telephone number.</div></div>
                </section>
            </div>
            <section id="contactFormEnquiry">
                <label>Enquiry*</label>
                <div class="fieldInput">
                    <input name="contactEnquiry" class="expandingLineField" type="text" id="contactEnquiry" placeholder="Tell us more..."></div>
                <div class="colouredLine"></div>
                <div class="errorContainer"><div class="enquiryError fieldError">Please enter an enquiry.</div></div>
                
            </section>
            <div id="sliderHeader">Budget</div>
            
            <section id="contactFormBudget">
                   <table>
                    <tr>
                        <td>
                            <div class="slidershell" id="slidershell">
                                <div class="sliderfill" id="sliderfill"></div>
                                <div class="slidertrack" id="slidertrack"></div>
                                <div id="sliderthumb" class="sliderthumb"></div>
                                <div class="slidervalue" id="slidervalue">0</div>
                                <input class="slider" id="slider" step="50" type="range" min="0" max="15000" value="0" oninput="showValue(value, false);" onchange="showValue(value, false);" />
                            </div>
                        </td>
                    </tr>
                </table>
            </section>
            <a id="contactFormSubmitBtn" href="#">Submit enquiry <img src="img/getInTouch.png"></a>
        </form>
    </section>
    <section id="newsletterSignup">
        <div id="newsletterPrompt">
            <div class="newsletterCentered">
                <h1>Always be the first to know.</h1>
                <h2>Sign up for our newsletter!</h2>
                <section id="newsletterEmail">
                    <div class="fieldInput">
                        <input class="expandingLineField" id="signupEmail" type="text" placeholder="Email address">
                        <div class="colouredLine"></div>
                        <div class="errorContainer"><div class="newsletterMessage fieldError">Thank you!</div></div>
                        <button class="conceptaiButton subscribeBtn">Subscribe <img src="img/getInTouch.png"></button>
                    </div>
                    
                    <div class="errorEmail">Invalid email address. Please retry.</div>
                </section>
                <button class="conceptaiButton subscribeBtn vertical hidden">Subscribe <img src="img/getInTouch.png"></button>
            </div>
        </div>
    </section>
    <footer>
        <section id="footerTop">
            <div id="footerTopLeft">
                
                <span id="flagAndText">
                    <span id="rowOne">
                        <div class="flagAndTextContainer"><img src="img/flag.png">United Kingdom ( English / GBP )</div>
                    </span>
                    <span class="reg">Reg in England 09543004</span>
                    <span class="vat">VAT Reg 276128392</span>
                </span>
                
            </div>
            <div id="footerTopRight">
                <span class="telNo"><a href="tel:+44 1935 700 463"><i class="fas fa-rotate-90 fa-phone"></i> +44 1935 700 463</a></span>
                <span class="openingHours">9:00am - 5:00pm, Monday to Friday</span>
                <div class="separator"></div>
                <div class="socialMedia">    
                    <a class="iconSocialMedia" href="#"><i class="fab fa-facebook"></i></a>
                    <a class="iconSocialMedia" href="#"><i class="fab fa-instagram"></i></a>
                    <a class="iconSocialMedia" href="#"><i class="fab fa-twitter"></i></a>
                </div>
                
            </div>
        </section>
        <section id="footerBottom">
            <div id="footerBottomLeft">
                <span class="copyright">© 2018 - 2019 Conceptai Design Studios. All Rights Reserved.</span>
            </div>
            <div id="footerBottomRight">
                    <span class="siteMapLinks">
                        <span class="siteMapLinkContainer"><a class="siteMapLink" href="#">Privacy Policy</a></span>
                        <div class="separator"></div>
                        <span class="siteMapLinkContainer"><a class="siteMapLink" href="#">Cookie Policy</a></span>
                        <div class="separator"></div>
                        <span class="siteMapLinkContainer"><a class="siteMapLink" href="#">Terms of Sales</a></span>
                        <div class="separator nonmobile"></div>
                        <span class="siteMapLinkContainer nonmobile"><a class="siteMapLink" href="#">Anti Money Laundering</a></span>
                        <div class="separator nonmobile"></div>
                        <span class="siteMapLinkContainer nonmobile"><a class="siteMapLink" href="#">Anti Bribary & Corruption</a></span>
                        <div class="separator nonmobile"></div>
                        <span class="siteMapLinkContainer nonmobile"><a class="siteMapLink" href="#">Site Map</a></span>
                    </span>
                </div>

        </section>
    </footer>
</body>
</html>