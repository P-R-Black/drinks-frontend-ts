import React from 'react'
import './termsConditions.css'
import { HashLink } from 'react-router-hash-link'

export const TermsConditions = () => {
    return (
        <section className="TermsSection" role="main">
            <div className="container">
                <div className="termsTitleContainer">
                    <h1>Terms of Service</h1>
                </div>
                <div className="termsContainer">
                    <div className="termsParagraphContainer">
                        <p>
                            These terms and conditions (the "Terms and Conditions") govern the use of
                            Keep's Guide (the "Site"). This Site is owned and operated by Keep's Guide.
                            This site is a digital notebook of drink recipes.

                            By using this Site, you indicate taht you have read and understand these
                            Terms and Conditions and agree to abide by them at all times.
                        </p>
                        <h3>Intellectual Property</h3>
                        <p>
                            All content published and made available on our Site, not including
                            background images is the property of Keep's Guide and the Site's creators.
                            This includes, but is not limited to certain images, text, logos, documents,
                            downloadable files and anything that contributes to the composition of our
                            Site.
                        </p>
                        <h3>Links to Other Websites</h3>
                        <p>
                            Our Site contains links to third party websites or services that we do not
                            own or control. We are not responsible for the content, policies, or
                            practices of any third party website or service linked to on our Site. It
                            is your responsibility to read the terms and conditions and privacy policies
                            of these third party websites before using these sites.
                        </p>
                        <h3>Limitation of Liability</h3>
                        <p>
                            Keep's Guide and our directors, officers, agents, employees, subsidiaries, and affiliates will
                            not be liable for any actions, claims, losses, damages, liabilities and expenses including legal
                            fees from your use of the Site.
                        </p>
                        <h3>Indemnity</h3>
                        <p>
                            Except where prohibited by law, by using this Site you idemnify and hold
                            harmless Keep's Guide and our directors, officers, agents, employees,
                            subsidiaries, and affiliates from any actions, claims, losses, damages,
                            liabilities and expenses including legal feels arising out of your use of
                            our Site or your violation of these Terms and Conditions.
                        </p>
                        <h3>Applicable Law</h3>
                        <p>
                            These Terms and Conditions are governed by the laws of the State of Florida.
                        </p>
                        <h3>Severability</h3>
                        <p>
                            If at any time any of the provisions set forth in these Terms and Conditions
                            are found to be inconsistent or invalid under applicable laws, those
                            provisions will be deemed void and will be removed from these Terms and
                            Conditions. All other provisions will not be affected by the removal and
                            the rest of these Terms and Conditions will still be considered valid.
                        </p>
                        <h3>Changes</h3>
                        <p>
                            These Terms and Conditions may be amended from time to time in order to
                            maintain comliance with the law and to reflect any changes to the way we
                            operate our Site and the way we expect users to behave on our Site. We
                            will notify users by email of changes of these Terms and Conditions or post
                            a notice on our Site.
                        </p>
                        <h3>Contact Details</h3>
                        <p>
                            Please contact us if you have any questions or concerns. Our contact details
                            are as follows:
                        </p>
                        <p className="sitePhoneNumber">(561)729-5153</p>
                        <p className="siteEmail">pblackdevdemo@gmail.com</p>
                        <p className="siteAddress">PO Box 220085 Rosedale, NY 11422</p>

                        <p>You can also contact us through the feedback <HashLink className="formLink" to="/contact-us">{"form"}</HashLink> available on our Site</p>
                        <h2 className="effectDate">Effective Date: April 2, 2024</h2>
                    </div>
                </div>
            </div>
        </section>
    )
}
