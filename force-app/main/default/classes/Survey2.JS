import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveSurvey from '@salesforce/apex/SurveyController.saveSurvey';

export default class SurveyComponent extends LightningElement {
    // Variables to track the survey state
    showSurvey = true; // Whether to show the survey or the thank you message
    satisfactionValue = ''; // To store the selected emoji value
    improvementComment = ''; // To store the comment entered by the user
    showTextBox = false; // Whether to show the text box for comments (only when "Very Poor" is selected)
    isSubmitVisible = false; // Whether the submit button should be shown

    // Handle emoji click event
    handleEmojiClick(event) {
        this.satisfactionValue = event.target.dataset.value;

        // Show the text box only if the selected emoji is "Very Poor"
        if (this.satisfactionValue === 'Very Poor') {
            this.showTextBox = true;
        } else {
            this.showTextBox = false;
        }

        // Show the submit button once an emoji is selected
        this.isSubmitVisible = true;
    }

    // Handle mouse hover events for emojis (if required)
    handleMouseOver(event) {
        event.target.style.transform = 'scale(1.1)';
    }

    handleMouseOut(event) {
        event.target.style.transform = 'scale(1)';
    }

    // Handle the comment change in the text box
    handleCommentChange(event) {
        this.improvementComment = event.target.value;
    }

    // Handle the form submission
    handleSubmit() {
        // Validate if a satisfaction value is selected
        if (!this.satisfactionValue) {
            this.showToast('Error', 'Please select a satisfaction level before submitting.', 'error');
            return;
        }

        // Create the survey record by calling Apex
        saveSurvey({ satisfactionValue: this.satisfactionValue })
            .then((result) => {
                // After successful submission, show a success toast
                this.showToast('Success', 'Your feedback has been submitted!', 'success');
                
                // Optionally, handle saving the comment if "Very Poor" was selected
                if (this.satisfactionValue === 'Very Poor' && this.improvementComment) {
                    // Save the improvement comment if needed (this logic depends on your Salesforce setup)
                }

                // Hide the survey after submission and show the thank you message
                this.showSurvey = false;
            })
            .catch((error) => {
                // Handle error in case the Apex call fails
                this.showToast('Error', 'There was an issue submitting your feedback. Please try again.', 'error');
                console.error(error);
            });
    }

    // Utility function to show toast messages
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }
}
